import { Injectable } from '@angular/core';
import { Actions, ofType, Effect } from '@ngrx/effects';
import { map, withLatestFrom, switchMap } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import * as CustomsCleanranceActions from './customs-clearance.actions';

import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';
import * as fromMain from 'src/app/main/store/main.reducer';
import { RateAndChargesCustomsCleanrance } from 'src/app/main/model/rate-charges/customs-cleanrance/customs-cleanrance.model';
import { HEADER_POST, HEADER_PUT, HEADER_DELETE } from 'src/app/main/shared/app-settings';

@Injectable()
export class CustomsCleanranceEffects {
  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private store: Store<fromMain.MainState>
  ) { }

  // 1. export cleanrance
  @Effect()
  fetchExportCleanrances = this.actions$.pipe(
    ofType(CustomsCleanranceActions.FETCH_EXPORT_CLEANRANCES),
    switchMap((action) => {

      const paramsJson = {
        startRow: (action as any).payload.startRow,
        endRow: (action as any).payload.endRow,
        sortModel: (action as any).payload.sortModel,
        filterModel: (action as any).payload.filterModel
      };
      const httpOptions = { headers: HEADER_POST };

      return this.http.post < { totalRows: number, results: RateAndChargesCustomsCleanrance[] } > (
        '/sales-service/rate-and-charges-customs-cleanrance/get-list/', JSON.stringify(paramsJson), httpOptions
      );
    }),
    map(exportClearances => {
      return { exportClearances: exportClearances.results, totalEcRows: exportClearances.totalRows };
    }),
    map(exportClearances => {
      return new CustomsCleanranceActions.SetExportCleanrances(exportClearances);
    })
  );

  // 2. Import cleanrance
  @Effect()
  fetchImportCleanrances = this.actions$.pipe(
    ofType(CustomsCleanranceActions.FETCH_IMPORT_CLEANRANCES),
    switchMap((action) => {

      const paramsJson = {
        startRow: (action as any).payload.startRow,
        endRow: (action as any).payload.endRow,
        sortModel: (action as any).payload.sortModel,
        filterModel: (action as any).payload.filterModel
      };

      const httpOptions = { headers: HEADER_POST };

      return this.http.post < { totalRows: number, results: RateAndChargesCustomsCleanrance[] } > (
        '/sales-service/rate-and-charges-customs-cleanrance/get-list/', JSON.stringify(paramsJson), httpOptions
      );
    }),
    map(importClearances => {
      console.log(importClearances);

      return { importClearances: importClearances.results, totalIcRows: importClearances.totalRows };
    }),
    map(importClearances => {
      return new CustomsCleanranceActions.SetImportCleanrances(importClearances);
    })
  );

  // 3. Aux
  @Effect()
  fetchAuxCleanrances = this.actions$.pipe(
    ofType(CustomsCleanranceActions.FETCH_AUX_CLEANRANCES),
    switchMap((action) => {

      const paramsJson = {
        startRow: (action as any).payload.startRow,
        endRow: (action as any).payload.endRow,
        sortModel: (action as any).payload.sortModel,
        filterModel: (action as any).payload.filterModel
      };

      const httpOptions = { headers: HEADER_POST };

      return this.http.post < { totalRows: number, results: RateAndChargesCustomsCleanrance[] } > (
        '/sales-service/rate-and-charges-customs-cleanrance/get-list/', JSON.stringify(paramsJson), httpOptions
      );
    }),
    map(auxiliaries => {
      return { auxiliaries: auxiliaries.results, totalAuxRows: auxiliaries.totalRows };
    }),
    map(auxiliaries => {
      return new CustomsCleanranceActions.SetAuxCleanrances(auxiliaries);
    })
  );

  @Effect()
  storeCleanrance = this.actions$.pipe(
    ofType <CustomsCleanranceActions.StoreCustomsCleanrance> (CustomsCleanranceActions.STORE_CLEANRANCE),
    switchMap(
      (actionData) => {
        const storedCc = actionData.payload;
        const newCc = this.transformData(storedCc);
        const { _id, ...newCustomCleanrance } = newCc;
        const httpOptions = { headers: HEADER_POST };

        return this.http.post <RateAndChargesCustomsCleanrance> (
          '/sales-service/rate-and-charges-customs-cleanrance/',
          JSON.stringify(newCustomCleanrance),
          httpOptions
        );
      }
    ),
    map((newCustomCleanrance: any) => {
      const ccSuccess = { ...newCustomCleanrance };
      return new CustomsCleanranceActions.StoreCustomsCleanranceSuccess(ccSuccess);
    })
  );

  // save edited data
  @Effect({ dispatch: false })
  updateCustomsClearance = this.actions$.pipe(
    ofType <CustomsCleanranceActions.UpdateCustomsCleanrance> (CustomsCleanranceActions.UPDATE_CLEANRANCE),
    withLatestFrom(this.store.select('cCleanrances')),
    switchMap(([actionData, ccState]) => {
      const cCleanrance = actionData.payload.newCustomsCleanrance;
      const updatedCc = this.transformData(cCleanrance);
      const httpOptions = { headers: HEADER_PUT };
      console.log(updatedCc);

      return this.http.put(
        '/sales-service/rate-and-charges-customs-cleanrance/',
        JSON.stringify(updatedCc),
        httpOptions
      );
    })
  );

  @Effect({ dispatch: false })
  deleteCleanrance = this.actions$.pipe(
    ofType <CustomsCleanranceActions.DeleteCustomsCleanrance> (CustomsCleanranceActions.DELETE_CLEANRANCE),
    withLatestFrom(this.store.select('cCleanrances')),
    switchMap(([actionData, ccState]) => {
      const deletedCc = actionData.payload.selectedCleanrance;
      const id = deletedCc._id;
      const bodyJson = JSON.stringify({ _id: id });
      const options = { headers: HEADER_DELETE, body: bodyJson };
      console.log(options);

      return this.http.delete('/sales-service/rate-and-charges-customs-cleanrance/', options);
    })
  );

  private transformData(data: any) {

    let cloneData = {...data };
    cloneData.fee = data.fee ? data.fee.feeID : '';
    cloneData.unit = data.unit ? data.unit.unitID : '';
    cloneData.companyID = data.companyID ? data.companyID.companyID : '';
    cloneData.currency = data.currency ? data.currency.currencyID : '';
    cloneData.carrier = data.carrier ? data.carrier.partnerID : '';
    cloneData.service = data.service ? data.service.serviceID : '';

    return cloneData;
  }
}
