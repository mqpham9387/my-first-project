import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable(
    {
        providedIn: 'root'
      }
)
export class TermService {
    constructor(
        private http: HttpClient
      ) { }
    getTerm():Observable<any>{
      return  this.http.get('/sales-service/service-terms/').pipe(catchError(this.errorHandler))

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