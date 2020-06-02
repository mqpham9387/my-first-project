import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { PartnerTransaction } from './partnerTransaction';
import { ApiBack } from '../common/common';

@Injectable({
  providedIn: 'root'
})
export class PartnerTransactionService {

constructor(
  private http: HttpClient
) { }

async getPartnerTransactionsApiByID(partnerID: string) {
  try {
    // let res = await this.http.post<PartnerTransaction[]>("http://192.168.201.45:8085/catalogue-service/partnertransaction/partnerID/", { "partnerID": partnerID }).toPromise();
    let res = await this.http.post<PartnerTransaction[]>("/catalogue-service/partnertransaction/partnerID/", { "partnerID": partnerID })
    .pipe()
    .toPromise();
    return res;
  }
  catch (err) {
    catchError(err);
  }
}

async insPartnerTransactionsApi(transaction) {
  try {
    // let res = await this.http.post("http://192.168.201.45:8085/catalogue-service/partnertransaction/", appraisal).pipe(
    //   catchError(this.errorHandler)).toPromise();
    let res = await this.http.post<PartnerTransaction>("/catalogue-service/partnertransaction/", transaction).pipe(
      catchError(this.errorHandler)).toPromise();
    return res;
  }
  catch (err) {
    catchError(err);
  }
}

async updPartnerTransactionsApi(transaction) {
  try {
    // let res = await this.http.put("http://192.168.201.45:8085/catalogue-service/partnertransaction/", appraisal).pipe(
    //   catchError(this.errorHandler)).toPromise();
    let res = await this.http.put<PartnerTransaction>("/catalogue-service/partnertransaction/", transaction).pipe(
      catchError(this.errorHandler)).toPromise();
    return res;
  }
  catch (err) {
    catchError(err);
  }
}

delPartnerTransactionsApi(transaction) {
  // return this.http.post("http://192.168.201.45:8085/catalogue-service/partnertransaction/delete/", {
  //   '_id': appraisal._id
  // }).pipe(
  //   catchError(this.errorHandler));
  return this.http.post<ApiBack>("/catalogue-service/partnertransaction/delete/", {
    '_id': transaction._id
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
