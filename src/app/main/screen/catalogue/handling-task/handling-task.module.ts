import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgGridModule } from 'ag-grid-angular';
import { FormModule } from 'src/app/form/form.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HandlingTaskComponent } from './handling-task.component';
import { CRUD_handlingTaskComponent } from './CRUD_handling-task/CRUD_handling-task.component';
@NgModule({
    declarations: [HandlingTaskComponent,CRUD_handlingTaskComponent],
    imports: [ CommonModule,
        CommonModule,
        AgGridModule,
        FormsModule, ],
    exports: [],
    providers: [],
})
export class HandlingTaskModule {}