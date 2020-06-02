import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class PuposeImportExportService {

    constructor(private http: HttpClient) { }

    getPuposeImportExport() {
        const puposeImEx = [
            'trading', 'investment','export processing', 'temporary import for re-export',
            'temporary export for re-import', 'on-spot export and import', 'non-commercial'
        ];
        return puposeImEx;
    }
}
