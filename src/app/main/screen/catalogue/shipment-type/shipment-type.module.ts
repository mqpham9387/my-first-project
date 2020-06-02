import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgGridModule } from 'ag-grid-angular';
import { FormModule } from 'src/app/form/form.module';
import { FormsModule} from '@angular/forms';
import { ShipmentTypeComponent } from './shipment-type.component';
import { CRUDshipmentTypeComponent } from './CRUD_shipmentType/CRUD_shipmentType.component';
@NgModule({
    declarations: [ ShipmentTypeComponent,CRUDshipmentTypeComponent],
    imports: [ CommonModule,AgGridModule,
        FormModule,FormsModule, ],
    exports: [],
    providers: [],
    entryComponents: [
        CRUDshipmentTypeComponent
      ]
})
export class ShipmentTypeModule {}