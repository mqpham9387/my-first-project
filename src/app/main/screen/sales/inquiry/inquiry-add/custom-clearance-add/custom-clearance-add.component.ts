import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PartnerDepartmentService } from 'src/app/main/model/partner-department/partner-department.service';
import { isEmail, isObjHasAtLeastValue } from 'src/app/main/common/util';
import { MessageBox, MessageBoxButtons, MessageBoxIcons } from 'src/app/form/message/messsage';
import { PartnerService } from 'src/app/main/model/partner/partner.service';
import { PortService } from 'src/app/main/model/port/port.service';
import { CurrencyService } from 'src/app/main/model/currency/currency.service';
import { formatDate } from '@angular/common';
import * as fromMain from '../../../../../store/main.reducer';
import { ValueCache, LoggerFactory } from 'ag-grid-community';
import { Inquiry } from 'src/app/main/model/inquiry/inquiry.model';
import { Partner } from 'src/app/main/model/partner/partner';
import { InquiryService } from 'src/app/main/model/inquiry/inquiry.service';
import { Subscription, Observable } from 'rxjs';
import { Port } from 'src/app/main/model/port/port';
import { ServiceInquiryVolumeFCL } from 'src/app/main/model/inquiry/service-inquiry-volumeFCL.model';
import * as InquiryActions from '../../store/inquiry.actions';
import { Contact } from 'src/app/main/model/contact/contact';
import { CommodityService } from 'src/app/main/model/commodity/commodity.service';
import { Commodity } from 'src/app/main/model/commodity/commodity';
import { CustomsClearanceTypeService } from 'src/app/main/model/inquiry/customsClearanceServiceType/customs-clearance-service-type.service';
import { CustomsClearanceServiceType } from 'src/app/main/model/inquiry/customsClearanceServiceType/customs-clearance-service-type.model';

@Component({
  selector: 'app-custom-clearance-add',
  templateUrl: './custom-clearance-add.component.html',
  styleUrls: ['./custom-clearance-add.component.css']
})
export class CustomClearanceAddComponent implements OnInit, OnDestroy {
  @Input() customClearance: Inquiry;
  @Input() action;

  subscription: Subscription;
  ports;
  commodities: Observable<Array<any>>
  clearanceTypes: CustomsClearanceServiceType[];
  selectedCommodity;

  isLoading = true;

  termofService = 'PTP';
  customsClearanceMethod = 'CUSTOM_CLEARANCE_AT_ORIGIN';
  readonly serviceTerm = {
    portToPort: { termID: "PTP", termName: "Port To Port" },
    doorToPort: { termID: "DTP", termName: "Door To Port" },
    portToDoor: { termID: "PTD", termName: "Port To Door" },
    doorToDoor: { termID: "DTD", termName: "Door To Door" }
  };

  // FCL
  fclLclGroup: string;
  gpdcFCL = new ServiceInquiryVolumeFCL();
  rfFCL = new ServiceInquiryVolumeFCL();
  otFCL = new ServiceInquiryVolumeFCL();
  frFCL = new ServiceInquiryVolumeFCL();

  today = formatDate(new Date(), 'dd/MM/yyy', 'en-US');

  deadlineForDelivery = formatDate(new Date(), 'dd/MM/yyy', 'en-US');
  isExport;
  dataClone;


  constructor(
    private store: Store<fromMain.MainState>,
    private activeModal: NgbActiveModal,
    private modal: NgbModal,
    private partnerService: PartnerService,
    private partnerdepartmentService: PartnerDepartmentService,
    private portService: PortService,
    private currencyService: CurrencyService,
    private inquiryService: InquiryService,
    private commodityService: CommodityService,
    private clearanceTypeService: CustomsClearanceTypeService
  ) {

   }

  async ngOnInit() {

    this.ports = this.portService.getPortsApi();
    this.commodities = this.commodityService.getCommoditiesList();
    this.clearanceTypes = this.clearanceTypeService.getCustomsClearanceServiceType();

    console.log(this.commodities);
    
    this.isLoading = false;
  }

  save() {
    // Init data for add new
    this.setCustomClearBeforSave();
    this.dataClone = this.customClearance;
    // var validData = this.validData();
    let validData = this.validData(this.customClearance);

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
          if (this.action === 'ADD_NEW_CUSTOM_CLEARANCE_INQUIRY') {
            console.log('save...');
            this.initDataSave();
            console.log(this.customClearance);
            console.log(this.dataClone);
            this.store.dispatch(new InquiryActions.StoreInquiry(this.dataClone));
            // this.store.dispatch(new InquiryActions.AddInquiry(this.customClearance));
          } else {
            // this.store.dispatch(new InquiryActions.UpdateInquiry({
            //   index : this.selectedAirIndex,
            //   newAirFreight: this.dataClone
            // }));
          }

          this.activeModal.close(this.customClearance);
        } else {
          let dialogResult = MessageBox.show(this.modal, validData.message, 'Alert', MessageBoxButtons.ok, MessageBoxIcons.warning);
          dialogResult.then((result) => { });
        }
      } else if (result === 'NO') {
        this.activeModal.close(this.customClearance);
      } else if (result === 'CANCEL') { }
    })
  }

  close() {
    this.activeModal.dismiss(this.customClearance);
  }

  ngOnDestroy() {
    if(this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  protected setCustomClearBeforSave() {
    // initial for term of service
    // TODO: REMOVE HARD CODE
    this.customClearance._id = "5e688d77528b433d50" + Math.random().toString(36).substring(7);
    this.customClearance.inquiryID = Math.random().toString(36).substring(7).toUpperCase();
    this.customClearance.creator = contact;
    this.customClearance.dateCreate = this.today;
    this.customClearance.dateModify = this.today;
    this.customClearance.customsClearanceAtOrigin = false;
    if(this.isExport === 'CUSTOM_CLEARANCE_IMPORT') {
      this.customClearance.isExport = false;
    } else {
      this.customClearance.isExport = true;
    }
    
  }

  protected initDataSave() {
    this.dataClone.creator = 'CT0276'; //TODO: tell backend to handle this.
    this.dataClone.client = this.customClearance.client.partnerID;
    this.dataClone.cargoReadyDate = this.customClearance.cargoReadyDate ? formatDate(this.customClearance.cargoReadyDate, 'dd/MM/yyy', 'en-US') : '';
    this.dataClone.portofLoading = this.customClearance.portofLoading ? this.customClearance.portofLoading.portID : '';
    this.dataClone.portofDischarge = this.customClearance.portofDischarge ? this.customClearance.portofDischarge.portID : '';
    this.dataClone.inquiryType = this.customClearance.inquiryType ? this.customClearance.inquiryType.inquiryTypeID : '';
    this.dataClone.deadlineDelivery = this.customClearance.deadlineDelivery ? formatDate(this.customClearance.deadlineDelivery, 'dd/MM/yyy', 'en-US') : '';
  }

  protected validData(inquiry: Inquiry) {
    let isValid = true;
    let message = '';
    console.log(inquiry);
    if (inquiry.inquiryType == null || inquiry.inquiryType === '') {
      isValid = false;
      message = "The field 'Type of inquiry' can't be empty. ";
    }
    if (inquiry.client == null || inquiry.client.partnerID === '') {
      isValid = false;
      message = message ?  message + "The field Client can't be empty." : "The field Client can't be empty.";
    }

    return { isValid: isValid, message: message };
  }

  cancel() {
    let dialogResult = MessageBox.show(
      this.modal,
      'Are you sure want to cancel?',
      'Confirm',
      MessageBoxButtons.yesNoCancel,
      MessageBoxIcons.question
    );
    dialogResult.then(async (result) => {
      if (result === 'YES') {
        this.activeModal.close(this.customClearance);
      } else if (result === 'NO') {
        
      } else if (result === 'CANCEL') { }
    })
  }

}
// TODO: remove Hard code
const contact: Contact = {
  _id: "5dedd340edfced4be5a33ef2",
  contactID: "ADMIN",
  creator: null,
  dateCreate: "2006-12-31",
  dateModify: "2006-12-31",
  contactName: "Adminnistrator",
  englishName: "HCMHIENNT",
  address: null,
  birthday: null,
  telephone: "0918653659",
  identifyCard: null,
  extNo: "101",
  joiningDate: "2006-12-31",
  position: "LOG MANAGER",
  group: null,
  department: "DP010",
  knowledge: null,
  email: "rachel.vnsgn@beelogistics.com",
  emailPassword: null,
  photo: null,
  photoSize: null,
  approveAmount: 0.0,
  exceptionApproveBy: null,
  saleTargetUSD: 0.0,
  saleTargetLC: 0.0,
  percentBonus: 0.0,
  percentFixedProfit: 0.0,
  userName: "HCMHIENNT",
  password: "123",
  accountUsernameReference: null,
  disable: false,
  stopWorking: false,
  stopWorkingDate: null,
  hideSearch: true,
  isLocalUserInOffice: null,
  accessRight: "",
  accessDescription: "Document Management"
};