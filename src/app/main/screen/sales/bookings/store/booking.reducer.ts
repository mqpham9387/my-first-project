import * as BookingActions from './booking.actions';

export interface State {
  sentBookings?: any;
  receivedBookings?: any;
  totalSentQuotRows?: number;
  totalReceivedQuotRows?: number;
  editBooking?: any;
}

const initialState: State = {
  sentBookings: [],
  receivedBookings: [],
  totalSentQuotRows: -1,
  totalReceivedQuotRows: -1,
  editBooking: null,
};

export function bookingReducer(
  state: State = initialState,
  action: BookingActions.BookingActions
) {
  switch (action.type) {
    case BookingActions.FETCH_SENT_BOOKINGS:
      return {
        ...state,
        sentBookings: [],
        params: action.payload,
      };
    case BookingActions.SET_SENT_BOOKINGS:
      return {
        ...state,
        sentBookings: [...action.payload.sentBookings],
        totalSentQuotRows: action.payload.totalSentBookingRows,
      };
    case BookingActions.FETCH_RECEIVED_BOOKINGS:
      return {
        ...state,
        receivedBookings: [],
        params: action.payload,
      };
    case BookingActions.SET_RECEIVED_BOOKINGS:
      return {
        ...state,
        receivedBookings: [...action.payload.receivedBookings],
        totalReceivedQuotRows: action.payload.totalReceivedBookingRows,
      };
    case BookingActions.ADD_BOOKING:
      return {
        ...state,
        sentBookings: [...state.sentBookings, action.payload],
      };
    case BookingActions.UPDATE_BOOKING:
      let updatedBooking: any;
      let updatedBookings: any;
      updatedBooking = {
        ...state.sentBookings[action.payload.index],
        ...action.payload.updatedBooking,
      };
      updatedBookings = [...state.sentBookings];
      updatedBookings[action.payload.index] = updatedBooking;
      return {
        ...state,
        sentBookings: updatedBookings,
      };
    case BookingActions.STORE_BOOKING_SUCCESS:
      const newBooking = { ...action.payload };
      return {
        ...state,
        sentBookings: [...state.sentBookings, newBooking],
        totalSentQuotRows: +state.totalSentQuotRows + 1,
      };
    case BookingActions.STORE_CUSTOM_CLEARANCE__BOOKING_SUCCESS:
      const result = { ...action.payload };
      console.log(result);

      if (result.creator !== null && result.creator.contactID === 'CT0276') {
        return {
          ...state,
          sentBookings: [...state.sentBookings, result],
          totalSentQuotRows: +state.totalSentQuotRows + 1,
        };
      }
      return {
        ...state,
        receivedBookings: [...state.receivedBookings, result],
        totalReceivedQuotRows: +state.totalReceivedQuotRows + 1,
      };
    case BookingActions.DELETE_BOOKING:
      const indexBooking = action.payload.index;
      return {
        ...state,
        sentBookings: state.sentBookings.filter((quot, index) => {
          return index !== indexBooking;
        }),
        totalSentQuotRows:
          state.totalSentQuotRows > 0 ? +state.totalSentQuotRows - 1 : 0,
      };
    case BookingActions.SET_EDIT_BOOKING:
      return {
        ...state,
        editBooking: [...action.payload],
      };
    default:
      return { ...state };
  }
}
