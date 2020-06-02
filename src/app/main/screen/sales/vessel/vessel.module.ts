import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgGridModule } from 'ag-grid-angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { FormModule } from 'src/app/form/form.module';

import { VesselComponent } from './vessel.component';

import { CustomHeader } from 'src/app/main/common/ag-grid-header-custom';
import { VesselAddComponent } from './vessel-add/vessel-add.component';

@NgModule({
  declarations: [
    VesselComponent,
    VesselAddComponent
  ],
  imports: [
    CommonModule,
    AgGridModule.withComponents([]),
    FormsModule, ReactiveFormsModule,
    NgbModule,
    RouterModule,
    HttpClientModule,
    FormModule
  ],
  entryComponents: [
    VesselAddComponent,
    CustomHeader
  ],
  providers: [
  ]
})
export class VesselModule { }
