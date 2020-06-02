import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { TransactionType } from './transaction-type';

@Injectable({
  providedIn: 'root'
})
export class TransactionTypeService {

  constructor(
    private http: HttpClient
  ) { }

  async getTransactionTypesApi() {
    try {
      // let res = await this.http.get<TransactionType[]>("http://192.168.201.45:8085/general-service/transactiontype/").toPromise();
      let res:any = await this.http.post("/general-service/transactiontype/get-list/",{
        "startRow":0,
        "endRow":500,
        "sortModel": [],
        "filterModel": {}}).toPromise();
     
      return res.results;
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
