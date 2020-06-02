import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { PartnerDepartment } from './partner-department';

@Injectable({
  providedIn: 'root'
})
export class PartnerDepartmentService {

  constructor(
    private http: HttpClient
  ) { }

  async getPartnerDepartmentsApi() {
    try {
      // let res = await this.http.get<PartnerDepartment[]>("http://192.168.201.45:8085/catalogue-service/partnerdepartments/").toPromise();
      let res = await this.http.get<PartnerDepartment[]>("/catalogue-service/partnerdepartments/").toPromise();
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
