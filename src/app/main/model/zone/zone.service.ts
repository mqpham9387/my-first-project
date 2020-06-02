import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable(
    { providedIn: 'root'}
)
export class ZoneService {
    constructor(
        private http: HttpClient
      ) { }
      getAllZone():Observable<any>{
          return this.http.get('/general-service/zones/')
      }
}