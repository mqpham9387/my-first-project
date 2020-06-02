import { CustomClearanceAddComponent } from './../../inquiry/inquiry-add/custom-clearance-add/custom-clearance-add.component';
import { BookingType } from './../../../../model/booking/booking-type.interface';
import { BookingService } from 'src/app/main/model/booking/booking.service';
import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PartnerDepartmentService } from 'src/app/main/model/partner-department/partner-department.service';
import { isEmail } from 'src/app/main/common/util';
import {
  MessageBox,
  MessageBoxButtons,
  MessageBoxIcons,
} from 'src/app/form/message/messsage';
import { PartnerService } from 'src/app/main/model/partner/partner.service';
import { PortService } from 'src/app/main/model/port/port.service';
import { CurrencyService } from 'src/app/main/model/currency/currency.service';
import { formatDate } from '@angular/common';
import { Store } from '@ngrx/store';
import * as fromMain from 'src/app/main/store/main.reducer';
import { ValueCache } from 'ag-grid-community';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InquiryService } from 'src/app/main/model/inquiry/inquiry.service';
import { Booking } from 'src/app/main/model/booking/booking.model';
import { CRUDSeaBookingComponent } from './../crud-sea-booking/crud-sea-booking.component';
import { Quotation } from 'src/app/main/model/quotation/quotation.model';
import { QuotationService } from 'src/app/main/model/quotation/quotation.service';

@Component({
  selector: 'app-make-booking',
  templateUrl: './make-booking.component.html',
  styleUrls: ['./make-booking.component.css']
})
export class MakeBookingComponent implements OnInit {
  @Input() action;
  @Input() selectedAirIndex: number;
  result: any;

  Booking: Booking;
  customsClearanceFrm: FormGroup;
  bookingTypes: any;
  BookingTypeID: any;

  // selectedInquiry;
  partners;
  isLoading = true;
  constructor(
    private store: Store<fromMain.MainState>,
    private activeModal: NgbActiveModal,
    private modal: NgbModal,
    private fb: FormBuilder,
    private partnerService: PartnerService,
    private partnerdepartmentService: PartnerDepartmentService,
    private portService: PortService,
    private currencyService: CurrencyService,
    private BookingService: BookingService
  ) {}

  async ngOnInit() {
    this.getLookUp();
    this.isLoading = false;
    this.createForm();

  }

  async getLookUp() {
    this.partners = await this.partnerService.getPartnersApi('CUSTOMERS');
    this.BookingService.getBookingTypes().subscribe((results) => {
      console.log(results);
      this.bookingTypes = results;
    });
    console.log(this.bookingTypes);
  }

  createForm(): void {
    this.customsClearanceFrm = this.fb.group({
      bookingType: ['', Validators.required],
      client: ['', Validators.required],
      cargoReadyDateFrom: [''],
      //cargoReadyDateTo: [''],
      specialRequirements: [''],
      targetedRateAndCharges: [''],
      skipCargoDate: [false],
      skipSpecialRequirement: [false],
      skipRequestedRatesCharges: [false],
    });
  }

  onInitNewBooking() {
    const validData = this.validData();
    if (validData.isValid) {
      this.onOpenNewBooking();
    } else {
      let dialogResult = MessageBox.show(
        this.modal,
        validData.message,
        'Alert',
        MessageBoxButtons.ok,
        MessageBoxIcons.warning
      );
      dialogResult.then((result) => {});
    }
  }

  close() {
    this.activeModal.dismiss();
  }

  protected onOpenNewBooking() {
    const BookingTypes = this.customsClearanceFrm.get('bookingTypes').value;
    switch (BookingTypes.quotationTypeID) {
      case 'CustomClearanceBooking':
        const modalRef = this.modal.open(CustomClearanceAddComponent, {
          backdrop: 'static',
          keyboard: false,
        });
        modalRef.componentInstance.agent = '';
        modalRef.result.then(
          (result) => {},
          (reason) => {
            console.log('reason dismiss', reason);
          }
        );
        break;
      case 'AirFreightQuotation':
        // const modalRef1 = this.modal.open(CrudAirQuotationComponent, {
        //   windowClass: 'airQuotation',
        //   backdrop: 'static',
        //   keyboard: false,
        // });
        // modalRef1.componentInstance.agent = '';
        // modalRef1.result.then(
        //   (result) => {
        //     this.activeModal.close(result);
        //   },
        //   (reason) => {
        //     console.log('reason dismiss', reason);
        //   }
        // );
        break;
      case 'CustomsClearanceAndTruckingQuotation':
        // const customClearance = new Quotation();
        // customClearance.quotationType = this.customsClearanceFrm.get(
        //   'quotationType'
        // ).value;
        // customClearance.client = this.customsClearanceFrm.get('client').value;
        // customClearance.cargoReadyDateFrom = !this.customsClearanceFrm.get(
        //   'skipCargoDate'
        // ).value
        //   ? this.customsClearanceFrm.get('cargoReadyDateFrom').value
        //   : '';
        // customClearance.cargoReadyDateTo = !this.customsClearanceFrm.get(
        //   'skipCargoDate'
        // ).value
        //   ? this.customsClearanceFrm.get('cargoReadyDateTo').value
        //   : '';
        // customClearance.specialRequirements = !this.customsClearanceFrm.get(
        //   'skipSpecialRequirement'
        // ).value
        //   ? this.customsClearanceFrm.get('specialRequirements').value
        //   : '';
        // customClearance.targetedRateAndCharges = !this.customsClearanceFrm.get(
        //   'skipRequestedRatesCharges'
        // ).value
        //   ? this.customsClearanceFrm.get('targetedRateAndCharges').value
        //   : '';
        // console.log(customClearance);

        // const modalCustomClearanceRef = this.modal.open(
        //   CustomClearanceQuoAddComponent,
        //   { size: 'xl', backdrop: 'static', keyboard: true }
        // );
        // modalCustomClearanceRef.componentInstance.action =
        //   'ADD_NEW_CUSTOM_CLEARANCE_QUOTATION';
        // modalCustomClearanceRef.componentInstance.customClearance = customClearance;
        // modalCustomClearanceRef.result.then(
        //   (result) => {
        //     this.activeModal.close(result);
        //   },
        //   (reason) => {
        //     console.log('reason dismiss', reason);
        //   }
        // );
        break;
      default:
        break;
     }
  }
  protected validData(): { isValid: boolean; message: string } {
    const bookingFormValid = this.customsClearanceFrm;
    // tslint:disable-next-line: forin
    for (const field in bookingFormValid.controls) {
      let con = bookingFormValid.get(field);
      if (con.status === 'INVALID') {
        switch (field) {
          case 'bookingType':
            return { isValid: false, message: '"Booking type" is required.' };
          default:
            break;
        }
      }
    }
    return { isValid: true, message: 'OK' };
  }

}
