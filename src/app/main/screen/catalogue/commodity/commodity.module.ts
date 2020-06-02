import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommodityComponent } from './commodity.component';
import { AgGridModule } from 'ag-grid-angular';
import { CURD_commodityComponent } from './CURD_commodity/CURD_commodity.component';
import { FormsModule } from '@angular/forms';

@NgModule({
    declarations: [
        CommodityComponent,
        CURD_commodityComponent
    ],
    imports: [
      CommonModule,
      AgGridModule,
      FormsModule,
    ],
    entryComponents: [
      CURD_commodityComponent
    ],
  })
  export class CommodityModule { }