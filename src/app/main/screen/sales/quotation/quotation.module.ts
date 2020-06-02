import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgGridModule } from 'ag-grid-angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { FormModule } from 'src/app/form/form.module';

import { QuotationComponent } from './quotation.component';

import { CustomHeader } from 'src/app/main/common/ag-grid-header-custom';
import { CrudSeaQuotationComponent } from './CRUD_SeaQuotation/CRUD_quotation.component';
import { CrudAirQuotationComponent } from './CRUD_AirQuotation/CRUD_quotation.component';
import { AddNewDetailComponent } from './CRUD_AirQuotation/addNewDetail/addNew.component';

import { MakeQuotationComponent } from './make-quotation/make-quotation.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { DisableControlDirective } from 'src/app/main/shared/directives/disable-controler.directive';
import { CustomClearanceQuoAddComponent } from './customs-clearance/customs-clearance-add/customs-clearance-add.component';
import { SentQuotationsComponent } from './sent-quotations/sent-quotations.component';
import { ReceivedQuotationsComponent } from './received-quotations/received-quotations.component';
import { QuotOtherChargesComponent } from './customs-clearance/quot-other-charges/quot-other-charges.component';
import { ShareDataService } from 'src/app/main/shared/services/share-data.service';
import { CKEditorModule } from 'ng2-ckeditor';

@NgModule({
  declarations: [
    QuotationComponent,
    CrudSeaQuotationComponent,
    CrudAirQuotationComponent,
    MakeQuotationComponent,
    SentQuotationsComponent,
    ReceivedQuotationsComponent,
    CustomClearanceQuoAddComponent,
    DisableControlDirective,
    AddNewDetailComponent,
    QuotOtherChargesComponent,
  ],
  imports: [
    CommonModule,
    AgGridModule.withComponents([]),
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    NgSelectModule,
    RouterModule,
    HttpClientModule,
    FormModule,
    CKEditorModule,
  ],
  entryComponents: [
    CustomHeader,
    MakeQuotationComponent,
    QuotOtherChargesComponent,
  ],
  providers: [ShareDataService],
})
export class QuotationModule {}
