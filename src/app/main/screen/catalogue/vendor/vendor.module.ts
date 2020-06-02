import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgGridModule } from 'ag-grid-angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormModule } from 'src/app/form/form.module';
import { VendorComponent } from './vendor.component';
import { VendorAddComponent } from './vendor-add/vendor-add.component';
import { ContactPersonComponent } from '../../modal/contact-person/contact-person.component';
import { CustomHeader } from 'src/app/main/common/ag-grid-header-custom';
import { NgxLoadingModule, ngxLoadingAnimationTypes } from 'ngx-loading';

@NgModule({
  declarations: [
    VendorComponent,
    VendorAddComponent
  ],
  imports: [
    CommonModule,
    AgGridModule.withComponents([]),
    FormsModule, ReactiveFormsModule,
    NgbModule,
    RouterModule,
    HttpClientModule,
    NgxLoadingModule.forRoot({animationType: ngxLoadingAnimationTypes.circle,
      backdropBackgroundColour: 'rgba(0,0,0,0.1)', 
      backdropBorderRadius: '4px',
      primaryColour: '#FF1919', 
      secondaryColour: '#7F7FFF', 
      tertiaryColour: '#FF1919'}),
    FormModule,
  ],
  entryComponents: [
    VendorAddComponent,

    ContactPersonComponent,

    CustomHeader
  ],
  providers: [
  ]
})
export class VendorModule { }
