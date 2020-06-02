import { Injectable } from '@angular/core';
import { Actions, ofType, Effect } from '@ngrx/effects';
import { map, withLatestFrom, switchMap, catchError } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { throwError, of, Observable } from 'rxjs';
import * as BookingActions from './booking.actions';

import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';
import * as fromMain from 'src/app/main/store/main.reducer';
import { Booking, BookingList } from 'src/app/main/model/booking/booking.model';
import {
  HEADER_POST,
  HEADER_PUT,
  HEADER_DELETE,
} from 'src/app/main/shared/app-settings';
import { BookingService } from 'src/app/main/model/booking/booking.service';

interface EditQuot {
  general: any;
  bookingDetails_TruckingContainers: any;
  bookingDetails_TruckingNonContainers: any;
  bookingDetails_CustomsClearance: any;
  bookingDetails_OtherCharges: any;
}

@Injectable()
export class BookingEffects {
  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private store: Store<fromMain.MainState>,
    private bookingService: BookingService
  ) {}

  @Effect()
  fetchSentBookings = this.actions$.pipe(
    ofType(BookingActions.FETCH_SENT_BOOKINGS),
    switchMap((action) => {
      const paramsJson = {
        startRow: (action as any).payload.startRow,
        endRow: (action as any).payload.endRow,
        sortModel: (action as any).payload.sortModel,
        filterModel: (action as any).payload.filterModel,
      };

      return this.bookingService.getSentBookings(paramsJson);
    }),
    map((bookings: BookingList) => {
      return {
        sentBookings: bookings.results,
        totalSentBookingRows: bookings.totalRows,
      };
    }),
    map((bookings) => {
      return new BookingActions.SetSentBookings(bookings);
    })
  );

  @Effect()
  fetchReceivedBookings = this.actions$.pipe(
    ofType(BookingActions.FETCH_RECEIVED_BOOKINGS),
    switchMap((action) => {
      const paramsJson = {
        startRow: (action as any).payload.startRow,
        endRow: (action as any).payload.endRow,
        sortModel: (action as any).payload.sortModel,
        filterModel: (action as any).payload.filterModel,
      };
      return this.bookingService.getReceivedBookings(paramsJson);
    }),
    map((bookings: BookingList) => {
      return {
        receivedBookings: bookings.results,
        totalReceivedBookingRows: bookings.totalRows,
      };
    }),
    map((bookings) => {
      return new BookingActions.SetReceivedBookings(bookings);
    })
  );

  // API save booking
  // @Effect()
  // storeBooking = this.actions$.pipe(
  //   ofType<BookingActions.StoreBooking>(BookingActions.STORE_BOOKING),
  //   switchMap((actionData) => {
  //     const aBooking = actionData.payload;
  //     const newQuot = this.transformData(aBooking);
  //     const { _id, ...newBooking } = newQuot;
  //     const httpOptions = { headers: HEADER_POST };

  //     return this.http.post<Booking>(
  //       '/sales-service/booking/',
  //       JSON.stringify(newBooking),
  //       httpOptions
  //     );
  //   }),
  //   map((booking: any) => {
  //     const quotSuccess = { ...booking };
  //     return new BookingActions.StoreBookingSuccess(quotSuccess);
  //   })
  // );

  // save edited data
  // @Effect({ dispatch: false })
  // updateBooking = this.actions$.pipe(
  //   ofType<BookingActions.UpdateBooking>(BookingActions.UPDATE_BOOKING),
  //   withLatestFrom(this.store.select('bookings')),
  //   switchMap(([actionData, quotState]) => {
  //     const booking = { ...actionData.payload.updatedBooking };
  //     const updatedBooking = this.transformData(booking);
  //     const httpOptions = { headers: HEADER_PUT };
  //     return this.http.put(
  //       '/sales-service/booking/',
  //       JSON.stringify(updatedBooking),
  //       httpOptions
  //     );
  //   })
  // );

  // @Effect({ dispatch: false })
  // deleteBooking = this.actions$.pipe(
  //   ofType<BookingActions.DeleteBooking>(BookingActions.DELETE_BOOKING),
  //   withLatestFrom(this.store.select('bookings')),
  //   switchMap(([actionData, bookingState]) => {
  //     const deletedQuot = actionData.payload.selectedQuotaion;
  //     const id = deletedQuot._id;
  //     const bodyJson = JSON.stringify({ _id: id });
  //     const options = { headers: HEADER_DELETE, body: bodyJson };

  //     return this.http.delete('/sales-service/booking/', options);
  //   })
  // );

  // @Effect()
  // storeCustomClearanceBooking = this.actions$.pipe(
  //   ofType<BookingActions.StoreCustomClearanceBooking>(
  //     BookingActions.STORE_CUSTOM_CLEARANCE_BOOKING
  //   ),
  //   switchMap((actionData) => {
  //     const ccBooking = { ...actionData.payload };
  //     const newQuot = this.transformCustomData(ccBooking);

  //     return this.http.post<any>(
  //       '/sales-service/booking/add-booking-customsclearance/',
  //       JSON.stringify(newQuot),
  //       { headers: HEADER_POST }
  //     );
  //   }),
  //   map((booking: any) => {
  //     const quotSuccess = { ...booking };
  //     console.log(booking);
  //     return new BookingActions.StoreCustomClearanceBookingSuccess(quotSuccess);
  //   })
  // );

  // @Effect({ dispatch: false })
  // updateCustomClearance = this.actions$.pipe(
  //   ofType<BookingActions.UpdateCustomClearance>(
  //     BookingActions.UPDATE_CUSTOM_CLEARANCE
  //   ),
  //   withLatestFrom(this.store.select('bookings')),
  //   switchMap(([actionData, quotState]) => {
  //     const newCC = { ...actionData.payload };
  //     const updatedCC = this.transformData(newCC);
  //     return this.bookingService.updateCustomClearance(updatedCC);
  //   })
  // );

  // @Effect()
  // getEditBooking = this.actions$.pipe(
  //   ofType(BookingActions.GET_EDIT_BOOKING),
  //   switchMap((action) => {
  //     const paramsJson = {
  //       startRow: 0,
  //       endRow: 90,
  //       sortModel: [],
  //       filterModel: {
  //         bookingNo: {
  //           filterType: 'text',
  //           type: 'equals',
  //           filter: (action as any).payload.bookingNo,
  //         },
  //       },
  //     };
  //     console.log(paramsJson);

  //     // BookingDetails_TruckingContainers
  //     let bookingDetails_TruckingContainers = [];
  //     this.bookingService
  //       .getBookingTruckingContainer(paramsJson)
  //       .subscribe((data) => {
  //         bookingDetails_TruckingContainers = data.results;
  //       });

  //     // BookingDetails_TruckingNonContainers
  //     let bookingDetails_TruckingNonContainers = [];
  //     this.bookingService
  //       .getQuotDetailsTruckNonCont(paramsJson)
  //       .subscribe((data) => {
  //         console.log(data);
  //         bookingDetails_TruckingNonContainers = data.results;
  //       });

  //     // BookingDetails_CustomsClearance
  //     let bookingDetails_CustomsClearance = [];
  //     this.bookingService
  //       .getQuotDetailsCustomsClearance(paramsJson)
  //       .subscribe((data) => {
  //         console.log(data);
  //         bookingDetails_CustomsClearance = data.results;
  //       });

  //     // BookingDetails_OtherCharges
  //     let quotDetailsOtherCharges = [];
  //     this.bookingService
  //       .getBookingDetailsOtherCharges(paramsJson)
  //       .subscribe((data) => {
  //         console.log(data);
  //         quotDetailsOtherCharges = data.results;
  //       });

  //     // build object
  //     const results: EditQuot = {
  //       general: { ...(action as any).payload },
  //       bookingDetails_TruckingContainers: [
  //         ...bookingDetails_TruckingContainers,
  //       ],
  //       bookingDetails_TruckingNonContainers: [
  //         ...bookingDetails_TruckingNonContainers,
  //       ],
  //       bookingDetails_CustomsClearance: [...bookingDetails_CustomsClearance],
  //       bookingDetails_OtherCharges: [...quotDetailsOtherCharges],
  //     };
  //     console.log(results);

  //     return of(results);
  //   }),
  //   map((bookings) => {
  //     return new BookingActions.SetEditBooking(bookings);
  //   })
  // );

  // save edited data
  // @Effect({ dispatch: false })
  // updateOtherChargeDetail = this.actions$.pipe(
  //   ofType<BookingActions.UpdateOtherChargeDetail>(
  //     BookingActions.UPDATE_OTHER_CHARGE_DETAIL
  //   ),
  //   withLatestFrom(this.store.select('bookings')),
  //   switchMap(([actionData, quotState]) => {
  //     const newCharge = { ...actionData.payload };
  //     const updatedOtherCharge = this.transformData(newCharge);
  //     const httpOptions = { headers: HEADER_PUT };

  //     return this.bookingService.updateOtherChargeDetail(updatedOtherCharge);
  //   })
  // );

  // @Effect({ dispatch: false })
  // storeOtherChargeDetail = this.actions$.pipe(
  //   ofType<BookingActions.StoreOtherChargeDetail>(
  //     BookingActions.STORE_OTHER_CHARGE_DETAIL
  //   ),
  //   switchMap((actionData) => {
  //     const otherCharge = { ...actionData.payload };
  //     const newOtherChargeDetail = this.transformData(otherCharge);

  //     return this.http.post<any>(
  //       '/sales-service/booking-details-other-charges/',
  //       JSON.stringify(newOtherChargeDetail),
  //       { headers: HEADER_POST }
  //     );
  //   })
  // );

  // @Effect({ dispatch: false })
  // deleteOtherChargeDetail = this.actions$.pipe(
  //   ofType<BookingActions.DeleteOtherChargeDetail>(
  //     BookingActions.DELETE_OTHER_CHARGE_DETAIL
  //   ),
  //   withLatestFrom(this.store.select('bookings')),
  //   switchMap(([actionData, bookingState]) => {
  //     const _id = actionData.payload;
  //     const bodyJson = JSON.stringify({ _id: _id });
  //     const options = { headers: HEADER_DELETE, body: bodyJson };

  //     return this.http.delete(
  //       '/sales-service/booking-details-other-charges/',
  //       options
  //     );
  //   })
  // );

  // @Effect({ dispatch: false })
  // storeTruckingNonContainer = this.actions$.pipe(
  //   ofType<BookingActions.StoreTruckingNonContainer>(
  //     BookingActions.STORE_TRUCKING_NON_CONTAINER
  //   ),
  //   switchMap((actionData) => {
  //     const truck = { ...actionData.payload };
  //     const newTruck = this.transformData(truck);

  //     return this.http.post<any>(
  //       '/sales-service/booking-details-trucking-non-container/',
  //       JSON.stringify(newTruck),
  //       { headers: HEADER_POST }
  //     );
  //   })
  // );

  // @Effect({ dispatch: false })
  // updateTruckingNonContainer = this.actions$.pipe(
  //   ofType<BookingActions.UpdateTruckingNonContainer>(
  //     BookingActions.UPDATE_TRUCKING_NON_CONTAINER
  //   ),
  //   withLatestFrom(this.store.select('bookings')),
  //   switchMap(([actionData, quotState]) => {
  //     const newTrucking = { ...actionData.payload };
  //     const updatedOtherCharge = this.transformData(newTrucking);
  //     const httpOptions = { headers: HEADER_PUT };

  //     return this.bookingService.updateBookingDetailTruckingNonContainer(
  //       updatedOtherCharge
  //     );
  //   })
  // );

  // @Effect({ dispatch: false })
  // deleteTruckingNonContainer = this.actions$.pipe(
  //   ofType<BookingActions.DeleteTruckingNonContainer>(
  //     BookingActions.DELETE_TRUCKING_NON_CONTAINER
  //   ),
  //   withLatestFrom(this.store.select('bookings')),
  //   switchMap(([actionData, bookingState]) => {
  //     const _id = actionData.payload;
  //     return this.bookingService.deleteBookingDetailTruckingNonContainer(_id);
  //   })
  // );

  // @Effect({ dispatch: false })
  // storeTruckingContainer = this.actions$.pipe(
  //   ofType<BookingActions.StoreTruckingContainer>(
  //     BookingActions.STORE_TRUCKING_CONTAINER
  //   ),
  //   switchMap((actionData) => {
  //     const truck = { ...actionData.payload };
  //     const newTruck = this.transformData(truck);

  //     return this.http.post<any>(
  //       '/sales-service/booking-details-trucking-container/',
  //       JSON.stringify(newTruck),
  //       { headers: HEADER_POST }
  //     );
  //   })
  // );

  // @Effect({ dispatch: false })
  // updateTruckingContainer = this.actions$.pipe(
  //   ofType<BookingActions.UpdateTruckingContainer>(
  //     BookingActions.UPDATE_TRUCKING_CONTAINER
  //   ),
  //   withLatestFrom(this.store.select('bookings')),
  //   switchMap(([actionData, quotState]) => {
  //     const newTrucking = { ...actionData.payload };
  //     const updatedOtherCharge = this.transformData(newTrucking);
  //     return this.bookingService.updateBookingDetailTruckingContainer(
  //       updatedOtherCharge
  //     );
  //   })
  // );

  // @Effect({ dispatch: false })
  // deleteTruckingContainer = this.actions$.pipe(
  //   ofType<BookingActions.DeleteTruckingContainer>(
  //     BookingActions.DELETE_TRUCKING_CONTAINER
  //   ),
  //   withLatestFrom(this.store.select('bookings')),
  //   switchMap(([actionData, bookingState]) => {
  //     const _id = actionData.payload;
  //     return this.bookingService.deleteBookingDetailTruckingContainer(_id);
  //   })
  // );

  // @Effect({ dispatch: false })
  // deleteCustomClearance = this.actions$.pipe(
  //   ofType<BookingActions.DeleteCustomClearance>(
  //     BookingActions.DELETE_CUSTOM_CLEARANCE
  //   ),
  //   withLatestFrom(this.store.select('bookings')),
  //   switchMap(([actionData, bookingState]) => {
  //     const _id = actionData.payload;
  //     const bodyJson = JSON.stringify({ _id: _id });
  //     const options = { headers: HEADER_DELETE, body: bodyJson };

  //     return this.http.delete(
  //       '/sales-service/booking-details-customs-clearance/',
  //       options
  //     );
  //   })
  // );

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
    let nonContainers = [...cloneData.bookingDetails_TruckingNonContainers];
    console.log(nonContainers);
    let truckingContainers = [...cloneData.bookingDetails_TruckingContainers];
    let quotDetailsCc = { ...cloneData.bookingDetails_CustomsClearance };
    let quotDetailsOc = [...cloneData.bookingDetails_OtherCharges];

    if (general) {
      cloneData.general.hsCode = general.hsCode.commodityID;
    }
    cloneData.general.client =
      general.client !== undefined ? general.client.partnerID : '';

    cloneData.general.commodityType =
      general.commodityType !== undefined && general.commodityType !== null
        ? general.commodityType.shipmentTypeWarningID
        : '';
    cloneData.general.bookingType =
      general.bookingType !== undefined && general.bookingType !== null
        ? general.bookingType.bookingTypeID
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
      cloneData.bookingDetails_TruckingNonContainers = nonTruckContArr;
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
      cloneData.bookingDetails_TruckingContainers = truckContArr;
    }

    if (quotDetailsCc) {
      quotDetailsCc.currency = quotDetailsCc.currency
        ? quotDetailsCc.currency.currencyID
        : '';
      cloneData.bookingDetails_CustomsClearance = { ...quotDetailsCc };
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
      cloneData.bookingDetails_OtherCharges = quotDetailsOcArr;
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
