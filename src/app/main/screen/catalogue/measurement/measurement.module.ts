import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AgGridModule } from 'ag-grid-angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { FormModule } from 'src/app/form/form.module';

import { MeasurementComponent } from './measurement.component';
import { CustomHeader } from 'src/app/main/common/ag-grid-header-custom';


@NgModule({
  declarations: [MeasurementComponent],
  imports: [
    CommonModule,
      AgGridModule,
      FormModule,FormsModule,
     
  ],
  entryComponents: [
    CustomHeader,
   
  ]
})
export class MeasurementModule { }
