import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PartnerDepartmentService } from 'src/app/main/model/partner-department/partner-department.service';
import { isEmail } from 'src/app/main/common/util';
import { MessageBox, MessageBoxButtons, MessageBoxIcons } from 'src/app/form/message/messsage';
import { PartnerService } from 'src/app/main/model/partner/partner.service';
import { PortService } from 'src/app/main/model/port/port.service';
import { CurrencyService } from 'src/app/main/model/currency/currency.service';
import { formatDate } from '@angular/common';
import { Store } from '@ngrx/store';
import * as fromMain from '../../../../../store/main.reducer';
import { ValueCache } from 'ag-grid-community';
import { Inquiry } from 'src/app/main/model/inquiry/inquiry.model';
import { Partner } from 'src/app/main/model/partner/partner';
import { InquiryService } from 'src/app/main/model/inquiry/inquiry.service';
import { SeaFreightInquiryAddComponent } from '../sea-freight-inquiry-add/sea-freight-inquiry-add.component';
import { AirFreightInquiryAddComponent } from '../air-freight-inquiry-add/air-freight-inquiry-add.component';
import { CustomClearanceAddComponent } from '../custom-clearance-add/custom-clearance-add.component';


@Component({
  selector: 'app-make-inquiries',
  templateUrl: './make-inquiry.component.html',
  styleUrls: ['./make-inquiry.component.css']
})
export class MakeInquiryComponent implements OnInit {
  @Input() action
  @Input() selectedAirIndex: number

  inquiry: Inquiry;
  inquiriesType;
  selectedInquiry;
  partners;
  client;
  cargoDate;
  skipCargoDate: boolean = false;
  specialRequirement;
  skipSpecialRequirement: boolean = false;
  requestedRatesCharges;
  skipRequestedRatesCharges: boolean = false;

  isLoading: boolean = true;
  
  // dateModify = formatDate(new Date(), 'yyyy-MM-dd', 'en-US');
  constructor(
    private store: Store<fromMain.MainState>,
    private activeModal: NgbActiveModal,
    private modal: NgbModal,
    private partnerService: PartnerService,
    private partnerdepartmentService: PartnerDepartmentService,
    private portService: PortService,
    private currencyService: CurrencyService,
    private inquiryService: InquiryService
  ) { }

  async ngOnInit() {
    // console.log("Action " + this.action);
    // console.log(this.data);
    
    // 1. inquiriesType
    this.inquiriesType = this.inquiryService.getInquiriesType();
    // Client -> Partner
    this.partners = await this.partnerService.getPartnersApi('CUSTOMERS');
    
    
    this.isLoading = false;
  }

  onInitNewInquiry() {
    
    this. inquiry = new Inquiry();
    // initial value
    this.inquiry.inquiryType = this.selectedInquiry ? this.selectedInquiry : null;
    this.inquiry.client = this.client ? this.client : null;
    this.inquiry.cargoReadyDate = (!this.skipCargoDate && this.cargoDate) ? this.cargoDate : null;
    this.inquiry.specialRequirement = (this.skipSpecialRequirement && this.specialRequirement) ? this.specialRequirement : null;
    this.inquiry.targetRateAndCharges = (!this.skipRequestedRatesCharges && this.requestedRatesCharges) ? this.specialRequirement : null;
    let validData = this.validData(this.inquiry);
    if(validData.isValid) {
      // TODO: need check if the type of Inquiry is sea/air/customs?
      this.onOpenNewInquiry();
      
    } else {
      let dialogResult = MessageBox.show(this.modal, validData.message, 'Alert', MessageBoxButtons.ok, MessageBoxIcons.warning);
      dialogResult.then((result) => { });
    }
  }

  close() {
    this.activeModal.dismiss(this.inquiry);
  }

  protected onOpenNewInquiry() {
    switch (this.inquiry.inquiryType.inquiryTypeID) {
      case 'SeaFreightQuotation':
        const modalRef = this.modal.open(
                              SeaFreightInquiryAddComponent,
                              { windowClass: 'gr-modal-sea-inquiry', backdrop: 'static', keyboard: false });
        modalRef.componentInstance.action = 'ADD_NEW_INQUIRY';
        modalRef.componentInstance.seaInquiry = this.inquiry
        modalRef.result.then((result) => {
          console.log(result);
          this.activeModal.close(result);
        }, (reason) => {
          console.log('reason dismiss', reason);
        })
        break;
      case 'AirFreightQuotation':
        const modalAirRef = this.modal.open(
          AirFreightInquiryAddComponent,
          { windowClass: 'gr-modal-air-inquiry', backdrop: 'static', keyboard: false });
        modalAirRef.componentInstance.action = 'ADD_NEW_AIR_INQUIRY';
        modalAirRef.componentInstance.airInquiry = this.inquiry
        modalAirRef.result.then((result) => {
          this.activeModal.close(result);
        }, (reason) => {
          console.log('reason dismiss', reason);
        })
        break;
      case 'CustomsClearanceAndTruckingQuotation':
        const modalCustomClearanceRef = this.modal.open(
          CustomClearanceAddComponent,
          { windowClass: 'gr-modal-air-inquiry', backdrop: 'static', keyboard: false });
        modalCustomClearanceRef.componentInstance.action = 'ADD_NEW_CUSTOM_CLEARANCE_INQUIRY';
        modalCustomClearanceRef.componentInstance.customClearance = this.inquiry
        modalCustomClearanceRef.result.then((result) => {
          this.activeModal.close(result);
        }, (reason) => {
          console.log('reason dismiss', reason);
        });
        break;
      default:
        console.log('foo');
        break;
    }
    
  }
  protected validData(inquiry: Inquiry) {
    let isValid = true;
    let message = '';
    
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

}