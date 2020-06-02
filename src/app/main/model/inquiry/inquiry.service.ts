import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { InquiryType } from './inquiryType.model';

@Injectable({
  providedIn: 'root'
})
export class InquiryService {

  constructor(private http: HttpClient ) { }

  getInquiries(params) {
    return this.http.post('http//inquiries', params);
  }

  getInquiriesType() {
    const inquiriesType = [
      new InquiryType("5dbce260bb52a3c9620fe14a", "SeaFreightQuotation", "SeaFreightQuotation"),
      new InquiryType("5dbce260bb52a3c9620fe14d", "AirFreightQuotation", "AirFreightQuotation"),
      new InquiryType("5e688d77528b433d50bc9e31", "CustomsClearanceAndTruckingQuotation", "CustomsClearanceAndTruckingQuotation")
    ];
    return inquiriesType;
  }
}
