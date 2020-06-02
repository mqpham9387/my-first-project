import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Area } from './area.model';

@Injectable({
  providedIn: 'root'
})
export class AreaService {

  constructor(
    private http: HttpClient
  ) { }

  getAreasApi(): Area[] {
    const results = [
      new Area(
        '5db3ad43bb52a3c9620fa856',
        'HK012',
        'Hong Kong',
        'notes'
      ),
      new Area(
        '5db3ad43bb52a3c9620fn184',
        'NY387',
        'New York',
        'notes'
      ),
      new Area(
        '5db3ad43bb52a3c9620fl185',
        'Tokyo234',
        'Tokyo',
        'notes'
      )
    ]
    return results;
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
