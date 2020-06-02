import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgGridModule } from 'ag-grid-angular';
import { FormModule } from 'src/app/form/form.module';
import { FormsModule} from '@angular/forms';
import { PortIndexComponent} from './port-index.component'
import { AddNewPortComponent } from './addnew/addnew.component';
@NgModule({
    declarations: [
        PortIndexComponent,
        AddNewPortComponent
    ],
    imports: [
      CommonModule,
      AgGridModule,
      FormModule,FormsModule,
         
    ],
    entryComponents: [
      AddNewPortComponent
    ],
  })
  export class PortindexModule { }