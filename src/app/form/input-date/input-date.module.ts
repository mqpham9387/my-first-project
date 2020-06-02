import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputDateComponent } from './input-date.component';
import { FormsModule } from '@angular/forms';
import { NgbModule, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { NgbDateCustomParserFormatter } from './NgbDateCustomParserFormatter'

@NgModule({
  declarations: [
    InputDateComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgbModule
  ],
  providers: [
    { provide: NgbDateParserFormatter, useClass: NgbDateCustomParserFormatter }
  ],
  exports: [
    InputDateComponent
  ]
})
export class InputDateModule { }
