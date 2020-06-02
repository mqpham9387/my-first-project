import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { Location } from "./location";

@Injectable({
  providedIn: "root",
})
export class LocationService {
  constructor(private http: HttpClient) {}

  async getLocationsApi() {
    try {
      // let res = await this.http.get<Location[]>("http://192.168.201.45:8085/general-service/location/").toPromise();
      let res:any = await this.http
        .post("/general-service/location/get-list/", {
          startRow: 0,
          endRow: 300,
          sortModel: [],
          filterModel: {},
        })
        .toPromise();
      return (res.results);
    } catch (err) {
      catchError(err);
    }
  }

  insLocationsApi(location) {}

  updLocationsApi(location) {}

  delLocationsApi(location) {}

  errorHandler(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error("An error occurred:", error.error.message);
    } else {
      window.alert(error.error.message);
    }
    return throwError("Something bad happened; please try again later.");
  }
}
