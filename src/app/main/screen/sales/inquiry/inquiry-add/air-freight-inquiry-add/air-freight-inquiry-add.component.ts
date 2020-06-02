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
  selector: 'app-air-freight-inquiry-add',
  templateUrl: './air-freight-inquiry-add.component.html',
  styleUrls: ['./air-freight-inquiry-add.component.css']
})
export class AirFreightInquiryAddComponent implements OnInit, OnDestroy {
  @Input() airInquiry: Inquiry;
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
  fclLclGroup: string;
  gpdcFCL = new ServiceInquiryVolumeFCL();
  rfFCL = new ServiceInquiryVolumeFCL();
  otFCL = new ServiceInquiryVolumeFCL();
  frFCL = new ServiceInquiryVolumeFCL();
  // Pupose of import export
  puposesList: any;
  dTpPurposeOfEx: string;
  pTdPurposeOfIm:string;
  dTdPurposeOfEx: string;
  dTdPurposeOfIm:string;

  today = formatDate(new Date(), 'dd/MM/yyy', 'en-US');
  isDeadLine: boolean;
  deadlineForDelivery = formatDate(new Date(), 'dd/MM/yyy', 'en-US');
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
    this.ports = this.portService.getPortsApi();
    this.commodities = this.commodityService.getCommoditiesList();
    this.puposesList = this.puposeImExService.getPuposeImportExport();
    console.log(this.puposesList);
    
    //
    this.isLoading = false;
  }

  save() {
    this.setAirInquiryBeforSave();

    this.dataClone = this.airInquiry;
    let validData = this.validData(this.airInquiry);

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
          if (this.action === 'ADD_NEW_AIR_INQUIRY') {
            console.log('save...');
            this.initDataSave();
            console.log(this.airInquiry);
            console.log(this.dataClone);
            this.store.dispatch(new InquiryActions.StoreInquiry(this.dataClone));
            // this.store.dispatch(new InquiryActions.AddInquiry(this.airInquiry));
          } 

          this.activeModal.close(this.airInquiry);
        } else {
          let dialogResult = MessageBox.show(this.modal, validData.message, 'Alert', MessageBoxButtons.ok, MessageBoxIcons.warning);
          dialogResult.then((result) => { });
        }
      } else if (result === 'NO') {
        this.activeModal.close(this.airInquiry);
      } else if (result === 'CANCEL') { }
    })
  }

  close() {
    this.activeModal.dismiss(this.airInquiry);
  }

  ngOnDestroy() {
    if(this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  protected setAirInquiryBeforSave() {
    // TODO: REMOVE HARD CODE
    this.airInquiry._id = "5e688d77528b433d50" + Math.random().toString(36).substring(7);
    this.airInquiry.inquiryID = Math.random().toString(36).substring(7).toUpperCase();
    this.airInquiry.creator = contact;
    this.airInquiry.dateCreate = this.today;
    this.airInquiry.dateModify = this.today;
  
    // initial for term of service
    switch (this.termofService) {
      case this.serviceTerm.doorToPort.termID:
        this.airInquiry.customsClearanceAtOrigin = false;
        this.airInquiry.customsClearanceAtDestination = false;
        this.airInquiry.deliveryTo = '';
        this.airInquiry.pickupAt = this.dTpPickupAt;
        this.airInquiry.purposeOfExport = this.dTpPurposeOfEx;
        this.airInquiry.purposeOfImport = '';
        this.airInquiry.doorToPort = true;
        break;
      case this.serviceTerm.portToDoor.termID:
        this.airInquiry.customsClearanceAtOrigin = false;
        this.airInquiry.customsClearanceAtDestination = false;
        this.airInquiry.pickupAt = '';
        this.airInquiry.deliveryTo = this.pTdDliveryTo;
        this.airInquiry.purposeOfExport = '';
        this.airInquiry.purposeOfImport = this.pTdPurposeOfIm;
        this.airInquiry.portToDoor = true;
        break;
      case this.serviceTerm.doorToDoor.termID:
        this.airInquiry.customsClearanceAtOrigin = false;
        this.airInquiry.customsClearanceAtDestination = false;
        this.airInquiry.pickupAt = this.dTpPickupAt;
        this.airInquiry.deliveryTo = this.pTdDliveryTo;
        this.airInquiry.purposeOfExport = this.dTdPurposeOfEx;
        this.airInquiry.purposeOfImport = this.pTdPurposeOfIm;
        this.airInquiry.doorToDoor = true;
        break;
      case this.serviceTerm.portToPort.termID:
        this.airInquiry.deliveryTo = '';
        this.airInquiry.pickupAt = '';
        this.airInquiry.purposeOfExport = '';
        this.airInquiry.purposeOfImport = '';
        this.airInquiry.portToPort = true;
        // switch (this.customsClearanceMethod) {
        //   case 'CUSTOM_CLEARANCE_AT_ORIGIN':
        //     this.airInquiry.customsClearanceAtOrigin = true;
            
        //     break;
        //   case 'CUSTOM_CLEARANCE_AT_DESTINATION':
            
        //     this.airInquiry.customsClearanceAtDestination = true;
        //     break;
        //   default:
        //     this.airInquiry.customsClearanceAtOrigin = false;
        //     this.airInquiry.customsClearanceAtDestination = false;
        //     break;
        // }
      break;
      default:
        this.airInquiry.pickupAt = '';
        this.airInquiry.deliveryTo = '';
        break;
    }
    // Term of chipment: FCL or LCL
    // if (this.fclLclGroup === 'fcl') {
    //   // reset LCL
    //   this.airInquiry.volume = '';
    //   this.airInquiry.grossWeight = '';
    //   this.airInquiry.cargoIsUnstackable = false;
    //   // add to serviceInquiryVolumeFCL
    //   if (isObjHasAtLeastValue(this.gpdcFCL)) {
    //     this.airInquiry.serviceInquiryVolumeFCL.push(this.gpdcFCL);
    //   }
    //   if (isObjHasAtLeastValue(this.rfFCL)) {
    //     this.airInquiry.serviceInquiryVolumeFCL.push(this.rfFCL);
    //   }
    //   if (isObjHasAtLeastValue(this.rfFCL)) {
    //     this.airInquiry.serviceInquiryVolumeFCL.push(this.otFCL);
    //   }
    //   if (isObjHasAtLeastValue(this.rfFCL)) {
    //     this.airInquiry.serviceInquiryVolumeFCL.push(this.frFCL);
    //   }
    // }
    // if (this.fclLclGroup === 'lcl') {
    //   // reset fcl
    //   this.gpdcFCL = new ServiceInquiryVolumeFCL();
    //   this.rfFCL = new ServiceInquiryVolumeFCL();
    //   this.rfFCL = new ServiceInquiryVolumeFCL();
    //   this.rfFCL = new ServiceInquiryVolumeFCL();
    // }
  }

  protected initDataSave() {
    this.dataClone.creator = 'CT0276'; //TODO: tell backend to handle this.
    this.dataClone.client = this.airInquiry.client.partnerID;
    this.dataClone.cargoReadyDate = this.airInquiry.cargoReadyDate ? formatDate(this.airInquiry.cargoReadyDate, 'dd/MM/yyy', 'en-US') : '';
    this.dataClone.portofLoading = this.airInquiry.portofLoading ? this.airInquiry.portofLoading.portID : '';
    this.dataClone.portofDischarge = this.airInquiry.portofDischarge ? this.airInquiry.portofDischarge.portID : '';
    this.dataClone.inquiryType = this.airInquiry.inquiryType ? this.airInquiry.inquiryType.inquiryTypeID : '';
    this.dataClone.deadlineDelivery = this.airInquiry.deadlineDelivery ? formatDate(this.airInquiry.deadlineDelivery, 'dd/MM/yyy', 'en-US') : '';
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
        this.activeModal.close(this.airInquiry);
      } else if (result === 'NO') {
        
      } else if (result === 'CANCEL') { }
    })
  }

}
// TODO: remove Hard code
const contact: Contact = {
  _id: "5dedd340edfced4be5a33ef2",
  contactID: "CT01245",
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