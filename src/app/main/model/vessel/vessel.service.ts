import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class StateService {

  constructor(
    private http: HttpClient
  ) { }

  async getStatesApi() {
    try {
      // let res = await this.http.get<State[]>("http://192.168.201.45:8085/general-service/states/").toPromise();
      // let res = await this.http.get<State[]>("/general-service/states/").toPromise();
      // return res;
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
