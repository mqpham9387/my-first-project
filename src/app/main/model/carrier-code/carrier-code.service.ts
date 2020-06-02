import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse,HttpHeaders } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { CarrierCode } from './carrier-code';

@Injectable({
  providedIn: 'root'
})
export class CarrierCodeService {
  headers = new HttpHeaders({
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  });
constructor(
  private http: HttpClient
) { }

async getTransactionTypesApi() {
  try {
    let res = await this.http.get<CarrierCode[]>("/catalogue-service/carrierStandards/").toPromise();
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
