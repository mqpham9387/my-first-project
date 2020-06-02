import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainComponent } from './main.component';

import { DashBoardComponent } from './screen/other/dash-board/dash-board.component';
import { SearchComponent } from './screen/other/search/search.component';
import { CommodityComponent } from './screen/catalogue/commodity/commodity.component';
import { CurrencyComponent } from './screen/catalogue/currency/currency.component'
import { PortIndexComponent } from './screen/catalogue/port-index/port-index.component';
import { ShipmentTypeComponent } from './screen/catalogue/shipment-type/shipment-type.component'
import { HandlingTaskComponent } from './screen/catalogue/handling-task/handling-task.component';
import { Soc_listComponent } from './screen/catalogue/soc_list/soc-list.component';
import { MeasurementComponent } from './screen/catalogue/measurement/measurement.component';
import { InquiryComponent } from './screen/sales/inquiry/inquiry.component';
import { QuotationComponent } from './screen/sales/quotation/quotation.component';
import { VesselComponent } from './screen/sales/vessel/vessel.component';
import { RateChargesComponent } from './screen/sales/rate-charges/rate-charges.component';
import { SentInquiryComponent } from './screen/sales/inquiry/sent-inquiri/sent-inquiry.component';
import { ReceivedInquiryComponent } from './screen/sales/inquiry/received-inquiri/received-inquiry.component';
import { AgentComponent } from './screen/catalogue/agent/agent.component';
import { CarrierComponent } from './screen/catalogue/carrier/carrier.component';
import { CustomerComponent } from './screen/catalogue/customer/customer.component';
import { LeadComponent } from './screen/catalogue/lead/lead.component';
import { VendorComponent } from './screen/catalogue/vendor/vendor.component';
import { AuthGuard } from '../auth/auth.guard';
import { AirTariffComponent } from './screen/sales/rate-charges/air-tariff/air-tariff.component';
import { FclTariffComponent } from './screen/sales/rate-charges/fcl-tariff/fcl-tariff.component';
import { LclTariffComponent } from './screen/sales/rate-charges/lcl-tariff/lcl-tariff.component';
import { TruckingChargeComponent } from './screen/sales/rate-charges/trucking-charge/trucking-charge.component';
import { LocalChargeComponent } from './screen/sales/rate-charges/local-charge/local-charge.component';
import { BookingComponent } from './screen/sales/bookings/booking.component';

const routes: Routes = [{
  path: 'main',
  component: MainComponent,
  children: [
    { path: '', redirectTo: 'dash-board', pathMatch: 'full' },
    { path: '#', redirectTo: 'dash-board', pathMatch: 'full' },
    { path: 'dash-board', component: DashBoardComponent },
    { path: 'search', component: SearchComponent},
    { path: 'agent', component: AgentComponent,canActivate: [AuthGuard] },
    { path: 'carrier', component: CarrierComponent },
    { path: 'customer', component: CustomerComponent,canActivate: [AuthGuard], },
    { path: 'lead', component: LeadComponent,canActivate: [AuthGuard] },
    { path: 'search', component: SearchComponent },
    { path: 'agent', component: AgentComponent },
    { path: 'carrier', component: CarrierComponent },
    { path: 'customer', component: CustomerComponent },
    { path: 'lead', component: LeadComponent },

    { path: 'vendor', component: VendorComponent },
    { path: 'commodity', component: CommodityComponent },
    { path: 'currency', component: CurrencyComponent },
    { path: 'port-index', component: PortIndexComponent },
    { path: 'shipmenttype', component: ShipmentTypeComponent },
    { path: 'handlingtask', component: HandlingTaskComponent },
    { path: 'container', component: Soc_listComponent },
    { path: 'measurement', component: MeasurementComponent },
    { path: 'search', component: SearchComponent },
    { path: 'sales-executive/vessel-schedules', component: VesselComponent },
    { path: 'inquiry', component: InquiryComponent },
    { path: 'quotation', component: QuotationComponent },
    {
      path: 'sales-executive/rate-charges',
      component: RateChargesComponent,
      children: [
        { path: '', redirectTo: 'air-freight', pathMatch: 'full' },
        { path: 'air-freight', component: RateChargesComponent },
        { path: 'fcl-tariff', component: RateChargesComponent },
        { path: 'lcl-tariff', component: RateChargesComponent },
        { path: 'trucking-charges', component: RateChargesComponent },
        { path: 'customs-clearance', component: RateChargesComponent },
        { path: 'local-charge-tariff', component: RateChargesComponent },
      ]
    },
    {
      path: 'sales-executive/service-inquiry',
      component: InquiryComponent,
      children: [
        { path: '', redirectTo: 'sent-inquiries', pathMatch: 'full' },
        { path: 'sent-inquiries', component: SentInquiryComponent },
        { path: 'received-inquiries', component: ReceivedInquiryComponent }
      ]
    },
    { path: 'booking', component: BookingComponent },

  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule {}