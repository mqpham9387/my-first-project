import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError, Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Company } from './company';
import { formatDate } from '@angular/common';
import { HEADER_POST } from '../../shared/app-settings';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

constructor(
  private http: HttpClient
) { }

getCompanies(data): Observable<any> {
  if (data.filterModel.dateModify) {
    data.filterModel.dateModify.filterType="text"
    data.filterModel.dateModify.dateFrom = formatDate(data.filterModel.dateModify.dateFrom,"dd/MM/yyyy","en-US")
    data.filterModel.dateModify.dateTo = formatDate(data.filterModel.dateModify.dateTo,"dd/MM/yyyy","en-US")
    console.log(data);
  }
   return this.http
    .post<any>("/general-service/company/get-list/",data)
    .pipe(catchError(this.errorHandler));
}
async getCompaniesApi() {
  try {

    const paramsJson = {
      startRow: 0,
      endRow: 90
    };
    const httpOptions = { headers: HEADER_POST };

    let res = await this.http.post<Company[]>('/general-service/company/get-list/', JSON.stringify(paramsJson), httpOptions).toPromise();
    return res;
  }
  catch (err) {
    catchError(err);
  }
}
search(term: string) {
  if (term === '') {
    return of([]);
  }
  return this.http
    .post("/general-service/company/get-list/", { 
       filterModel: {companyName: {filterType: "text", type: "contains", filter: term}}
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
