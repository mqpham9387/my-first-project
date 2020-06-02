import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InquiryModule } from './inquiry/inquiry.module';
import { QuotationModule } from './quotation/quotation.module';
import { VesselModule } from './vessel/vessel.module';
import { RateChargesModule } from './rate-charges/rate-charges.module';
import { BookingModule } from './bookings/booking.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    InquiryModule,
    QuotationModule,
    VesselModule,
    RateChargesModule,
    BookingModule
  ]
})
export class SalesModule { }
