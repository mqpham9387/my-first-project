import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { NgSelectModule } from '@ng-select/ng-select';
import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main.component';
import { CatalogueModule } from './screen/catalogue/catalogue.module';
import { OtherModule } from './screen/other/other.module';
import { CustomHeader } from './common/ag-grid-header-custom';
import { ButtonRendererComponent } from './common/button-renderer.component';
import { FormModule } from '../form/form.module';
import { SalesModule } from './screen/sales/sales.module';
import * as fromMain from './store/main.reducer';
import { VesselEffects } from './screen/sales/vessel/store/vessel.effects';
import { AirFreightEffects } from './screen/sales/rate-charges/store/air-freight/air-freight.effects';
import { SeaFreightEffects } from './screen/sales/rate-charges/store/sea-freight/sea-freight.effects';
import { InquiryEffects } from './screen/sales/inquiry/store/inquiry.effects';
import { ReceivedInquiryEffects } from './screen/sales/inquiry/store/received-inquiry/received-inquiry.effects';
import { ReportEffects } from './report/store/report.effects';
import { TruckingChargeEffects } from './screen/sales/rate-charges/store/trucking-charge/trucking-charge.effects';
import { LocalChargeEffects } from './screen/sales/rate-charges/store/local-charge/local-charge.effects';
import { CustomsCleanranceEffects } from './screen/sales/rate-charges/store/customs-clearance/customs-clearance.effects';

import { LocalChargeDetailEffects } from './screen/sales/rate-charges/store/local-charge-detail/local-charge-detail.effects';

import { ButtonRenderer2Component } from './common/button-renderer2.component';
import { QuotationEffects } from './screen/sales/quotation/store/quotation/quotation.effects';
import { RcChargeDetailActionComponent } from './shared/actions-column-render/rc-charge-detail-action.component';
import { BookingEffects } from './screen/sales/bookings/store/booking.effects';

@NgModule({
  declarations: [
    MainComponent,
    CustomHeader,
    ButtonRendererComponent,
    ButtonRenderer2Component,
    RcChargeDetailActionComponent,
  ],
  imports: [
    CommonModule,
    StoreModule.forRoot(fromMain.mainReducer),
    EffectsModule.forRoot([
      VesselEffects,
      AirFreightEffects,
      SeaFreightEffects,
      InquiryEffects,
      ReceivedInquiryEffects,
      ReportEffects,
      TruckingChargeEffects,
      LocalChargeEffects,
      LocalChargeDetailEffects,
      CustomsCleanranceEffects,
      QuotationEffects,
      BookingEffects,
    ]),
    MainRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    OtherModule,
    FormModule,
    CatalogueModule,
    NgSelectModule,
    SalesModule,
  ],
})
export class MainModule {}
