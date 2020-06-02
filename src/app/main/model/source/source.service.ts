import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Source } from './Source'

@Injectable({
  providedIn: 'root'
})
export class SourceService {
  constructor(
    private http: HttpClient
  ) { }

  async getSourcesApi() {
    try {
    
      let res = await this.http.get("/catalogue-service/sources/").toPromise();
      return res;
    }
    catch (err) {
      catchError(err);
    }
  }

  insSourcesApi(source) {

  }

  updSourcesApi(source) {

  }

  delSourcesApi(source) {

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
