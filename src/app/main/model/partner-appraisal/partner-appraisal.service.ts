import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { PartnerAppraisal } from './partner-appraisal';

@Injectable({
  providedIn: 'root'
})
export class PartnerAppraisalService {

  constructor(
    private http: HttpClient
  ) { }

  async getPartnerAppraisalsApiByID(partnerID: string) {
    try {
      // let res = await this.http.post<PartnerAppraisal[]>("http://192.168.201.45:8085/catalogue-service/appraisal/partnerID/", { "partnerID": partnerID }).toPromise();
      let res = await this.http.post<PartnerAppraisal[]>("/catalogue-service/appraisal/partnerID/", { "partnerID": partnerID })
      .pipe()
      .toPromise();
      return res;
    }
    catch (err) {
      catchError(err);
    }
  }

  async insPartnerAppraisalsApi(appraisal) {
    try {
      // let res = await this.http.post("http://192.168.201.45:8085/catalogue-service/appraisal/", appraisal).pipe(
      //   catchError(this.errorHandler)).toPromise();
      let res = await this.http.post<PartnerAppraisal>("/catalogue-service/appraisal/", appraisal).pipe(
        catchError(this.errorHandler)).toPromise();
      return res;
    }
    catch (err) {
      catchError(err);
    }
  }

  async updPartnerAppraisalsApi(appraisal) {
    try {
      // let res = await this.http.put("http://192.168.201.45:8085/catalogue-service/appraisal/", appraisal).pipe(
      //   catchError(this.errorHandler)).toPromise();
      let res = await this.http.put<PartnerAppraisal>("/catalogue-service/appraisal/", appraisal).pipe(
        catchError(this.errorHandler)).toPromise();
      return res;
    }
    catch (err) {
      catchError(err);
    }
  }

  delPartnerAppraisalsApi(appraisal) {
    // return this.http.post("http://192.168.201.45:8085/catalogue-service/appraisal/delete/", {
    //   '_id': appraisal._id
    // }).pipe(
    //   catchError(this.errorHandler));
    return this.http.post("/catalogue-service/appraisal/delete/", {
      '_id': appraisal._id
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
