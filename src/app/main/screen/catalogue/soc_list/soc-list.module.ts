import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Soc_listComponent } from './soc-list.component';
import { AgGridModule } from 'ag-grid-angular';
import { CURD_socListComponent } from './CURD_socList/CRUD_socList.component';
import { FormsModule } from '@angular/forms';
@NgModule({
    declarations: [Soc_listComponent,CURD_socListComponent],
    imports: [ CommonModule,AgGridModule,FormsModule ],
    exports: [],
    providers: [],
})
export class Soc_listModule {}