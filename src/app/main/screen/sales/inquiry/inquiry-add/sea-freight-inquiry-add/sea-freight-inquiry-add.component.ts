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
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Contact } from 'src/app/main/model/contact/contact';
import { CommodityService } from 'src/app/main/model/commodity/commodity.service';
import { PuposeImportExportService } from 'src/app/main/model/inquiry/pupose-import-export/pupose-import-export.service';

@Component({
  selector: 'app-sea-freight-inquiry-add',
  templateUrl: './sea-freight-inquiry-add.component.html',
  styleUrls: ['./sea-freight-inquiry-add.component.css']
})
export class SeaFreightInquiryAddComponent implements OnInit, OnDestroy {
  @Input() seaInquiry: Inquiry;
  @Input() action;

  subscription: Subscription;
  ports;
  isLoading = true;

  termofService = 'PTP';
  customsClearanceMethod = 'CUSTOM_CLEARANCE_AT_ORIGIN';
  readonly serviceTerm = {
    portToPort: { termID: "PTP", termName: "Port To Port" },
    doorToPort: { termID: "DTP", termName: "Door To Port" },
    portToDoor: { termID: "PTD", termName: "Port To Door" },
    doorToDoor: { termID: "DTD", termName: "Door To Door" }
  };
  dTpPickupAt: string;
  pTdDliveryTo: string;
  dTdPickupAt: string;
  dTdDeliveryTo: string;
  // FCL
  fclGroup: boolean;
  lclGroup: boolean;
  gpdcFCL = new ServiceInquiryVolumeFCL();
  rfFCL = new ServiceInquiryVolumeFCL();
  otFCL = new ServiceInquiryVolumeFCL();
  frFCL = new ServiceInquiryVolumeFCL();
  isoFCL = new ServiceInquiryVolumeFCL();
  ISOtypes = [
    'Foodgrade',
    'Chemicals'
  ];
  // Pupose of import export
  puposesList: any;
  dTpPurposeOfEx: string;
  pTdPurposeOfIm:string;
  dTdPurposeOfEx: string;
  dTdPurposeOfIm:string;

  today = formatDate(new Date(), 'dd/MM/yyy', 'en-US');
  commodities: Observable<Array<any>>;
  dataClone:any;

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
    private puposeImExService: PuposeImportExportService
  ) { }

  async ngOnInit() {
    // console.log("Action " + this.action);
    // console.log(this.data);
    this.ports = this.portService.getPortsApi();
    this.commodities = this.commodityService.getCommoditiesList();
    this.puposesList = this.puposeImExService.getPuposeImportExport();
    this.isLoading = false;
  }

  save() {
    // Init data for add new
    this.setSeaInquiryBeforSave();
    this.dataClone = this.seaInquiry;
    // var validData = this.validData();
    let validData = this.validData(this.seaInquiry);

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
          if (this.action === 'ADD_NEW_INQUIRY') {
            console.log('save...');
            this.initDataSave();
            this.store.dispatch(new InquiryActions.StoreInquiry(this.dataClone));
            // this.store.dispatch(new InquiryActions.AddInquiry(this.seaInquiry));
          }

          this.activeModal.close(this.seaInquiry);
        } else {
          let dialogResult = MessageBox.show(this.modal, validData.message, 'Alert', MessageBoxButtons.ok, MessageBoxIcons.warning);
          dialogResult.then((result) => { });
        }
      } else if (result === 'NO') {
        this.activeModal.close(this.seaInquiry);
      } else if (result === 'CANCEL') { }
    })
  }

  close() {
    this.activeModal.dismiss(this.seaInquiry);
  }

  ngOnDestroy() {
    if(this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  protected setSeaInquiryBeforSave() {
    // TODO: REMOVE HARD CODE
    this.seaInquiry._id = "5e688d77528b433d50" + Math.random().toString(36).substring(7);
    this.seaInquiry.inquiryID = Math.random().toString(36).substring(7).toUpperCase();
    this.seaInquiry.creator = contact;
    this.seaInquiry.dateCreate = this.today;
    this.seaInquiry.dateModify = this.today;

    // initial for term of service
    switch (this.termofService) {
      case this.serviceTerm.doorToPort.termID:
        this.seaInquiry.deliveryTo = '';
        this.seaInquiry.pickupAt = this.dTpPickupAt
        this.seaInquiry.customsClearanceAtOrigin = false;
        this.seaInquiry.customsClearanceAtDestination = false;
        this.seaInquiry.purposeOfExport = this.dTpPurposeOfEx;
        this.seaInquiry.purposeOfImport = '';
        this.seaInquiry.doorToPort = true;
        break;
      case this.serviceTerm.portToDoor.termID:
        this.seaInquiry.pickupAt = '';
        this.seaInquiry.deliveryTo = this.pTdDliveryTo;
        this.seaInquiry.customsClearanceAtOrigin = false;
        this.seaInquiry.customsClearanceAtDestination = false;
        this.seaInquiry.purposeOfExport = '';
        this.seaInquiry.purposeOfImport = this.pTdPurposeOfIm;
        this.seaInquiry.portToDoor = true;
        break;
      case this.serviceTerm.doorToDoor.termID:
        this.seaInquiry.customsClearanceAtOrigin = false;
        this.seaInquiry.customsClearanceAtDestination = false;
        this.seaInquiry.pickupAt = this.dTpPickupAt;
        this.seaInquiry.deliveryTo = this.pTdDliveryTo;
        this.seaInquiry.purposeOfExport = this.dTdPurposeOfEx;
        this.seaInquiry.purposeOfImport = this.pTdPurposeOfIm;
        this.seaInquiry.doorToDoor = true;
        break;
      case this.serviceTerm.portToPort.termID:
        this.seaInquiry.deliveryTo = '';
        this.seaInquiry.pickupAt = '';
        this.seaInquiry.purposeOfExport = '';
        this.seaInquiry.purposeOfImport = '';
        this.seaInquiry.portToPort = true;
        // switch (this.customsClearanceMethod) {
        //   case 'CUSTOM_CLEARANCE_AT_ORIGIN':
        //     this.seaInquiry.customsClearanceAtOrigin = true;
        //     this.seaInquiry.customsClearanceAtDestination = false;
        //     break;
        //   case 'CUSTOM_CLEARANCE_AT_DESTINATION':
        //     this.seaInquiry.customsClearanceAtOrigin = false;
        //     this.seaInquiry.customsClearanceAtDestination = true;
        //     break;
        //   default:
        //     this.seaInquiry.customsClearanceAtOrigin = false;
        //     this.seaInquiry.customsClearanceAtDestination = false;
        //     break;
        // }
      break;
      default:
        this.seaInquiry.pickupAt = '';
        this.seaInquiry.deliveryTo = '';
        break;
    }
    // Term of chipment: FCL or LCL
    if (this.fclGroup) {
      // reset LCL
      this.seaInquiry.volume = '';
      this.seaInquiry.grossWeight = '';
      this.seaInquiry.cargoIsUnstackable = false;
      // add to serviceInquiryVolumeFCL
      if (isObjHasAtLeastValue(this.gpdcFCL)) {
        this.seaInquiry.serviceInquiryVolumeFCL.push(this.gpdcFCL);
      }
      if (isObjHasAtLeastValue(this.rfFCL)) {
        this.seaInquiry.serviceInquiryVolumeFCL.push(this.rfFCL);
      }
      if (isObjHasAtLeastValue(this.rfFCL)) {
        this.seaInquiry.serviceInquiryVolumeFCL.push(this.otFCL);
      }
      if (isObjHasAtLeastValue(this.rfFCL)) {
        this.seaInquiry.serviceInquiryVolumeFCL.push(this.frFCL);
      }
      if (isObjHasAtLeastValue(this.isoFCL)) {
        this.seaInquiry.serviceInquiryVolumeFCL.push(this.isoFCL);
      }
    }
    if (this.lclGroup) {
      // reset fcl
      this.gpdcFCL = new ServiceInquiryVolumeFCL();
      this.rfFCL = new ServiceInquiryVolumeFCL();
      this.rfFCL = new ServiceInquiryVolumeFCL();
      this.rfFCL = new ServiceInquiryVolumeFCL();
      this.isoFCL = new ServiceInquiryVolumeFCL();
    }
  }

  protected initDataSave() {
    this.dataClone.creator = 'CT0276'; //TODO: tell backend to handle this.
    this.dataClone.client = this.seaInquiry.client.partnerID;
    this.dataClone.cargoReadyDate = this.seaInquiry.cargoReadyDate ? formatDate(this.seaInquiry.cargoReadyDate, 'dd/MM/yyy', 'en-US') : '';
    this.dataClone.portofLoading = this.seaInquiry.portofLoading ? this.seaInquiry.portofLoading.portID : '';
    this.dataClone.portofDischarge = this.seaInquiry.portofDischarge ? this.seaInquiry.portofDischarge.portID : '';
    this.dataClone.inquiryType = this.seaInquiry.inquiryType ? this.seaInquiry.inquiryType.inquiryTypeID : '';
    this.dataClone.deadlineDelivery = this.seaInquiry.deadlineDelivery ?
                                      formatDate(this.seaInquiry.deadlineDelivery, 'dd/MM/yyy', 'en-US') : '';
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
        this.activeModal.close(this.seaInquiry);
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