import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { formatDateInput, isObjHasAtLeastValue, getNumericCellEditor, formatNumCommas } from 'src/app/main/common/util';
import { MessageBox, MessageBoxButtons, MessageBoxIcons } from 'src/app/form/message/messsage';
import { PartnerService } from 'src/app/main/model/partner/partner.service';
import { PortService } from 'src/app/main/model/port/port.service';
import { CurrencyService } from 'src/app/main/model/currency/currency.service';
import { formatDate } from '@angular/common';
import * as fromMain from 'src/app/main/store/main.reducer';
import * as LocalChargeActions from '../../store/local-charge/local-charge.actions';
import { AreaService } from 'src/app/main/model/area/area.service';
import { AgGridAngular } from 'ag-grid-angular';
import { CustomHeader } from 'src/app/main/common/ag-grid-header-custom';
import { ButtonRendererComponent } from 'src/app/main/common/button-renderer.component';
import { ButtonRenderer2Component } from 'src/app/main/common/button-renderer2.component';
import { GridHeaderActions2Component } from 'src/app/main/common/button-header-ag';
import { LocalChargeDetail } from 'src/app/main/model/rate-charges/local-charges/local-charge-detail.model';

@Component({
  selector: 'app-local-charge-add',
  templateUrl: './local-charge-add.component.html',
  styleUrls: ['./local-charge-add.component.css']
})

export class LocalChargeAddComponent implements OnInit {
  @ViewChild('addLocalChargeDetailGrid') addLocalChargeDetailGrid: AgGridAngular;
  @Input() data: any; // for of-input-lookup
  @Input() action: any;
  @Input() isEdit: boolean;
  @Input() selectedIndex: number;
  @Input() editLocalChargeData: any;

  isLoading = true;
  dataClone;
  seaDataClone;

  dateTimeLimit: string = formatDate(new Date('2050'), 'dd/MM/yyy', 'en-US');

  clients: any;
  vendors: any;
  ports: any;
  currencys: any;
  customsClearance: any;

  dateCreate = formatDate(new Date(), 'yyyy-MM-dd', 'en-US');
  dateModify = formatDate(new Date(), 'yyyy-MM-dd', 'en-US');
  today = formatDate(new Date(), 'dd/MM/yyy', 'en-US');

  localChargeForm: FormGroup;
  areas: any;
  cities: any;
  private cloneLocalCharge: any;

  public localChargeDetailColumnDefs = [
    {
      headerName: 'Charge name',
      field: 'fee',
      width: 250,
      sortable: false,
      filter: false,
      cellEditor: "Editor",
      cellEditorParams: {
        class: 'fee',
      },
      cellRenderer: (data) => {
        if (data.value) {
          return data.value.feeNameLocal;
        }
      },
    },
    {
      headerName: 'Amount',
      field: 'amount',
      width: 120,
      sortable: false,
      filter: false,
      cellStyle: { 'text-align': "right" },
      cellRenderer: (data) => {
        if (data.value) {
          return formatNumCommas(data.value);
        }
      },
    },
    {
      headerName: 'Currency',
      field: 'currency',
      width: 120,
      sortable: false,
      filter: false,
      cellEditor: "Editor",
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
      headerName: 'Charge per',
      field: 'chargePer',
      width: 100,
      sortable: false,
      filter: false,
      cellStyle: { 'text-align': "right" },
      // cellRenderer: (data) => {
      //   if (data.value) {
      //     return formatNumCommas(data.value);
      //   }
      // },
    },
    {
      headerName: 'Min Charge',
      field: 'minCharge',
      width: 100,
      sortable: false,
      filter: false,
      editable: true,
      cellStyle: { 'text-align': "right" },
      cellRenderer: (data) => {
        if (data.value) {
          return formatNumCommas(data.value);
        }
      },
    },
    {
      headerName: 'Notes',
      field: 'notes',
      width: 350,
      sortable: false,
      filter: false
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
        onClick: this.addNewDetail.bind(this),
      },
      cellRendererParams: {
        onClick: this.editTable.bind(this),
        onClick1: this.cancelAction.bind(this),
        onClick3: this.addAction.bind(this),
        onClick4: this.cancelAction.bind(this),
      },
    }
  ];

  testNull = false;

  public gridApi: any;
  public gridColumnApi: any;

  public defaultColDef: any;
  public components: any;
  public editType: any;
  public frameworkComponents: any;
  public rowData: LocalChargeDetail[] = [];

  constructor(
    private store: Store<fromMain.MainState>,
    private activeModal: NgbActiveModal,
    private modal: NgbModal,
    private fb: FormBuilder,
    private partnerService: PartnerService,
    private portService: PortService,
    private currencyService: CurrencyService,
    private areaService: AreaService
  ) {

    this.defaultColDef = {
      width: 120,
      headerComponentParams: { menuIcon: 'fas fa-filter' },
      sortable: true,
      resizable: true,
      filter: true,
      editable: true
    };
    this.frameworkComponents = {
      agColumnHeader: CustomHeader,
      buttonRenderer: ButtonRendererComponent,
      Editor: ButtonRenderer2Component,
    };

    this.components = { numericCellEditor: getNumericCellEditor() };

    this.editType = 'fullRow';

    this.isLoading = false;

  }

  ngOnInit() {
    this.areas = this.areaService.getAreasApi();
    this.getLookup();
    this.createForm();

    if (this.isEdit) {
      this.initialEdit();
    }

    this.localChargeForm.get('portofLoading').valueChanges.subscribe(e => {
      this.localChargeForm.get('polCountry').setValue(e.country);
    });
    this.localChargeForm.get('portofDischarge').valueChanges.subscribe(e => {
      this.localChargeForm.get('podCountry').setValue(e.country);
    });
    this.localChargeForm.get('transitPort').valueChanges.subscribe(e => {
      this.localChargeForm.get('transitCountry').setValue(e.country);
    });
  }

  createForm(): void {
    this.localChargeForm = this.fb.group({
      _id: [''],
      pricingID: [''],
      localChargeName: ['', Validators.required],
      creator: [''],
      dateCreate: [''],
      dateModify: [''],
      portofLoading: ['', Validators.required],
      portofDischarge: ['', Validators.required],
      transitPort: ['', Validators.required],
      notes: [''],
      service: [''],
      validDateFrom: ['', Validators.required],
      validDateTo: ['', Validators.required],
      updatedBy: [''],
      podCountry: [''],
      polCountry: [''],
      transitCountry: [''],
      rateAndChargesLocalChargeDetails: []
    });
  }

  async getLookup() {
    this.clients = await this.partnerService.getPartnersApi('COLOADERS');
    this.vendors = await this.partnerService.getPartnersApi('OTHER CONTACTS');
    this.currencys = await this.currencyService.getCurrenciesApi();
    this.ports = await this.portService.getPortsApi().subscribe(
      (ports) => {
        this.ports = ports;
      }
    );
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
  }

  addNewDetail() {
    console.log(this.action);
    if (!this.testNull) {
      if (this.action === 'EDIT_LOCAL_CHARGE') {
        let newRows = { rowStatus: 'ADD' };
        this.rowData.splice(0, 0, newRows);
        this.gridApi.updateRowData({ add: [newRows], addIndex: 0 });
        this.gridApi.startEditingCell({ rowIndex: 0, colKey: 'fee' });
      } else {
        let newRows = { rowStatus: 'ADD' };
        this.rowData.splice(0, 0, newRows);
        this.gridApi.updateRowData({ add: [newRows], addIndex: 0 });
        this.gridApi.startEditingCell({ rowIndex: 0, colKey: 'fee' });
      }
    }
    this.testNull = true;
  }

  editChargeDetail() {
    console.log('edit');
  }

  deleteChargeDetail() {
    console.log('delete...');
  }

  save() {
    const validData = this.validationForm();
    this.setDataBeforeSave();
    const dialogResult = MessageBox.show(
      this.modal, 'Do you want to save data ?',
      'Confirm', MessageBoxButtons.yesNoCancel, MessageBoxIcons.question
    );
    dialogResult.then(async (result) => {
      if (result === 'YES') {
        if (validData.isValid) {
          if (this.action === 'ADD_NEW_LOCAL_CHARGE') {
            this.store.dispatch(new LocalChargeActions.StoreLocalCharge(this.cloneLocalCharge));
            const dialogInfo = MessageBox.show(
              this.modal,
              'Successfully saved!',
              'Notification',
              MessageBoxButtons.ok,
              MessageBoxIcons.information
            );
            dialogInfo.then((result: any) => {
              this.activeModal.close(this.cloneLocalCharge);
            });
          } else {
            // Edit
            this.store.dispatch(new LocalChargeActions.UpdateLocalCharge({
              index: this.selectedIndex,
              newLocalCharge: this.cloneLocalCharge
            }));
            const dialogInfo = MessageBox.show(
              this.modal,
              'Edit has complete!',
              'Ok',
              MessageBoxButtons.ok,
              MessageBoxIcons.information
            );
            dialogInfo.then((result) => {
              this.activeModal.close(this.cloneLocalCharge);
            });
          }

          this.activeModal.close(this.seaDataClone);
        } else {
          const dialogAlert = MessageBox.show(this.modal, validData.message, 'Alert', MessageBoxButtons.ok, MessageBoxIcons.warning);
          dialogAlert.then((result) => { });
        }
      } else if (result === 'NO') {
        this.activeModal.close(this.cloneLocalCharge);
      } else if (result === 'CANCEL') { }
    });
  }

  close() {
    this.activeModal.dismiss(this.cloneLocalCharge);
  }
  cancel() {
    this.activeModal.dismiss(this.cloneLocalCharge);
  }

  protected validationForm(): { isValid: boolean, message: string } {
    const localChargeFormvalidate = this.localChargeForm;

    // tslint:disable-next-line: forin
    for (const field in localChargeFormvalidate.controls) {
      // tslint:disable-next-line: prefer-const
      let con = localChargeFormvalidate.get(field);
      if (con.status === 'INVALID') {
        switch (field) {
          case 'localChargeName':
            return { isValid: false, message: '"Charge name" is required.' };
          case 'validDateFrom':
            return { isValid: false, message: '"Valid Date From" is required.' };
          case 'validDateTo':
            return { isValid: false, message: '"Valid Date To" is required.' };
          case 'portofLoading':
            return { isValid: false, message: '"Port of Loading" is required.' };
          case 'portofDischarge':
            return { isValid: false, message: '"Port of Discharge" is required.' };
          case 'country':
            return { isValid: false, message: '"Country" is required.' };
        }
      }
    }
    return { isValid: true, message: 'OK' };
  }

  initialEdit() {
    let chargeData: any;
    chargeData = this.getLocalChargeData();
    let chargeDetailData = [...chargeData.rateAndChargesLocalChargeDetails];
    let copyArray = [...chargeDetailData];
    let newData = copyArray.map(el => {
      return Object.assign({}, el)
    });
    // set to form
    this.localChargeForm.patchValue({
      _id: chargeData._id,
      pricingID: chargeData.pricingID,
      creator: chargeData.creator,
      dateCreate: formatDateInput(chargeData.dateCreate),
      dateModify: formatDateInput(chargeData.dateModify),
      portofLoading: chargeData.portofLoading,
      portofDischarge: chargeData.portofDischarge,
      transitPort: chargeData.transitPort,
      notes: chargeData.notes,
      service: chargeData.service,
      validDateFrom: formatDateInput(chargeData.validDateFrom),
      validDateTo: formatDateInput(chargeData.validDateTo),
      updatedBy: '',
      localChargeName: chargeData.localChargeName,
      polCountry: chargeData.polCountry,
      podCountry: chargeData.podCountry,
      transitCountry: chargeData.transitCountry,
      rateAndChargesLocalChargeDetails: this.rowData ? this.rowData : []
    });
    this.rowData = [...newData];
    console.log(this.rowData);

  }

  private getLocalChargeData() {
    return { ...this.editLocalChargeData };
  }

  getRowData() {
    let rowData = [];
    this.gridApi.forEachNode(function (node) {
      rowData.push(node.data);
    });
    console.log('Row Data:');
    console.log(rowData);
    return rowData;
  }

  private setDataBeforeSave(): void {
    const rcLocalChargeDetails = this.getRowData();
    const rcLocalChargeDetailsCopy = [...rcLocalChargeDetails];

    this.localChargeForm.patchValue({
      rateAndChargesLocalChargeDetails: rcLocalChargeDetailsCopy
    });
    this.cloneLocalCharge = { ...this.localChargeForm.value };
    this.cloneLocalCharge.validDateFrom = this.cloneLocalCharge.validDateFrom ?
                                          formatDate(this.cloneLocalCharge.validDateFrom, 'dd/MM/yyy', 'en-US') :
                                          '';
    this.cloneLocalCharge.validDateTo = this.cloneLocalCharge.validDateTo ?
                                        formatDate(this.cloneLocalCharge.validDateTo, 'dd/MM/yyy', 'en-US') : '';
    this.cloneLocalCharge.dateCreate = this.today;
    this.cloneLocalCharge.dateModify = this.today;
    console.log(this.cloneLocalCharge);
  }

  validateRow(obj: any): { isValid: boolean, message: string } {
    // TODO: validate each required cells
    return { isValid: true, message: 'OK' };
  }

  addAction(e) {
    console.log('addAction');

    console.log(e);
    // e.params.data.rowStatus = '';
    this.testNull = false;
    this.gridApi.stopEditing();
  }

  editTable(e) {
    console.log('start edit...');
    console.log(e);

    this.gridApi.startEditingCell({
      rowIndex: e.params.rowIndex,
      colKey: 'fee',
    });
  }

  test2(e) {
    console.log(e);
    if (!e.data?.fee) {
      let dialogResult = MessageBox.show(
        this.modal,
        'Null Error !',
        'Alert ! ',
        MessageBoxButtons.ok,
        MessageBoxIcons.warning
      );
      dialogResult.then((result) => { });

      {
        this.gridApi.startEditingCell({
          rowIndex: e.rowIndex,
          colKey: 'fee',
        });
        this.testNull = true;
      }
    } else {
      // TODO: set other way to fix the inmutable array
      // e.data.rowStatus = "";
      this.testNull = false;
    }
  }

  checkValid(e) {
    console.log(e);
    if (!e.data?.feeName) {
      let dialogResult = MessageBox.show(
        this.modal,
        'Null Error !',
        'Alert ! ',
        MessageBoxButtons.ok,
        MessageBoxIcons.warning
      );
      dialogResult.then((result) => { });

      {
        this.gridApi.startEditingCell({
          rowIndex: e.rowIndex,
          colKey: 'fee',
        });
        this.testNull = false;
      }
    } else {
      console.log('eeeee');

      e.data.rowStatus = '';
      this.testNull = false;
    }
  }

  cancelAction(e) {
    console.log(e);
    this.gridApi.updateRowData({ remove: [e.params.data] });
    this.testNull = false;
  }
}
