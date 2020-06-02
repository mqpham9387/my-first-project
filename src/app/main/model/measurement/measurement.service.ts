import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Measurement, MeasurementApiResult } from './measurement';

@Injectable({
  providedIn: 'root'
})
export class MeasurementService {

  constructor(
    private http: HttpClient
  ) { }

  async getUnitsApi() {
   
   
    try {
      const data = {
        "startRow":0,
        "endRow":1000,
        "sortModel": [],
        "filterModel": {}
     
     }
      let res:any = await this.http.post("/general-service/unit/get-list/",data).pipe(
        catchError(this.errorHandler)).toPromise();
      return res.results;
    }
    catch (err) {
      catchError(err);
    }
  }

  async getUnitApi(unitID) {
    try {
      let res = await this.http.post<Measurement>("/general-service/unit/unitID/", { "unitID": unitID }).pipe(
        catchError(this.errorHandler)).toPromise();
      return res;
    }
    catch (err) {
      catchError(err);
    }
  }

  async insUnitsApi(unit) {
    try {
      let res = await this.http.post<MeasurementApiResult>("/general-service/unit/", unit).pipe(
        catchError(this.errorHandler)).toPromise();
      return res;
    }
    catch (err) {
      catchError(err);
    }
  }

  async updUnitsApi(unit) {
    try {
      let res = await this.http.put<MeasurementApiResult>("general-service/unit/", unit).pipe(
        catchError(this.errorHandler)).toPromise();
      return res;
    }
    catch (err) {
      catchError(err);
    }
  }

  async delUnitsApi(unit) {
    try {
      let res = await this.http.post<MeasurementApiResult>("/general-service/unit/delete/", {
        '_id': unit._id
      }).pipe(
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
