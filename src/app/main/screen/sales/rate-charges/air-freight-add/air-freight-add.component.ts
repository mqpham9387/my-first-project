import { Component, OnInit, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PartnerDepartmentService } from 'src/app/main/model/partner-department/partner-department.service';
import { isEmail } from 'src/app/main/common/util';
import { MessageBox, MessageBoxButtons, MessageBoxIcons } from 'src/app/form/message/messsage';
import { PartnerService } from 'src/app/main/model/partner/partner.service';
import { PortService } from 'src/app/main/model/port/port.service';
import { CurrencyService } from 'src/app/main/model/currency/currency.service';
import { formatDate } from '@angular/common';
import * as fromMain from '../../../../store/main.reducer';
import * as AirFreightActions from 'src/app/main/screen/sales/rate-charges/store/air-freight/air-freight.actions';

@Component({
  selector: 'app-air-freight-add',
  templateUrl: './air-freight-add.component.html',
  styleUrls: ['./air-freight-add.component.css']
})
export class AirFreightAddComponent implements OnInit {
  @Input() data: any;
  @Input() action: string;
  @Input() selectedAirIndex: number;

  isLoading = true;
  dataClone;
  dataCloneEdit;

  group = null;

  notEmail;

  valid = {
    group: false,
    fullName: false
  };
  dateTimeLimit: string = formatDate(new Date('2050'), 'dd/MM/yyy', 'en-US');

  carriers;
  vendors;
  ports;
  currencys;
  airOrigin;
  airDestination;
  airCurr;
  airVendor;
  airDateUpdate = formatDate(new Date(), 'yyyy-MM-dd', 'en-US');
  airCarrier;
  airValidDate = formatDate(new Date(), 'yyyy-MM-dd', 'en-US');
  airMin;
  airTt;
  level1;
  level2;
  level3;
  level4;
  level5;
  airCreator;
  airFrequency;
  airCutOff;
  level6;
  airNotes;
  fsc;
  ssc;
  otherCharges;
  validDateFrom;
  validDateTo;
  updateBy;
  // dateCreate = formatDate(new Date(), 'yyyy-MM-dd', 'en-US');
  // dateModify = formatDate(new Date(), 'yyyy-MM-dd', 'en-US');
  dateCreate = formatDate(new Date(), 'dd/MM/yyyy', 'en-US');
  dateModify = formatDate(new Date(), 'dd/MM/yyyy', 'en-US');
  constructor(
    private store: Store < fromMain.MainState > ,
    private activeModal: NgbActiveModal,
    private modal: NgbModal,
    private partnerService: PartnerService,
    private partnerdepartmentService: PartnerDepartmentService,
    private portService: PortService,
    private currencyService: CurrencyService,
  ) {}

  async ngOnInit() {
    this.carriers = await this.partnerService.getPartnersApi('COLOADERS');
    this.vendors = await this.partnerService.getPartnersApi('OTHER CONTACTS');
    // this.ports = await this.portService.getPortsApi();
    this.currencys = await this.currencyService.getCurrenciesApi();

    // this.partners = await this.partnerService.getPartnersApi('COLOADERS');

    this.ports = await this.portService.getPortsApi().subscribe(
      (ports) => {
        this.ports = ports;
      }
    );

    // this.groups = await this.partnerdepartmentService.getPartnerDepartmentsApi();
    if (this.action === 'EDIT') {
      this.initialEditAir();
      this.dataCloneEdit = { ...this.data };
      console.log(this.dataCloneEdit);
    } else {
      this.dataClone = this.data;
    }

    this.isLoading = false;
  }

  save() {
    this.setAirBeforSave();
    // var validData = this.validData();
    let validData = { isValid: true, message: '' };

    let dialogResult = MessageBox.show(
                        this.modal,
                        'Do you want to save data ?',
                        'Confirm', MessageBoxButtons.yesNoCancel, MessageBoxIcons.question);
    dialogResult.then(async (result) => {
      if (result === 'YES') {
        if (validData.isValid) {
          if (this.action === 'ADD') {
            this.store.dispatch(new AirFreightActions.StoreAirFreight(this.dataClone));
          } else {
            console.log('dispatch...edit...');
            console.log(this.dataCloneEdit);
            this.store.dispatch(new AirFreightActions.UpdateAirFreight({
              index: this.selectedAirIndex,
              newAirFreight: this.dataCloneEdit
            }));
          }
          this.activeModal.close(this.dataClone);
        } else {
          let dialogResult = MessageBox.show(this.modal, validData.message, 'Alert', MessageBoxButtons.ok, MessageBoxIcons.warning);
          dialogResult.then((result) => {});
        }
      } else if (result === 'NO') {
        this.activeModal.close(this.dataClone);
      } else if (result === 'CANCEL') {}
    })
  }

  close() {
    this.activeModal.dismiss(this.dataClone);
  }

  validData() {
    var isValid = true;
    var message = '';
    if (this.dataClone.birthday === undefined) {
      isValid = false;
      message = "The field Birthday not correct format DD/MM/YYYY!";
    }
    if (this.dataClone.email === undefined || !isEmail(this.dataClone.email)) {
      isValid = false;
      message = "The field Email not correct format !";
    }
    if (this.dataClone.fullname === null || this.dataClone.fullname === '') {
      isValid = false;
      message = "The field Full Name can't be empty !";
    }
    if (this.dataClone.group === null || this.dataClone.group === '') {
      isValid = false;
      message = "The field Group can't be empty !";
    }

    return { isValid: isValid, message: message };
  }

  initialEditAir() {
    let editAir = this.data;
    console.log(editAir);
    const ports$ = this.portService.getPortsApi();
    ports$.subscribe(
      (ports) => {
        this.airOrigin = ports.find(
          (value) => {
            if (value.portID === editAir.origin) {
              return value;
            }
            return '';
          }
        );
      }
    );
    this.ssc = editAir.ssc;
    ports$.subscribe(
      (ports) => {
        this.airDestination = ports.find(
          (value) => {
            if (value.portID === editAir.destination) {
              return value;
            }
            return '';
          }
        );
      }
    );
    this.airCurr = this.currencys.find(
      (value) => {
        if (value.currencyID === editAir.currency) {
          return value;
        }
        return '';
      }
    );
    this.airVendor = editAir.airline ? editAir.airline : null;

    const validFromFormat = editAir.validDateFrom ? editAir.validDateFrom.split('/').reverse().join('-') : '';
    this.validDateFrom = editAir.validDateFrom ?
                        formatDate(validFromFormat, 'yyyy-MM-dd', 'en-US') :
                        formatDate(new Date(), 'yyyy-MM-dd', 'en-US');
    const validDateToFormat = editAir.validDateTo ? editAir.validDateTo.split('/').reverse().join('-') : '';
    this.validDateTo = editAir.validDateTo ?
                        formatDate(validDateToFormat, 'yyyy-MM-dd', 'en-US') :
                        formatDate(new Date(), 'yyyy-MM-dd', 'en-US');
    this.airCarrier = editAir.carrierID ? editAir.carrierID : null;

    this.airMin = editAir.min ? editAir.min : null;
    this.airTt = editAir.tt;
    this.level1 = editAir.level1 ? editAir.level1 : null;
    this.level2 = editAir.level2 ? editAir.level2 : null;
    this.level3 = editAir.level3 ? editAir.level3 : null;
    this.airFrequency = editAir.frequency ? editAir.frequency : null;
    this.level4 = editAir.level4 ? editAir.level4 : null;
    this.airCutOff = editAir.cutOff ? editAir.cutOff : null;
    this.level5 = editAir.level5 ? editAir.level5 : null;
    this.airCreator = editAir.creator ? editAir.creator : null;
    this.level6 = editAir.level6 ? editAir.level6 : null;
    this.airNotes = editAir.notes ? editAir.notes : null;
  }

  setAirBeforSave() {
    if (this.action === 'EDIT') {
      this.dataCloneEdit.pricingID = this.data.pricingID;
      this.dataCloneEdit.creator = 'ADMIN'; // HARD CODE
      this.dataCloneEdit.dateCreate = this.dateCreate;
      this.dataCloneEdit.dateModify = this.dateModify;
      this.dataCloneEdit.origin = this.airOrigin.portID;
      this.dataCloneEdit.destination = this.airDestination.portID;
      this.dataCloneEdit.carrierID = this.airCarrier ? this.airCarrier.partnerID : '';
      this.dataCloneEdit.min = this.airMin;
      this.dataCloneEdit.level1 = this.level1;
      this.dataCloneEdit.level2 = this.level2;
      this.dataCloneEdit.level3 = this.level3;
      this.dataCloneEdit.level4 = this.level4;
      this.dataCloneEdit.level5 = this.level5;
      this.dataCloneEdit.level6 = this.level6;
      this.dataCloneEdit.fsc = this.fsc;
      this.dataCloneEdit.ssc = this.ssc;
      this.dataCloneEdit.awbSET = null;
      this.dataCloneEdit.amsHBL = null;
      this.dataCloneEdit.amsMBL = null;
      this.dataCloneEdit.xrayKG = null;
      this.dataCloneEdit.tcsKG = null;
      this.dataCloneEdit.gwc = null;
      this.dataCloneEdit.currency = this.airCurr.currencyID;
      this.dataCloneEdit.otherCharges = this.otherCharges;
      this.dataCloneEdit.transitTime = '';
      this.dataCloneEdit.frequency = this.airFrequency;
      this.dataCloneEdit.cutOff = this.airCutOff;
      this.dataCloneEdit.routing = '';
      this.dataCloneEdit.validDateFrom = this.validDateFrom ? formatDate(this.validDateFrom, 'dd/MM/yyyy', 'en-US') : '';
      this.dataCloneEdit.validDateTo = this.validDateTo ? formatDate(this.validDateTo, 'dd/MM/yyyy', 'en-US') : '';
      this.dataCloneEdit.notes = this.airNotes ? this.airNotes : '';
      this.dataCloneEdit.isPublic = false;
      this.dataCloneEdit.updateBy = this.updateBy ? this.updateBy : '';
      this.dataCloneEdit.lockedRCD = '';
      this.dataCloneEdit.action = this.action;
    } else {

      this.dataClone._id = 'randomID';
      this.dataClone.code = 'ADMIN_45463';
      this.dataClone.pricingID = 'ADMIN' + Math.floor(Math.random() * 999999);
      this.dataClone.creator = 'ADMIN'; // HARD CODE
      this.dataClone.dateCreate = this.dateCreate;
      this.dataClone.dateModify = this.dateModify;
      this.dataClone.origin = this.airOrigin.portID;
      this.dataClone.destination = this.airDestination.portID;
      this.dataClone.carrierID = this.airCarrier ? this.airCarrier.partnerID : '';
      this.dataClone.min = this.airMin;
      this.dataClone.level1 = this.level1;
      this.dataClone.level2 = this.level2;
      this.dataClone.level3 = this.level3;
      this.dataClone.level4 = this.level4;
      this.dataClone.level5 = this.level5;
      this.dataClone.level6 = this.level6;
      this.dataClone.fsc = this.fsc;
      this.dataClone.ssc = this.ssc;
      this.dataClone.awbSET = null;
      this.dataClone.amsHBL = null;
      this.dataClone.amsMBL = null;
      this.dataClone.xrayKG = null;
      this.dataClone.tcsKG = null;
      this.dataClone.gwc = null;
      this.dataClone.currency = this.airCurr.currencyID;
      this.dataClone.otherCharges = this.otherCharges;
      this.dataClone.transitTime = '';
      this.dataClone.frequency = this.airFrequency;
      this.dataClone.cutOff = this.airCutOff;
      this.dataClone.routing = '';
      this.dataClone.validDateFrom = this.validDateFrom ? formatDate(this.validDateFrom, 'dd/MM/yyyy', 'en-US') : '';
      this.dataClone.validDateTo = this.validDateTo ? formatDate(this.validDateTo, 'dd/MM/yyyy', 'en-US') : '';
      this.dataClone.notes = this.airNotes ? this.airNotes : '';
      this.dataClone.isPublic = false;
      this.dataClone.updateBy = this.updateBy ? this.updateBy : '';
      this.dataClone.lockedRCD = '';
      this.dataClone.action = this.action;
    }
  }
}