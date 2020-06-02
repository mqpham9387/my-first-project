import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError, Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HEADER_POST } from '../../shared/app-settings';

@Injectable({
  providedIn: 'root'
})
export class serviceService {
  constructor(public http: HttpClient) {
  }
  getService(): Observable<any> {
    const paramsJson = {
      startRow: 0,
      endRow: 90
    };
    const httpOptions = { headers: HEADER_POST };

    return this.http.post<any>('/general-service/service/get-list/', JSON.stringify(paramsJson), httpOptions).pipe(
      catchError(this.errorHandler))
  }
  getServicessApi(data): Observable<any> {
    return this.http.post<any>(
      '/general-service/service/get-list/',
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
      .post("/general-service/service/get-list/", {
        filterModel: {
          serviceName: { filterType: "text", type: "contains", filter: term },
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
      window.alert(error.error.message);
    } else {
      window.alert(error.error.message);
    }
    return throwError(
      'Something bad happened; please try again later.');
  }
}
