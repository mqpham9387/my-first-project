import { Action } from '@ngrx/store';
import { Booking } from 'src/app/main/model/booking/booking.model';

export const ADD_BOOKING = '[Booking] Add Booking';
export const UPDATE_BOOKING = '[Booking] Update Booking';
export const DELETE_BOOKING = '[Booking] Delete Booking';
export const FETCH_SENT_BOOKINGS = '[Booking] Fetch Sent Bookings';
export const FETCH_RECEIVED_BOOKINGS = '[Booking] Fetch Received Bookings';
export const SET_SENT_BOOKINGS = '[Booking] Set Sent Bookings';
export const SET_RECEIVED_BOOKINGS = '[Booking] Set Received Bookings';
export const STORE_BOOKING = '[Booking] Store Booking';
export const STORE_BOOKING_SUCCESS = '[Booking] Store Booking Success';

export const STORE_CUSTOM_CLEARANCE_BOOKING =
  '[Booking] Store Custom Clearance Booking';
export const STORE_CUSTOM_CLEARANCE__BOOKING_SUCCESS =
  '[Booking] Store Custom Clearance Booking Success';
export const DELETE_CUSTOM_CLEARANCE = '[Booking] Delete Custom Clearance';
export const UPDATE_CUSTOM_CLEARANCE = '[Booking] Update Custom Clearance';

export const STORE_OTHER_CHARGE_DETAIL = '[Booking] Store Other Charge Detail';
export const UPDATE_OTHER_CHARGE_DETAIL =
  '[Booking] Update Other Charge Detail';
export const DELETE_OTHER_CHARGE_DETAIL =
  '[Booking] Delete Other Charge Detail';

export const STORE_TRUCKING_NON_CONTAINER =
  '[Booking] Store Trucking Non Container';
export const UPDATE_TRUCKING_NON_CONTAINER =
  '[Booking] Update Trucking Non Container';
export const DELETE_TRUCKING_NON_CONTAINER =
  '[Booking] Delete Trucking Non Container';

export const STORE_TRUCKING_CONTAINER = '[Booking] Store Trucking Container';
export const UPDATE_TRUCKING_CONTAINER = '[Booking] Update Trucking Container';
export const DELETE_TRUCKING_CONTAINER = '[Booking] Delete Trucking Container';

export const GET_EDIT_BOOKING = '[Booking] Get Edit Booking';
export const SET_EDIT_BOOKING = '[Booking] Set Edit Booking';

export class FetchSentBookings implements Action {
  readonly type = FETCH_SENT_BOOKINGS;
  constructor(public payload: any) {}
}
export class FetchReceivedBookings implements Action {
  readonly type = FETCH_RECEIVED_BOOKINGS;
  constructor(public payload: any) {}
}

export class SetSentBookings implements Action {
  readonly type = SET_SENT_BOOKINGS;
  constructor(
    public payload: { sentBookings: Booking[]; totalSentBookingRows: number }
  ) {}
}

export class SetReceivedBookings implements Action {
  readonly type = SET_RECEIVED_BOOKINGS;
  constructor(
    public payload: {
      receivedBookings: Booking[];
      totalReceivedBookingRows: number;
    }
  ) {}
}

export class AddBooking implements Action {
  readonly type = ADD_BOOKING;
  constructor(public payload: Booking) {}
}

export class UpdateBooking implements Action {
  readonly type = UPDATE_BOOKING;
  constructor(public payload: { index: number; updatedBooking: any }) {}
}

export class StoreBooking implements Action {
  readonly type = STORE_BOOKING;
  constructor(public payload: Booking) {}
}

export class StoreBookingSuccess implements Action {
  readonly type = STORE_BOOKING_SUCCESS;
  constructor(public payload: Booking) {}
}

export class StoreCustomClearanceBooking implements Action {
  readonly type = STORE_CUSTOM_CLEARANCE_BOOKING;
  constructor(public payload: any) {}
}

export class StoreCustomClearanceBookingSuccess implements Action {
  readonly type = STORE_CUSTOM_CLEARANCE__BOOKING_SUCCESS;
  constructor(public payload: any) {}
}

export class UpdateCustomClearance implements Action {
  readonly type = UPDATE_CUSTOM_CLEARANCE;
  constructor(public payload: any) {}
}

export class DeleteBooking implements Action {
  readonly type = DELETE_BOOKING;
  constructor(public payload: { index: number; selectedQuotaion?: any }) {}
}
export class GetEditBooking implements Action {
  readonly type = GET_EDIT_BOOKING;
  constructor(public payload: any) {}
}
export class SetEditBooking implements Action {
  readonly type = SET_EDIT_BOOKING;
  constructor(public payload: any) {}
}

export class StoreOtherChargeDetail implements Action {
  readonly type = STORE_OTHER_CHARGE_DETAIL;
  constructor(public payload: any) {}
}

export class UpdateOtherChargeDetail implements Action {
  readonly type = UPDATE_OTHER_CHARGE_DETAIL;
  constructor(public payload: any) {}
}
export class DeleteOtherChargeDetail implements Action {
  readonly type = DELETE_OTHER_CHARGE_DETAIL;
  constructor(public payload: string) {}
}

export class StoreTruckingNonContainer implements Action {
  readonly type = STORE_TRUCKING_NON_CONTAINER;
  constructor(public payload: any) {}
}

export class UpdateTruckingNonContainer implements Action {
  readonly type = UPDATE_TRUCKING_NON_CONTAINER;
  constructor(public payload: any) {}
}

export class DeleteTruckingNonContainer implements Action {
  readonly type = DELETE_TRUCKING_NON_CONTAINER;
  constructor(public payload: string) {}
}

export class StoreTruckingContainer implements Action {
  readonly type = STORE_TRUCKING_CONTAINER;
  constructor(public payload: any) {}
}

export class UpdateTruckingContainer implements Action {
  readonly type = UPDATE_TRUCKING_CONTAINER;
  constructor(public payload: any) {}
}

export class DeleteTruckingContainer implements Action {
  readonly type = DELETE_TRUCKING_CONTAINER;
  constructor(public payload: string) {}
}
export class DeleteCustomClearance implements Action {
  readonly type = DELETE_CUSTOM_CLEARANCE;
  constructor(public payload: string) {}
}

export type BookingActions =
  | FetchSentBookings
  | FetchReceivedBookings
  | SetSentBookings
  | SetReceivedBookings
  | AddBooking
  | GetEditBooking
  | SetEditBooking
  | UpdateBooking
  | StoreBooking
  | StoreBookingSuccess
  | StoreCustomClearanceBooking
  | StoreCustomClearanceBookingSuccess
  | DeleteCustomClearance
  | DeleteBooking
  | UpdateOtherChargeDetail
  | StoreOtherChargeDetail
  | DeleteOtherChargeDetail
  | StoreTruckingNonContainer
  | UpdateTruckingNonContainer
  | DeleteTruckingNonContainer
  | StoreTruckingContainer
  | UpdateTruckingContainer
  | DeleteTruckingContainer;
