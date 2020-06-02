import { Injectable } from '@angular/core';
import { Actions, ofType, Effect } from '@ngrx/effects';
import { map, withLatestFrom, switchMap } from 'rxjs/operators';
import { HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { Inquiry } from 'src/app/main/model/inquiry/inquiry.model';
import * as fromMain from 'src/app/main/store/main.reducer';
import * as ReceivedInquiryActions from './received-inquiry.actions';

@Injectable()
export class ReceivedInquiryEffects {
	constructor(
		private actions$: Actions,
		private http: HttpClient,
		private store: Store<fromMain.MainState>
	) { }

	@Effect()
	fetchReceivedInquiries = this.actions$.pipe(
		ofType(ReceivedInquiryActions.FETCH_RECEIVED_INQUIRIES),
		switchMap((action) => {
			console.log(action);
			let paramsJson = {
				startRow: (action as any).payload.startRow,
				endRow: (action as any).payload.endRow,
				sortModel: (action as any).payload.sortModel,
				filterModel: (action as any).payload.filterModel
			};
			const httpOptions = {
				headers: new HttpHeaders({
					'Access-Control-Allow-Origin': '*',
					'Access-Control-Allow-Methods': 'POST',
					'Content-Type': 'application/json',
					'Accept': 'application/json'
				}),
			};

			return this.http.post<{totalRows: number, results: Inquiry[]}>(
				'/sales-service/service-inquiry/received-inquiry-get/', JSON.stringify(paramsJson), httpOptions
			);
		}),
		map(inquiries => {
			return { receivedInquiries: inquiries.results, totalReceivedRows: inquiries.totalRows };
		}),
		map(results => {
			return new ReceivedInquiryActions.SetReceivedInquiry(results);
		})
	);

	@Effect()
	storeInquiry = this.actions$.pipe(
		ofType<ReceivedInquiryActions.StoreInquiry>(ReceivedInquiryActions.STORE_INQUIRY),
		switchMap(
			(actionData) => {
				let aInquiry = actionData.payload;
				const { _id, ...newInquiry } = aInquiry;
				const httpOptions = {
					headers: new HttpHeaders({
						'Access-Control-Allow-Origin': '*',
						'Access-Control-Allow-Methods': 'POST',
						'Content-Type': 'application/json',
						'Accept': 'application/json'
					}),
				};
				// TODO: Put the http request on a service
				return this.http.post<Inquiry>(
					'/sales-service/service-inquiry/',
					JSON.stringify(newInquiry),
					httpOptions
				);
			},

		),
		map((inquiry: Inquiry) => {
			return new ReceivedInquiryActions.StoreInquirySuccess(inquiry);
		})
	);

	// save edited data
	@Effect({ dispatch: false })
	updateInquiry = this.actions$.pipe(
		ofType<ReceivedInquiryActions.UpdateInquiry>(ReceivedInquiryActions.UPDATE_INQUIRY),
		withLatestFrom(this.store.select('inquiries')),
		switchMap(([actionData, inquiryState]) => {
			const updatedInquiry = actionData.payload.newInquiry;
			const httpOptions = {
				headers: new HttpHeaders({
					'Access-Control-Allow-Origin': '*',
					'Access-Control-Allow-Methods': 'PUT',
					'Content-Type': 'application/json',
					'Accept': 'application/json'
				})
			};

			return this.http.put(
				'/sales-service/service-inquiry/',
				JSON.stringify(updatedInquiry),
				httpOptions
			);
		})
	);

	@Effect({ dispatch: false })
	deleteInquiry = this.actions$.pipe(
		ofType<ReceivedInquiryActions.DeleteInquiry>(ReceivedInquiryActions.DELETE_INQUIRY),
		withLatestFrom(this.store.select('inquiries')),
		switchMap(([actionData, inquiryState]) => {
			const indexInquiry = actionData.payload;
			const inquiries = inquiryState.inquiries;
			const deletedInquiry = inquiries[indexInquiry - 1];
			const indexDeletedInquiry = deletedInquiry._id;
			const bodyJson = JSON.stringify({ "id" : indexDeletedInquiry });
			
			const options = {
				headers: new HttpHeaders({
					"Access-Control-Allow-Origin": '*',
					"Access-Control-Allow-Methods": 'DELETE',
					"Content-Type": 'application/json; charset=UTF-8',
					"Accept": 'application/json'
				}),
				body: bodyJson
			};

			return this.http.delete('/sales-service/service-inquiry/', options);
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
