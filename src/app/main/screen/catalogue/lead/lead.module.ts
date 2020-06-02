import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgGridModule } from 'ag-grid-angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { FormModule } from 'src/app/form/form.module';

import { LeadComponent } from './lead.component';
import { LeadAddComponent } from './lead-add/lead-add.component';

import { ContactPersonComponent } from '../../modal/contact-person/contact-person.component';

import { CustomHeader } from 'src/app/main/common/ag-grid-header-custom';
import { TransactionComponent } from '../../modal/transaction/transaction.component';
import { NgxLoadingModule,ngxLoadingAnimationTypes  } from 'ngx-loading';
@NgModule({
  declarations: [
    LeadComponent, 
    LeadAddComponent
  ],
  imports: [
    CommonModule,
    AgGridModule.withComponents([]),
    FormsModule, ReactiveFormsModule,
    NgbModule,
    RouterModule,
    HttpClientModule,
    NgxLoadingModule.forRoot({animationType: ngxLoadingAnimationTypes.wanderingCubes,
      backdropBackgroundColour: 'rgba(0,0,0,0.1)', 
      backdropBorderRadius: '4px',
      primaryColour: '#ffffff', 
      secondaryColour: '#ffffff', 
      tertiaryColour: '#ffffff'}),
    FormModule,
  ],
  entryComponents: [
    LeadAddComponent,

    ContactPersonComponent,
    TransactionComponent,
    
    CustomHeader
  ],
  providers: [
  ]
})
export class LeadModule { }
