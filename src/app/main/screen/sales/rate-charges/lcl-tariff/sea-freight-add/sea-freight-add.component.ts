import { Component, OnInit, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
// import { PartnerDepartmentService } from 'src/app/main/model/partner-department/partner-department.service';
import { isEmail, formatDateInput } from 'src/app/main/common/util';
import { MessageBox, MessageBoxButtons, MessageBoxIcons } from 'src/app/form/message/messsage';
import { PartnerService } from 'src/app/main/model/partner/partner.service';
import { PortService } from 'src/app/main/model/port/port.service';
import { CurrencyService } from 'src/app/main/model/currency/currency.service';
import { formatDate } from '@angular/common';
import * as fromMain from '../../../../../store/main.reducer';
import * as SeaFreightActions from '../../store/sea-freight/sea-freight.actions'
// import { RateAndChargesSea } from 'src/app/main/model/rate-charges/rate-and-charges-sea.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-sea-freight-add',
  templateUrl: './sea-freight-add.component.html',
  styleUrls: ['./sea-freight-add.component.css']
})
export class SeaFreightAddComponent implements OnInit {
  @Input() seaData: any;
  @Input() action: any;
  @Input() selectedSeaIndex: number;

  isLoading = true;
  dataClone: any;
  seaDataClone: any;

  dateTimeLimit: string = formatDate(new Date('2050'), 'dd/MM/yyy', 'en-US');

  carriers;
  vendors;
  ports;
  currencys;
  customsClearance;

  dateCreate = formatDate(new Date(), 'yyyy-MM-dd', 'en-US');
  dateModify = formatDate(new Date(), 'yyyy-MM-dd', 'en-US');
  seaForm: FormGroup;

  constructor(
    private store: Store < fromMain.MainState > ,
    private activeModal: NgbActiveModal,
    private modal: NgbModal,
    private partnerService: PartnerService,
    // private partnerdepartmentService: PartnerDepartmentService,
    private portService: PortService,
    private currencyService: CurrencyService,
    private fb: FormBuilder
  ) {
    this.isLoading = false;
  }

  createForm(): void {
    this.seaForm = this.fb.group({
      _id: [''],
      pricingID: [''],
      creator: [''],
      dateCreate: [''],
      dateModify: [''],
      portofLoading: ['', Validators.required],
      portofDischarge: ['', Validators.required],
      transitPort: [''],
      carrierID: [''],
      importMode: [''],
      freightChargeLCL: [''],
      minimumChargeLCL: ['', Validators.required],
      container20: [''],
      container40: [''],
      container45: [''],
      containerHC: [''],
      others: [''],
      subCharge1: [''],
      subCharge2: [''],
      subCharge3: [''],
      containerType: [''],
      currency: ['', Validators.required],
      includeAddon: [''],
      emptyReturn: [''],
      transitTime: [''],
      frequency: [''],
      cutOff: [''],
      notes: [''],
      validDateFrom: ['', Validators.required],
      validDateTo: ['', Validators.required],
      remarks: [''],
      isLCL: [''],
      isPublic: [''],
      customsClearanceAtDestination: [''],
      customsClearanceAtOrigin: ['']
    });
  }

  ngOnInit() {
    this.getLookup();
    this.createForm();

    this.seaDataClone = { ...this.seaData };

    if (this.action === 'EDIT') {
      this.initialEdit();
    }
  }

  async getLookup() {
    this.carriers = await this.partnerService.getPartnersApi('COLOADERS');
    this.vendors = await this.partnerService.getPartnersApi('OTHER CONTACTS');
    // this.ports = await this.portService.getPortsApi(); // des and origin
    this.currencys = await this.currencyService.getCurrenciesApi();
    this.ports = await this.portService.getPortsApi().subscribe(
      (ports) => {
        this.ports = ports;
      }
    );
  }

  save() {
    const validData = this.validationForm();
    this.setSeaBeforSave();
    // var validData = this.validData();
    // let validData = { isValid: true, message: '' };

    let dialogResult = MessageBox.show(
                              this.modal,
                              'Do you want to save data ?',
                              'Confirm', MessageBoxButtons.yesNoCancel, MessageBoxIcons.question);
    dialogResult.then(async (result) => {
      if (result === 'YES') {
        if (validData.isValid) {
          if (this.action === 'ADD') {
            // console.log(this.seaDataClone);
            this.store.dispatch(new SeaFreightActions.StoreSeaFreight(this.seaDataClone));
            // this.store.dispatch(new SeaFreightActions.AddSeaFreight(this.seaDataClone));
          } else {
            // console.log('dispatch...');
            // console.log(this.seaDataClone);

            this.store.dispatch(new SeaFreightActions.UpdateSeaFreight({
              index: this.selectedSeaIndex,
              newSeaFreight: this.seaDataClone
            }));
          }

          this.activeModal.close(this.seaDataClone);
        } else {
          let dialogResult = MessageBox.show(this.modal, validData.message, 'Alert', MessageBoxButtons.ok, MessageBoxIcons.warning);
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

  protected validationForm(): { isValid: boolean, message: string } {
    const seaFormvalidate = this.seaForm;
    // console.log(seaFormvalidate);
    // tslint:disable-next-line: forin
    for (const field in seaFormvalidate.controls) {
      let con = seaFormvalidate.get(field);
      if (con.status === 'INVALID') {
        switch (field) {
          case 'portofLoading':
            return { isValid: false, message: '"Port of Loading" is required.' };
          case 'portofDischarge':
            return { isValid: false, message: '"Port of Discharge" is required.' };
          case 'currency':
            return { isValid: false, message: '"Currency" is required.' };
          case 'validDateFrom':
            return { isValid: false, message: '"Valid date from" is required.' };
          case 'validDateTo':
            return { isValid: false, message: '"Valid date to" is required.' };
          case 'minimumChargeLCL':
            return { isValid: false, message: '"Minimum Charge" is required.' };
        }
      }
    }
    return { isValid: true, message: 'OK' };
  }

  setSeaBeforSave() {
    this.seaDataClone = { ...this.seaForm.value };
    this.seaDataClone.validDateFrom = this.seaDataClone.validDateFrom ? formatDate(this.seaDataClone.validDateFrom, 'dd/MM/yyy', 'en-US') : '';
    this.seaDataClone.validDateTo = this.seaDataClone.validDateTo ? formatDate(this.seaDataClone.validDateTo, 'dd/MM/yyy', 'en-US') : '';
    if (this.action === 'ADD') {
      this.seaDataClone.dateCreate = formatDate(this.dateCreate, 'dd/MM/yyy', 'en-US');
      this.seaDataClone.dateModify = formatDate(this.dateCreate, 'dd/MM/yyy', 'en-US');
    } else {

      this.seaDataClone.dateModify = formatDate(this.dateCreate, 'dd/MM/yyy', 'en-US');
    }

    this.seaDataClone.isLCL = true;
  }

  initialEdit() {
    let seaFreightData: any;
    seaFreightData = this.getSeaData();

    // set to form
    this.seaForm.patchValue({
      _id: seaFreightData._id,
      pricingID: seaFreightData.pricingID,
      creator: seaFreightData.creator,
      dateCreate: formatDateInput(seaFreightData.dateCreate),
      dateModify: formatDateInput(seaFreightData.dateModify),
      portofLoading: seaFreightData.portofLoading,
      portofDischarge: seaFreightData.portofDischarge,
      transitPort: seaFreightData.transitPort,
      carrierID: seaFreightData.carrierID,
      importMode: seaFreightData.importMode,
      freightChargeLCL: seaFreightData.freightChargeLCL,
      minimumChargeLCL: seaFreightData.minimumChargeLCL,
      container20: seaFreightData.container20,
      container40: seaFreightData.container40,
      container45: seaFreightData.container45,
      containerHC: seaFreightData.containerHC,
      others: seaFreightData.others,
      subCharge1: seaFreightData.subCharge1,
      subCharge2: seaFreightData.subCharge2,
      subCharge3: seaFreightData.subCharge3,
      containerType: seaFreightData.containerType,
      currency: seaFreightData.currency,
      includeAddon: seaFreightData.includeAddon,
      emptyReturn: seaFreightData.emptyReturn,
      transitTime: seaFreightData.transitTime,
      frequency: seaFreightData.frequency,
      cutOff: seaFreightData.cutOff,
      notes: seaFreightData.notes,
      validDateFrom: formatDateInput(seaFreightData.validDateFrom),
      validDateTo: formatDateInput(seaFreightData.validDateTo),
      remarks: seaFreightData.remarks,
      isLCL: seaFreightData.isLCL,
      isPublic: seaFreightData.isPublic,
      customsClearanceAtDestination: false,
      customsClearanceAtOrigin: false
    });
  }

  private getSeaData() {
    return { ...this.seaData };
  }
}
