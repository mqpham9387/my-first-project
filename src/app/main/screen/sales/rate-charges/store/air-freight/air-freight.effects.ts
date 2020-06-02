import { Injectable } from '@angular/core';
import { Actions, ofType, Effect } from '@ngrx/effects';
import { map, withLatestFrom, switchMap } from 'rxjs/operators';
import { HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import * as AirFreightActions from './air-freight.actions';
import { HEADER_POST, HEADER_PUT, HEADER_DELETE } from 'src/app/main/shared/app-settings';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';
import * as fromMain from 'src/app/main/store/main.reducer';
import { RateAndChargesAir } from 'src/app/main/model/rate-charges/rate-and-charges-air.model';
import { logging } from 'protractor';

@Injectable()
export class AirFreightEffects {
  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private store: Store<fromMain.MainState>,
  ) { }

  @Effect()
  fetchAirFreights = this.actions$.pipe(
    ofType(AirFreightActions.FETCH_AIR_FREIGHTS),
    switchMap((action) => {
      const paramsJson = {
        startRow: (action as any).payload.startRow,
        endRow: (action as any).payload.endRow,
        sortModel: (action as any).payload.sortModel,
        filterModel: (action as any).payload.filterModel
      };

      const httpOptions = { headers: HEADER_POST };

      return this.http.post<{ totalRows: number, results: RateAndChargesAir[] }>(
        '/sales-service/rate-and-charges-air/get-list/', JSON.stringify(paramsJson), httpOptions
      );
    }),
    map(airFreights => {
      return { airFreights: airFreights.results, totalRows: airFreights.totalRows };
    }),
    map(airFreights => {
      return new AirFreightActions.SetAirFreights(airFreights);
    })
  );

  @Effect()
  storeAirFreights = this.actions$.pipe(
    ofType<AirFreightActions.StoreAirFreight>(AirFreightActions.STORE_AIR_FREIGHT),
    switchMap(
      (actionData) => {
        const aAirFreight = actionData.payload;
        const { _id, ...newAirFreight } = aAirFreight;
        const httpOptions = { headers: HEADER_POST };
        return this.http.post<RateAndChargesAir>(
          '/sales-service/rate-and-charges-air/',
          JSON.stringify(newAirFreight),
          httpOptions
        );
      },

    ),
    map((airFreight: RateAndChargesAir) => {
      console.log(airFreight);
      return new AirFreightActions.StoreAirFreightSuccess(airFreight);
    })
  );

  // save edited data
  @Effect({ dispatch: false })
  updateAirFreight = this.actions$.pipe(
    ofType<AirFreightActions.UpdateAirFreight>(AirFreightActions.UPDATE_AIR_FREIGHT),
    withLatestFrom(this.store.select('airfreights')),
    switchMap(([actionData, vesselState]) => {
      const updatedAirFreight = actionData.payload.newAirFreight;
      const httpOptions = { headers: HEADER_PUT };

      return this.http.put(
        '/sales-service/rate-and-charges-air/',
        JSON.stringify(updatedAirFreight),
        httpOptions
      );
    })
  );

  @Effect({ dispatch: false })
  deleteAirFreight = this.actions$.pipe(
    ofType<AirFreightActions.DeleteAirFreight>(AirFreightActions.DELETE_AIR_FREIGHT),
    withLatestFrom(this.store.select('airfreights')),
    switchMap(([actionData, airFreightState]) => {

      const deletedAir = actionData.payload.selectedAir;
      const id = deletedAir._id;
      const bodyJson = JSON.stringify({id: id});
      const options = { headers: HEADER_DELETE, body: bodyJson };

      return this.http.delete('/sales-service/rate-and-charges-air/', options);
    })
  );

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  }
}
