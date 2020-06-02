import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { AgGridModule } from 'ag-grid-angular';

import { FormModule } from 'src/app/form/form.module';

import { AuthorisedComponent } from './authorised/authorised.component';
import { ContactPersonComponent } from './contact-person/contact-person.component';
import { TransactionComponent } from './transaction/transaction.component';

@NgModule({
  declarations: [
    AuthorisedComponent,
    ContactPersonComponent,
    TransactionComponent
  ],
  imports: [
    CommonModule,
    FormsModule, ReactiveFormsModule,
    NgbModule,
    AgGridModule.withComponents([]),
    FormModule
  ]
})
export class ModalModule { }
