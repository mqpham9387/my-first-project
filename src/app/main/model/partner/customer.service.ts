import { Injectable } from "@angular/core";
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from "@angular/common/http";
import { Observable, throwError, of } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { Pagination } from "../paginClass/pagination";
import { formatDate } from '@angular/common';

@Injectable({
  providedIn: "root",
})
export class CustomerService {
  constructor(private httpclient: HttpClient) {}

  getCustomer(data): Observable<any> {
    const a = {
      filterType: "text",
      type: "in",
      filter: ["CUSTOMERS"],
    };
    data.filterModel["group"] = a;
    if (data.filterModel.dateModify) {
      data.filterModel.dateModify.filterType="text"
      data.filterModel.dateModify.dateFrom = formatDate(data.filterModel.dateModify.dateFrom,"dd/MM/yyyy","en-US")
      data.filterModel.dateModify.dateTo = formatDate(data.filterModel.dateModify.dateTo,"dd/MM/yyyy","en-US")
      console.log(data);
    }
    return this.httpclient
      .post<any>("/catalogue-service/partner/get-list/", data)
      .pipe(catchError(this.errorHandler));
  }
  search(term: string) {
    if (term === "") {
      return of([]);
    }
    return this.httpclient
      .post("/catalogue-service/partner/get-list/", {
        filterModel: {
          partnerNameAbbr: {
            filterType: "text",
            type: "contains",
            filter: term,
          },
          group:{
            filterType: "text",
            type: "in",
            filter: ["CUSTOMERS"],
          }
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
      console.error("An error occurred:", error.error.message);
    } else {
      window.alert(error.error.message);
    }
    return throwError("Something bad happened; please try again later.");
  }
}
