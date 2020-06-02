import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType, Effect } from '@ngrx/effects';
import { map, exhaustMap, catchError, withLatestFrom, switchMap, mergeMap } from 'rxjs/operators';
import { HttpHeaders, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { of, from, throwError, pipe } from 'rxjs';
import * as VesselActions from './vessel.actions';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { VesselAddComponent } from '../vessel-add/vessel-add.component';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';
import * as fromMain from '../../../../store/main.reducer';
import { Vessel } from 'src/app/main/model/vessel/vessel.model';
import { UpdateVessel } from './vessel.actions';

@Injectable()
export class VesselEffects {
	constructor(
		private actions$: Actions,
		private http: HttpClient,
		private store: Store<fromMain.MainState>,
		private modalService: NgbModal
	) { }

	runDialog = function (content) {
		const modalRef = this.modalService.open(content, { windowClass: 'gr-modal-haft', backdrop: 'static', keyboard: false });

		return from(modalRef.result);
	};

	resetConfirmation$ = createEffect(() => this.actions$.pipe(
		ofType(VesselActions.OPEN_DIALOG),
		exhaustMap(() => this.runDialog(VesselAddComponent).pipe(
			map((action, partnerState) => {
				console.log(action);
				console.log(partnerState);
				return VesselActions.reset()
			}),

			catchError(() => of(new VesselActions.CloseDialog()))
		))
	));

	@Effect()
	fetchVessels = this.actions$.pipe(
		ofType(VesselActions.FETCH_VESSELS),
		switchMap(() => {
			let headers = new HttpHeaders();
			headers.append('Content-Type', 'application/json');
			headers.append('Access-Control-Allow-Origin', '*');
			headers.append('Access-Control-Allow-Methods', 'GET');

			// let params = new HttpParams().set("requestData", JSON.stringify(paramsJson));

			return this.http.get<Vessel[]>(
				'/sales-service/vessel-schedules/'
				// {params: params}
			);
		}),
		// map(vessels => {
		//   return vessels.map(vessel => {
		//     return {
		//       ...vessel,
		//       vessels: vessel.ingredients ? vessel.ingredients : []
		//     };
		//   });
		// }),
		map(vessels => {
			return new VesselActions.SetVessels(vessels);
		})
	);

	@Effect()
	storeVessels = this.actions$.pipe(
		ofType<VesselActions.StoreVessels>(VesselActions.STORE_VESSELS),
		switchMap(
			(actionData) => {
				let aVessel = actionData.payload;
				const { _id, ...newVessel } = aVessel;
				const httpOptions = {
					headers: new HttpHeaders({
						'Access-Control-Allow-Origin': '*',
						'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT',
						'Content-Type': 'application/json',
						'Accept': 'application/json'
					}),
				};

				return this.http.post<Vessel>(
					'/sales-service/vessel-schedules/',
					JSON.stringify(newVessel),
					httpOptions
				);
			},

		),
		map((vessel: Vessel) => {
			console.log(vessel);

			return new VesselActions.StoreVesselSuccess(vessel);
		})
	);

	// save edited data
	@Effect({ dispatch: false })
	updateVessel = this.actions$.pipe(
		ofType<UpdateVessel>(VesselActions.UPDATE_VESSEL),
		withLatestFrom(this.store.select('vessels')),
		switchMap(([actionData, vesselState]) => {
			const updatedVessel = actionData.payload;
			const httpOptions = {
				headers: new HttpHeaders({
					'Access-Control-Allow-Origin': '*',
					'Access-Control-Allow-Methods': 'PUT',
					'Content-Type': 'application/json',
					'Accept': 'application/json'
				})
			};

			return this.http.put(
				'/sales-service/vessel-schedules/',
				JSON.stringify(updatedVessel),
				httpOptions
			);
		})
	);

	@Effect({ dispatch: false })
	deleteVessel = this.actions$.pipe(
		ofType<VesselActions.DeleteVessel>(VesselActions.DELETE_VESSEL),
		withLatestFrom(this.store.select('vessels')),
		switchMap(([actionData, vesselState]) => {
			const indexVessel = actionData.payload;
			const vessels = vesselState.vessels;
			const deletedVessel = vessels[indexVessel - 1];
			const indexDeletedVessel = deletedVessel._id;
			const bodyJson = JSON.stringify({ "id" : indexDeletedVessel });
			
			const options = {
				headers: new HttpHeaders({
					"Access-Control-Allow-Origin": '*',
					"Access-Control-Allow-Methods": 'DELETE',
					"Content-Type": 'application/json; charset=UTF-8',
					"Accept": 'application/json'
				}),
				body: bodyJson
			};

			return this.http.delete('/sales-service/vessel-schedules/', options);
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
	};
}
