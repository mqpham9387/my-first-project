import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse,HttpHeaders } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Port } from './port';
import { formatDate } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class PortService {
  headers = new HttpHeaders({
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  });
  constructor(
    private httpclient: HttpClient
  ) { }

  getPortsApi(): Observable<Port[]> {
    
    return this.httpclient.get<Port[]>("/catalogue-service/port/").pipe(
      catchError(this.errorHandler));
  }
  getPortApi(data):Observable<any>{
    console.log(data)
      return this.httpclient.post<any>("/catalogue-service/port/portID/",{ "portID": String(data) },{headers:this.headers}).pipe(
      catchError(this.errorHandler));
  }

  addPortsApi(data): Observable<any> {
    return this.httpclient.post<any>("/catalogue-service/port/",data,).pipe(
      catchError(this.errorHandler));
  }
  getPorts(data): Observable<any> {
    if (data.filterModel.dateModify) {
      data.filterModel.dateModify.filterType="text"
      data.filterModel.dateModify.dateFrom = formatDate(data.filterModel.dateModify.dateFrom,"dd/MM/yyyy","en-US")
      data.filterModel.dateModify.dateTo = formatDate(data.filterModel.dateModify.dateTo,"dd/MM/yyyy","en-US")
      console.log(data);
    }
     return this.httpclient
      .post<any>("/catalogue-service/port/get-list/",data)
      .pipe(catchError(this.errorHandler));
  }
  search(term: string) {
    if (term === '') {
      return of([]);
    }
    return this.httpclient
      .post("/catalogue-service/port/get-list/", { 
         filterModel: {portName: {filterType: "text", type: "contains", filter: term}}
      }).pipe(
        map((response:any) => {return response.results})
      );
  }
  delPortApi(data): Observable<any>  {
      return this.httpclient.post<any>("/catalogue-service/port/delete/",{ "_id": data._id },{headers:this.headers}).pipe(
      catchError(this.errorHandler));
  }
  upPortApi(data):Observable<any>{
    console.log(data)
    return this.httpclient.put<any>("/catalogue-service/port/",data,{headers:this.headers}).pipe( catchError(this.errorHandler));
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
