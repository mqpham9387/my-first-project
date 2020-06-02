import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AgGridModule } from 'ag-grid-angular';
import { InputLookupComponent } from './input-lookup.component';
import { LookupDataComponent } from './lookup-data/lookup-data.component';

@NgModule({
  declarations: [
    InputLookupComponent,
    LookupDataComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgbModule,
    AgGridModule.withComponents([])
  ],
  exports: [
    InputLookupComponent
  ],
  entryComponents: [
    LookupDataComponent
  ]
})
export class InputLookup2Module { }
