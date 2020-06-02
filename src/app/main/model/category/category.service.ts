import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse,HttpHeaders } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Category } from './category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  headers = new HttpHeaders({
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  });
  constructor(
    private http: HttpClient
  ) { }

  async getCategoriesApi(group: string) {
    try {
      // let res = await this.http.post<City[]>("http://192.168.201.45:8085/general-service/categories/group/", {"group": group}).toPromise();
      let res = await this.http.post<Category[]>("/general-service/categories/group/", { "group": group }).pipe(
        catchError(this.errorHandler)
      ).toPromise();
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
