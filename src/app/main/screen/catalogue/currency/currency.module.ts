import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CurrencyComponent} from './currency.component'
import { AgGridModule } from 'ag-grid-angular';
import { FormModule } from 'src/app/form/form.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { AddNewDetailComponent } from './addnewDetail/addnewDetail.component';
import { AddNewComponent } from './addnew/addnew.component';

@NgModule({
    declarations: [
        CurrencyComponent,
        AddNewDetailComponent,
        AddNewComponent,
       
    ],
    imports: [
      CommonModule,
      AgGridModule,
      FormModule,FormsModule,
      NgSelectModule,
      ReactiveFormsModule
    ],
    entryComponents: [
      CurrencyComponent,
      AddNewDetailComponent,
      AddNewComponent,
      
    ],
  })
  export class CurrencyModule { }