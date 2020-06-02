import { Injectable } from '@angular/core';
import { Actions, ofType, Effect } from '@ngrx/effects';
import { map, withLatestFrom, switchMap, catchError } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { throwError, of } from 'rxjs';
import * as QuotationActions from './quotation.actions';

import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';
import * as fromMain from 'src/app/main/store/main.reducer';
import { Quotation } from 'src/app/main/model/quotation/quotation.model';
import {
  HEADER_POST,
  HEADER_PUT,
  HEADER_DELETE,
} from 'src/app/main/shared/app-settings';
import { QuotationService } from 'src/app/main/model/quotation/quotation.service';

interface EditQuot {
  general: any;
  quotationDetails_TruckingContainers: any;
  quotationDetails_TruckingNonContainers: any;
  quotationDetails_CustomsClearance: any;
  quotationDetails_OtherCharges: any;
}

@Injectable()
export class QuotationEffects {
  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private store: Store<fromMain.MainState>,
    private quotationService: QuotationService
  ) {}

  @Effect()
  fetchSentQuotations = this.actions$.pipe(
    ofType(QuotationActions.FETCH_SENT_QUOTATIONS),
    switchMap((action) => {
      const paramsJson = {
        startRow: (action as any).payload.startRow,
        endRow: (action as any).payload.endRow,
        sortModel: (action as any).payload.sortModel,
        filterModel: (action as any).payload.filterModel,
      };

      const httpOptions = { headers: HEADER_POST };

      return this.http.post<{ totalRows: number; results: Quotation[] }>(
        '/sales-service/quotation/sent-get-list/',
        JSON.stringify(paramsJson),
        httpOptions
      );
    }),
    map((quotations) => {
      return {
        sentQuotations: quotations.results,
        totalSentQuotRows: quotations.totalRows,
      };
    }),
    map((quotations) => {
      return new QuotationActions.SetSentQuotations(quotations);
    })
  );

  @Effect()
  fetchReceivedQuotations = this.actions$.pipe(
    ofType(QuotationActions.FETCH_RECEIVED_QUOTATIONS),
    switchMap((action) => {
      const paramsJson = {
        startRow: (action as any).payload.startRow,
        endRow: (action as any).payload.endRow,
        sortModel: (action as any).payload.sortModel,
        filterModel: (action as any).payload.filterModel,
      };

      const httpOptions = { headers: HEADER_POST };

      return this.http.post<{ totalRows: number; results: Quotation[] }>(
        '/sales-service/quotation/received-get-list/',
        JSON.stringify(paramsJson),
        httpOptions
      );
    }),
    map((quotations) => {
      return {
        receivedQuotations: quotations.results,
        totalReceivedQuotRows: quotations.totalRows,
      };
    }),
    map((quotations) => {
      return new QuotationActions.SetReceivedQuotations(quotations);
    })
  );

  @Effect()
  storeQuotation = this.actions$.pipe(
    ofType<QuotationActions.StoreQuotation>(QuotationActions.STORE_QUOTATION),
    switchMap((actionData) => {
      const aQuotation = actionData.payload;
      const newQuot = this.transformData(aQuotation);
      const { _id, ...newQuotation } = newQuot;
      const httpOptions = { headers: HEADER_POST };

      return this.http.post<Quotation>(
        '/sales-service/quotation/',
        JSON.stringify(newQuotation),
        httpOptions
      );
    }),
    map((quotation: any) => {
      const quotSuccess = { ...quotation };
      return new QuotationActions.StoreQuotationSuccess(quotSuccess);
    })
  );

  // save edited data
  @Effect({ dispatch: false })
  updateQuotation = this.actions$.pipe(
    ofType<QuotationActions.UpdateQuotation>(QuotationActions.UPDATE_QUOTATION),
    withLatestFrom(this.store.select('quotations')),
    switchMap(([actionData, quotState]) => {
      const quotation = { ...actionData.payload.updatedQuotation };
      const updatedQuotation = this.transformData(quotation);
      const httpOptions = { headers: HEADER_PUT };
      return this.http.put(
        '/sales-service/quotation/',
        JSON.stringify(updatedQuotation),
        httpOptions
      );
    })
  );

  @Effect({ dispatch: false })
  deleteQuotation = this.actions$.pipe(
    ofType<QuotationActions.DeleteQuotation>(QuotationActions.DELETE_QUOTATION),
    withLatestFrom(this.store.select('quotations')),
    switchMap(([actionData, quotationState]) => {
      const deletedQuot = actionData.payload.selectedQuotaion;
      const id = deletedQuot._id;
      const bodyJson = JSON.stringify({ _id: id });
      const options = { headers: HEADER_DELETE, body: bodyJson };

      return this.http.delete('/sales-service/quotation/', options);
    })
  );

  @Effect()
  storeCustomClearanceQuotation = this.actions$.pipe(
    ofType<QuotationActions.StoreCustomClearanceQuotation>(
      QuotationActions.STORE_CUSTOM_CLEARANCE_QUOTATION
    ),
    switchMap((actionData) => {
      const ccQuotation = { ...actionData.payload };
      const newQuot = this.transformCustomData(ccQuotation);

      return this.http.post<any>(
        '/sales-service/quotation/add-quotation-customsclearance/',
        JSON.stringify(newQuot),
        { headers: HEADER_POST }
      );
    }),
    map((quotation: any) => {
      const quotSuccess = { ...quotation };
      console.log(quotation);
      return new QuotationActions.StoreCustomClearanceQuotationSuccess(
        quotSuccess
      );
    })
  );

  @Effect({ dispatch: false })
  updateCustomClearance = this.actions$.pipe(
    ofType<QuotationActions.UpdateCustomClearance>(
      QuotationActions.UPDATE_CUSTOM_CLEARANCE
    ),
    withLatestFrom(this.store.select('quotations')),
    switchMap(([actionData, quotState]) => {
      const newCC = { ...actionData.payload };
      const updatedCC = this.transformData(newCC);
      return this.quotationService.updateCustomClearance(updatedCC);
    })
  );

  @Effect()
  getEditQuotation = this.actions$.pipe(
    ofType(QuotationActions.GET_EDIT_QUOTATION),
    switchMap((action) => {
      const paramsJson = {
        startRow: 0,
        endRow: 90,
        sortModel: [],
        filterModel: {
          quotationNo: {
            filterType: 'text',
            type: 'equals',
            filter: (action as any).payload.quotationNo,
          },
        },
      };
      console.log(paramsJson);

      // QuotationDetails_TruckingContainers
      let quotationDetails_TruckingContainers = [];
      this.quotationService
        .getQuotationTruckingContainer(paramsJson)
        .subscribe((data) => {
          quotationDetails_TruckingContainers = data.results;
        });

      // QuotationDetails_TruckingNonContainers
      let quotationDetails_TruckingNonContainers = [];
      this.quotationService
        .getQuotDetailsTruckNonCont(paramsJson)
        .subscribe((data) => {
          console.log(data);
          quotationDetails_TruckingNonContainers = data.results;
        });

      // QuotationDetails_CustomsClearance
      let quotationDetails_CustomsClearance = [];
      this.quotationService
        .getQuotDetailsCustomsClearance(paramsJson)
        .subscribe((data) => {
          console.log(data);
          quotationDetails_CustomsClearance = data.results;
        });

      // QuotationDetails_OtherCharges
      let quotDetailsOtherCharges = [];
      this.quotationService
        .getQuotationDetailsOtherCharges(paramsJson)
        .subscribe((data) => {
          console.log(data);
          quotDetailsOtherCharges = data.results;
        });

      // build object
      const results: EditQuot = {
        general: { ...(action as any).payload },
        quotationDetails_TruckingContainers: [
          ...quotationDetails_TruckingContainers,
        ],
        quotationDetails_TruckingNonContainers: [
          ...quotationDetails_TruckingNonContainers,
        ],
        quotationDetails_CustomsClearance: [
          ...quotationDetails_CustomsClearance,
        ],
        quotationDetails_OtherCharges: [...quotDetailsOtherCharges],
      };
      console.log(results);

      return of(results);
    }),
    map((quotations) => {
      return new QuotationActions.SetEditQuotation(quotations);
    })
  );

  // save edited data
  @Effect({ dispatch: false })
  updateOtherChargeDetail = this.actions$.pipe(
    ofType<QuotationActions.UpdateOtherChargeDetail>(
      QuotationActions.UPDATE_OTHER_CHARGE_DETAIL
    ),
    withLatestFrom(this.store.select('quotations')),
    switchMap(([actionData, quotState]) => {
      const newCharge = { ...actionData.payload };
      const updatedOtherCharge = this.transformData(newCharge);
      const httpOptions = { headers: HEADER_PUT };

      return this.quotationService.updateOtherChargeDetail(updatedOtherCharge);
    })
  );

  @Effect({ dispatch: false })
  storeOtherChargeDetail = this.actions$.pipe(
    ofType<QuotationActions.StoreOtherChargeDetail>(
      QuotationActions.STORE_OTHER_CHARGE_DETAIL
    ),
    switchMap((actionData) => {
      const otherCharge = { ...actionData.payload };
      const newOtherChargeDetail = this.transformData(otherCharge);

      return this.http.post<any>(
        '/sales-service/quotation-details-other-charges/',
        JSON.stringify(newOtherChargeDetail),
        { headers: HEADER_POST }
      );
    })
  );

  @Effect({ dispatch: false })
  deleteOtherChargeDetail = this.actions$.pipe(
    ofType<QuotationActions.DeleteOtherChargeDetail>(
      QuotationActions.DELETE_OTHER_CHARGE_DETAIL
    ),
    withLatestFrom(this.store.select('quotations')),
    switchMap(([actionData, quotationState]) => {
      const _id = actionData.payload;
      const bodyJson = JSON.stringify({ _id: _id });
      const options = { headers: HEADER_DELETE, body: bodyJson };

      return this.http.delete(
        '/sales-service/quotation-details-other-charges/',
        options
      );
    })
  );

  @Effect({ dispatch: false })
  storeTruckingNonContainer = this.actions$.pipe(
    ofType<QuotationActions.StoreTruckingNonContainer>(
      QuotationActions.STORE_TRUCKING_NON_CONTAINER
    ),
    switchMap((actionData) => {
      const truck = { ...actionData.payload };
      const newTruck = this.transformData(truck);

      return this.http.post<any>(
        '/sales-service/quotation-details-trucking-non-container/',
        JSON.stringify(newTruck),
        { headers: HEADER_POST }
      );
    })
  );

  @Effect({ dispatch: false })
  updateTruckingNonContainer = this.actions$.pipe(
    ofType<QuotationActions.UpdateTruckingNonContainer>(
      QuotationActions.UPDATE_TRUCKING_NON_CONTAINER
    ),
    withLatestFrom(this.store.select('quotations')),
    switchMap(([actionData, quotState]) => {
      const newTrucking = { ...actionData.payload };
      const updatedOtherCharge = this.transformData(newTrucking);
      const httpOptions = { headers: HEADER_PUT };

      return this.quotationService.updateQuotationDetailTruckingNonContainer(
        updatedOtherCharge
      );
    })
  );

  @Effect({ dispatch: false })
  deleteTruckingNonContainer = this.actions$.pipe(
    ofType<QuotationActions.DeleteTruckingNonContainer>(
      QuotationActions.DELETE_TRUCKING_NON_CONTAINER
    ),
    withLatestFrom(this.store.select('quotations')),
    switchMap(([actionData, quotationState]) => {
      const _id = actionData.payload;
      return this.quotationService.deleteQuotationDetailTruckingNonContainer(
        _id
      );
    })
  );

  @Effect({ dispatch: false })
  storeTruckingContainer = this.actions$.pipe(
    ofType<QuotationActions.StoreTruckingContainer>(
      QuotationActions.STORE_TRUCKING_CONTAINER
    ),
    switchMap((actionData) => {
      const truck = { ...actionData.payload };
      const newTruck = this.transformData(truck);

      return this.http.post<any>(
        '/sales-service/quotation-details-trucking-container/',
        JSON.stringify(newTruck),
        { headers: HEADER_POST }
      );
    })
  );

  @Effect({ dispatch: false })
  updateTruckingContainer = this.actions$.pipe(
    ofType<QuotationActions.UpdateTruckingContainer>(
      QuotationActions.UPDATE_TRUCKING_CONTAINER
    ),
    withLatestFrom(this.store.select('quotations')),
    switchMap(([actionData, quotState]) => {
      const newTrucking = { ...actionData.payload };
      const updatedOtherCharge = this.transformData(newTrucking);
      return this.quotationService.updateQuotationDetailTruckingContainer(
        updatedOtherCharge
      );
    })
  );

  @Effect({ dispatch: false })
  deleteTruckingContainer = this.actions$.pipe(
    ofType<QuotationActions.DeleteTruckingContainer>(
      QuotationActions.DELETE_TRUCKING_CONTAINER
    ),
    withLatestFrom(this.store.select('quotations')),
    switchMap(([actionData, quotationState]) => {
      const _id = actionData.payload;
      return this.quotationService.deleteQuotationDetailTruckingContainer(_id);
    })
  );

  @Effect({ dispatch: false })
  deleteCustomClearance = this.actions$.pipe(
    ofType<QuotationActions.DeleteCustomClearance>(
      QuotationActions.DELETE_CUSTOM_CLEARANCE
    ),
    withLatestFrom(this.store.select('quotations')),
    switchMap(([actionData, quotationState]) => {
      const _id = actionData.payload;
      const bodyJson = JSON.stringify({ _id: _id });
      const options = { headers: HEADER_DELETE, body: bodyJson };

      return this.http.delete(
        '/sales-service/quotation-details-customs-clearance/',
        options
      );
    })
  );

  private transformData(data: any) {
    let cloneData = { ...data };
    if (cloneData.hasOwnProperty('currency')) {
      cloneData.currency =
        data.currency && data.currency !== null ? data.currency.currencyID : '';
    }
    if (cloneData.hasOwnProperty('fee')) {
      cloneData.fee = data.fee && data.fee !== null ? data.fee.feeID : '';
    }
    if (cloneData.hasOwnProperty('pickupCity')) {
      cloneData.pickupCity =
        data.pickupCity && data.pickupCity !== null
          ? data.pickupCity.cityID
          : '';
    }
    if (cloneData.hasOwnProperty('deliveryCity')) {
      cloneData.deliveryCity = data.deliveryCity
        ? data.deliveryCity.cityID
        : '';
    }

    if (cloneData.hasOwnProperty('client')) {
      cloneData.client =
        data.client && data.client !== undefined ? data.client.partnerID : '';
    }
    if (cloneData.hasOwnProperty('sentTo')) {
      cloneData.sentTo =
        data.sentTo && data.sentTo !== undefined ? data.sentTo.contactID : '';
    }
    if (cloneData.hasOwnProperty('commodityType')) {
      cloneData.commodityType =
        data.commodityType && data.commodityType !== undefined
          ? data.commodityType.shipmentTypeWarningID
          : '';
    }
    if (cloneData.hasOwnProperty('hsCode')) {
      cloneData.hsCode =
        data.hsCode && data.hsCode !== null ? data.hsCode.commodityID : '';
    }

    return cloneData;
  }

  private transformCustomData(data: any) {
    let cloneData = Object.assign({}, data);
    cloneData.general = Object.assign({}, cloneData.general);
    let general = Object.assign({}, cloneData.general);
    let nonContainers = [...cloneData.quotationDetails_TruckingNonContainers];
    console.log(nonContainers);
    let truckingContainers = [...cloneData.quotationDetails_TruckingContainers];
    let quotDetailsCc = { ...cloneData.quotationDetails_CustomsClearance };
    let quotDetailsOc = [...cloneData.quotationDetails_OtherCharges];

    if (general) {
      cloneData.general.hsCode = general.hsCode.commodityID;
    }
    cloneData.general.client =
      general.client !== undefined ? general.client.partnerID : '';

    cloneData.general.commodityType =
      general.commodityType !== undefined && general.commodityType !== null
        ? general.commodityType.shipmentTypeWarningID
        : '';
    cloneData.general.quotationType =
      general.quotationType !== undefined && general.quotationType !== null
        ? general.quotationType.quotationTypeID
        : '';
    cloneData.general.sentTo =
      general.sentTo !== undefined && general.sentTo !== null
        ? general.sentTo.contactID
        : '';

    if (nonContainers && nonContainers.length) {
      let nonTruckContArr = nonContainers.map((item) => {
        let itemCopy = Object.assign({}, item);
        itemCopy.currency = itemCopy.currency.currencyID;
        itemCopy.deliveryCity = itemCopy.deliveryCity.cityID;
        itemCopy.pickupCity = itemCopy.pickupCity.cityID;
        return itemCopy;
      });
      cloneData.quotationDetails_TruckingNonContainers = nonTruckContArr;
    }

    if (truckingContainers && truckingContainers.length) {
      let truckContArr = truckingContainers.map((item: any) => {
        let itemCopy = Object.assign({}, item);
        itemCopy.currency = itemCopy.currency.currencyID;
        itemCopy.deliveryCity = itemCopy.deliveryCity.cityID;
        itemCopy.pickupCity = itemCopy.pickupCity.cityID;
        return itemCopy;
      });
      console.log(truckContArr);
      cloneData.quotationDetails_TruckingContainers = truckContArr;
    }

    if (quotDetailsCc) {
      quotDetailsCc.currency = quotDetailsCc.currency
        ? quotDetailsCc.currency.currencyID
        : '';
      cloneData.quotationDetails_CustomsClearance = { ...quotDetailsCc };
    }

    if (quotDetailsOc && quotDetailsOc.length) {
      let quotDetailsOcArr = quotDetailsOc.map((item: any) => {
        let itemCopy = Object.assign({}, item);
        itemCopy.currency = itemCopy.currency
          ? itemCopy.currency.currencyID
          : '';
        itemCopy.fee = itemCopy.fee ? itemCopy.fee.feeID : '';
        return itemCopy;
      });
      console.log(quotDetailsOcArr);
      cloneData.quotationDetails_OtherCharges = quotDetailsOcArr;
    }
    console.log('data saved');
    console.log(cloneData);
    return cloneData;
  }

  private errorHandler(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      window.alert(error.error.message);
    }
    return throwError('Something bad happened; please try again later.');
  }
}
