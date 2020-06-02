import { Injectable } from '@angular/core';
import { Actions, ofType, Effect } from '@ngrx/effects';
import { map, withLatestFrom, switchMap } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import * as TruckingChargeActions from './trucking-charge.actions';

import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';
import * as fromMain from 'src/app/main/store/main.reducer';
import { TruckingCharge } from 'src/app/main/model/rate-charges/trucking-charge/trucking-charge.model';
import { HEADER_POST, HEADER_PUT, HEADER_DELETE } from 'src/app/main/shared/app-settings';

@Injectable()
export class TruckingChargeEffects {
  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private store: Store <fromMain.MainState>
  ) {}

  @Effect()
  fetchTruckingCharges = this.actions$.pipe(
    ofType(TruckingChargeActions.FETCH_TRUCKING_CHARGES),
    switchMap((action) => {

      const paramsJson = {
        startRow: (action as any).payload.startRow,
        endRow: (action as any).payload.endRow,
        sortModel: (action as any).payload.sortModel,
        filterModel: (action as any).payload.filterModel
      };

      const httpOptions = { headers: HEADER_POST };

      return this.http.post < { totalRows: number, results: TruckingCharge[] } > (
        '/sales-service/rate-and-charges-trucking/get-list/', JSON.stringify(paramsJson), httpOptions
      );
    }),
    map(truckingCharges => {
      return { truckingCharges: truckingCharges.results, totalRows: truckingCharges.totalRows };
    }),
    map(truckingCharges => {
      return new TruckingChargeActions.SetTruckingCharges(truckingCharges);
    })
  );

  @Effect()
  storeTruckingCharge = this.actions$.pipe(
    ofType < TruckingChargeActions.StoreTruckingCharge > (TruckingChargeActions.STORE_TRUCKING_CHARGE),
    switchMap(
      (actionData) => {
        const aTruckingCharge = actionData.payload;
        const newTruck = this.transformData(aTruckingCharge);
        const { _id, ...newTruckingCharge } = newTruck;
        const httpOptions = { headers: HEADER_POST };

        return this.http.post < TruckingCharge > (
          '/sales-service/rate-and-charges-trucking/',
          JSON.stringify(newTruckingCharge),
          httpOptions
        );
      }
    ),
    map((truckingCharge: any) => {
      const truckSuccess = { ...truckingCharge };
      return new TruckingChargeActions.StoreTruckingChargeSuccess(truckSuccess);
    })
  );

  // save edited data
  @Effect({ dispatch: false })
  updateTruckingCharge = this.actions$.pipe(
    ofType < TruckingChargeActions.UpdateTruckingCharge > (TruckingChargeActions.UPDATE_TRUCKING_CHARGE),
    withLatestFrom(this.store.select('truckingCharges')),
    switchMap(([actionData, truckState]) => {
      const truckingCharge = actionData.payload.newTruckingCharge;
      const updatedTruckingCharge = this.transformData(truckingCharge);
      const httpOptions = { headers: HEADER_PUT };

      return this.http.put(
        '/sales-service/rate-and-charges-trucking/',
        JSON.stringify(updatedTruckingCharge),
        httpOptions
      );
    })
  );

  @Effect({ dispatch: false })
  deleteTruckingCharge = this.actions$.pipe(
    ofType < TruckingChargeActions.DeleteTruckingCharge > (TruckingChargeActions.DELETE_TRUCKING_CHARGE),
    withLatestFrom(this.store.select('truckingCharges')),
    switchMap(([actionData, truckingChargeState]) => {

      const deletedTruck = actionData.payload.selectedTruck;
      console.log(deletedTruck);
      const id = deletedTruck._id;
      const bodyJson = JSON.stringify({ _id: id });
      const options = { headers: HEADER_DELETE, body: bodyJson };

      return this.http.delete('/sales-service/rate-and-charges-trucking/', options);
    })
  );

  private transformData(data: any) {
    // tslint:disable-next-line: prefer-const
    let cloneData = {...data };
    cloneData.currency = data.currency ? data.currency.currencyID : '';
    cloneData.pickupCity = data.pickupCity ? data.pickupCity.cityID : '';
    cloneData.pickupArea = data.pickupArea ? data.pickupArea.areaID : '';
    cloneData.deliveryCity = data.deliveryCity ? data.deliveryCity.cityID : '';
    cloneData.deliveryArea = data.deliveryArea ? data.deliveryArea.areaID : '';

    return cloneData;
  }
}
