import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PartnerDepartmentService } from 'src/app/main/model/partner-department/partner-department.service';
import { isEmail, isObjHasAtLeastValue } from 'src/app/main/common/util';
import { MessageBox, MessageBoxButtons, MessageBoxIcons } from 'src/app/form/message/messsage';
import { PartnerService } from 'src/app/main/model/partner/partner.service';
import { PortService } from 'src/app/main/model/port/port.service';
import { CurrencyService } from 'src/app/main/model/currency/currency.service';
import { formatDate } from '@angular/common';
import * as fromMain from 'src/app/main/store/main.reducer';
import * as SeaFreightActions from '../../store/sea-freight/sea-freight.actions';
import { RateAndChargesSea } from 'src/app/main/model/rate-charges/rate-and-charges-sea.model';

@Component({
  selector: 'app-fcl-add',
  templateUrl: './fcl-add.component.html',
  styleUrls: ['./fcl-add.component.css']
})
export class FclAddComponent implements OnInit {
  @Input() seaData;
  @Input() action;
  @Input() selectedSeaIndex: number;

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

  fclForm: FormGroup;

  gpContClone = null;
  frContClone = null;
  otContClone = null;
  rcContClone = null;
  isoContClone = null;

  constructor(
    private store: Store < fromMain.MainState >,
    private activeModal: NgbActiveModal,
    private modal: NgbModal,
    private fb: FormBuilder,
    private partnerService: PartnerService,
    private portService: PortService,
    private currencyService: CurrencyService,
  ) {

    this.fclForm = this.fb.group({
      gpContainer: this.fb.group({
        _id: new FormControl(),
        pricingID: new FormControl(),
        creator: new FormControl(),
        dateCreate: new FormControl(),
        dateModify: new FormControl(),
        portofLoading: new FormControl(),
        portofDischarge: new FormControl(),
        transitPort: new FormControl(),
        carrierID: new FormControl(),
        importMode: new FormControl(),
        freightChargeLCL: new FormControl(),
        minimumChargeLCL: new FormControl(),
        container20: new FormControl(),
        container40: new FormControl(),
        container45: new FormControl(),
        containerHC: new FormControl(),
        others: new FormControl(),
        subCharge1: new FormControl(),
        subCharge2: new FormControl(),
        subCharge3: new FormControl(),
        containerType: new FormControl(),
        currency: new FormControl(),
        includeAddon: new FormControl(),
        emptyReturn: new FormControl(),
        transitTime: new FormControl(),
        frequency: new FormControl(),
        cutOff: new FormControl(),
        notes: new FormControl(),
        validDateFrom: new FormControl(),
        validDateTo: new FormControl(),
        remarks: new FormControl(),
        isLCL: new FormControl(),
        isPublic: new FormControl()
      }),
      rcContainer: this.fb.group({
        _id: new FormControl(),
        pricingID: new FormControl(),
        creator: new FormControl(),
        dateCreate: new FormControl(),
        dateModify: new FormControl(),
        portofLoading: new FormControl(),
        portofDischarge: new FormControl(),
        transitPort: new FormControl(),
        carrierID: new FormControl(),
        importMode: new FormControl(),
        freightChargeLCL: new FormControl(),
        minimumChargeLCL: new FormControl(),
        container20: new FormControl(),
        container40: new FormControl(),
        container45: new FormControl(),
        containerHC: new FormControl(),
        others: new FormControl(),
        subCharge1: new FormControl(),
        subCharge2: new FormControl(),
        subCharge3: new FormControl(),
        containerType: new FormControl(),
        currency: new FormControl(),
        includeAddon: new FormControl(),
        emptyReturn: new FormControl(),
        transitTime: new FormControl(),
        frequency: new FormControl(),
        cutOff: new FormControl(),
        notes: new FormControl(),
        validDateFrom: new FormControl(),
        validDateTo: new FormControl(),
        remarks: new FormControl(),
        isLCL: new FormControl(),
        isPublic: new FormControl()
      }),
      otContainer: this.fb.group({
        _id: new FormControl(),
        pricingID: new FormControl(),
        creator: new FormControl(),
        dateCreate: new FormControl(),
        dateModify: new FormControl(),
        portofLoading: new FormControl(),
        portofDischarge: new FormControl(),
        transitPort: new FormControl(),
        carrierID: new FormControl(),
        importMode: new FormControl(),
        freightChargeLCL: new FormControl(),
        minimumChargeLCL: new FormControl(),
        container20: new FormControl(),
        container40: new FormControl(),
        container45: new FormControl(),
        containerHC: new FormControl(),
        others: new FormControl(),
        subCharge1: new FormControl(),
        subCharge2: new FormControl(),
        subCharge3: new FormControl(),
        containerType: new FormControl(),
        currency: new FormControl(),
        includeAddon: new FormControl(),
        emptyReturn: new FormControl(),
        transitTime: new FormControl(),
        frequency: new FormControl(),
        cutOff: new FormControl(),
        notes: new FormControl(),
        validDateFrom: new FormControl(),
        validDateTo: new FormControl(),
        remarks: new FormControl(),
        isLCL: new FormControl(),
        isPublic: new FormControl()
      }),
      frContainer: this.fb.group({
        _id: new FormControl(),
        pricingID: new FormControl(),
        creator: new FormControl(),
        dateCreate: new FormControl(),
        dateModify: new FormControl(),
        portofLoading: new FormControl(),
        portofDischarge: new FormControl(),
        transitPort: new FormControl(),
        carrierID: new FormControl(),
        importMode: new FormControl(),
        freightChargeLCL: new FormControl(),
        minimumChargeLCL: new FormControl(),
        container20: new FormControl(),
        container40: new FormControl(),
        container45: new FormControl(),
        containerHC: new FormControl(),
        others: new FormControl(),
        subCharge1: new FormControl(),
        subCharge2: new FormControl(),
        subCharge3: new FormControl(),
        containerType: new FormControl(),
        currency: new FormControl(),
        includeAddon: new FormControl(),
        emptyReturn: new FormControl(),
        transitTime: new FormControl(),
        frequency: new FormControl(),
        cutOff: new FormControl(),
        notes: new FormControl(),
        validDateFrom: new FormControl(),
        validDateTo: new FormControl(),
        remarks: new FormControl(),
        isLCL: new FormControl(),
        isPublic: new FormControl()
      }),
      isoContainer: this.fb.group({
        _id: new FormControl(),
        pricingID: new FormControl(),
        creator: new FormControl(),
        dateCreate: new FormControl(),
        dateModify: new FormControl(),
        portofLoading: new FormControl(),
        portofDischarge: new FormControl(),
        transitPort: new FormControl(),
        carrierID: new FormControl(),
        importMode: new FormControl(),
        freightChargeLCL: new FormControl(),
        minimumChargeLCL: new FormControl(),
        container20: new FormControl(),
        container40: new FormControl(),
        container45: new FormControl(),
        containerHC: new FormControl(),
        others: new FormControl(),
        subCharge1: new FormControl(),
        subCharge2: new FormControl(),
        subCharge3: new FormControl(),
        containerType: new FormControl(),
        currency: new FormControl(),
        includeAddon: new FormControl(),
        emptyReturn: new FormControl(),
        transitTime: new FormControl(),
        frequency: new FormControl(),
        cutOff: new FormControl(),
        notes: new FormControl(),
        validDateFrom: new FormControl(),
        validDateTo: new FormControl(),
        remarks: new FormControl(),
        isLCL: new FormControl(),
        isPublic: new FormControl()
      }),
    });


    this.isLoading = false;
  }

  async ngOnInit() {
    // console.log(this.action);
    // console.log('Sea data passed:');
    // console.log(this.seaData);
    // console.log(this.clients);
    this.getLookup();
    this.vendors = await this.partnerService.getPartnersApi('OTHER CONTACTS');
    // this.ports = await this.portService.getPortsApi(); // des and origin
    this.currencys = await this.currencyService.getCurrenciesApi();
    this.ports = await this.portService.getPortsApi().subscribe(
      (ports) => {
        this.ports = ports;
      }
    );
  }

  async getLookup() {
    this.clients = await this.partnerService.getPartnersApi('COLOADERS');
  }

  save() {
    const validData = this.validationForm();
    this.setFCLBeforSave();

    const dialogResult = MessageBox.show(
      this.modal, 'Do you want to save data ?',
      'Confirm', MessageBoxButtons.yesNoCancel, MessageBoxIcons.question
    );
    dialogResult.then(async (result) => {
      if (result === 'YES') {
        if (validData.isValid) {
          if (this.action === 'ADD') {
            if (this.gpContClone) {
              this.store.dispatch(new SeaFreightActions.StoreSeaFreight(this.gpContClone));
            }
            if (this.frContClone) {
              this.store.dispatch(new SeaFreightActions.StoreSeaFreight(this.frContClone));
            }
            if (this.otContClone) {
              this.store.dispatch(new SeaFreightActions.StoreSeaFreight(this.otContClone));
            }
            if (this.rcContClone) {
              console.log(this.rcContClone);
              this.store.dispatch(new SeaFreightActions.StoreSeaFreight(this.rcContClone));
            }
            if (this.isoContClone) {
              this.store.dispatch(new SeaFreightActions.StoreSeaFreight(this.isoContClone));
            }
            // this.store.dispatch(new SeaFreightActions.AddSeaFreight(this.seaDataClone));
          } else {
            // console.log('dispatch...');

            // this.store.dispatch(new SeaFreightActions.UpdateSeaFreight({
            //   index: this.selectedSeaIndex,
            //   newSeaFreight: this.seaDataClone
            // }));
          }

          this.activeModal.close(this.seaDataClone);
        } else {
          const dialogResult = MessageBox.show(this.modal, validData.message, 'Alert', MessageBoxButtons.ok, MessageBoxIcons.warning);
          dialogResult.then((result) => {});
        }
      } else if (result === 'NO') {
        this.activeModal.close(this.dataClone);
      } else if (result === 'CANCEL') {}
    });
  }

  close() {
    this.activeModal.dismiss(this.dataClone);
  }

  protected validationForm(): { isValid: boolean, tab: string, message: string } {
    const gpContainer = this.fclForm.get('gpContainer') as FormGroup;
    const frContainer = this.fclForm.get('frContainer') as FormGroup;
    const otContainer = this.fclForm.get('otContainer') as FormGroup;
    const rcContainer = this.fclForm.get('rcContainer') as FormGroup;
    const isoContainer = this.fclForm.get('isoContainer') as FormGroup;

    if (!isObjHasAtLeastValue(gpContainer.value) && !isObjHasAtLeastValue(frContainer.value) &&
        !isObjHasAtLeastValue(otContainer.value) && !isObjHasAtLeastValue(rcContainer.value) &&
        !isObjHasAtLeastValue(isoContainer.value)
    ) {
      return { isValid: false, tab: '', message: 'All input are empty. Required at least one tab are entered.' };
    }
    if (isObjHasAtLeastValue(gpContainer.value)) {
      this.setValidator(gpContainer);
      console.log(gpContainer.controls.carrierID);
    }
    if (isObjHasAtLeastValue(frContainer.value)) {
      this.setValidator(frContainer);
    }
    if (isObjHasAtLeastValue(otContainer.value)) {
      this.setValidator(otContainer);
    }
    if (isObjHasAtLeastValue(rcContainer.value)) {
      this.setValidator(rcContainer);
    }
    if (isObjHasAtLeastValue(isoContainer.value)) {
      this.setValidator(isoContainer);
    }
    // tslint:disable-next-line: forin
    for (const field in gpContainer.controls) {
      let con = gpContainer.get(field);
      if (con.status === 'INVALID') {
        switch (field) {
          case 'portofLoading':
            return { isValid: false, tab: 'gpContainer', message: 'Port of loading is required.' };
          case 'portofDischarge':
            return { isValid: true, tab: 'gpContainer', message: 'Port of discharge is required.' };
          case 'carrierID':
            return { isValid: true, tab: 'gpContainer', message: 'Carrier is required.' };
          case 'currency':
            return { isValid: true, tab: 'gpContainer', message: 'Currency is required.' };
          case 'validDateFrom':
            return { isValid: true, tab: 'gpContainer', message: 'Valid date from is required.' };
          case 'validDateTo':
            return { isValid: true, tab: 'gpContainer', message: 'Valid date to is required.' };
        }
      }
    }
    // tslint:disable-next-line: forin
    for (const field in frContainer.controls) {
      let con = frContainer.get(field);
      if (con.status === 'INVALID') {
        switch (field) {
          case 'portofLoading':
            return { isValid: false, tab: 'frContainer', message: 'Port of loading is required.' };
          case 'portofDischarge':
            return { isValid: true, tab: 'frContainer', message: 'Port of discharge is required.' };
          case 'carrierID':
            return { isValid: true, tab: 'frContainer', message: 'Carrier is required.' };
          case 'currency':
            return { isValid: true, tab: 'frContainer', message: 'Currency is required.' };
          case 'validDateFrom':
            return { isValid: true, tab: 'frContainer', message: 'Valid date from is required.' };
          case 'validDateTo':
            return { isValid: true, tab: 'frContainer', message: 'Valid date to is required.' };
        }
      }
    }
    // tslint:disable-next-line: forin
    for (const field in otContainer.controls) {
      let con = otContainer.get(field);
      if (con.status === 'INVALID') {
        switch (field) {
          case 'portofLoading':
            return { isValid: false, tab: 'otContainer', message: 'Port of loading is required.' };
          case 'portofDischarge':
            return { isValid: true, tab: 'otContainer', message: 'Port of discharge is required.' };
          case 'carrierID':
            return { isValid: true, tab: 'otContainer', message: 'Carrier is required.' };
          case 'currency':
            return { isValid: true, tab: 'otContainer', message: 'Currency is required.' };
          case 'validDateFrom':
            return { isValid: true, tab: 'otContainer', message: 'Valid date from is required.' };
          case 'validDateTo':
            return { isValid: true, tab: 'otContainer', message: 'Valid date to is required.' };
        }
      }
    }
    // tslint:disable-next-line: forin
    for (const field in rcContainer.controls) {
      let con = rcContainer.get(field);
      if (con.status === 'INVALID') {
        switch (field) {
          case 'portofLoading':
            return { isValid: false, tab: 'rcContainer', message: 'Port of loading is required.' };
          case 'portofDischarge':
            return { isValid: true, tab: 'rcContainer', message: 'Port of discharge is required.' };
          case 'carrierID':
            return { isValid: true, tab: 'rcContainer', message: 'Carrier is required.' };
          case 'currency':
            return { isValid: true, tab: 'rcContainer', message: 'Currency is required.' };
          case 'validDateFrom':
            return { isValid: true, tab: 'rcContainer', message: 'Valid date from is required.' };
          case 'validDateTo':
            return { isValid: true, tab: 'rcContainer', message: 'Valid date to is required.' };
        }
      }
    }
    // tslint:disable-next-line: forin
    for (const field in isoContainer.controls) {
      let con = isoContainer.get(field);
      if (con.status === 'INVALID') {
        switch (field) {
          case 'portofLoading':
            return { isValid: false, tab: 'isoContainer', message: 'Port of loading is required.' };
          case 'portofDischarge':
            return { isValid: true, tab: 'isoContainer', message: 'Port of discharge is required.' };
          case 'carrierID':
            return { isValid: true, tab: 'isoContainer', message: 'Carrier is required.' };
          case 'currency':
            return { isValid: true, tab: 'isoContainer', message: 'Currency is required.' };
          case 'validDateFrom':
            return { isValid: true, tab: 'isoContainer', message: 'Valid date from is required.' };
          case 'validDateTo':
            return { isValid: true, tab: 'isoContainer', message: 'Valid date to is required.' };
        }
      }
    }
    return { isValid: true, tab: '', message: 'OK' };
  }

  protected setValidator(form: any): void {
    // tslint:disable-next-line: forin
    for (const field in form.controls) { // 'field' is a string
      let con = form.get(field); // 'control' is a FormControl
      // console.log(field);
      switch (field) {
        case 'portofLoading':
          con.setValidators([Validators.required]);
          break;
        case 'portofDischarge':
          con.setValidators([Validators.required]);
          break;
        case 'carrierID':
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

  initialEditSea() {
    let editSea = this.seaData;
    this.seaDataClone = { ...editSea };
    console.log(this.seaDataClone);
    if (this.seaDataClone.dateCreated) {
      let dateCreatedFormat = this.seaDataClone.dateCreated.split('/').reverse().join('-');
      this.seaDataClone.dateCreated = formatDate(dateCreatedFormat, 'yyyy-MM-dd', 'en-US');
    }
    if (this.seaDataClone.dateModified) {
      let dateModifiedFormat = this.seaDataClone.dateModified.split('/').reverse().join('-');
      this.seaDataClone.dateModified = formatDate(dateModifiedFormat, 'yyyy-MM-dd', 'en-US');
    }
    if (this.seaDataClone.validDateFrom) {
      let validDateFrom = this.seaDataClone.validDateFrom.split('/').reverse().join('-');
      this.seaDataClone.validDateFrom = formatDate(validDateFrom, 'yyyy-MM-dd', 'en-US');
    }
    if (this.seaDataClone.validDateTo) {
      let validDateToFormat = this.seaDataClone.validDateTo.split('/').reverse().join('-');
      this.seaDataClone.validDateTo = formatDate(validDateToFormat, 'yyyy-MM-dd', 'en-US');
    }
  }

  setFCLBeforSave() {

    const gpContainer = this.fclForm.get('gpContainer') as FormGroup;
    const frContainer = this.fclForm.get('frContainer') as FormGroup;
    const otContainer = this.fclForm.get('otContainer') as FormGroup;
    const rcContainer = this.fclForm.get('rcContainer') as FormGroup;
    const isoContainer = this.fclForm.get('isoContainer') as FormGroup;
    // General Purpose
    if (isObjHasAtLeastValue(gpContainer.value)) {
      this.gpContClone = { ...gpContainer.value };
      this.gpContClone.containerType = 'GP';
      this.gpContClone.dateCreated = this.gpContClone.dateCreated ?
        formatDate(this.gpContClone.dateCreated, 'dd/MM/yyy', 'en-US') :
        formatDate(new Date(), 'dd/MM/yyy', 'en-US');
      this.gpContClone.dateModified = this.gpContClone.dateModified ?
        formatDate(this.gpContClone.dateModified, 'dd/MM/yyy', 'en-US') :
        formatDate(new Date(), 'dd/MM/yyy', 'en-US');
      this.gpContClone.validDateTo = this.gpContClone.validDateTo ?
        formatDate(this.gpContClone.validDateTo, 'dd/MM/yyy', 'en-US') :
        formatDate(new Date(), 'dd/MM/yyy', 'en-US');
      this.gpContClone.validDateFrom = this.gpContClone.validDateFrom ?
        formatDate(this.gpContClone.validDateFrom, 'dd/MM/yyy', 'en-US') :
        formatDate(new Date(), 'dd/MM/yyy', 'en-US');
      this.gpContClone.isLCL = false;
    }
    // Flat Rack
    if (isObjHasAtLeastValue(frContainer.value)) {
      this.frContClone = { ...frContainer.value };
      this.frContClone.containerType = 'FR'; // hardcode
      this.frContClone.dateCreated = this.frContClone.dateCreated ?
        formatDate(this.frContClone.dateCreated, 'dd/MM/yyy', 'en-US') :
        formatDate(new Date(), 'dd/MM/yyy', 'en-US');
      this.frContClone.dateModified = this.frContClone.dateModified ?
        formatDate(this.frContClone.dateModified, 'dd/MM/yyy', 'en-US') :
        formatDate(new Date(), 'dd/MM/yyy', 'en-US');
      this.frContClone.validDateTo = this.frContClone.validDateTo ?
        formatDate(this.frContClone.validDateTo, 'dd/MM/yyy', 'en-US') :
        formatDate(new Date(), 'dd/MM/yyy', 'en-US');
      this.frContClone.validDateFrom = this.frContClone.validDateFrom ?
        formatDate(this.frContClone.validDateFrom, 'dd/MM/yyy', 'en-US') :
        formatDate(new Date(), 'dd/MM/yyy', 'en-US');
      this.frContClone.isLCL = false;
    }
    // Open Top Container
    if (isObjHasAtLeastValue(otContainer.value)) {
      this.otContClone = { ...otContainer.value };
      this.otContClone.containerType = 'OT';
      this.otContClone.dateCreated = this.otContClone.dateCreated ?
        formatDate(this.otContClone.dateCreated, 'dd/MM/yyy', 'en-US') :
        formatDate(new Date(), 'dd/MM/yyy', 'en-US');
      this.otContClone.dateModified = this.otContClone.dateModified ?
        formatDate(this.otContClone.dateModified, 'dd/MM/yyy', 'en-US') :
        formatDate(new Date(), 'dd/MM/yyy', 'en-US');
      this.otContClone.validDateTo = this.otContClone.validDateTo ?
        formatDate(this.otContClone.validDateTo, 'dd/MM/yyy', 'en-US') :
        formatDate(new Date(), 'dd/MM/yyy', 'en-US');
      this.otContClone.validDateFrom = this.otContClone.validDateFrom ?
        formatDate(this.otContClone.validDateFrom, 'dd/MM/yyy', 'en-US') :
        formatDate(new Date(), 'dd/MM/yyy', 'en-US');
      this.otContClone.isLCL = false;
    }
    //  Refridgerated Container
    if (isObjHasAtLeastValue(rcContainer.value)) {
      this.rcContClone = { ...rcContainer.value };
      this.rcContClone.containerType = 'RF';
      this.rcContClone.dateCreated = this.rcContClone.dateCreated ?
        formatDate(this.rcContClone.dateCreated, 'dd/MM/yyy', 'en-US') :
        formatDate(new Date(), 'dd/MM/yyy', 'en-US');
      this.rcContClone.dateModified = this.rcContClone.dateModified ?
        formatDate(this.rcContClone.dateModified, 'dd/MM/yyy', 'en-US') :
        formatDate(new Date(), 'dd/MM/yyy', 'en-US');
      this.rcContClone.validDateTo = this.rcContClone.validDateTo ?
        formatDate(this.rcContClone.validDateTo, 'dd/MM/yyy', 'en-US') :
        formatDate(new Date(), 'dd/MM/yyy', 'en-US');
      this.rcContClone.validDateFrom = this.rcContClone.validDateFrom ?
        formatDate(this.rcContClone.validDateFrom, 'dd/MM/yyy', 'en-US') :
        formatDate(new Date(), 'dd/MM/yyy', 'en-US');
      this.rcContClone.isLCL = false;
    }
    // ISO Tank
    if (isObjHasAtLeastValue(isoContainer.value)) {
      this.isoContClone = { ...isoContainer.value };
      this.isoContClone.containerType = 'ISOT';
      this.isoContClone.dateCreated = this.isoContClone.dateCreated ?
        formatDate(this.isoContClone.dateCreated, 'dd/MM/yyy', 'en-US') :
        formatDate(new Date(), 'dd/MM/yyy', 'en-US');
      this.isoContClone.dateModified = this.isoContClone.dateModified ?
        formatDate(this.isoContClone.dateModified, 'dd/MM/yyy', 'en-US') :
        formatDate(new Date(), 'dd/MM/yyy', 'en-US');
      this.isoContClone.validDateTo = this.isoContClone.validDateTo ?
        formatDate(this.isoContClone.validDateTo, 'dd/MM/yyy', 'en-US') :
        formatDate(new Date(), 'dd/MM/yyy', 'en-US');
      this.isoContClone.validDateFrom = this.isoContClone.validDateFrom ?
        formatDate(this.isoContClone.validDateFrom, 'dd/MM/yyy', 'en-US') :
        formatDate(new Date(), 'dd/MM/yyy', 'en-US');
      this.isoContClone.isLCL = false;
    }
  }
}
