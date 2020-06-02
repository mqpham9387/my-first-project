import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PartnerDepartmentService } from 'src/app/main/model/partner-department/partner-department.service';
import { isEmail, isObjHasAtLeastValue, formatDateInput } from 'src/app/main/common/util';
import { MessageBox, MessageBoxButtons, MessageBoxIcons } from 'src/app/form/message/messsage';
import { PartnerService } from 'src/app/main/model/partner/partner.service';
import { PortService } from 'src/app/main/model/port/port.service';
import { CurrencyService } from 'src/app/main/model/currency/currency.service';
import { formatDate } from '@angular/common';
import * as fromMain from 'src/app/main/store/main.reducer';
import * as CustomsCleanranceActions from '../../store/customs-clearance/customs-clearance.actions';
import { serviceService } from 'src/app/main/model/service/service.service';
import { CompanyService } from 'src/app/main/model/company/company.service';
import { logging } from 'protractor';

@Component({
  selector: 'app-customs-clearance-edit',
  templateUrl: './customs-clearance-edit.component.html',
  styleUrls: ['./customs-clearance-edit.component.css']
})
export class CustomsClearanceEditComponent implements OnInit {
  @Input() customsClearanceData: any;
  @Input() action: string;
  @Input() selectedIndex: number;

  editData: any;
  isLoading = true;

  dateTimeLimit: string = formatDate(new Date('2050'), 'dd/MM/yyy', 'en-US');

  clients: any;
  vendors: any;
  ports: any;
  currencys: any;
  services: any;
  companies: any;

  dateCreate = formatDate(new Date(), 'yyyy-MM-dd', 'en-US');
  dateModify = formatDate(new Date(), 'yyyy-MM-dd', 'en-US');

  clearanceForm: FormGroup;

  exportClearanceClone = null;
  importClearanceClone = null;
  auxiliarieClone = null;

  selectedPurpose: any;
  public purposeExList = [
    { id: 1, headerName: 'Trading', columnName: 'trading' },
    { id: 2, headerName: 'Investment', columnName: 'investment' },
    { id: 3, headerName: 'Export processing', columnName: 'exportProcessing' },
    { id: 4, headerName: 'Temporary import for re-export', columnName: 'tempImForEx' },
    { id: 5, headerName: 'Temporary export for re-import', columnName: 'tempExForIm' },
    { id: 6, headerName: 'On-spot export and import', columnName: 'onSpot' },
    { id: 7, headerName: 'Non-commercial', columnName: 'nonCommercial' }
  ];

  active = 1;

  ngbTitleTab: string;
  importEdit = false;
  exportEdit = false;
  auxEdit = false;

  constructor(
    private store: Store<fromMain.MainState>,
    private activeModal: NgbActiveModal,
    private modal: NgbModal,
    private fb: FormBuilder,
    private partnerService: PartnerService,
    private portService: PortService,
    private currencyService: CurrencyService,
    private servicesService: serviceService,
    private companyService: CompanyService
  ) {

    this.clearanceForm = this.fb.group({
      exportClearance: this.fb.group({
        _id: new FormControl(),
        pricingID: new FormControl(),
        creator: new FormControl(),
        dateCreate: new FormControl(),
        dateModify: new FormControl(),
        terminal: new FormControl(),
        purposeOfImEx: new FormControl(),
        channel: new FormControl(),
        min: new FormControl(),
        container20: new FormControl(),
        container40: new FormControl(),
        lcl: new FormControl(),
        air: new FormControl(),
        currency: new FormControl(),
        excludedCommodity: new FormControl(),
        notes: new FormControl(),
        service: new FormControl(),
        fee: new FormControl(),
        unit: new FormControl(),
        companyID: new FormControl(),
        validDateFrom: new FormControl(),
        validDateTo: new FormControl(),
        updatedBy: new FormControl(),
        type: new FormControl(),
        carrier: new FormControl()
      }),
      importClearance: this.fb.group({
        _id: new FormControl(),
        pricingID: new FormControl(),
        creator: new FormControl(),
        dateCreate: new FormControl(),
        dateModify: new FormControl(),
        terminal: new FormControl(),
        purposeOfImEx: new FormControl(),
        channel: new FormControl(),
        min: new FormControl(),
        container20: new FormControl(),
        container40: new FormControl(),
        lcl: new FormControl(),
        air: new FormControl(),
        currency: new FormControl(),
        excludedCommodity: new FormControl(),
        notes: new FormControl(),
        service: new FormControl(),
        fee: new FormControl(),
        unit: new FormControl(),
        companyID: new FormControl(),
        validDateFrom: new FormControl(),
        validDateTo: new FormControl(),
        updatedBy: new FormControl(),
        type: new FormControl(),
        carrier: new FormControl()
      }),
      auxiliarie: this.fb.group({
        _id: new FormControl(),
        pricingID: new FormControl(),
        creator: new FormControl(),
        dateCreate: new FormControl(),
        dateModify: new FormControl(),
        terminal: new FormControl(),
        purposeOfImEx: new FormControl(),
        channel: new FormControl(),
        min: new FormControl(),
        container20: new FormControl(),
        container40: new FormControl(),
        lcl: new FormControl(),
        air: new FormControl(),
        currency: new FormControl(),
        excludedCommodity: new FormControl(),
        notes: new FormControl(),
        service: new FormControl(),
        fee: new FormControl(),
        unit: new FormControl(),
        companyID: new FormControl(),
        validDateFrom: new FormControl(),
        validDateTo: new FormControl(),
        updatedBy: new FormControl(),
        type: new FormControl(),
        carrier: new FormControl()
      })
    });

    this.isLoading = false;
  }

  ngOnInit() {
    this.getLookup();
    this.ports = this.portService.getPortsApi().subscribe(
      (ports) => {
        this.ports = ports;
      }
    );
    this.servicesService.getService().subscribe(
      services => {
        this.services = services.results
      }
    )

    this.editData = { ...this.customsClearanceData };

    this.editData.validDateFrom = formatDateInput(this.editData.validDateFrom);
    this.editData.validDateTo = formatDateInput(this.editData.validDateTo);

    switch (this.editData.type) {
      case 'Export':
        this.clearanceForm.patchValue({ exportClearance: { ...this.editData } });
        this.ngbTitleTab = 'Export Customs Clearance';
        this.exportEdit = true;
        this.active = 1;
        break;
      case 'Import':
        this.clearanceForm.patchValue({ importClearance: { ...this.editData } });
        this.ngbTitleTab = 'Import Customs Clearance';
        this.importEdit = true;
        this.active = 2;
        break;
      case 'Auxiliary Services':
        this.clearanceForm.patchValue({ auxiliarie: { ...this.editData } });
        this.ngbTitleTab = 'Auxiliary Services';
        this.auxEdit = true;
        this.active = 3;
        break;
    }
  }

  async getLookup() {
    this.currencys = await this.currencyService.getCurrenciesApi();
    this.clients = await this.partnerService.getPartnersApi('COLOADERS'); // carrier
    this.vendors = await this.partnerService.getPartnersApi('OTHER CONTACTS');
    this.companies = await this.companyService.getCompaniesApi();
  }

  save() {
    const validData = this.validationForm();
    this.setDataBeforSave();

    const dialogResult = MessageBox.show(
      this.modal, 'Do you want to save data ?',
      'Confirm', MessageBoxButtons.yesNoCancel, MessageBoxIcons.question
    );
    dialogResult.then(async (result) => {
      if (result === 'YES') {
        if (validData.isValid) {
          if (this.action === 'EDIT') {
            switch (this.editData.type) {
              case 'Export':
                this.store.dispatch(
                  new CustomsCleanranceActions.UpdateCustomsCleanrance({
                    index: +this.selectedIndex,
                    newCustomsCleanrance: this.exportClearanceClone
                  }));
                break;
              case 'Import':
                this.store.dispatch(
                  new CustomsCleanranceActions.UpdateCustomsCleanrance({
                    index: +this.selectedIndex,
                    newCustomsCleanrance: this.importClearanceClone
                  }));
                break;
              case 'Auxiliary Services':
                this.store.dispatch(
                  new CustomsCleanranceActions.UpdateCustomsCleanrance({
                    index: +this.selectedIndex,
                    newCustomsCleanrance: this.auxiliarieClone
                  }));
                break;
            }
            const dialogInfo = MessageBox.show(
              this.modal,
              'Successfully saved!',
              'Notification',
              MessageBoxButtons.ok,
              MessageBoxIcons.information
            );
            dialogInfo.then((result) => {
              this.activeModal.close();
            });
          }
        } else {
          const validateResult = MessageBox.show(this.modal, validData.message, 'Alert', MessageBoxButtons.ok, MessageBoxIcons.warning);
          validateResult.then((result) => {
            console.log(result);
          });
        }
      } else if (result === 'NO') {

      } else if (result === 'CANCEL') { }
    });
  }

  close() {
    console.log('close');

    this.activeModal.dismiss(this.editData);
  }

  protected validationForm(): { isValid: boolean, tab: string, message: string } {
    const exportClearance = this.clearanceForm.get('exportClearance') as FormGroup;
    const importClearance = this.clearanceForm.get('importClearance') as FormGroup;
    const auxiliarie = this.clearanceForm.get('auxiliarie') as FormGroup;

    if (!isObjHasAtLeastValue(exportClearance.value) &&
      !isObjHasAtLeastValue(importClearance.value) &&
      !isObjHasAtLeastValue(auxiliarie.value)
    ) {
      return { isValid: false, tab: '', message: 'All input are empty. Required at least one tab are entered.' };
    }
    if (isObjHasAtLeastValue(exportClearance.value)) {
      this.setValidator(exportClearance, false);
    }
    if (isObjHasAtLeastValue(importClearance.value)) {
      this.setValidator(importClearance, false);
    }
    if (isObjHasAtLeastValue(auxiliarie.value)) {
      this.setValidator(auxiliarie, true);
    }

    // tslint:disable-next-line: forin
    for (const field in exportClearance.controls) {
      let con = exportClearance.get(field);

      if (con.status === 'INVALID') {
        switch (field) {
          case 'terminal':
            return { isValid: false, tab: 'exportClearance', message: 'Terminal is required.' };
          case 'purposeOfImEx':
            return { isValid: false, tab: 'exportClearance', message: 'Purpose of export is required.' };
          case 'carrier':
            return { isValid: false, tab: 'exportClearance', message: 'Carrier is required.' };
          case 'currency':
            return { isValid: false, tab: 'exportClearance', message: 'Currency is required.' };
          case 'validDateFrom':
            return { isValid: false, tab: 'exportClearance', message: 'Valid date from is required.' };
          case 'validDateTo':
            return { isValid: false, tab: 'exportClearance', message: 'Valid date to is required.' };
        }
      }
    }
    // tslint:disable-next-line: forin
    for (const field in importClearance.controls) {
      let con = importClearance.get(field);
      if (con.status === 'INVALID') {
        switch (field) {
          case 'terminal':
            return { isValid: false, tab: 'importClearance', message: 'Terminal is required.' };
          case 'purposeOfImEx':
            return { isValid: false, tab: 'importClearance', message: 'Purpose of export is required.' };
          case 'carrier':
            return { isValid: false, tab: 'importClearance', message: 'Carrier is required.' };
          case 'currency':
            return { isValid: false, tab: 'importClearance', message: 'Currency is required.' };
          case 'validDateFrom':
            return { isValid: false, tab: 'importClearance', message: 'Valid date from is required.' };
          case 'validDateTo':
            return { isValid: false, tab: 'importClearance', message: 'Valid date to is required.' };
        }
      }
    }
    // tslint:disable-next-line: forin
    for (const field in auxiliarie.controls) {
      let con = auxiliarie.get(field);
      if (con.status === 'INVALID') {
        switch (field) {
          case 'companyID':
            return { isValid: false, tab: 'auxiliarie', message: 'Office is required.' };
          case 'service':
            return { isValid: false, tab: 'auxiliarie', message: 'Service is required.' };
          case 'currency':
            return { isValid: false, tab: 'auxiliarie', message: 'Currency is required.' };
          case 'validDateFrom':
            return { isValid: false, tab: 'auxiliarie', message: 'Valid date from is required.' };
          case 'validDateTo':
            return { isValid: false, tab: 'auxiliarie', message: 'Valid date to is required.' };
        }
      }
    }
    return { isValid: true, tab: '', message: 'OK' };
  }

  protected setValidator(form: FormGroup, isAux?: boolean): void {
    if (isAux) {
      // tslint:disable-next-line: forin
      for (const field in form.controls) { // 'field' is a string
        let con = form.get(field); // 'control' is a FormControl
        // console.log(field);
        switch (field) {
          case 'companyID':
            con.setValidators([Validators.required]);
            break;
          case 'service':
            con.setValidators([Validators.required]);
            break;
          case 'currency':
            con.setValidators([Validators.required]);
            break;
          case 'validDateFrom':
            con.setValidators([Validators.required]);
            break;
          case 'validDateTo':
            con.setValidators([Validators.required]);
            break;
        }
        con.updateValueAndValidity();
      }
    } else {
      // tslint:disable-next-line: forin
      for (const field in form.controls) { // 'field' is a string
        let con = form.get(field); // 'control' is a FormControl
        console.log(field);
        switch (field) {
          case 'terminal':
            con.setValidators([Validators.required]);
            break;
          case 'purposeOfImEx':
            con.setValidators([Validators.required]);
            break;
          case 'carrier':
            con.setValidators([Validators.required]);
            break;
          case 'currency':
            con.setValidators([Validators.required]);
            break;
          case 'validDateFrom':
            con.setValidators([Validators.required]);
            break;
          case 'validDateTo':
            con.setValidators([Validators.required]);
            break;
        }
        con.updateValueAndValidity();
      }
    }
  }

  setDataBeforSave() {

    const exportClearance = this.clearanceForm.get('exportClearance') as FormGroup;
    const importClearance = this.clearanceForm.get('importClearance') as FormGroup;
    const auxiliarie = this.clearanceForm.get('auxiliarie') as FormGroup;

    if (isObjHasAtLeastValue(exportClearance.value)) {
      this.exportClearanceClone = { ...exportClearance.value };
      this.exportClearanceClone.type = 'Export';
      // this.exportClearanceClone.dateCreated = formatDate(new Date(), 'dd/MM/yyy', 'en-US');
      this.exportClearanceClone.dateModified = formatDate(new Date(), 'dd/MM/yyy', 'en-US');
      this.exportClearanceClone.validDateTo = this.exportClearanceClone.validDateTo ?
        formatDate(this.exportClearanceClone.validDateTo, 'dd/MM/yyy', 'en-US') : '';
      this.exportClearanceClone.validDateFrom = this.exportClearanceClone.validDateFrom ?
        formatDate(this.exportClearanceClone.validDateFrom, 'dd/MM/yyy', 'en-US') : '';
    }
    if (isObjHasAtLeastValue(importClearance.value)) {
      this.importClearanceClone = { ...importClearance.value };
      this.importClearanceClone.type = 'Import';
      // this.importClearanceClone.dateCreated = formatDate(new Date(), 'dd/MM/yyy', 'en-US');
      this.importClearanceClone.dateModified = formatDate(new Date(), 'dd/MM/yyy', 'en-US');
      this.importClearanceClone.validDateTo = this.importClearanceClone.validDateTo ?
        formatDate(this.importClearanceClone.validDateTo, 'dd/MM/yyy', 'en-US') : '';
      this.importClearanceClone.validDateFrom = this.importClearanceClone.validDateFrom ?
        formatDate(this.importClearanceClone.validDateFrom, 'dd/MM/yyy', 'en-US') : '';
    }
    if (isObjHasAtLeastValue(auxiliarie.value)) {
      this.auxiliarieClone = { ...auxiliarie.value };
      this.auxiliarieClone.type = 'Auxiliary Services';
      // this.auxiliarieClone.dateCreated = formatDate(new Date(), 'dd/MM/yyy', 'en-US');
      this.auxiliarieClone.dateModified = formatDate(new Date(), 'dd/MM/yyy', 'en-US');
      this.auxiliarieClone.validDateTo = this.auxiliarieClone.validDateTo ?
        formatDate(this.auxiliarieClone.validDateTo, 'dd/MM/yyy', 'en-US') : '';
      this.auxiliarieClone.validDateFrom = this.auxiliarieClone.validDateFrom ?
        formatDate(this.auxiliarieClone.validDateFrom, 'dd/MM/yyy', 'en-US') : '';
    }
  }
}
