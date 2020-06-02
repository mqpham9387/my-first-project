import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError, of, Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Country } from './country';
import { formatDate } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  constructor(
    private http: HttpClient
  ) { }

  getCountries(data): Observable<any> {
    if (data.filterModel.dateModify) {
      data.filterModel.dateModify.filterType="text"
      data.filterModel.dateModify.dateFrom = formatDate(data.filterModel.dateModify.dateFrom,"dd/MM/yyyy","en-US")
      data.filterModel.dateModify.dateTo = formatDate(data.filterModel.dateModify.dateTo,"dd/MM/yyyy","en-US")
      console.log(data);
    }
     return this.http
      .post<any>("/general-service/countries/get-list/",data)
      .pipe(catchError(this.errorHandler));
  }
  search(term: string) {
    if (term === '') {
      return of([]);
    }
    return this.http
      .post("/general-service/countries/get-list/", { 
         filterModel: {countryName: {filterType: "text", type: "contains", filter: term}}
      }).pipe(
        map((response:any) => {return response.results})
      );
  }
  async getCountriesApi(){
    try {
      // let res = await this.http.get<Country[]>("http://192.168.201.45:8085/general-service/countries/").toPromise();
      let res = await this.http.get<Country[]>("/general-service/countries/").toPromise();
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
