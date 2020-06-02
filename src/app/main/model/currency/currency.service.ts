import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError, Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Currency } from './currency';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {

  constructor(
    private http: HttpClient
  ) { }

  async getCurrenciesApi() {
    try {
      let res = await this.http.get<Currency[]>("catalogue-service/currency/").toPromise();
      return res;

    }
    catch (err) {
      catchError(err);
    }
  }

  getCurrenciesApiV2(data): Observable<any> {
    return this.http.post<any>(
      '/catalogue-service/currency/get-list/',
      data
    ).pipe(
      catchError(this.errorHandler)
    );
  }

  search(term: string) {
    if (term === "") {
      return of([]);
    }
    return this.http
      .post("/catalogue-service/currency/get-list/", {
        filterModel: {
          currencyName: { filterType: "text", type: "contains", filter: term },
        },
      })
      .pipe(
        map((response: any) => {
          return response.results;
        })
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
