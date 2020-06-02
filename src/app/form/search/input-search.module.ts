import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AgGridModule } from 'ag-grid-angular';
import { AdvanceLookComponent } from './search-advance/advance-look.component';

@NgModule({
  declarations: [
    AdvanceLookComponent
    // InputLookupComponent,
    // LookupDataComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgbModule,
    AgGridModule.withComponents([])
  ],
  exports: [
    // InputLookupComponent
  ],
  entryComponents: [
    AdvanceLookComponent
    // LookupDataComponent
  ]
})
export class InputLookupModule { }
