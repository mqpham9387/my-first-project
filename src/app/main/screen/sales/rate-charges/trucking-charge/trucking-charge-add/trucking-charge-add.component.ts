import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PartnerDepartmentService } from 'src/app/main/model/partner-department/partner-department.service';
import { formatDateInput, isObjHasAtLeastValue, getNumericCellEditor } from 'src/app/main/common/util';
import { MessageBox, MessageBoxButtons, MessageBoxIcons } from 'src/app/form/message/messsage';
import { PartnerService } from 'src/app/main/model/partner/partner.service';
import { PortService } from 'src/app/main/model/port/port.service';
import { CurrencyService } from 'src/app/main/model/currency/currency.service';
import { formatDate } from '@angular/common';
import * as fromMain from 'src/app/main/store/main.reducer';
import * as TruckingChargeActions from '../../store/trucking-charge/trucking-charge.actions';
import { AreaService } from 'src/app/main/model/area/area.service';
import { CityService } from 'src/app/main/model/city/city.service';
import { AgGridAngular } from 'ag-grid-angular';
import { AppSettings } from 'src/app/main/shared/app-settings';

@Component({
  selector: 'app-trucking-charge-add',
  templateUrl: './trucking-charge-add.component.html',
  styleUrls: ['./trucking-charge-add.component.css']
})
export class TruckingChargeAddComponent implements OnInit {
  @ViewChild('editTrucksGrid') editTrucksGrid: AgGridAngular;
  @Input() truckData;
  @Input() data: any; // for of-input-lookup
  @Input() action;
  @Input() isEdit;
  @Input() selectedIndex: number;
  @Input() editTruckData;

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

  truckForm: FormGroup;
  areas: any;
  cities: any;

  public gridApi;
  public gridColumnApi;

  public columnDefs;
  public defaultColDef;
  public components;
  public editType;
  public frameworkComponents;
  public rowData = [{
    truck20: '',
    truck40: '',
    truck500kgs: '',
    truckTonLevel1: '',
    truckTonLevel2: '',
    truckTonLevel3: '',
    truckTonLevel4: '',
    truckTonLevel5: '',
    truckTonLevel6: '',
    truckTonLevel7: '',
    truckTonLevel8: '',
    truckTonLevel9: '',
    truckTonLevel10: '',
    truckTonLevel11: '',
    truckTonLevel12: '',
    truckTonLevel13: '',
    truckTonLevel14: '',
    truckTonLevel15: '',
    truckTonLevel16: '',
  }];

  private cloneTruck: any;

  constructor(
    private store: Store <fromMain.MainState>,
    private activeModal: NgbActiveModal,
    private modal: NgbModal,
    private fb: FormBuilder,
    private partnerService: PartnerService,
    private portService: PortService,
    private currencyService: CurrencyService,
    private areaService: AreaService,
    private cityService: CityService
  ) {

    this.columnDefs = [
      { headerName: "20' truck", field: 'truck20', width: 100, sortable: false, filter: false,
        cellEditor: 'numericCellEditor',
      },
      { headerName: "40' truck", field: 'truck40', width: 100, sortable: false, filter: false, cellEditor: 'numericCellEditor'},
      { headerName: '500kgs Truck', field: 'truck500kgs', width: 150, sortable: false, filter: false, cellEditor: 'numericCellEditor'},
      { headerName: '1-ton truck', field: 'truckTonLevel1', width: 150, sortable: false, filter: false, cellEditor: 'numericCellEditor'},
      { headerName: '1.5-ton truck', field: 'truckTonLevel2', width: 150, sortable: false, filter: false, cellEditor: 'numericCellEditor'},
      { headerName: '2-ton truck', field: 'truckTonLevel3', width: 150, sortable: false, filter: false, cellEditor: 'numericCellEditor'},
      { headerName: '2.5-ton truck', field: 'truckTonLevel4', width: 150, sortable: false, filter: false, cellEditor: 'numericCellEditor'},
      { headerName: '3.5-ton truck', field: 'truckTonLevel5', width: 150, sortable: false, filter: false, cellEditor: 'numericCellEditor'},
      { headerName: '5-ton truck', field: 'truckTonLevel6', width: 150, sortable: false, filter: false, cellEditor: 'numericCellEditor'},
      { headerName: '6.5-ton truck', field: 'truckTonLevel7', width: 150, sortable: false, filter: false, cellEditor: 'numericCellEditor'},
      { headerName: '8-ton truck', field: 'truckTonLevel8', width: 150, sortable: false, filter: false, cellEditor: 'numericCellEditor'},
      { headerName: '9.5-ton truck', field: 'truckTonLevel9', width: 150, sortable: false, filter: false, cellEditor: 'numericCellEditor'},
      { headerName: '11-ton truck', field: 'truckTonLevel10', width: 150, sortable: false, filter: false, cellEditor: 'numericCellEditor'},
      { headerName: '13-ton truck', field: 'truckTonLevel11', width: 150, sortable: false, filter: false, cellEditor: 'numericCellEditor'},
      { headerName: '15-ton truck', field: 'truckTonLevel12', width: 150, sortable: false, filter: false, cellEditor: 'numericCellEditor'},
      { headerName: '16.5-ton truck', field: 'truckTonLevel13', width: 150, sortable: false, filter: false, cellEditor: 'numericCellEditor'},
      { headerName: '18-ton truck', field: 'truckTonLevel14', width: 150, sortable: false, filter: false, cellEditor: 'numericCellEditor'},
      { headerName: '20-ton truck', field: 'truckTonLevel15', width: 150, sortable: false, filter: false, cellEditor: 'numericCellEditor'},
      { headerName: '22-ton truck', field: 'truckTonLevel16', width: 150, sortable: false, filter: false, cellEditor: 'numericCellEditor'},
    ];
    this.defaultColDef = {
      editable: true,
      minWidth: 100,
    };
    this.components = { numericCellEditor: getNumericCellEditor() };
    this.frameworkComponents = AppSettings.frameworkComponents;
    this.editType = 'fullRow';

    this.isLoading = false;

    console.log(this.rowData);

  }

  ngOnInit() {
    this.areas = this.areaService.getAreasApi();
    this.getLookup();
    this.createForm();

    if (this.isEdit) {
      this.initialEdit();
    }
  }

  onBtStopEditing() {
    this.gridApi.stopEditing();
  }

  onBtStartEditing() {
    this.gridApi.setFocusedCell(1, 'truck20');
    this.gridApi.startEditingCell({
      rowIndex: 0,
      colKey: 'truck20',
    });
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
  }

  createForm(): void {
    this.truckForm = this.fb.group({
      _id: [''],
      pricingID: [''],
      creator: [''],
      dateCreate: [''],
      dateModify: [''],
      pickupCity: [''],
      pickupArea: [''],
      deliveryCity: [''],
      deliveryArea: [''],
      trucks : this.fb.group({
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
      }),
      notes: [''],
      freeDetentionTime: [''],
      detentionCharge: ['', Validators.required],
      validDateFrom: ['', Validators.required],
      validDateTo: ['', Validators.required],
      updatedBy: [''],
      currency: ['', Validators.required]
    });
  }

  async getLookup() {
    this.clients = await this.partnerService.getPartnersApi('COLOADERS');
    this.vendors = await this.partnerService.getPartnersApi('OTHER CONTACTS');
    // this.ports = await this.portService.getPortsApi(); // des and origin
    this.currencys = await this.currencyService.getCurrenciesApi();
    this.ports = await this.portService.getPortsApi().subscribe(
      (ports) => {
        this.ports = ports;
      }
    );
    // this.cities = await this.cityService.getCitiesApi();
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
          if (this.action === 'ADD_TRUCK') {
            this.store.dispatch(new TruckingChargeActions.StoreTruckingCharge(this.cloneTruck));
            const dialogInfo = MessageBox.show(
              this.modal,
              'Successfully saved!',
              'Notification',
              MessageBoxButtons.ok,
              MessageBoxIcons.information
            );
            dialogInfo.then((result) => {
              this.activeModal.close(this.cloneTruck);
            });
          } else {
            this.store.dispatch(new TruckingChargeActions.UpdateTruckingCharge({
              index: this.selectedIndex,
              newTruckingCharge: this.cloneTruck
            }));
            const dialogInfo = MessageBox.show(
              this.modal,
              'Edit has complete!',
              'Ok',
              MessageBoxButtons.ok,
              MessageBoxIcons.information
            );
            dialogInfo.then((result) => {
              this.activeModal.close(this.cloneTruck);
            });
          }

          this.activeModal.close(this.seaDataClone);
        } else {
          const dialogAlert = MessageBox.show(this.modal, validData.message, 'Alert', MessageBoxButtons.ok, MessageBoxIcons.warning);
          dialogAlert.then((result) => {});
        }
      } else if (result === 'NO') {
        this.activeModal.close(this.cloneTruck);
      } else if (result === 'CANCEL') {}
    });
  }

  close() {
    this.activeModal.dismiss(this.cloneTruck);
  }
  cancel() {
    this.activeModal.dismiss(this.cloneTruck);
  }

  protected validationForm(): { isValid: boolean, message: string } {
    // const gpContainer = this.fclForm.get('gpContainer') as FormGroup;
    return { isValid: true, message: 'OK' };
  }

  protected setValidator(form: any): void {
    // tslint:disable-next-line: forin
    // for (const field in form.controls) { // 'field' is a string
    //   let con = form.get(field); // 'control' is a FormControl
    //   // console.log(field);
    //   switch (field) {
    //     case 'portofLoading':
    //       con.setValidators([Validators.required]);
    //       break;
    //     case 'portofDischarge':
    //       con.setValidators([Validators.required]);
    //       break;
    //     case 'carrierID':
    //       con.setValidators([Validators.required]);
    //       break;
    //     case 'currency':
    //       con.setValidators([Validators.required]);
    //       break;
    //     case 'validDateFrom':
    //       con.setValidators([Validators.required]);
    //       break;
    //     case 'validDateTo':
    //       con.setValidators([Validators.required]);
    //       break;
    //   }
    //   con.updateValueAndValidity();
    // }
  }

  initialEdit() {
    let truckData: any;
    if (this.isEdit) {
      truckData = this.getTruckData();
      this.rowData = [{...truckData}];
    }
    // set to form
    this.truckForm.patchValue({
      _id: truckData._id,
      pricingID: truckData.pricingID,
      creator: truckData.creator,
      dateCreate: formatDateInput(truckData.dateCreate),
      dateModify: formatDateInput(truckData.dateModify),
      pickupCity: truckData.pickupCity,
      pickupArea: truckData.pickupArea,
      deliveryCity: truckData.deliveryCity,
      deliveryArea: truckData.deliveryArea,
      trucks : {
        truck20: truckData.truck20,
        truck40: truckData.truck40,
        truck500kgs: truckData.truck500kgs,
        truckTonLevel1: truckData.truckTonLevel1,
        truckTonLevel2: truckData.truckTonLevel2,
        truckTonLevel3: truckData.truckTonLevel3,
        truckTonLevel4: truckData.truckTonLevel4,
        truckTonLevel5: truckData.truckTonLevel5,
        truckTonLevel6: truckData.truckTonLevel6,
        truckTonLevel7: truckData.truckTonLevel7,
        truckTonLevel8: truckData.truckTonLevel8,
        truckTonLevel9: truckData.truckTonLevel9,
        truckTonLevel10: truckData.truckTonLevel10,
        truckTonLevel11: truckData.truckTonLevel11,
        truckTonLevel12: truckData.truckTonLevel12,
        truckTonLevel13: truckData.truckTonLevel13,
        truckTonLevel14: truckData.truckTonLevel14,
        truckTonLevel15: truckData.truckTonLevel15,
        truckTonLevel16: truckData.truckTonLevel16,
      },
      notes: truckData.notes,
      freeDetentionTime: truckData.freeDetentionTime,
      detentionCharge: truckData.detentionCharge,
      validDateFrom: formatDateInput(truckData.validDateFrom),
      validDateTo: formatDateInput(truckData.validDateTo),
      updatedBy: truckData.updatedBy,
      currency: truckData.currency
    });
  }

  private getTruckData() {
    return { ...this.editTruckData }
  }

  private setDataBeforeSave(): void {
    this.gridApi.stopEditing();
    const rowNode = this.gridApi.getRowNode(0);
    const gridData = rowNode.data;
    this.truckForm.patchValue({
      trucks: {...gridData }
    });
    this.cloneTruck = { ...this.truckForm.value, ...this.truckForm.value.trucks };
    delete this.cloneTruck.trucks;
    this.cloneTruck.validDateFrom = this.cloneTruck.validDateFrom ? formatDate(this.cloneTruck.validDateFrom, 'dd/MM/yyy', 'en-US') : '';
    this.cloneTruck.validDateTo = this.cloneTruck.validDateTo ? formatDate(this.cloneTruck.validDateTo, 'dd/MM/yyy', 'en-US') : '';
    this.cloneTruck.dateCreate = this.today;
    this.cloneTruck.dateModify = this.today;
    console.log(this.cloneTruck);
    if (!this.isEdit) {
    } else {
      // edit data set here

    }
  }
}
