import { Injectable } from '@angular/core';
import { Actions, ofType, Effect } from '@ngrx/effects';
import { map, withLatestFrom, switchMap } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import * as LocalChargeDetailActions from './local-charge-detail.actions';

import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';
import * as fromMain from 'src/app/main/store/main.reducer';
import { LocalChargeDetail } from 'src/app/main/model/rate-charges/local-charges/local-charge-detail.model';
import { HEADER_POST, HEADER_PUT, HEADER_DELETE } from 'src/app/main/shared/app-settings';

@Injectable()
export class LocalChargeDetailEffects {
  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private store: Store <fromMain.MainState>
  ) {}

  @Effect()
  fetchLocalChargeDetails = this.actions$.pipe(
    ofType(LocalChargeDetailActions.FETCH_LOCAL_CHARGE_DETAILS),
    switchMap((action) => {

      const paramsJson = {
        startRow: (action as any).payload.startRow,
        endRow: (action as any).payload.endRow,
        sortModel: (action as any).payload.sortModel,
        filterModel: (action as any).payload.filterModel
      };

      const httpOptions = { headers: HEADER_POST };

      return this.http.post < {totalRows: number, results: LocalChargeDetail[]} > (
        '/sales-service/rate-and-charges-local-charge-details/get-list/', JSON.stringify(paramsJson), httpOptions
      );
    }),
    map(localChargeDetails => {
      
      return { localChargeDetails: localChargeDetails.results, totalRows: localChargeDetails.totalRows };
    }),
    map(localChargeDetails => {
      console.log(localChargeDetails);
      return new LocalChargeDetailActions.SetLocalChargeDetails(localChargeDetails);
    })
  );

  @Effect()
  storeLocalChargeDetail = this.actions$.pipe(
    ofType < LocalChargeDetailActions.StoreLocalChargeDetail > (LocalChargeDetailActions.STORE_LOCAL_CHARGE_DETAIL),
    switchMap(
      (actionData) => {
        const aLocalChargeDetail = actionData.payload;
        const newTruck = this.transformData(aLocalChargeDetail);
        const { _id, ...newLocalChargeDetail } = newTruck;
        const httpOptions = { headers: HEADER_POST };

        return this.http.post < LocalChargeDetail > (
          '/sales-service/rate-and-charges-local-charge-details/',
          JSON.stringify(newLocalChargeDetail),
          httpOptions
        );
      }
    ),
    map((localChargeDetail: any) => {
      const truckSuccess = { ...localChargeDetail };
      return new LocalChargeDetailActions.StoreLocalChargeDetailSuccess(truckSuccess);
    })
  );

  // save edited data
  @Effect({ dispatch: false })
  updateLocalChargeDetail = this.actions$.pipe(
    ofType < LocalChargeDetailActions.UpdateLocalChargeDetail > (LocalChargeDetailActions.UPDATE_LOCAL_CHARGE_DETAIL),
    withLatestFrom(this.store.select('localChargeDetails')),
    switchMap(([actionData, localChargeDetailState]) => {
      const localChargeDetail = actionData.payload.newLocalChargeDetail;
      const updatedLocalChargeDetail = this.transformData(localChargeDetail);
      const httpOptions = { headers: HEADER_PUT };

      return this.http.put(
        '/sales-service/rate-and-charges-local-charge-details/get-list/',
        JSON.stringify(updatedLocalChargeDetail),
        httpOptions
      );
    })
  );

  @Effect({ dispatch: false })
  deleteLocalChargeDetail = this.actions$.pipe(
    ofType < LocalChargeDetailActions.DeleteLocalChargeDetail > (LocalChargeDetailActions.DELETE_LOCAL_CHARGE_DETAIL),
    withLatestFrom(this.store.select('localChargeDetails')),
    switchMap(([actionData, localChargeDetailState]) => {

      const deletedLocalChargeDetail = actionData.payload.selectedLocalChargeDetail;
      console.log(deletedLocalChargeDetail);

      const id = deletedLocalChargeDetail._id;
      const bodyJson = JSON.stringify({ _id: id });
      const options = { headers: HEADER_DELETE, body: bodyJson };

      return this.http.delete('/sales-service/rate-and-charges-local-charge-details/get-list/', options);
    })
  );

  private transformData(data: any) {
    let cloneData = {...data };
    cloneData.currency = data.currency ? data.currency.currencyID : '';
    cloneData.fee = data.fee ? data.fee.feeID : '';

    return cloneData;
  }
}
