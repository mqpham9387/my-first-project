import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError, Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { Contact } from './contact';
import { formatDate } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(
    private http: HttpClient
  ) { }
  getContacts(data): Observable<any> {
    if (data.filterModel.dateModify) {
      data.filterModel.dateModify.filterType="text"
      data.filterModel.dateModify.dateFrom = formatDate(data.filterModel.dateModify.dateFrom,"dd/MM/yyyy","en-US")
      data.filterModel.dateModify.dateTo = formatDate(data.filterModel.dateModify.dateTo,"dd/MM/yyyy","en-US")
      console.log(data);
    }
     return this.http
      .post<any>("/catalogue-service/contact/get-list/",data)
      .pipe(catchError(this.errorHandler));
  }
  search(term: string) {
    if (term === '') {
      return of([]);
    }
    return this.http
      .post("/catalogue-service/contact/get-list/", { 
         filterModel: {contactName: {filterType: "text", type: "contains", filter: term}}
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
