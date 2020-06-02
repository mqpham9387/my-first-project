import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgGridModule } from 'ag-grid-angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { FormModule } from 'src/app/form/form.module';

import { CarrierComponent } from './carrier.component';
import { CarrierAddComponent } from './carrier-add/carrier-add.component';

import { ContactPersonComponent } from '../../modal/contact-person/contact-person.component';

import { CustomHeader } from 'src/app/main/common/ag-grid-header-custom';

@NgModule({
  declarations: [
    CarrierComponent, 
    CarrierAddComponent
  ],
  imports: [
    CommonModule,
    AgGridModule.withComponents([]),
    FormsModule, ReactiveFormsModule,
    NgbModule,
    RouterModule,
    HttpClientModule,

    FormModule,
  ],
  entryComponents: [
    CarrierAddComponent,

    ContactPersonComponent,

    CustomHeader
  ],
  providers: [
  ]
})
export class CarrierModule { }
