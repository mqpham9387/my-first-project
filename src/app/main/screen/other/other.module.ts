import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashBoardModule } from './dash-board/dash-board.module';
import { SearchComponent } from './search/search.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [SearchComponent],
  imports: [
    CommonModule,
    DashBoardModule,
  ]
})
export class OtherModule { }
