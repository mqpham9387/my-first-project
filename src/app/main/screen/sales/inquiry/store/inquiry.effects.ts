import { Injectable } from '@angular/core';
import { Actions, ofType, Effect } from '@ngrx/effects';
import { map, exhaustMap, catchError, withLatestFrom, switchMap, mergeMap } from 'rxjs/operators';
import { HttpHeaders, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { of, from, throwError, pipe } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Store, State } from '@ngrx/store';
import { Inquiry } from 'src/app/main/model/inquiry/inquiry.model';
import * as fromMain from 'src/app/main/store/main.reducer';
import * as InquiryActions from './inquiry.actions';

@Injectable()
export class InquiryEffects {
	constructor(
		private actions$: Actions,
		private http: HttpClient,
		private store: Store<fromMain.MainState>
	) { }

	@Effect()
	fetchSentsInquiry = this.actions$.pipe(
		ofType(InquiryActions.FETCH_SENTS_INQUIRY),
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
				'/sales-service/service-inquiry/sent-inquiry-get/', JSON.stringify(paramsJson), httpOptions
			);
		}),
		map(inquiries => {
			return { inquiries: inquiries.results, totalRows: inquiries.totalRows };
		}),
		map(results => {
			return new InquiryActions.SetSentsInquiry(results);
		})
	);

	@Effect()
	storeInquiry = this.actions$.pipe(
		ofType<InquiryActions.StoreInquiry>(InquiryActions.STORE_INQUIRY),
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
			return new InquiryActions.StoreInquirySuccess(inquiry);
		})
	);

	// save edited data
	@Effect({ dispatch: false })
	updateInquiry = this.actions$.pipe(
		ofType<InquiryActions.UpdateInquiry>(InquiryActions.UPDATE_INQUIRY),
		withLatestFrom(this.store.select('inquiries')),
		switchMap(([actionData, inquiryState]) => {
			const updatedInquiry:any = actionData.payload.newInquiry;
			const httpOptions = {
				headers: new HttpHeaders({
					'Access-Control-Allow-Origin': '*',
					'Access-Control-Allow-Methods': 'PUT',
					'Content-Type': 'application/json',
					'Accept': 'application/json'
				})
			};
			let a = Object.assign({},updatedInquiry)
			a.commodity=updatedInquiry.commodity.commodityID
			a.client=updatedInquiry.client.partnerID
			a.creator=updatedInquiry.creator.contactID
			a.sentTo=updatedInquiry.sentTo.contactID
			a.forwardedTo=updatedInquiry.forwardedTo.contactID
			a.portofDischarge=updatedInquiry.portofDischarge.portID
			a.portofLoading=updatedInquiry.portofLoading.portID
			console.log(updatedInquiry,a)
			return this.http.put(
				'/sales-service/service-inquiry/',
				JSON.stringify(a),
				httpOptions
			);
		})
	);

	@Effect({ dispatch: false })
	deleteInquiry = this.actions$.pipe(
		ofType<InquiryActions.DeleteInquiry>(InquiryActions.DELETE_INQUIRY),
		withLatestFrom(this.store.select('inquiries')),
		switchMap(([actionData, inquiryState]) => {
			const indexInquiry = actionData.payload;
			const inquiries = inquiryState.inquiries;
			const deletedInquiry = inquiries[indexInquiry-1];
			console.log(deletedInquiry)
			const indexDeletedInquiry = deletedInquiry._id;
			const bodyJson = { "_id" : indexDeletedInquiry };
			
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
