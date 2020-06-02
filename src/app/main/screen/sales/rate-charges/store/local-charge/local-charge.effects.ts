import { Injectable } from '@angular/core';
import { Actions, ofType, Effect } from '@ngrx/effects';
import { map, withLatestFrom, switchMap } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import * as LocalChargeActions from './local-charge.actions';

import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';
import * as fromMain from 'src/app/main/store/main.reducer';
import { LocalCharge } from 'src/app/main/model/rate-charges/local-charges/local-charge.model';
import { HEADER_POST, HEADER_PUT, HEADER_DELETE } from 'src/app/main/shared/app-settings';

@Injectable()
export class LocalChargeEffects {
  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private store: Store <fromMain.MainState>
  ) {}

  @Effect()
  fetchLocalCharges = this.actions$.pipe(
    ofType(LocalChargeActions.FETCH_LOCAL_CHARGES),
    switchMap((action) => {

      const paramsJson = {
        startRow: (action as any).payload.startRow,
        endRow: (action as any).payload.endRow,
        sortModel: (action as any).payload.sortModel,
        filterModel: (action as any).payload.filterModel
      };

      const httpOptions = { headers: HEADER_POST };

      return this.http.post < { totalRows: number, results: LocalCharge[] } > (
        '/sales-service/rate-and-charges-local-charge/get-list/', JSON.stringify(paramsJson), httpOptions
      );
    }),
    map(localCharges => {
      return { localCharges: localCharges.results, totalRows: localCharges.totalRows };
    }),
    map(localCharges => {
      return new LocalChargeActions.SetLocalCharges(localCharges);
    })
  );

  @Effect()
  storeLocalCharge = this.actions$.pipe(
    ofType < LocalChargeActions.StoreLocalCharge > (LocalChargeActions.STORE_LOCAL_CHARGE),
    switchMap(
      (actionData) => {
        const aLocalCharge = actionData.payload;
        const newLocal = this.transformData(aLocalCharge);
        const { _id, ...newLocalCharge } = newLocal;
        const httpOptions = { headers: HEADER_POST };

        return this.http.post < any > (
          '/sales-service/rate-and-charges-local-charge/',
          JSON.stringify(newLocalCharge),
          httpOptions
        );
      }
    ),
    map((localCharge: any) => {
      const truckSuccess = { ...localCharge };
      console.log(truckSuccess);

      return new LocalChargeActions.StoreLocalChargeSuccess(truckSuccess);
    })
  );

  // save edited data
  @Effect({ dispatch: false })
  updateLocalCharge = this.actions$.pipe(
    ofType < LocalChargeActions.UpdateLocalCharge > (LocalChargeActions.UPDATE_LOCAL_CHARGE),
    withLatestFrom(this.store.select('localCharges')),
    switchMap(([actionData, truckState]) => {
      const localCharge = actionData.payload.newLocalCharge;
      const updatedLocalCharge = this.transformData(localCharge);
      const httpOptions = { headers: HEADER_PUT };

      return this.http.put(
        '/sales-service/rate-and-charges-local-charge/',
        JSON.stringify(updatedLocalCharge),
        httpOptions
      );
    })
  );

  @Effect({ dispatch: false })
  deleteLocalCharge = this.actions$.pipe(
    ofType < LocalChargeActions.DeleteLocalCharge > (LocalChargeActions.DELETE_LOCAL_CHARGE),
    withLatestFrom(this.store.select('localCharges')),
    switchMap(([actionData, localChargeState]) => {

      const deletedLocalCharge = actionData.payload.selectedLocalCharge;
      console.log(deletedLocalCharge);
      const id = deletedLocalCharge._id;
      const bodyJson = JSON.stringify({ _id: id });
      const options = { headers: HEADER_DELETE, body: bodyJson };

      return this.http.delete('/sales-service/rate-and-charges-local-charge/', options);
    })
  );

  private transformData(data: any) {
    let cloneData = {...data };
    cloneData.service = data.service ? data.service.serviceID : '';
    cloneData.portofLoading = data.portofLoading ? data.portofLoading.portID : '';
    cloneData.portofDischarge = data.portofDischarge ? data.portofDischarge.portID : '';
    cloneData.transitPort = data.transitPort ? data.transitPort.portID : '';
    cloneData.podCountry = data.podCountry ? data.podCountry.countryID : '';
    cloneData.polCountry = data.polCountry ? data.polCountry.countryID : '';
    cloneData.transitCountry = data.transitCountry ? data.transitCountry.countryID : '';
    let rcLocalChargeDetailsCopy = data.rateAndChargesLocalChargeDetails ? data.rateAndChargesLocalChargeDetails: [];
    let newRcLocalChargeDetail = [];
    if (rcLocalChargeDetailsCopy) {
      newRcLocalChargeDetail = rcLocalChargeDetailsCopy.map(
        ({ rowStatus, ...item }) => {
          item.fee = item.fee ? item.fee.feeID : '';
          item.currency = item.currency ? item.currency.currencyID : '';
          return item;
        }
      );
    }
    cloneData.rateAndChargesLocalChargeDetails = newRcLocalChargeDetail;

    return cloneData;
  }
}
