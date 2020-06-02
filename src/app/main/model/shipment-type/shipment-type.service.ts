import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class ShipmentTypeService {
  constructor(public http: HttpClient) {

  }

  getShipmentTypesApi(data): Observable<any> {

    return this.http.post<any>("/catalogue-service/shipment-type-warnings/get-list/", data).pipe(
      catchError(this.errorHandler))
  }

  search(term: string) {
    if (term === "") {
      return of([]);
    }
    return this.http
      .post("/catalogue-service/shipment-type-warnings/get-list/", {
        filterModel: {
          commodityName: { filterType: "text", type: "contains", filter: term },
        },
      })
      .pipe(
        map((response: any) => {
          return response.results;
        })
      );
  }
  getAllShipmentTypeWarnings(): Observable<any> {
    return this.http.get('/catalogue-service/shipment-type-warnings/')

  }
  createShipmentTypeWarnings(data): Observable<any> {
    console.log(data)
    return this.http.post('/catalogue-service/shipment-type-warnings/', data).pipe(catchError(this.errorHandler))
  }
  updateShipmentTypeWarnings(data): Observable<any> {
    return this.http.put('/catalogue-service/shipment-type-warnings/', data).pipe(catchError(this.errorHandler))
  }
  deleteShipmentTypeWarnings(data): Observable<any> {
    return this.http.delete('/catalogue-service/shipment-type-warnings/', data).pipe(catchError(this.errorHandler))
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