import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { PartnerView, Partner } from './partner';
import { ApiBack } from '../common/common';

@Injectable({
  providedIn: 'root'
})
export class PartnerService {
  headers = new HttpHeaders({
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }); 
  constructor(
    private http: HttpClient
  ) { }

  async getPartnersApi(group: string) {
    try {
      let res = await this.http.post<PartnerView[]>("/catalogue-service/partner/group/", { "group": group },).toPromise();
      return res;
    }
    catch (err) {
      catchError(err);
    }
  }

  getPartnersApiV2(group: string) {
    
    try {
      let res = this.http.post<PartnerView[]>("/catalogue-service/partner/group/", { "group": group }).toPromise();
      return res;
    }
    catch (err) {
      catchError(err);
    }
  }

  async getPartnerApi(partnerID: string) {
    try {
      // let res = await this.http.post<Partner[]>("http://192.168.201.45:8085/catalogue-service/partner/partnerID/", { "partnerID": partnerID }).toPromise();
      let res:any = await this.http.post<Partner>("/catalogue-service/partner/partnerID/", { "partnerID": partnerID }).toPromise();
      return res;
    }
    catch (err) {
      catchError(err);
    }
  }


  async insPartnersApi(partner) {
    // return this.http.post("http://192.168.201.45:8085/catalogue-service/partner/", partner).pipe(
    //   catchError(this.errorHandler));
    try {
      let res : any = await this.http.post<any>("/catalogue-service/partner/", partner,).pipe(
        catchError(this.errorHandler)).toPromise();
      return res;
    }
    catch (err) {
      catchError(err);
    }
  }

  async updPartnersApi(partner) {
    // return this.http.put("http://192.168.201.45:8085/catalogue-service/partner/", partner).pipe(
    //   catchError(this.errorHandler));
    try {
      let res :any  = await this.http.put("/catalogue-service/partner/", partner,).pipe(
        catchError(this.errorHandler)).toPromise();
      return res;
    }
    catch (err) {
      catchError(err);
    }
  }

  async delPartnersApi(data) {
    const options = {
      headers: new HttpHeaders({
        "Access-Control-Allow-Origin": '*',
        "Access-Control-Allow-Methods": 'DELETE',
        "Content-Type": 'application/json; charset=UTF-8',
        "Accept": 'application/json'
      }),
      body: data
    };
  
    try {
      let res:any = await this.http.delete("/catalogue-service/partner/",options).pipe(
        catchError(this.errorHandler)).toPromise();
      return res;
    }
    catch (err) {
      catchError(err);
    }
  }
  getPartners(group) : Observable<any>{
    return this.http.post<any>("/catalogue-service/partner/group/", { "group": group }).pipe(catchError(this.errorHandler))

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
