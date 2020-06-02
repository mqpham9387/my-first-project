import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgGridModule } from 'ag-grid-angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { FormModule } from 'src/app/form/form.module';

import { RateChargesComponent } from './rate-charges.component';

import { CustomHeader } from 'src/app/main/common/ag-grid-header-custom';
import { AirFreightAddComponent } from './air-freight-add/air-freight-add.component';
import { SeaFreightAddComponent } from './lcl-tariff/sea-freight-add/sea-freight-add.component';
import { SeaGeneralComponent } from '../inquiry/sea/seaGeneral.component';
import { AirTariffComponent } from './air-tariff/air-tariff.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { LclTariffComponent } from './lcl-tariff/lcl-tariff.component';
import { AdvanceSearchComponent } from 'src/app/main/shared/advance-search/advance-search.component';
import { ActionsColumnRenderComponent } from 'src/app/main/shared/actions-column-render/actions-column-render.component';
import { FclTariffComponent } from './fcl-tariff/fcl-tariff.component';
import { FclGridDataComponent } from './fcl-tariff/fcl-grid-data/fcl-grid-data.component';
import { FclAddComponent } from './fcl-tariff/fcl-add/fcl-add.component';
import { FclEditComponent } from './fcl-tariff/fcl-edit/fcl-edit.component';
import { TruckingChargeComponent } from './trucking-charge/trucking-charge.component';
import { TruckingChargeGridComponent } from './trucking-charge/trucking-charge-data/trucking-charge-grid.component';
import { TruckingChargeAddComponent } from './trucking-charge/trucking-charge-add/trucking-charge-add.component';
import { LocalChargeComponent } from './local-charge/local-charge.component';
import { LocalChargeGridComponent } from './local-charge/local-charge-grid/local-charge-grid.component';
import { LocalChargeAddComponent } from './local-charge/local-charge-add/local-charge-add.component';
import { LocalChargeDetailAddComponent } from './local-charge/local-charge-detail-add/local-charge-detail-add.component';
import { CustomsClearanceComponent } from './customs-clearance/customs-clearance.component';
import { CustomsClearanceGridComponent } from './customs-clearance/customs-clearance-grid/customs-clearance-grid.component';
import { CustomsClearanceAddComponent } from './customs-clearance/add/customs-clearance-add.component';
import { CustomsClearanceEditComponent } from './customs-clearance/edit/customs-clearance-edit.component';

@NgModule({
  declarations: [
    RateChargesComponent,
    AirTariffComponent,
    LclTariffComponent,
    AirFreightAddComponent,
    SeaFreightAddComponent,
    AdvanceSearchComponent,
    FclTariffComponent,
    FclGridDataComponent,
    FclAddComponent,
    FclEditComponent,
    TruckingChargeComponent,
    TruckingChargeGridComponent,
    TruckingChargeAddComponent,
    LocalChargeComponent,
    LocalChargeGridComponent,
    LocalChargeAddComponent,
    LocalChargeDetailAddComponent,
    CustomsClearanceComponent,
    CustomsClearanceGridComponent,
    CustomsClearanceAddComponent,
    CustomsClearanceEditComponent
  ],
  imports: [
    CommonModule,
    AgGridModule.withComponents([]),
    FormsModule, ReactiveFormsModule,
    NgbModule,
    NgSelectModule,
    RouterModule,
    HttpClientModule,
    FormModule
  ],
  entryComponents: [
    CustomHeader,
    AirTariffComponent,
    LclTariffComponent,
    AirFreightAddComponent,
    SeaFreightAddComponent,
    AdvanceSearchComponent,
    ActionsColumnRenderComponent,
    FclTariffComponent,
    FclGridDataComponent,
    FclAddComponent,
    FclEditComponent,
    TruckingChargeGridComponent,
    TruckingChargeAddComponent,
    LocalChargeComponent,
    LocalChargeGridComponent,
    LocalChargeAddComponent,
    LocalChargeDetailAddComponent,
    CustomsClearanceComponent,
    CustomsClearanceGridComponent,
    CustomsClearanceAddComponent,
    CustomsClearanceEditComponent
  ],
  providers: [
  ]
})
export class RateChargesModule { }
