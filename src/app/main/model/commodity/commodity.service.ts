import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { throwError, Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Commodity, CommodityApiResult } from './commodity';

@Injectable({
  providedIn: 'root'
})
export class CommodityService {
   headers = new HttpHeaders({
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  });


  readonly commodityUrl = '/general-service/commodity/';

  constructor(
    private http: HttpClient
  ) {  }

   getCommoditiesApi(data) : Observable<any> {

     return this.http.post<any>("/general-service/commodity/get-list/",data).pipe(
        catchError(this.errorHandler))


  }

  /**
   * Use this not the asyns function
   */
  getCommoditiesList(): Observable<Commodity[]> {
    return this.http.get<Commodity[]>(this.commodityUrl).pipe(
      catchError(this.errorHandler));
  }
  search(term: string) {
    if (term === "") {
      return of([]);
    }
    return this.http
      .post("/general-service/commodity/get-list/", {
        filterModel: {
          commodityName: { filterType: "text", type: "contains", filter: term },
        },
      })
      .pipe(
        map((response: any) => {
          return response.results;
        })
      );
  }

  async getCommoditiyApi(commodityID) {
    try {
      let res = await this.http.post<Commodity>("/general-service/commodity/commodityID/", { commodityID: String(commodityID) },{headers:this.headers}

      ).pipe(
        catchError(this.errorHandler)).toPromise();
      return res;
    }
    catch (err) {
      catchError(err);
    }
  }

  async getMaxIDCommodity() {
    try {
      let res = await this.http.get<string>("/general-service/commodity/maxID/").pipe(
        catchError(this.errorHandler)).toPromise();
      return res;
    }
    catch (err) {
      catchError(err);
    }
  }

  async insCommoditiesApi(commodity) {
    try {
      let res = await this.http.post<CommodityApiResult>("/general-service/commodity/", commodity,{headers:this.headers}).pipe(
        catchError(this.errorHandler)).toPromise();
      return res;
    }
    catch (err) {
      catchError(err);
    }
  }

  async updCommoditiesApi(commodity) {
    try {
      let res = await this.http.put<CommodityApiResult>("general-service/commodity/", commodity,{headers:this.headers}).pipe(
        catchError(this.errorHandler)).toPromise();
      return res;
    }
    catch (err) {
      catchError(err);
    }
  }

  async delCommoditiesApi(commodity) {
    console.log(commodity)
    try {
      let res = await this.http.post<CommodityApiResult>("/general-service/commodity/delete/", {
        '_id': commodity._id
      },{headers:this.headers}).pipe(
        catchError(this.errorHandler)).toPromise();
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
