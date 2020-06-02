import { Injectable } from '@angular/core';
import { Actions, ofType, Effect } from '@ngrx/effects';
import { map, withLatestFrom, switchMap } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import * as SeaFreightActions from './sea-freight.actions';

import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';
import * as fromMain from 'src/app/main/store/main.reducer';
import { RateAndChargesSea } from 'src/app/main/model/rate-charges/rate-and-charges-sea.model';
import { HEADER_POST, HEADER_PUT, HEADER_DELETE } from 'src/app/main/shared/app-settings';

@Injectable()
export class SeaFreightEffects {
  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private store: Store <fromMain.MainState>
  ) {}

  @Effect()
  fetchSeaFreights = this.actions$.pipe(
    ofType(SeaFreightActions.FETCH_SEA_FREIGHTS),
    switchMap((action) => {
      console.log(action);
      const paramsJson = {
        startRow: (action as any).payload.startRow,
        endRow: (action as any).payload.endRow,
        sortModel: (action as any).payload.sortModel,
        filterModel: (action as any).payload.filterModel
      };

      const httpOptions = { headers: HEADER_POST };

      return this.http.post < { totalRows: number, results: RateAndChargesSea[] } > (
        '/sales-service/rate-and-charges-sea/lcl-get-list/', JSON.stringify(paramsJson), httpOptions
      );
    }),
    map(seaFreights => {
      return { seaFreights: seaFreights.results, totalRows: seaFreights.totalRows };
    }),
    map(seaFreights => {
      console.log(seaFreights);
      return new SeaFreightActions.SetSeaFreights(seaFreights);
    })
  );

  // 1. OT
  @Effect()
  fetchOtSeaFreights = this.actions$.pipe(
    ofType(SeaFreightActions.FETCH_OT_SEA_FREIGHTS),
    switchMap((action) => {

      const paramsJson = {
        startRow: (action as any).payload.startRow,
        endRow: (action as any).payload.endRow,
        sortModel: (action as any).payload.sortModel,
        filterModel: (action as any).payload.filterModel
      };
      console.log(paramsJson.filterModel.containerType.filter);
      const httpOptions = { headers: HEADER_POST };

      return this.http.post < { totalRows: number, results: RateAndChargesSea[] } > (
        '/sales-service/rate-and-charges-sea/fcl-get-list/', JSON.stringify(paramsJson), httpOptions
      );
    }),
    map(otSeaFreights => {
      return { otSeaFreights: otSeaFreights.results, totalRows: otSeaFreights.totalRows };
    }),
    map(otSeaFreights => {
      return new SeaFreightActions.SetOtSeaFreights(otSeaFreights);
    })
  );

  // 2. GP
  @Effect()
  fetchGpSeaFreights = this.actions$.pipe(
    ofType(SeaFreightActions.FETCH_GP_SEA_FREIGHTS),
    switchMap((action) => {

      const paramsJson = {
        startRow: (action as any).payload.startRow,
        endRow: (action as any).payload.endRow,
        sortModel: (action as any).payload.sortModel,
        filterModel: (action as any).payload.filterModel
      };
      console.log(paramsJson.filterModel.containerType.filter);
      const httpOptions = { headers: HEADER_POST };

      return this.http.post < { totalRows: number, results: RateAndChargesSea[] } > (
        '/sales-service/rate-and-charges-sea/fcl-get-list/', JSON.stringify(paramsJson), httpOptions
      );
    }),
    map(gpSeaFreights => {
      console.log(gpSeaFreights);
      
      return { gpSeaFreights: gpSeaFreights.results, totalRows: gpSeaFreights.totalRows };
    }),
    map(gpSeaFreights => {
      return new SeaFreightActions.SetGpSeaFreights(gpSeaFreights);
    })
  );

  // 3. RC
  @Effect()
  fetchRcSeaFreights = this.actions$.pipe(
    ofType(SeaFreightActions.FETCH_RC_SEA_FREIGHTS),
    switchMap((action) => {

      const paramsJson = {
        startRow: (action as any).payload.startRow,
        endRow: (action as any).payload.endRow,
        sortModel: (action as any).payload.sortModel,
        filterModel: (action as any).payload.filterModel
      };
      console.log(paramsJson.filterModel.containerType.filter);
      const httpOptions = { headers: HEADER_POST };

      return this.http.post < { totalRows: number, results: RateAndChargesSea[] } > (
        '/sales-service/rate-and-charges-sea/fcl-get-list/', JSON.stringify(paramsJson), httpOptions
      );
    }),
    map(rcSeaFreights => {
      return { rcSeaFreights: rcSeaFreights.results, totalRows: rcSeaFreights.totalRows };
    }),
    map(rcSeaFreights => {
      return new SeaFreightActions.SetRcSeaFreights(rcSeaFreights);
    })
  );

  // 4. FR
  @Effect()
  fetchFrSeaFreights = this.actions$.pipe(
    ofType(SeaFreightActions.FETCH_FR_SEA_FREIGHTS),
    switchMap((action) => {

      const paramsJson = {
        startRow: (action as any).payload.startRow,
        endRow: (action as any).payload.endRow,
        sortModel: (action as any).payload.sortModel,
        filterModel: (action as any).payload.filterModel
      };
      console.log(paramsJson.filterModel.containerType.filter);
      const httpOptions = { headers: HEADER_POST };

      return this.http.post < { totalRows: number, results: RateAndChargesSea[] } > (
        '/sales-service/rate-and-charges-sea/fcl-get-list/', JSON.stringify(paramsJson), httpOptions
      );
    }),
    map(frSeaFreights => {
      return { frSeaFreights: frSeaFreights.results, totalRows: frSeaFreights.totalRows };
    }),
    map(frSeaFreights => {
      return new SeaFreightActions.SetFrSeaFreights(frSeaFreights);
    })
  );

  // 5. ISO
  @Effect()
  fetchIsoSeaFreights = this.actions$.pipe(
    ofType(SeaFreightActions.FETCH_ISO_SEA_FREIGHTS),
    switchMap((action) => {

      const paramsJson = {
        startRow: (action as any).payload.startRow,
        endRow: (action as any).payload.endRow,
        sortModel: (action as any).payload.sortModel,
        filterModel: (action as any).payload.filterModel
      };
      console.log(paramsJson.filterModel.containerType.filter);
      const httpOptions = { headers: HEADER_POST };

      return this.http.post < { totalRows: number, results: RateAndChargesSea[] } > (
        '/sales-service/rate-and-charges-sea/fcl-get-list/', JSON.stringify(paramsJson), httpOptions
      );
    }),
    map(isoSeaFreights => {
      return { isoSeaFreights: isoSeaFreights.results, totalRows: isoSeaFreights.totalRows };
    }),
    map(isoSeaFreights => {
      return new SeaFreightActions.SetIsoSeaFreights(isoSeaFreights);
    })
  );

  @Effect()
  storeSeaFreights = this.actions$.pipe(
    ofType < SeaFreightActions.StoreSeaFreight > (SeaFreightActions.STORE_SEA_FREIGHT),
    switchMap(
      (actionData) => {
        const aSeaFreight = actionData.payload;
        const newSea = this.transformData(aSeaFreight);
        const { _id, ...newSeaFreight } = newSea;
        const httpOptions = { headers: HEADER_POST };

        return this.http.post < RateAndChargesSea > (
          '/sales-service/rate-and-charges-sea/',
          JSON.stringify(newSeaFreight),
          httpOptions
        );
      }
    ),
    map((seaFreight: any) => {
      // TODO: remove this after define container model.
      let seaSuccess = { ...seaFreight };
      if (seaFreight.containerType != null) {
        seaSuccess.containerType = seaFreight.containerType.unitID;
      }

      return new SeaFreightActions.StoreSeaFreightSuccess(seaSuccess);
    })
  );

  // save edited data
  @Effect({ dispatch: false })
  updateSeaFreight = this.actions$.pipe(
    ofType < SeaFreightActions.UpdateSeaFreight > (SeaFreightActions.UPDATE_SEA_FREIGHT),
    withLatestFrom(this.store.select('seafreights')),
    switchMap(([actionData, seaState]) => {
      const seaFreight = actionData.payload.newSeaFreight;
      const updatedSeaFreight = this.transformData(seaFreight);
      const httpOptions = { headers: HEADER_PUT };

      return this.http.put(
        '/sales-service/rate-and-charges-sea/',
        JSON.stringify(updatedSeaFreight),
        httpOptions
      );
    })
  );

  @Effect({ dispatch: false })
  deleteSeaFreight = this.actions$.pipe(
    ofType < SeaFreightActions.DeleteSeaFreight > (SeaFreightActions.DELETE_SEA_FREIGHT),
    withLatestFrom(this.store.select('seafreights')),
    switchMap(([actionData, seaFreightState]) => {

      const indexSea = actionData.payload.index;
      const deletedSea = actionData.payload.selectedSea;
      const id = deletedSea._id;
      const bodyJson = JSON.stringify({ id });
      const options = { headers: HEADER_DELETE, body: bodyJson };

      return this.http.delete('/sales-service/rate-and-charges-sea/', options);
    })
  );

  private transformData(data: any) {
    let cloneData = {...data };
    cloneData.currency = data.currency ? data.currency.currencyID : '';
    cloneData.portofLoading = data.portofLoading ? data.portofLoading.portID : '';
    cloneData.portofDischarge = data.portofDischarge ? data.portofDischarge.portID : '';
    cloneData.transitPort = cloneData.transitPort ? cloneData.transitPort.portID : '';
    if (cloneData.hasOwnProperty('carrierID') && cloneData.carrierID !== null) {
      cloneData.carrierID = cloneData.carrierID.partnerID;
    }
    console.log(cloneData);

    return cloneData;
  }
}
