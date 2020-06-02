import {
  Component,
  OnInit,
  Input,
  OnDestroy,
  ViewEncapsulation,
  ViewChild,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
  getNumericCellEditor,
  isObjHasAtLeastValue,
  formatDateInput,
  filterDiffArray,
} from 'src/app/main/common/util';
import {
  MessageBox,
  MessageBoxButtons,
  MessageBoxIcons,
} from 'src/app/form/message/messsage';
import { PartnerService } from 'src/app/main/model/partner/partner.service';
import { formatDate } from '@angular/common';
import * as fromMain from 'src/app/main/store/main.reducer';
import { Subscription } from 'rxjs';
import { Quotation } from 'src/app/main/model/quotation/quotation.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { QuotationService } from 'src/app/main/model/quotation/quotation.service';
import { AgGridAngular } from 'ag-grid-angular';
import { GridHeaderActions2Component } from 'src/app/main/common/button-header-ag';
import { CustomHeader } from 'src/app/main/common/ag-grid-header-custom';
import { ButtonRendererComponent } from 'src/app/main/common/button-renderer.component';
import { ButtonRenderer2Component } from 'src/app/main/common/button-renderer2.component';
import { QuotOtherChargesComponent } from '../quot-other-charges/quot-other-charges.component';
import { ShareDataService } from 'src/app/main/shared/services/share-data.service';
import * as QuotationActions from 'src/app/main/screen/sales/quotation/store/quotation/quotation.actions';
import { CK_EDITOR_CONFIG } from 'src/app/main/shared/app-settings';

@Component({
  selector: 'app-customs-clearance-add',
  templateUrl: './customs-clearance-add.component.html',
  styleUrls: ['./customs-clearance-add.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class CustomClearanceQuoAddComponent implements OnInit, OnDestroy {
  @Input() customClearance: Quotation;
  @Input() action: any;
  @Input() editQuotation: any;
  @Input() selectedIndex: any;
  @ViewChild('addQuotContGrid') addQuotContGrid: AgGridAngular;
  @ViewChild('addQuotNonContGrid') addQuotNonContGrid: AgGridAngular;

  subscription: Subscription;
  otherChargeData: any;
  selectedCommodity: any;

  quotationFrm: FormGroup;

  truckingNonContainers: FormGroup;
  quotDetailsCC: FormGroup;
  quotDetailsOCArr: any;
  containerArr: any;
  nonContainerArr: any;
  dataClone: any;
  partners: any;
  quotationTypes: any;

  public contGridApi: any;
  public contGridColumnApi: any;

  public nonContGridApi: any;
  public nonContGridColumnApi: any;

  public defaultColDef: any;
  public components: any;
  public editType: any;
  public frameworkComponents1: any;
  public frameworkComponents2: any;

  volumeTypes = [
    { id: 1, typeName: 'CBM', name: 'CBM' },
    { id: 2, typeName: 'CUST', name: 'CUST' },
  ];
  grossWeightUnits = [
    { id: 1, typeName: 'KGs', name: 'Kilogram' },
    { id: 1, typeName: 'TONs', name: 'TON' },
    { id: 2, typeName: 'LBs', name: 'Pound' },
  ];

  today = formatDate(new Date(), 'dd/MM/yyy', 'en-US');
  isLoading = true;
  testNull = false;
  testNullNonCont = false;
  rowDataCont = [];
  rowDataNonCont = [];
  contColDef = [
    {
      headerName: 'ID',
      field: '_id',
      width: 100,
      sortable: false,
      filter: false,
      hide: true,
    },
    {
      headerName: 'Pick up address',
      width: 400,
      sortable: false,
      filter: false,
      headerComponentParams: {
        template:
          '<div class="ag-cell-label-container" role="presentation">' +
          '<span ref="eText" class="ag-header-cell-text" role="columnheader"></span>' +
          '</div>',
      },
      children: [
        {
          headerName: 'City/Province',
          field: 'pickupCity',
          width: 150,
          sortable: false,
          filter: false,
          cellEditor: 'Editor',
          cellEditorParams: {
            class: 'city',
          },
          cellRenderer: (data) => {
            if (data.value) {
              return data.value.cityName;
            }
          },
        },
        {
          headerName: 'Area',
          field: 'pickupArea',
          width: 100,
          sortable: false,
          filter: false,
          cellRenderer: (data) => {
            if (
              typeof data.value !== 'string' &&
              data.value !== undefined &&
              data.value != null
            ) {
              return data.value.areaName;
            }
            return data.value != null ? data.value : '';
          },
        },
        {
          headerName: 'Adress',
          field: 'pickupAddress',
          width: 150,
          sortable: false,
          filter: false,
          cellRenderer: (data) => {
            if (
              typeof data.value !== 'string' &&
              data.value !== undefined &&
              data.value != null
            ) {
              return data.value.areaName;
            }
            return data.value != null ? data.value : '';
          },
        },
      ],
    },
    {
      headerName: 'Delivery address',
      children: [
        {
          headerName: 'City/Province',
          field: 'deliveryCity',
          width: 150,
          sortable: false,
          filter: false,
          cellEditor: 'Editor',
          cellEditorParams: {
            class: 'city',
          },
          cellRenderer: (data) => {
            if (data.value) {
              return data.value.cityName;
            }
          },
        },
        {
          headerName: 'Area',
          field: 'deliveryArea',
          width: 100,
          sortable: false,
          filter: false,
          cellRenderer: (data) => {
            if (
              typeof data.value !== 'string' &&
              data.value !== undefined &&
              data.value != null
            ) {
              return data.value.areaName;
            }
            return data.value != null ? data.value : '';
          },
        },
        {
          headerName: 'Address',
          field: 'deliveryAddress',
          width: 100,
          sortable: false,
          filter: false,
          cellRenderer: (data) => {
            if (
              typeof data.value !== 'string' &&
              data.value !== undefined &&
              data.value != null
            ) {
              return data.value.areaName;
            }
            return data.value != null ? data.value : '';
          },
        },
      ],
    },
    {
      headerName: 'Currency',
      field: 'currency',
      width: 100,
      sortable: false,
      filter: false,
      cellEditor: 'Editor',
      cellEditorParams: {
        class: 'currency',
      },
      cellRenderer: (data) => {
        if (data.value) {
          return data.value.currencyName;
        }
      },
    },
    {
      headerName: "20'",
      field: 'container20DC',
      width: 200,
      sortable: false,
      filter: false,
    },
    {
      headerName: "40'",
      field: 'container40DC',
      width: 100,
      sortable: false,
      filter: false,
    },
    {
      headerName: 'Origin Charge',
      field: 'isOriginCharges',
      width: 100,
      sortable: false,
      filter: false,
      editable: true,
      hide: true,
      // cellRenderer: 'genderCellRenderer',
      // cellEditorParams: {
      //   cellRenderer: 'genderCellRenderer',
      //   values: ['Yes', 'No']
      // }
    },
    {
      headerName: 'Notes',
      field: 'notes',
      width: 350,
      sortable: false,
      filter: false,
    },
    {
      headerName: '',
      width: 150,
      cellRenderer: 'buttonRenderer',
      editable: false,
      sortable: false,
      filter: true,
      resizable: false,
      pinned: 'right',
      headerComponentFramework: GridHeaderActions2Component,
      headerComponentParams: {
        onClick: this.addNewCont.bind(this),
      },
      cellRendererParams: {
        onClick: this.editTable.bind(this),
        onClick1: this.cancelAction.bind(this),
        onClick3: this.addAction.bind(this),
        onClick4: this.cancelAction.bind(this),
      },
    },
  ];
  nonContColDef = [
    {
      headerName: 'ID',
      field: '_id',
      width: 100,
      sortable: false,
      filter: false,
      hide: true,
    },
    {
      headerName: 'Pick up address',
      width: 400,
      sortable: false,
      filter: false,
      headerComponentParams: {
        template:
          '<div class="ag-cell-label-container" role="presentation">' +
          '<span ref="eText" class="ag-header-cell-text" role="columnheader"></span>' +
          '</div>',
      },
      children: [
        {
          headerName: 'City/Province',
          field: 'pickupCity',
          width: 150,
          sortable: false,
          filter: false,
          cellEditor: 'Editor',
          cellEditorParams: {
            class: 'city',
          },
          cellRenderer: (data) => {
            if (data.value) {
              return data.value.cityName;
            }
          },
        },
        {
          headerName: 'Area',
          field: 'pickupArea',
          width: 100,
          sortable: false,
          filter: false,
          cellRenderer: (data) => {
            if (
              typeof data.value !== 'string' &&
              data.value !== undefined &&
              data.value != null
            ) {
              return data.value.areaName;
            }
            return data.value != null ? data.value : '';
          },
        },
        {
          headerName: 'Adress',
          field: 'pickupAddress',
          width: 150,
          sortable: false,
          filter: false,
          cellRenderer: (data) => {
            if (
              typeof data.value !== 'string' &&
              data.value !== undefined &&
              data.value != null
            ) {
              return data.value.areaName;
            }
            return data.value != null ? data.value : '';
          },
        },
      ],
    },
    {
      headerName: 'Delivery address',
      children: [
        {
          headerName: 'City/Province',
          field: 'deliveryCity',
          width: 150,
          sortable: false,
          filter: false,
          cellEditor: 'Editor',
          cellEditorParams: {
            class: 'city',
          },
          cellRenderer: (data) => {
            if (data.value) {
              return data.value.cityName;
            }
          },
        },
        {
          headerName: 'Area',
          field: 'deliveryArea',
          width: 100,
          sortable: false,
          filter: false,
          cellRenderer: (data) => {
            if (
              typeof data.value !== 'string' &&
              data.value !== undefined &&
              data.value != null
            ) {
              return data.value.areaName;
            }
            return data.value != null ? data.value : '';
          },
        },
        {
          headerName: 'Adress',
          field: 'deliveryAdress',
          width: 150,
          sortable: false,
          filter: false,
          cellRenderer: (data) => {
            if (
              typeof data.value !== 'string' &&
              data.value !== undefined &&
              data.value != null
            ) {
              return data.value.areaName;
            }
            return data.value != null ? data.value : '';
          },
        },
      ],
    },
    {
      headerName: 'Currency',
      field: 'currency',
      width: 100,
      sortable: false,
      filter: false,
      cellEditor: 'Editor',
      cellEditorParams: {
        class: 'currency',
      },
      cellRenderer: (data) => {
        if (data.value) {
          return data.value.currencyName;
        }
      },
    },
    {
      headerName: '500kgs',
      field: 'truck500kgs',
      width: 100,
      sortable: false,
      filter: false,
    },
    {
      headerName: '1-ton truck',
      field: 'truckTonLevel1',
      width: 100,
      sortable: false,
      filter: false,
    },
    {
      headerName: '1.5-ton truck',
      field: 'truckTonLevel2',
      width: 100,
      sortable: false,
      filter: false,
    },
    {
      headerName: '2-ton truck',
      field: 'truckTonLevel3',
      width: 100,
      sortable: false,
      filter: false,
    },
    {
      headerName: '2.5-ton truck',
      field: 'truckTonLevel4',
      width: 100,
      sortable: false,
      filter: false,
    },
    {
      headerName: '3.5-ton truck',
      field: 'truckTonLevel5',
      width: 100,
      sortable: false,
      filter: false,
    },
    {
      headerName: '5-ton truck',
      field: 'truckTonLevel6',
      width: 100,
      sortable: false,
      filter: false,
    },
    {
      headerName: '6.5-ton truck',
      field: 'truckTonLevel7',
      width: 100,
      sortable: false,
      filter: false,
    },
    {
      headerName: '8-ton truck',
      field: 'truckTonLevel8',
      width: 100,
      sortable: false,
      filter: false,
    },
    {
      headerName: '9.5-ton truck',
      field: 'truckTonLevel9',
      width: 100,
      sortable: false,
      filter: false,
    },
    {
      headerName: '11-ton truck',
      field: 'truckTonLevel10',
      width: 100,
      sortable: false,
      filter: false,
    },
    {
      headerName: '13-ton truck',
      field: 'truckTonLevel11',
      width: 100,
      sortable: false,
      filter: false,
    },
    {
      headerName: '15-ton truck',
      field: 'truckTonLevel12',
      width: 100,
      sortable: false,
      filter: false,
    },
    {
      headerName: '16.5-ton truck',
      field: 'truckTonLevel13',
      width: 100,
      sortable: false,
      filter: false,
    },
    {
      headerName: '18-ton truck',
      field: 'truckTonLevel14',
      width: 100,
      sortable: false,
      filter: false,
    },
    {
      headerName: '20-ton truck',
      field: 'truckTonLevel15',
      width: 100,
      sortable: false,
      filter: false,
    },
    {
      headerName: '22-ton truck',
      field: 'truckTonLevel16',
      width: 100,
      sortable: false,
      filter: false,
    },
    {
      headerName: 'Notes',
      field: 'notes',
      width: 350,
      sortable: false,
      filter: false,
    },
    {
      headerName: '',
      width: 150,
      cellRenderer: 'buttonRenderer',
      editable: false,
      sortable: false,
      filter: true,
      resizable: false,
      pinned: 'right',
      headerComponentFramework: GridHeaderActions2Component,
      headerComponentParams: {
        onClick: this.addNewNonCont.bind(this),
      },
      cellRendererParams: {
        onClick: this.editTableNonCont.bind(this),
        onClick1: this.cancelActionNonCont.bind(this),
        onClick3: this.addActionNonCont.bind(this),
        onClick4: this.cancelActionNonCont.bind(this),
      },
    },
  ];

  ckEditorConfig :any;

  termAndCondition = `
  - Rates are applied for general, non-hazardous, non-special cargo.<br>
  - Rates are subject to Peak Season Surcharge (PSS), General Rate Increase (GRI) whenever applicable, unless otherwise indicated here in.<br>
  - Rates exclude import duty, loading & unloading cargo from truck…, unless otherwise indicated herein.<br>
  - Rates exclude container detention, demurrage, container repair, storage charge, customs penalty, truck detention charge, if any.<br>
  - Transit time indicated is based on carrier's publication, which may be subject to change with/without prior notice.<br>
`;
  signature = `Thank you for allowing us an opportunity to quote you! We look forward to the pleasure and honour of being of service to your esteemed company!<br>
  Please do not hesitate to contact us if you have any questions.<br>
  [User full name] &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[Phone number/Email]
  `;

  constructor(
    private store: Store<fromMain.MainState>,
    private activeModal: NgbActiveModal,
    private modal: NgbModal,
    private fb: FormBuilder,
    private partnerService: PartnerService,
    private quotationService: QuotationService,
    private shareDataService: ShareDataService
  ) {

    this.ckEditorConfig = CK_EDITOR_CONFIG;

    this.defaultColDef = {
      width: 120,
      headerComponentParams: { menuIcon: 'fas fa-filter' },
      sortable: true,
      resizable: true,
      filter: true,
      editable: true,
    };
    this.frameworkComponents1 = {
      agColumnHeader: CustomHeader,
      buttonRenderer: ButtonRendererComponent,
      Editor: ButtonRenderer2Component,
    };
    this.frameworkComponents2 = {
      agColumnHeader: CustomHeader,
      buttonRenderer: ButtonRendererComponent,
      Editor: ButtonRenderer2Component,
    };

    this.components = { numericCellEditor: getNumericCellEditor() };
    this.editType = 'fullRow';
    this.isLoading = false;
  }

  ngOnInit() {
    this.createForm();
    if (this.action === 'ADD_NEW_CUSTOM_CLEARANCE_QUOTATION') {
      this.quotationFrm.patchValue({
        cargoReadyDateTo: this.customClearance.cargoReadyDateTo
          ? this.customClearance.cargoReadyDateTo
          : null,
        cargoReadyDateFrom: this.customClearance.cargoReadyDateFrom
          ? this.customClearance.cargoReadyDateFrom
          : null,
        client: this.customClearance.client
          ? this.customClearance.client
          : null,
        quotationType: this.customClearance.quotationType
          ? this.customClearance.quotationType
          : null,
        specialRequirements: this.customClearance.specialRequirements
          ? this.customClearance.specialRequirements
          : null,
        targetedRateAndCharges: this.customClearance.targetedRateAndCharges
          ? this.customClearance.targetedRateAndCharges
          : null,
        dateCreate: formatDate(new Date(), 'yyyy-MM-dd', 'en-US'),
        termsAndConditions: this.termAndCondition,
        signature: this.signature,
      });
    }
    // =========== EDIT =======================
    if (this.action === 'EDIT') {
      let general = { ...this.editQuotation };
      console.log('general');
      console.log(general);

      let quotationNo = general.quotationNo;
      const paramsJson = {
        startRow: 0,
        endRow: 90,
        sortModel: [],
        filterModel: {
          quotationNo: {
            filterType: 'text',
            type: 'equals',
            filter: quotationNo,
          },
        },
      };
      this.quotationService
        .getQuotationTruckingContainer(paramsJson)
        .subscribe((data) => {
          console.log(data);
          this.rowDataCont = data.results;
        });

      this.quotationService
        .getQuotDetailsTruckNonCont(paramsJson)
        .subscribe((data) => {
          this.rowDataNonCont = data.results;
        });
      this.quotationService
        .getQuotDetailsCustomsClearance(paramsJson)
        .subscribe((data) => {
          let quotationDetails_CustomsClearance =
            data.results && data.results.length ? data.results[0] : '';
          // TODO: fix error for isExport
          quotationDetails_CustomsClearance.isExport = quotationDetails_CustomsClearance.isExport
            ? 'CUSTOM_CLEARANCE_EXPORT'
            : 'CUSTOM_CLEARANCE_IMPORT';
          console.log(quotationDetails_CustomsClearance);

          this.quotationFrm.patchValue({ quotationDetails_CustomsClearance });
        });
      this.quotationService
        .getQuotationDetailsOtherCharges(paramsJson)
        .subscribe((data) => {
          console.log(data);
          this.shareDataService.changeMessage(data.results);
        });
      this.quotationFrm.patchValue({
        _id: general._id,
        quotationNo: general.quotationNo,
        client: general.client,
        commodity: general.commodity,
        creator:
          general.creator &&
          general.creator !== undefined &&
          general.creator !== null
            ? general.creator.contactID
            : '',
        dateCreate: general.dateCreate
          ? formatDateInput(general.dateCreate)
          : '',
        dateModify: general.dateModify,
        quotationDate: general.quotationDate,
        termofService: general.termofService,
        hsCode: general.hsCode,
        sentTo: general.sentTo,
        pickupAt: general.pickupAt,
        deliveryTo: general.deliveryTo,
        deadlineDelivery: general.deadlineDelivery,
        volume: general.volume,
        volumeUnit: general.volumeUnit,
        quantity: general.quantity,
        dimensions: general.dimensions,
        grossWeight: general.grossWeight,
        palletizedPackage: {
          index: '',
          quantity: '',
          dimension: '',
          grossWeight: '',
        },
        nonPalletPackageQuantity: general.nonPalletPackageQuantity,
        truckingVolumeGrossWeight: general.truckingVolumeGrossWeight[0],
        isExport: general.isExport,
        clearanceTerminal: general.clearanceTerminal,
        specialRequirements: general.specialRequirements,
        targetedRateAndCharges: general.targetedRateAndCharges,
        telexRelease: general.telexRelease,
        currency: general.currency,
        customsClearanceAtOrigin: general.customsClearanceAtOrigin,
        customsClearanceAtDestination: general.customsClearanceAtDestination,
        cargoIsUnstackable: general.cargoIsUnstackable,
        packageCanBeTilted: general.packageCanBeTilted,
        needExpressService: general.needExpressService,
        remarks: general.remarks,
        quotationType: general.quotationType,
        saveDraft: general.saveDraft,
        logInfo: general.logInfo,
        cargoReadyDateTo: general.cargoReadyDateTo
          ? formatDateInput(general.cargoReadyDateTo)
          : '',
        cargoReadyDateFrom: general.cargoReadyDateFrom
          ? formatDateInput(general.cargoReadyDateFrom)
          : '',
        purposeOfImport: general.purposeOfImport,
        purposeOfExport: general.purposeOfExport,
        doorToDoor: general.doorToDoor,
        doorToPort: general.doorToPort,
        portToDoor: general.portToDoor,
        portToPort: general.portToPort,
        forwardedTo: general.forwardedTo,
        signature: general.signature,
        termsAndConditions: general.termsAndConditions,
        grossWeightUnit: general.grossWeightUnit,
        commodityType: general.commodityType,
        notes: general.notes,
      });
    }
    console.log(this.editQuotation);

    this.quotationFrm.patchValue({
      volumeUnit: this.volumeTypes[0].typeName,
      grossWeightUnit: this.grossWeightUnits[0].typeName,
    });
    this.isLoading = false;
  }

  async getLookUp() {
    this.partners = await this.partnerService.getPartnersApi('CUSTOMERS');
    this.quotationService.getQuotationTypes().subscribe((results) => {
      console.log(results);
      this.quotationTypes = results;
    });
  }

  onGridQuotContReady(params) {
    this.contGridApi = params.api;
    this.contGridColumnApi = params.columnApi;
  }

  onGridQuotNonContReady(params) {
    this.nonContGridApi = params.api;
    this.nonContGridColumnApi = params.columnApi;
  }

  createForm(): void {
    this.quotationFrm = this.fb.group({
      quotationNo: [''],
      client: ['', Validators.required],
      commodity: ['', Validators.required],
      creator: [''],
      dateCreate: ['', Validators.required],
      dateModify: [''],
      quotationDate: [''],
      termofService: [''],
      hsCode: [''],
      sentTo: ['', Validators.required],
      pickupAt: [''],
      deliveryTo: [''],
      deadlineDelivery: [''],
      volume: [''],
      volumeUnit: [''],
      quantity: [''],
      dimensions: [''],
      grossWeight: [''],
      palletizedPackage: this.fb.group({
        index: [''],
        quantity: [''],
        dimension: [''],
        grossWeight: [''],
      }),
      nonPalletPackageQuantity: [''],
      truckingVolumeGrossWeight: this.fb.group({
        index: [''],
        maxLength: [''],
        maxWidth: [''],
        maxHeight: [''],
        maxWeightPerPackage: [''],
      }),
      isExport: [''],
      clearanceTerminal: [''],
      specialRequirements: [''],
      targetedRateAndCharges: [''],
      telexRelease: [''],
      currency: [''],
      customsClearanceAtOrigin: [''],
      customsClearanceAtDestination: [''],
      cargoIsUnstackable: [''],
      packageCanBeTilted: [''],
      needExpressService: [''],
      remarks: [''],
      quotationType: [''],
      saveDraft: [''],
      logInfo: [''],
      cargoReadyDateTo: [''],
      cargoReadyDateFrom: [''],
      purposeOfImport: [''],
      purposeOfExport: [''],
      doorToDoor: [''],
      doorToPort: [''],
      portToDoor: [''],
      portToPort: [''],
      forwardedTo: [''],
      signature: [''],
      termsAndConditions: [''],
      grossWeightUnit: [''],
      commodityType: ['', Validators.required],
      notes: [''],
      quotationDetails_CustomsClearance: this.fb.group({
        quotationNo: [''],
        terminal: [''],
        purposeOfImEx: [''],
        terminalImEx: [''],
        chargePer20: [''],
        chargePer40: [''],
        chargePerAirShpt: [''],
        chargePerLCLShpt: [''],
        currency: [''],
        isExport: [''],
        isOriginCharges: [''],
        linkOtherQuotation: [''],
        remarks: [''],
      }),
    });

    this.containerArr = this.fb.array([]);
    this.nonContainerArr = this.fb.array([]);
    this.quotDetailsOCArr = this.fb.array([]);
  }

  createTruckingContFormGroup() {
    return this.fb.group({
      quotationNo: [''],
      pickup: [''],
      delivery: [''],
      container20DC: [''],
      container40DC: [''],
      containerHQDC: [''],
      container45DC: [''],
      container20RF: [''],
      container40RF: [''],
      container20OT: [''],
      container40OT: [''],
      container20FR: [''],
      container40FR: [''],
      container20ISOFoodGrade: [''],
      container20ISOChemicals: [''],
      isOriginCharges: [''],
      currency: [''],
      notes: [''],
      linkOtherQuotation: [''],
      deliveryArea: [''],
      deliveryCity: [''],
      pickupArea: [''],
      pickupCity: [''],
    });
  }

  createTruckingNonContFormGroup() {
    return this.fb.group({
      quotationNo: [''],
      truck20: [''],
      truck40: [''],
      truck500kgs: [''],
      truckTonLevel1: [''],
      truckTonLevel2: [''],
      truckTonLevel3: [''],
      truckTonLevel4: [''],
      truckTonLevel5: [''],
      truckTonLevel6: [''],
      truckTonLevel7: [''],
      truckTonLevel8: [''],
      truckTonLevel9: [''],
      truckTonLevel10: [''],
      truckTonLevel11: [''],
      truckTonLevel12: [''],
      truckTonLevel13: [''],
      truckTonLevel14: [''],
      truckTonLevel15: [''],
      truckTonLevel16: [''],
      isOriginCharges: [''],
      currency: [''],
      notes: [''],
      linkOtherQuotation: [''],
      deliveryArea: [''],
      deliveryCity: [''],
      pickupArea: [''],
      pickupCity: [''],
      delivery: [''],
      pickup: [''],
    });
  }
  createOtherChargeFormGroup() {
    return this.fb.group({
      quotationNo: [''],
      fee: [''],
      displayedChargeName: [''],
      quantity: [''],
      unit: [''],
      currency: [''],
      notes: [''],
      tax: [''],
      unitPrice: [''],
    });
  }
  save() {
    // Init data for add new
    if (this.action !== 'EDIT') {
      this.setDataBeforesave();
    } else {
      this.setDataEditBeforesave();
    }

    // this.dataClone = this.customClearance;
    var validData = this.validData();

    let dialogResult = MessageBox.show(
      this.modal,
      'Do you want to save data ?',
      'Confirm',
      MessageBoxButtons.yesNoCancel,
      MessageBoxIcons.question
    );

    dialogResult.then(async (result) => {
      if (result === 'YES') {
        if (validData.isValid) {
          if (this.action === 'ADD_NEW_CUSTOM_CLEARANCE_QUOTATION') {
            console.log(this.dataClone);
            this.store.dispatch(
              new QuotationActions.StoreCustomClearanceQuotation(this.dataClone)
            );
          } else {
            // update quotation
            let quotationNo = this.editQuotation.quotationNo;
            let editedQuotation = this.dataClone.general;
            console.log(editedQuotation);
            if (editedQuotation && editedQuotation !== undefined) {
              this.store.dispatch(
                new QuotationActions.UpdateQuotation({
                  index: this.selectedIndex,
                  updatedQuotation: editedQuotation,
                })
              );
            }
            const paramsJson = {
              startRow: 0,
              endRow: 90,
              sortModel: [],
              filterModel: {
                quotationNo: {
                  filterType: 'text',
                  type: 'equals',
                  filter: quotationNo,
                },
              },
            };
            // Update, Insert, Delete quotationDetails_CustomsClearance
            this.quotationService
              .getQuotDetailsCustomsClearance(paramsJson)
              .subscribe((data) => {
                let quotationDetails_CustomsClearance =
                  data.results && data.results.length ? data.results[0] : '';
                let customClearance = this.dataClone
                  .quotationDetails_CustomsClearance;
                let editedCustomClearance = { ...customClearance };
                if (
                  !editedCustomClearance.hasOwnProperty('_id') &&
                  !editedCustomClearance._id
                ) {
                  editedCustomClearance._id =
                    quotationDetails_CustomsClearance._id;
                }
                if (editedCustomClearance && editedCustomClearance !== null) {
                  this.store.dispatch(
                    new QuotationActions.UpdateCustomClearance(
                      editedCustomClearance
                    )
                  );
                }
              });
            // Update, Insert, Delete quotationDetails_TruckingNonContainers
            let newTruckNonConts = this.dataClone
              .quotationDetails_TruckingNonContainers;
            if (newTruckNonConts && newTruckNonConts.length) {
              this.quotationService
                .getQuotDetailsTruckNonCont(paramsJson)
                .subscribe((data) => {
                  let oldTruckNonConts = data.results;
                  if (oldTruckNonConts && oldTruckNonConts.length) {
                    let deleteTruckNonConts = filterDiffArray(
                      oldTruckNonConts,
                      newTruckNonConts
                    );
                    if (deleteTruckNonConts && deleteTruckNonConts.length) {
                      deleteTruckNonConts.forEach((truck) => {
                        this.store.dispatch(
                          new QuotationActions.DeleteTruckingNonContainer(
                            truck._id
                          )
                        );
                      });
                    }
                  }
                });
              if (newTruckNonConts && newTruckNonConts.length) {
                newTruckNonConts.forEach((truck) => {
                  if (
                    truck.hasOwnProperty('_id') &&
                    truck._id !== '' &&
                    truck._id
                  ) {
                    this.store.dispatch(
                      new QuotationActions.UpdateTruckingNonContainer(truck)
                    );
                  } else {
                    // Insert
                    if (truck.hasOwnProperty('_id')) { delete truck._id; }
                    if (truck.quotationNo === '') {
                      truck.quotationNo = this.editQuotation.quotationNo;
                    }
                    console.log('ad new trucking non container');
                    console.log(truck);
                    this.store.dispatch(
                      new QuotationActions.StoreTruckingNonContainer(truck)
                    );
                  }
                });
              }
            }
            // Update, Insert, Delete quotationDetails_TruckingContainers
            let newTruckConts = this.dataClone
              .quotationDetails_TruckingContainers;
            if (newTruckConts && newTruckConts.length) {
              this.quotationService
                .getQuotationTruckingContainer(paramsJson)
                .subscribe((data) => {
                  let oldTruckConts = data.results;
                  if (oldTruckConts && oldTruckConts.length) {
                    let deleteTruckConts = filterDiffArray(
                      oldTruckConts,
                      newTruckConts
                    );
                    if (deleteTruckConts && deleteTruckConts.length) {
                      deleteTruckConts.forEach((truck) => {
                        this.store.dispatch(
                          new QuotationActions.DeleteTruckingContainer(
                            truck._id
                          )
                        );
                      });
                    }
                  }
                });
              if (newTruckConts && newTruckConts.length) {
                newTruckConts.forEach((truck) => {
                  if (
                    truck.hasOwnProperty('_id') &&
                    truck._id !== '' &&
                    truck._id
                  ) {
                    // Update
                    this.store.dispatch(
                      new QuotationActions.UpdateTruckingContainer(truck)
                    );
                  } else {
                    // Insert
                    console.log(truck);
                    if (truck.hasOwnProperty('_id')) delete truck._id;
                    if (truck.quotationNo === '')
                      truck.quotationNo = this.editQuotation.quotationNo;
                    this.store.dispatch(
                      new QuotationActions.StoreTruckingContainer(truck)
                    );
                  }
                });
              }
            }
            // ================    Update, Insert, Delete OtherCharge ============
            let newOtherCharges = this.dataClone.quotationDetails_OtherCharges;
            console.log('new other charge');
            console.log(newOtherCharges);
            let deleteOtherCharges = null;
            if (newOtherCharges && newOtherCharges.length) {
              this.quotationService
                .getQuotationDetailsOtherCharges(paramsJson)
                .subscribe((data) => {
                  let oldOtherCharges = data.results;
                  console.log('old other charge');
                  console.log(oldOtherCharges);
                  if (oldOtherCharges && oldOtherCharges.length) {
                    deleteOtherCharges = filterDiffArray(
                      oldOtherCharges,
                      newOtherCharges
                    );
                    if (deleteOtherCharges && deleteOtherCharges.length) {
                      deleteOtherCharges.forEach((otherCharge) => {
                        this.store.dispatch(
                          new QuotationActions.DeleteOtherChargeDetail(
                            otherCharge._id
                          )
                        );
                      });
                    }
                  }
                  if (newOtherCharges && newOtherCharges.length) {
                    newOtherCharges.forEach((newCharge) => {
                      if (
                        newCharge.hasOwnProperty('_id') &&
                        newCharge._id !== '' &&
                        newCharge._id
                      ) {
                        // Update
                        this.store.dispatch(
                          new QuotationActions.UpdateOtherChargeDetail(
                            newCharge
                          )
                        );
                      } else {
                        // Insert
                        if (newCharge.hasOwnProperty('_id'))
                          delete newCharge._id;
                        if (newCharge.quotationNo === '')
                          newCharge.quotationNo = this.editQuotation.quotationNo;
                        this.store.dispatch(
                          new QuotationActions.StoreOtherChargeDetail(newCharge)
                        );
                      }
                    });
                  }
                });
            }
          }

          this.activeModal.close(this.dataClone);
        } else {
          let dialogResult = MessageBox.show(
            this.modal,
            validData.message,
            'Alert',
            MessageBoxButtons.ok,
            MessageBoxIcons.warning
          );
          dialogResult.then((result) => {});
        }
      } else if (result === 'NO') {
        this.activeModal.close(this.customClearance);
      } else if (result === 'CANCEL') {
      }
    });
  }

  addNewCont() {
    console.log('add new cont');
    if (!this.testNull) {
      if (this.action === 'EDIT_CUSTOMS_CLEARANCE') {
        let newRows = { rowStatus: 'ADD' };
        this.rowDataCont.splice(0, 0, newRows);
        this.contGridApi.updateRowData({ add: [newRows], addIndex: 0 });
        this.contGridApi.startEditingCell({
          rowIndex: 0,
          colKey: 'pickupCity',
        });
      } else {
        let newRows = { rowStatus: 'ADD' };
        this.rowDataCont.splice(0, 0, newRows);
        this.contGridApi.updateRowData({ add: [newRows], addIndex: 0 });
        this.contGridApi.startEditingCell({
          rowIndex: 0,
          colKey: 'pickupCity',
        });
      }
    }
    this.testNull = true;
  }

  addNewNonCont() {
    console.log('add new non cont');
    if (!this.testNullNonCont) {
      if (this.action === 'EDIT_CUSTOMS_CLEARANCE') {
        let newRows = { rowStatus: 'ADD' };
        this.rowDataNonCont.splice(0, 0, newRows);
        this.nonContGridApi.updateRowData({ add: [newRows], addIndex: 0 });
        this.nonContGridApi.startEditingCell({
          rowIndex: 0,
          colKey: 'pickupCity',
        });
      } else {
        let newRows = { rowStatus: 'ADD' };
        this.rowDataNonCont.splice(0, 0, newRows);
        this.nonContGridApi.updateRowData({ add: [newRows], addIndex: 0 });
        this.nonContGridApi.startEditingCell({
          rowIndex: 0,
          colKey: 'pickupCity',
        });
      }
    }
    this.testNullNonCont = true;
  }

  contRowEditingStopped(e) {
    console.log(e);
    if (!e.data?.pickupCity) {
      const dialogResult = MessageBox.show(
        this.modal,
        'Null Error !',
        'Alert ! ',
        MessageBoxButtons.ok,
        MessageBoxIcons.warning
      );
      dialogResult.then((result) => {});

      {
        this.contGridApi.startEditingCell({
          rowIndex: e.rowIndex,
          colKey: 'pickupCity',
        });
        this.testNull = true;
      }
    } else {
      e.data.rowStatus = '';
      this.testNull = false;
    }
  }
  nonContRowEditingStopped(e) {
    console.log(e);
    if (!e.data?.pickupCity) {
      const dialogResult = MessageBox.show(
        this.modal,
        'Null Error !',
        'Alert ! ',
        MessageBoxButtons.ok,
        MessageBoxIcons.warning
      );
      dialogResult.then((result) => {});

      {
        this.nonContGridApi.startEditingCell({
          rowIndex: e.rowIndex,
          colKey: 'pickupCity',
        });
        this.testNullNonCont = true;
      }
    } else {
      e.data.rowStatus = '';
      this.testNullNonCont = false;
    }
  }
  editTable(e) {
    console.log('start edit...');
    console.log(e);
    this.contGridApi.startEditingCell({
      rowIndex: e.params.rowIndex,
      colKey: 'pickupCity',
    });
  }
  editTableNonCont(e) {
    console.log('start edit...');
    console.log(e);
    this.nonContGridApi.startEditingCell({
      rowIndex: e.params.rowIndex,
      colKey: 'pickupCity',
    });
  }

  addAction(e) {
    console.log('addAction');
    console.log(e);
    e.params.data.rowStatus = '';
    this.testNull = false;
    this.contGridApi.stopEditing();
  }
  addActionNonCont(e) {
    console.log('addAction');
    console.log(e);
    e.params.data.rowStatus = '';
    this.testNullNonCont = false;
    this.nonContGridApi.stopEditing();
  }

  getContRowData() {
    let rowData = [];
    if (this.contGridApi !== undefined) {
      this.contGridApi.forEachNode((node) => {
        rowData.push(node.data);
      });
    }
    console.log('Row Cont Data:');
    console.log(rowData);
    return rowData ? rowData : [];
  }
  getNonContRowData() {
    let rowData = [];
    if (this.nonContGridApi !== undefined) {
      this.nonContGridApi.forEachNode((node) => {
        rowData.push(node.data);
      });
    }
    console.log('Row Non Cont Data:');
    console.log(rowData);
    return rowData ? rowData : [];
  }

  getOtherChargeRowData() {
    this.shareDataService.currentMessage.subscribe(
      (message) => (this.otherChargeData = message)
    );
    return this.otherChargeData;
  }

  cancelAction(e) {
    console.log(e);
    this.contGridApi.updateRowData({ remove: [e.params.data] });
    this.testNull = false;
  }

  cancelActionNonCont(e) {
    console.log(e);
    this.nonContGridApi.updateRowData({ remove: [e.params.data] });
    this.testNullNonCont = false;
  }

  close() {
    this.activeModal.dismiss(this.customClearance);
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  protected setDataBeforesave(): void {
    // Cont data
    const contRowDatas = this.getContRowData();
    contRowDatas.forEach((item) => {
      const frm = this.createTruckingContFormGroup();
      frm.patchValue({
        quotationNo: '',
        pickup: item.pickupAddress,
        delivery: item.deliveryAddress,
        container20DC: item.container20DC,
        container40DC: item.container40DC,
        containerHQDC: item.containerHQDC,
        container45DC: item.container45DC,
        container20RF: item.container20RF,
        container40RF: item.container40RF,
        container20OT: item.container20OT,
        container40OT: item.container40OT,
        container20FR: item.container20FR,
        container40FR: item.container40FR,
        container20ISOFoodGrade: item.container20ISOFoodGrade,
        container20ISOChemicals: item.container20ISOChemicals,
        isOriginCharges: '',
        currency: item.currency,
        notes: item.notes,
        linkOtherQuotation: '',
        deliveryArea: item.deliveryArea,
        deliveryCity: item.deliveryCity,
        pickupArea: item.pickupArea,
        pickupCity: item.pickupCity,
      });
      this.containerArr.push(frm);
    });
    console.log(this.containerArr);
    // Non Cont data
    const nonContRowDatas = this.getNonContRowData();
    nonContRowDatas.forEach((item) => {
      const frm = this.createTruckingContFormGroup();
      frm.patchValue({
        quotationNo: '',
        truck20: item.truck20,
        truck40: item.truck40,
        truck500kgs: item.truck500kgs,
        truckTonLevel1: item.truckTonLevel1,
        truckTonLevel2: item.truckTonLevel2,
        truckTonLevel3: item.truckTonLevel3,
        truckTonLevel4: item.truckTonLevel4,
        truckTonLevel5: item.truckTonLevel5,
        truckTonLevel6: item.truckTonLevel6,
        truckTonLevel7: item.truckTonLevel7,
        truckTonLevel8: item.truckTonLevel8,
        truckTonLevel9: item.truckTonLevel9,
        truckTonLevel10: item.truckTonLevel10,
        truckTonLevel11: item.truckTonLevel11,
        truckTonLevel12: item.truckTonLevel12,
        truckTonLevel13: item.truckTonLevel13,
        truckTonLevel14: item.truckTonLevel14,
        truckTonLevel15: item.truckTonLevel15,
        truckTonLevel16: item.truckTonLevel16,
        isOriginCharges: '',
        currency: item.currency,
        notes: item.notes,
        linkOtherQuotation: '',
        deliveryArea: item.deliveryArea,
        deliveryCity: item.deliveryCity,
        pickupArea: item.pickupArea,
        pickupCity: item.pickupCity,
        delivery: item.deliveryAdress,
        pickup: item.pickupAddress,
      });
      this.nonContainerArr.push(frm);
    });
    console.log(this.nonContainerArr);
    // Other charges
    const otherChargeDatas = this.getOtherChargeRowData();
    otherChargeDatas.forEach((item) => {
      const frm = this.createOtherChargeFormGroup();
      frm.patchValue({
        _id: item._id ? item._id : '',
        quotationNo: item.quotationNo ? item.quotationNo : '',
        fee: item.fee,
        displayedChargeName: item.displayedChargeName,
        quantity: item.quantity,
        unit: item.unit,
        currency: item.currency,
        notes: item.notes,
        tax: item.tax,
        unitPrice: item.unitPrice,
      });
      this.quotDetailsOCArr.push(frm);
    });
    console.log(this.quotDetailsOCArr);
    // CC
    const quotDetailCC = this.quotationFrm.get(
      'quotationDetails_CustomsClearance'
    ).value;
    let ccCopy = Object.assign({}, quotDetailCC);
    if (quotDetailCC.isExport === 'CUSTOM_CLEARANCE_IMPORT') {
      ccCopy.isExport = false;
    }
    if (quotDetailCC.isExport === 'CUSTOM_CLEARANCE_EXPORT') {
      ccCopy.isExport = true;
    }
    this.dataClone = {
      general: {
        quotationNo: '',
        client: this.quotationFrm.get('client').value,
        creator: 'CT0276', // TODO: Hard Code
        dateCreate: formatDate(new Date(), 'dd/MM/yyyy', 'en-US'),
        dateModify: formatDate(new Date(), 'dd/MM/yyyy', 'en-US'),
        quotationDate: this.quotationFrm.get('quotationDate').value,
        termofService: this.quotationFrm.get('termofService').value,
        commodity: this.quotationFrm.get('commodity').value,
        hsCode: this.quotationFrm.get('hsCode').value,
        sentTo: this.quotationFrm.get('sentTo').value,
        pickupAt: this.quotationFrm.get('pickupAt').value,
        deliveryTo: this.quotationFrm.get('deliveryTo').value,
        deadlineDelivery: this.quotationFrm.get('deadlineDelivery').value,
        volume: this.quotationFrm.get('volume').value,
        volumeUnit: this.quotationFrm.get('volumeUnit').value,
        quantity: this.quotationFrm.get('quantity').value,
        dimensions: this.quotationFrm.get('dimensions').value,
        grossWeight: this.quotationFrm.get('grossWeight').value,
        nonPalletPackageQuantity: this.quotationFrm.get(
          'nonPalletPackageQuantity'
        ).value,
        truckingVolumeGrossWeight: [
          this.quotationFrm.get('truckingVolumeGrossWeight').value,
        ],
        isExport: this.quotationFrm.get('isExport').value,
        clearanceTerminal: this.quotationFrm.get('clearanceTerminal').value,
        specialRequirements: this.quotationFrm.get('specialRequirements').value,
        targetedRateAndCharges: this.quotationFrm.get('targetedRateAndCharges')
          .value,
        telexRelease: this.quotationFrm.get('telexRelease').value,
        currency: this.quotationFrm.get('currency').value,
        customsClearanceAtOrigin: this.quotationFrm.get(
          'customsClearanceAtOrigin'
        ).value,
        customsClearanceAtDestination: this.quotationFrm.get(
          'customsClearanceAtDestination'
        ).value,
        cargoIsUnstackable: this.quotationFrm.get('cargoIsUnstackable').value,
        packageCanBeTilted: this.quotationFrm.get('packageCanBeTilted').value,
        needExpressService: this.quotationFrm.get('needExpressService').value,
        remarks: this.quotationFrm.get('remarks').value,
        quotationType: this.quotationFrm.get('quotationType').value,
        saveDraft: this.quotationFrm.get('saveDraft').value,
        logInfo: this.quotationFrm.get('logInfo').value,
        cargoReadyDateTo: this.quotationFrm.get('cargoReadyDateTo').value
          ? formatDate(
              this.quotationFrm.get('cargoReadyDateTo').value,
              'dd/MM/yyyy',
              'en-US'
            )
          : null,
        cargoReadyDateFrom: this.quotationFrm.get('cargoReadyDateFrom').value
          ? formatDate(
              this.quotationFrm.get('cargoReadyDateFrom').value,
              'dd/MM/yyyy',
              'en-US'
            )
          : null,
        palletizedPackage: null,
        purposeOfImport: this.quotationFrm.get('purposeOfImport').value,
        purposeOfExport: this.quotationFrm.get('purposeOfExport').value,
        doorToDoor: this.quotationFrm.get('doorToDoor').value,
        doorToPort: this.quotationFrm.get('doorToPort').value,
        portToDoor: this.quotationFrm.get('portToDoor').value,
        portToPort: this.quotationFrm.get('portToPort').value,
        forwardedTo: this.quotationFrm.get('forwardedTo').value,
        signature: this.quotationFrm.get('signature').value,
        termsAndConditions: this.quotationFrm.get('termsAndConditions').value,
        grossWeightUnit: this.quotationFrm.get('grossWeightUnit').value,
        commodityType: this.quotationFrm.get('commodityType').value,
      },
      quotationDetails_TruckingNonContainers: [...this.nonContainerArr.value],
      quotationDetails_TruckingContainers: [...this.containerArr.value],
      quotationDetails_CustomsClearance: isObjHasAtLeastValue(ccCopy)
        ? { ...ccCopy }
        : {},
      quotationDetails_OtherCharges: [...this.quotDetailsOCArr.value],
    };
    console.log(this.dataClone);
  }

  protected setDataEditBeforesave(): void {
    // Cont data
    const contRowDatas = this.getContRowData();
    contRowDatas.forEach((item) => {
      const frm = this.createTruckingContFormGroup();
      frm.patchValue({
        _id: !item.hasOwnProperty('_id') && item._id ? item._id : '',
        quotationNo: item.quotationNo ? item.quotationNo : '',
        pickup: item.pickupAddress,
        delivery: item.deliveryAddress,
        container20DC: item.container20DC,
        container40DC: item.container40DC,
        containerHQDC: item.containerHQDC,
        container45DC: item.container45DC,
        container20RF: item.container20RF,
        container40RF: item.container40RF,
        container20OT: item.container20OT,
        container40OT: item.container40OT,
        container20FR: item.container20FR,
        container40FR: item.container40FR,
        container20ISOFoodGrade: item.container20ISOFoodGrade,
        container20ISOChemicals: item.container20ISOChemicals,
        isOriginCharges: '',
        currency: item.currency,
        notes: item.notes,
        linkOtherQuotation: '',
        deliveryArea: item.deliveryArea,
        deliveryCity: item.deliveryCity,
        pickupArea: item.pickupArea,
        pickupCity: item.pickupCity,
      });
      this.containerArr.push(frm);
    });
    console.log(this.containerArr);
    // Non Cont data
    const nonContRowDatas = this.getNonContRowData();
    nonContRowDatas.forEach((item) => {
      const frm = this.createTruckingNonContFormGroup();
      frm.patchValue({
        _id:
          item !== undefined && item !== null && item.hasOwnProperty('_id')
            ? item._id
            : '',
        quotationNo:
          item !== undefined &&
          item !== null &&
          item.hasOwnProperty('quotationNo')
            ? item.quotationNo
            : '',
        truck20: item.truck20,
        truck40: item.truck40,
        truck500kgs: item.truck500kgs,
        truckTonLevel1: item.truckTonLevel1,
        truckTonLevel2: item.truckTonLevel2,
        truckTonLevel3: item.truckTonLevel3,
        truckTonLevel4: item.truckTonLevel4,
        truckTonLevel5: item.truckTonLevel5,
        truckTonLevel6: item.truckTonLevel6,
        truckTonLevel7: item.truckTonLevel7,
        truckTonLevel8: item.truckTonLevel8,
        truckTonLevel9: item.truckTonLevel9,
        truckTonLevel10: item.truckTonLevel10,
        truckTonLevel11: item.truckTonLevel11,
        truckTonLevel12: item.truckTonLevel12,
        truckTonLevel13: item.truckTonLevel13,
        truckTonLevel14: item.truckTonLevel14,
        truckTonLevel15: item.truckTonLevel15,
        truckTonLevel16: item.truckTonLevel16,
        isOriginCharges: '',
        currency: item.currency,
        notes: item.notes,
        linkOtherQuotation: '',
        deliveryArea: item.deliveryArea,
        deliveryCity: item.deliveryCity,
        pickupArea: item.pickupArea,
        pickupCity: item.pickupCity,
        delivery: item.deliveryAdress,
        pickup: item.pickupAddress,
      });
      this.nonContainerArr.push(frm);
    });
    console.log(this.nonContainerArr);
    // Other charges
    const otherChargeDatas = this.getOtherChargeRowData();
    otherChargeDatas.forEach((item) => {
      const frm = this.createOtherChargeFormGroup();
      frm.patchValue({
        _id:
          item !== null && item !== undefined && item.hasOwnProperty('_id')
            ? item._id
            : '',
        quotationNo:
          item !== null &&
          item !== undefined &&
          item.hasOwnProperty('quotationNo')
            ? item.quotationNo
            : '',
        fee: item.fee,
        displayedChargeName: item.displayedChargeName,
        quantity: item.quantity,
        unit: item.unit,
        currency: item.currency,
        notes: item.notes,
        tax: item.tax,
        unitPrice: item.unitPrice,
      });
      this.quotDetailsOCArr.push(frm);
    });
    console.log(this.quotDetailsOCArr);
    // CC
    const quotDetailCC = this.quotationFrm.get(
      'quotationDetails_CustomsClearance'
    ).value;
    let ccCopy = Object.assign({}, quotDetailCC);
    if (quotDetailCC.isExport === 'CUSTOM_CLEARANCE_IMPORT') {
      ccCopy.isExport = false;
    }
    if (quotDetailCC.isExport === 'CUSTOM_CLEARANCE_EXPORT') {
      ccCopy.isExport = true;
    }
    this.dataClone = {
      general: {
        _id: this.editQuotation._id,
        quotationNo: this.editQuotation.quotationNo,
        client: this.quotationFrm.get('client').value,
        creator: 'CT0276', // TODO: Hard Code
        dateCreate: formatDate(new Date(), 'dd/MM/yyyy', 'en-US'),
        dateModify: formatDate(new Date(), 'dd/MM/yyyy', 'en-US'),
        quotationDate: this.quotationFrm.get('quotationDate').value,
        termofService: this.quotationFrm.get('termofService').value,
        commodity: this.quotationFrm.get('commodity').value,
        hsCode: this.quotationFrm.get('hsCode').value,
        sentTo: this.quotationFrm.get('sentTo').value,
        pickupAt: this.quotationFrm.get('pickupAt').value,
        deliveryTo: this.quotationFrm.get('deliveryTo').value,
        deadlineDelivery: this.quotationFrm.get('deadlineDelivery').value,
        volume: this.quotationFrm.get('volume').value,
        volumeUnit: this.quotationFrm.get('volumeUnit').value,
        quantity: this.quotationFrm.get('quantity').value,
        dimensions: this.quotationFrm.get('dimensions').value,
        grossWeight: this.quotationFrm.get('grossWeight').value,
        nonPalletPackageQuantity: this.quotationFrm.get(
          'nonPalletPackageQuantity'
        ).value,
        truckingVolumeGrossWeight: [
          this.quotationFrm.get('truckingVolumeGrossWeight').value,
        ],
        isExport: this.quotationFrm.get('isExport').value,
        clearanceTerminal: this.quotationFrm.get('clearanceTerminal').value,
        specialRequirements: this.quotationFrm.get('specialRequirements').value,
        targetedRateAndCharges: this.quotationFrm.get('targetedRateAndCharges')
          .value,
        telexRelease: this.quotationFrm.get('telexRelease').value,
        currency: this.quotationFrm.get('currency').value,
        customsClearanceAtOrigin: this.quotationFrm.get(
          'customsClearanceAtOrigin'
        ).value,
        customsClearanceAtDestination: this.quotationFrm.get(
          'customsClearanceAtDestination'
        ).value,
        cargoIsUnstackable: this.quotationFrm.get('cargoIsUnstackable').value,
        packageCanBeTilted: this.quotationFrm.get('packageCanBeTilted').value,
        needExpressService: this.quotationFrm.get('needExpressService').value,
        remarks: this.quotationFrm.get('remarks').value,
        quotationType: this.quotationFrm.get('quotationType').value,
        saveDraft: this.quotationFrm.get('saveDraft').value,
        logInfo: this.quotationFrm.get('logInfo').value,
        cargoReadyDateTo: this.quotationFrm.get('cargoReadyDateTo').value
          ? formatDate(
              this.quotationFrm.get('cargoReadyDateTo').value,
              'dd/MM/yyyy',
              'en-US'
            )
          : null,
        cargoReadyDateFrom: this.quotationFrm.get('cargoReadyDateFrom').value
          ? formatDate(
              this.quotationFrm.get('cargoReadyDateFrom').value,
              'dd/MM/yyyy',
              'en-US'
            )
          : null,
        palletizedPackage: null,
        purposeOfImport: this.quotationFrm.get('purposeOfImport').value,
        purposeOfExport: this.quotationFrm.get('purposeOfExport').value,
        doorToDoor: this.quotationFrm.get('doorToDoor').value,
        doorToPort: this.quotationFrm.get('doorToPort').value,
        portToDoor: this.quotationFrm.get('portToDoor').value,
        portToPort: this.quotationFrm.get('portToPort').value,
        forwardedTo: this.quotationFrm.get('forwardedTo').value,
        signature: this.quotationFrm.get('signature').value,
        termsAndConditions: this.quotationFrm.get('termsAndConditions').value,
        grossWeightUnit: this.quotationFrm.get('grossWeightUnit').value,
        commodityType: this.quotationFrm.get('commodityType').value,
      },
      quotationDetails_TruckingNonContainers: [...this.nonContainerArr.value],
      quotationDetails_TruckingContainers: [...this.containerArr.value],
      quotationDetails_CustomsClearance: isObjHasAtLeastValue(ccCopy)
        ? { ...ccCopy }
        : {},
      quotationDetails_OtherCharges: [...this.quotDetailsOCArr.value],
    };
    console.log(this.dataClone);
  }

  protected validData() {
    return { isValid: true, message: 'Ok' };
  }

  cancel() {
    this.activeModal.close(this.customClearance);
  }
}
