import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgGridModule } from 'ag-grid-angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormModule } from 'src/app/form/form.module';
import { CustomHeader } from 'src/app/main/common/ag-grid-header-custom';
import { NgSelectModule } from '@ng-select/ng-select';
import { ShareDataService } from 'src/app/main/shared/services/share-data.service';
import { CKEditorModule } from 'ng2-ckeditor';
import { SentBookingsComponent } from './sent-bookings/sent-bookings.component';
import { ReceivedBookingsComponent } from './received-bookings/received-bookings.component';
import { BookingComponent } from './booking.component';
import { CRUDSeaBookingComponent } from './crud-sea-booking/crud-sea-booking.component';
import { MakeBookingComponent } from './make-booking/make-booking.component';
import { RouterLinkRenderer1Component } from './router-link-render1/router-link-render1.component';
import { CustomClearanceComponent } from './custom-clearance/custom-clearance.component';
import { AddCustomClearanceComponent } from './custom-clearance/add-custom-clearance/add-custom-clearance.component';

@NgModule({
  declarations: [
    BookingComponent,
    SentBookingsComponent,
    ReceivedBookingsComponent,
    CRUDSeaBookingComponent,
    MakeBookingComponent,
    RouterLinkRenderer1Component,
    CustomClearanceComponent,
    AddCustomClearanceComponent,

  ],
  imports: [
    CommonModule,
    AgGridModule.withComponents([]),
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    NgSelectModule,
    RouterModule,
    HttpClientModule,
    FormModule,
    CKEditorModule,
  ],
  entryComponents: [
    CustomHeader,
    MakeBookingComponent
  ],
  providers: [ShareDataService],
})
export class BookingModule {}
