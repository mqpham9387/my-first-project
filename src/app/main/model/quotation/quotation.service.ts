import { Injectable } from "@angular/core";
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { QuotationType } from "./quotation-type.model";
import { HEADER_POST } from "../../shared/app-settings";

@Injectable({
  providedIn: "root",
})
export class QuotationService {
  constructor(private httpclient: HttpClient) {}

  getQuotationTypes(data?: any): Observable<any> {
    if (!data || data === null || data === undefined) {
      data = {
        startRow: 0,
        endRow: 90,
      };
    }
    const httpOptions = { headers: HEADER_POST };

    return this.httpclient
      .post<{ totalRows: number; results: any[] }>(
        "/sales-service/quotation-types/get-list/",
        JSON.stringify(data),
        httpOptions
      )
      .pipe(
        map((data) => {
          return data.results;
        }),
        catchError(this.errorHandler)
      );
  }
  addQuotationAir(data): Observable<any> {
    console.log(data);
    return this.httpclient
      .post("/sales-service/quotation/add-quotation-air/", data)
      .pipe(catchError(this.errorHandler));
  }
  updateQuotation(data): Observable<any> {
    console.log(data);
    return this.httpclient
      .put("/sales-service/quotation/", data)
      .pipe(catchError(this.errorHandler));
  }
  deleteQuotationAir(_id): Observable<any> {
    const options = {
      headers: new HttpHeaders({
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "DELETE",
        "Content-Type": "application/json; charset=UTF-8",
        Accept: "application/json",
      }),
      body: { _id: _id },
    };
    return this.httpclient.delete("/sales-service/quotation/", options);
  }

  errorHandler(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error("An error occurred:", error.error.message);
    } else {
      window.alert(error.error.message);
    }
    return throwError("Something bad happened; please try again later.");
  }

  getQuotationAir_detail(quotationNo): Observable<any> {
    const a = {
      startRow: 0,
      endRow: 500,
      sortModel: [],
      filterModel: {
        quotationNo: {
          filterType: "text",
          type: "equals",
          filter: quotationNo,
        },
      },
    };
    return this.httpclient
      .post("/sales-service/air-quotation-details/get-list/", a)
      .pipe(catchError(this.errorHandler));
  }
  getQuotationDetail_CustomClearance(quotationNo): Observable<any> {
    const a = {
      startRow: 0,
      endRow: 50,
      sortModel: [],
      filterModel: {
        quotationNo: {
          filterType: "text",
          type: "equals",
          filter: quotationNo,
        },
      },
    };
    return this.httpclient
      .post("/sales-service/quotation-details-customs-clearance/get-list/", a)
      .pipe(catchError(this.errorHandler));
  }
  updateQuotationDetail_CustomClearance(data): Observable<any> {
    return this.httpclient
      .post("/sales-service/quotation-details-customs-clearance/", data)
      .pipe(catchError(this.errorHandler));
  }
  updateQuotationAirDetail(data): Observable<any> {
    return this.httpclient
      .put("/sales-service/air-quotation-details/", data)
      .pipe(catchError(this.errorHandler));
  }
  createQuotationAirDetail(data): Observable<any> {
    return this.httpclient
      .post("/sales-service/air-quotation-details/", data)
      .pipe(catchError(this.errorHandler));
  }
  deleteQuotationAirDetail(_id): Observable<any> {
    const options = {
      headers: new HttpHeaders({
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "DELETE",
        "Content-Type": "application/json; charset=UTF-8",
        Accept: "application/json",
      }),
      body: { _id: _id },
    };
    return this.httpclient.delete(
      "/sales-service/air-quotation-details/",
      options
    );
  }

  getQuotationTruckingNonContainer(quotationNo): Observable<any> {
    const a = {
      startRow: 0,
      endRow: 500,
      sortModel: [],
      filterModel: {
        quotationNo: {
          filterType: "text",
          type: "equals",
          filter: quotationNo,
        },
      },
    };

    return this.httpclient
      .post(
        "/sales-service/quotation-details-trucking-non-container/get-list/",
        a
      )
      .pipe(catchError(this.errorHandler));
  }
  updateQuotationDetailTruckingNonContainer(data): Observable<any> {
    return this.httpclient
      .put("/sales-service/quotation-details-trucking-non-container/", data)
      .pipe(catchError(this.errorHandler));
  }
  createQuotationDetailTruckingNonContainer(data): Observable<any> {
    return this.httpclient
      .post("/sales-service/quotation-details-trucking-non-container/", data)
      .pipe(catchError(this.errorHandler));
  }
  deleteQuotationDetailTruckingNonContainer(_id): Observable<any> {
    const options = {
      headers: new HttpHeaders({
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "DELETE",
        "Content-Type": "application/json; charset=UTF-8",
        Accept: "application/json",
      }),
      body: { _id: _id },
    };
    return this.httpclient.delete(
      "/sales-service/quotation-details-trucking-non-container/",
      options
    );
  }

  getQuotationTruckingContainer(paramsJson: any): Observable<any> {
    const httpOptions = { headers: HEADER_POST };
    return this.httpclient.post < { totalRows: number, results: any[] } > (
      '/sales-service/quotation-details-trucking-container/get-list/',
      JSON.stringify(paramsJson),
      httpOptions
    ).pipe(catchError(this.errorHandler));
  }
  updateQuotationDetailTruckingContainer(data): Observable<any> {
    return this.httpclient
      .put('/sales-service/quotation-details-trucking-container/', data)
      .pipe(catchError(this.errorHandler));
  }
  deleteQuotationDetailTruckingContainer(_id): Observable<any> {
    const options = {
      headers: new HttpHeaders({
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "DELETE",
        "Content-Type": "application/json; charset=UTF-8",
        Accept: "application/json",
      }),
      body: { _id: _id },
    };
    return this.httpclient.delete(
      '/sales-service/quotation-details-trucking-container/',
      options
    );
  }

  getQuotDetailsTruckNonCont(paramsJson: any): Observable<any> {
    const httpOptions = { headers: HEADER_POST };
    return this.httpclient.post < { totalRows: number, results: any[] } > (
      '/sales-service/quotation-details-trucking-non-container/get-list/',
      JSON.stringify(paramsJson),
      httpOptions
    ).pipe(catchError(this.errorHandler));
  }
  getQuotDetailsCustomsClearance(paramsJson: any): Observable<any> {
    const httpOptions = { headers: HEADER_POST };
    return this.httpclient.post < { totalRows: number, results: any[] } > (
      '/sales-service/quotation-details-customs-clearance/get-list/', JSON.stringify(paramsJson), httpOptions
    ).pipe(catchError(this.errorHandler));
  }
  getQuotationDetailsOtherCharges(paramsJson: any): Observable<any> {
    const httpOptions = { headers: HEADER_POST };
    return this.httpclient.post < { totalRows: number, results: any[] } > (
      '/sales-service/quotation-details-other-charges/get-list/', JSON.stringify(paramsJson), httpOptions
    ).pipe(catchError(this.errorHandler));
  }

  updateOtherChargeDetail(data): Observable<any> {
    return this.httpclient
      .put('/sales-service/quotation-details-other-charges/',  JSON.stringify(data))
      .pipe(catchError(this.errorHandler));
  }

  updateCustomClearance(data): Observable<any> {
    return this.httpclient
      .put('/sales-service/quotation-details-customs-clearance/', data)
      .pipe(catchError(this.errorHandler));
  }
}
