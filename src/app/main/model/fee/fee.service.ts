import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Fee } from './fee.model';

@Injectable({
  providedIn: 'root'
})
export class FeeService {

  constructor(
    private http: HttpClient
  ) { }

  getFeesApi(): Fee[] {
    const results = [
      new Fee(
        'jhf3ad43b1hfa3c9620fn184',
        "BFS001",
        "B_AF",
        "AIRFREIGHT",
        "CƯỚC VẬN TẢI QUỐC TẾ ",
        "FREIGHT",
        false,
        "AF",
        "HCMHANHNT",
        "2018-01-11T16:35:26.000Z",
        "NULL",
        "0"
      ),
      new Fee(
        "5dd502dc6ee36be7dd9a3845",
        "BFS002",
        "B_AFR",
        "AFR",
        "PHÍ KHAI HẢI QUAN NHẬT",
        "FREIGHT",
        false,
        "AFR",
        "HCMHANHNT",
        "2018-01-11T16:42:10.000Z",
        null,
        "0"
      ),
      new Fee(
        "5dd502dc6ee36be7dd9a3848",
        "BFS003",
        "B_AMS",
        "AMS",
        "PHÍ KHAI HẢI QUAN TỰ ĐỘNG",
        "FREIGHT",
        false,
        "AMS",
        "HCMHANHNT",
        "2018-01-11T16:42:10.000Z",
        "Shipment",
        "0"
      )
    ]
    return results;
  }
  getAllFee(data){
    return this.http
      .post<any>("/general-service/fees/get-list/",data)
      .pipe(catchError(this.errorHandler));
  }
  search(term: string) {
    if (term === '') {
      return of([]);
    }
    return this.http
      .post("/general-service/fees/get-list/", {
         filterModel: {feeNameLocal: {filterType: "text", type: "contains", filter: term}}
      }).pipe(
        map((response:any) => {return response.results})
      );
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
