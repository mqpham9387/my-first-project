import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommodityModule} from './commodity/commodity.module';
import { CurrencyModule} from './currency/currency.module';
import {updateRatesComponent} from './currency/updateRates/updateRates.component'
import {NgbModule } from '@ng-bootstrap/ng-bootstrap'
import { FormModule } from 'src/app/form/form.module';
import { PortindexModule} from './port-index/port-index.module'
import { ShipmentTypeModule } from './shipment-type/shipment-type.module';
import { HandlingTaskModule } from './handling-task/handling-task.module';
import { Soc_listModule } from './soc_list/soc-list.module';
import { MeasurementModule } from './measurement/measurement.module';
import { LeadModule } from './lead/lead.module';
import { CustomerModule } from './customer/customer.module';
import { AgentModule } from './agent/agent.module';
import { VendorModule } from './vendor/vendor.module';
import { CarrierModule } from './carrier/carrier.module';
import { ModalModule } from '../modal/modal.module';


@NgModule({
    declarations: [
      updateRatesComponent,
      
    ],
    imports: [
      
      CommonModule,
    CommodityModule,
    CurrencyModule,
    NgbModule,
    FormModule,
    PortindexModule,
    ShipmentTypeModule,
    HandlingTaskModule,
    Soc_listModule,
    MeasurementModule,
    LeadModule,
    CustomerModule,
    AgentModule,
    VendorModule,
    CarrierModule,
    ModalModule,
    
        ],
    entryComponents:[
      updateRatesComponent
    ]
    
  })
  export class CatalogueModule { }