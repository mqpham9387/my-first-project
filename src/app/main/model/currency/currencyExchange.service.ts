import { Injectable } from "@angular/core";
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from "@angular/common/http";
import { throwError, Observable, from } from "rxjs";
import { catchError } from "rxjs/operators";
import { CurrencyExchangeRate } from "./currency";
import { formatDate } from "@angular/common";
import { CurrencyService } from "./currency.service";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
@Injectable({
  providedIn: "root",
})
export class CurrencyExchangeRateService {
  constructor(
    private http: HttpClient,
    public currencyService: CurrencyService,
    public modal: NgbModal
  ) {}

  USD;

  editCurrencyExchangeRate(data, _id): Observable<any> {
    data.dateModify = new Date();
    data.dateModify = formatDate(data.dateModify, "dd/MM/yyyy", "en-US");

    return this.http
      .put("/catalogue-service/currency-exchange-rate/", data)
      .pipe(catchError(this.errorHandler));
  }
  getCurrenciesExchangeRateApi(data): Observable<any> {
    if (data.filterModel.dateModify) {
      data.filterModel.dateModify.filterType = "text";
      data.filterModel.dateModify.dateFrom = formatDate(
        data.filterModel.dateModify.dateFrom,
        "dd/MM/yyyy",
        "en-US"
      );
      data.filterModel.dateModify.dateTo = formatDate(
        data.filterModel.dateModify.dateTo,
        "dd/MM/yyyy",
        "en-US"
      );
    }
    if (data.filterModel.dateCreate) {
      data.filterModel.dateCreate.filterType = "text";
      data.filterModel.dateCreate.dateFrom = formatDate(
        data.filterModel.dateCreate.dateFrom,
        "dd/MM/yyyy",
        "en-US"
      );
      data.filterModel.dateCreate.dateTo = formatDate(
        data.filterModel.dateCreate.dateTo,
        "dd/MM/yyyy",
        "en-US"
      );
    }
    if (data.filterModel.toDate) {
      data.filterModel.toDate.filterType = "text";
      data.filterModel.toDate.dateFrom = formatDate(
        data.filterModel.toDate.dateFrom,
        "dd/MM/yyyy",
        "en-US"
      );
      data.filterModel.toDate.dateTo = formatDate(
        data.filterModel.toDate.dateTo,
        "dd/MM/yyyy",
        "en-US"
      );
    }
    if (data.filterModel.fromDate) {
      data.filterModel.fromDate.filterType = "text";
      data.filterModel.fromDate.dateFrom = formatDate(
        data.filterModel.fromDate.dateFrom,
        "dd/MM/yyyy",
        "en-US"
      );
      data.filterModel.fromDate.dateTo = formatDate(
        data.filterModel.fromDate.dateTo,
        "dd/MM/yyyy",
        "en-US"
      );
    }
    return this.http
      .post("/catalogue-service/currency-exchange-rate/get-list/", data)
      .pipe(catchError(this.errorHandler));
  }
  createCurrencyExchangeRate(data): Observable<any> {
    data.dateCreate = new Date();
    data.dateCreate = formatDate(data.dateCreate, "dd/MM/yyyy", "en-US");
    return this.http
      .post("/catalogue-service/currency-exchange-rate/", data)
      .pipe(catchError(this.errorHandler));
  }
  deleteExchangeRateDetails(data) {
    const options = {
      headers: new HttpHeaders({
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "DELETE",
        "Content-Type": "application/json; charset=UTF-8",
        Accept: "application/json",
      }),
      body: data,
    };

    return this.http.delete<any>(
      "/catalogue-service/currency-exchange-rate-details/",
      options
    );
  }
  createExchangeRateDetails(data, id: string, value): Observable<any> {
    console.log(data, id, value);
    data.exchangeRateID = id;
    data.extUSD = data.extVNDSales * (1 / value.extVNDSales);
    data.commissionExtUSD =
      data.commissionExtVNDSales * (1 / value.extVNDSales);
    data = [data];
    return this.http
      .post("/catalogue-service/currency-exchange-rate-details/", data)
      .pipe(catchError(this.errorHandler));
  }
  updateExchangeRateDetails(data): Observable<any> {
    console.log(data);
    return this.http
      .put("/catalogue-service/currency-exchange-rate-details/", data)
      .pipe(catchError(this.errorHandler));
  }
  getCurrencyExchangeRate(id): Observable<any> {
    return this.http
      .post("/catalogue-service/currency-exchange-rate/exchangeRateID/", {
        exchangeRateID: id,
      })
      .pipe(catchError(this.errorHandler));
  }
  getCurrencyExchangeRateDetails(id): Observable<any> {
    const a={
      "startRow":0,
      "endRow":300,
      "sortModel": [
          ],
      "filterModel" : {exchangeRateID: {filterType: "text", type: "contains", filter: id}}
    }
   
    return this.http.post(
      "/catalogue-service/currency-exchange-rate-details/get-list",
      a
    );
  }
  deleteCurrencyExchangeRate(data): Observable<any> {
    const options = {
      headers: new HttpHeaders({
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "DELETE",
        "Content-Type": "application/json; charset=UTF-8",
        Accept: "application/json",
      }),
      body: data,
    };
    return this.http
      .delete("/catalogue-service/currency-exchange-rate/", options)
      .pipe(catchError(this.errorHandler));
  }

  errorHandler(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error("An error occurred:", error.error.message);
    } else {
      window.alert(error.error.message);
    }
    return throwError("Something bad happened; please try again later.");
  }
}
