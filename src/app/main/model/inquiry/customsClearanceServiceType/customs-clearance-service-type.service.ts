import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { CustomsClearanceServiceType } from './customs-clearance-service-type.model';

@Injectable({
    providedIn: 'root'
})
export class CustomsClearanceTypeService {

    constructor(private http: HttpClient) { }

    getCustomsClearanceServiceType() {
        const customsClearanceServiceType = [
            new CustomsClearanceServiceType(
                "5e7dbb88be11d7c18c7bb99c",
                "Mã Service Customs Clearance",
                "Tên Mã Service Customs Clearance",
                false
            ),
            new CustomsClearanceServiceType(
                "5e7dbccfbe11d7c18c7bbb5b",
                "Trading",
                "Trading",
                false
            ),
            new CustomsClearanceServiceType(
                "5e7dbccfbe11d7c18c7bbb5e",
                "Investment",
                "Investment",
                false
            ),
            new CustomsClearanceServiceType(
                "5e7dbccfbe11d7c18c7bbb61",
                "ExpProcessing",
                "ExportProcessing",
                true
            ),
            new CustomsClearanceServiceType(
                "5e7dbccfbe11d7c18c7bbb64",
                "ImpToReExp",
                "Temporary Import For Re-Export",
                true
            ),
            new CustomsClearanceServiceType(
                "5e7dbccfbe11d7c18c7bbb67",
                "ExpToReImp",
                "Temporary Export For Re-Import",
                true
            ),
            new CustomsClearanceServiceType(
                "5e7dbccfbe11d7c18c7bbb6a",
                "OnSpotExpImp",
                "On-Spot Export And Import",
                true
            ),
            new CustomsClearanceServiceType(
                "5e7dbccfbe11d7c18c7bbb6d",
                "NonCommercial",
                "Non-commercial",
                true
            )
        ];
        return customsClearanceServiceType;
    }
}
