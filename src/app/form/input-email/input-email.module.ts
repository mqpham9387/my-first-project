import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { InputEmailComponent } from './input-email.component';

@NgModule({
  declarations: [
    InputEmailComponent 
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgbModule
  ],
  entryComponents: [
  ],
  exports: [InputEmailComponent]
})
export class InputEmailModule { }
