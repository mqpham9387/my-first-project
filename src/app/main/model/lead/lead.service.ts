import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Lead, LeadView } from './lead';
import { ApiBack } from '../common/common';

@Injectable({
  providedIn: 'root'
})
export class LeadService {
  headers = new HttpHeaders({
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  });
  constructor(
    private http: HttpClient
  ) { }

  async getLeadsApi(group: string) {
    try {
      
      let res = await this.http.post<LeadView[]>("/catalogue-service/partnercontact/group/", { "group": group },{headers:this.headers}).toPromise();
      return res;
    }
    catch (err) {
      catchError(err);
    }
  }

  async getLeadApi(leadID: string) {
    try {
      // let res = await this.http.post<Partner[]>("http://192.168.201.45:8085/catalogue-service/partnercontact/partnerID/", { "partnerID": partnerID }).toPromise();
      let res = await this.http.post<Lead>("/catalogue-service/partnercontact/partnerID/", { "partnerID": leadID },{headers:this.headers}).toPromise();
      return res;
    }
    catch (err) {
      catchError(err);
    }
  }

  async getMaxIDLead(group: string) {
    try {
      // let res = await this.http.post<string>("http://192.168.201.45:8085/catalogue-service/partnercontact/maxID/", { "group": group }).toPromise();
      let res = await this.http.post<string>("/catalogue-service/partnercontact/maxID/", { "group": group },{headers:this.headers}).toPromise();
      return res;
    }
    catch (err) {
      catchError(err);
    }
  }

  async insLeadsApi(lead) {
    // return this.httpclient.post("http://192.168.201.45:8085/catalogue-service/partnercontact/", lead).pipe(
    //   catchError(this.errorHandler));
    try {    
      let res = await this.http.post<ApiBack>("/catalogue-service/partner-contact/", lead,{headers:this.headers}).pipe(
        catchError(this.errorHandler)).toPromise();
      return res;
    }
    catch (err) {
      catchError(err);
    }
  }

  async updLeadsApi(lead) {
    // return this.httpclient.put("http://192.168.201.45:8085/catalogue-service/partnercontact/", lead).pipe(
    //   catchError(this.errorHandler));
    try {  
      let res:any = await this.http.put("/catalogue-service/partner-contact/", lead,{headers:this.headers}).pipe(
        catchError(this.errorHandler)).toPromise();
      return res;
    }
    catch (err) {
      catchError(err);
    }
  }

  async delLeadsApi(lead) {
    // return this.httpclient.post("http://192.168.201.45:8085/catalogue-service/partnercontact/delete/", {
    //   '_id': lead._id
    // }).pipe(
    //   catchError(this.errorHandler));
    try {    
      let res = await this.http.post<ApiBack>("/catalogue-service/partner-contact/", {
        '_id': lead._id
      },{headers:this.headers}).pipe(
        catchError(this.errorHandler)).toPromise();
      return res;
    }
    catch (err) {
      catchError(err);
    }
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
