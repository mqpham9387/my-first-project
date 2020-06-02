import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { PartnerCarrier } from './partner-carrier';
import { ApiBack } from '../common/common';

@Injectable({
  providedIn: 'root'
})
export class PartnerCarrierService {

  constructor(
    private http: HttpClient
  ) { }

  async getPartnerCarriersApiByID(partnerID: string) {
    try {
      let res = await this.http.post<PartnerCarrier[]>("/catalogue-service/carrierPartner/partnerID/", { "partnerID": partnerID })
        .pipe()
        .toPromise();
      return res;
    }
    catch (err) {
      catchError(err);
    }
  }

  async updPartnerCarriersApi(carrierCode) {
    try {
      let res = await this.http.put<ApiBack>("/catalogue-service/carrierPartner/", carrierCode).pipe(
        catchError(this.errorHandler)).toPromise();
      return res;
    }
    catch (err) {
      catchError(err);
    }
  }

  delPartnerCarriersApi(carrierCode) {
    return this.http.post<ApiBack>("/catalogue-service/carrierPartner/delete/", {
      '_id': carrierCode._id
    }).pipe(
      catchError(this.errorHandler));
  }

  errorHandler(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      window.alert(error.error.message);
    }
    return throwError(
      'Something bad happened; please try again later.');
  }

}
