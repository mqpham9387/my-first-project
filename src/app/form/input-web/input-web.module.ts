import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { InputWebComponent } from './input-web.component';

@NgModule({
  declarations: [InputWebComponent],
  imports: [
    CommonModule,
    FormsModule,
    NgbModule
  ],
  exports: [InputWebComponent]
})
export class InputWebModule { }
