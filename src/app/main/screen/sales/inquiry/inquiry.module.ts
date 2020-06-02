import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgGridModule } from 'ag-grid-angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { FormModule } from 'src/app/form/form.module';

import { InquiryComponent } from './inquiry.component';

import { CustomHeader } from 'src/app/main/common/ag-grid-header-custom';
import { ReceivedInquiryComponent } from './received-inquiri/received-inquiry.component';
import { SentInquiryComponent } from './sent-inquiri/sent-inquiry.component';
import { RouterLinkRendererComponent } from './router-link-render/router-link-render.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { SearchAdvanceComponent } from './search-advance/search-advance.component';
// import { httpInterceptorProviders} from './http-interceptors';
import { MakeInquiryComponent } from './inquiry-add/make-inquiry/make-inquiry.component';
import { SeaFreightInquiryAddComponent } from './inquiry-add/sea-freight-inquiry-add/sea-freight-inquiry-add.component';
import { AirFreightInquiryAddComponent } from './inquiry-add/air-freight-inquiry-add/air-freight-inquiry-add.component';

import { CustomClearanceAddComponent } from './inquiry-add/custom-clearance-add/custom-clearance-add.component';
import { CustomClearanceEditComponent } from './inquiry-edit/custom-clearance-edit/custom-clearance-edit.component';
import { AirGeneralComponent } from './air/airGeneral.component';
import { SeaGeneralComponent } from './sea/seaGeneral.component';


@NgModule({
  declarations: [
    InquiryComponent,
    ReceivedInquiryComponent,
    SentInquiryComponent,
    SearchAdvanceComponent,
    MakeInquiryComponent,
    SeaFreightInquiryAddComponent,
    AirFreightInquiryAddComponent,
    CustomClearanceAddComponent,
    CustomClearanceEditComponent,
    AirGeneralComponent,
    SeaGeneralComponent
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
    ReceivedInquiryComponent,
    SentInquiryComponent,
    RouterLinkRendererComponent,
    SearchAdvanceComponent,
    MakeInquiryComponent,
    SeaFreightInquiryAddComponent,
    CustomClearanceAddComponent,
    CustomClearanceEditComponent,
    SeaGeneralComponent
  ],
  providers: [
    // httpInterceptorProviders
  ]
})
export class InquiryModule { }
