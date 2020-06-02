
import * as LocalChargeDetailActions from './local-charge-detail.actions';

export interface State {
  localChargeDetails?: any;
  totalRows?: number;
}

const initialState: State = {
  localChargeDetails: [],
  totalRows: -1
};

export function localChargeDetailReducer(state: State = initialState, action: LocalChargeDetailActions.LocalChargeDetailActions) {
  switch (action.type) {
    case LocalChargeDetailActions.FETCH_LOCAL_CHARGE_DETAILS:
      return {
        ...state,
        localChargeDetails: [],
        params: action.payload
      };
    case LocalChargeDetailActions.SET_LOCAL_CHARGE_DETAILS:
      return {
        ...state,
        localChargeDetails: [...action.payload.localChargeDetails],
        totalRows: action.payload.totalRows
      };
    case LocalChargeDetailActions.ADD_LOCAL_CHARGE_DETAIL:
      return {
        ...state,
        localChargeDetails: [...state.localChargeDetails, action.payload]
      };
    case LocalChargeDetailActions.UPDATE_LOCAL_CHARGE_DETAIL:
      let updatedLocalChargeDetail: any;
      let updatedLocalChargeDetails: any;
      updatedLocalChargeDetail = {
        ...state.localChargeDetails[action.payload.index],
        ...action.payload.newLocalChargeDetail
      };
      updatedLocalChargeDetails = [...state.localChargeDetails];
      updatedLocalChargeDetails[action.payload.index] = updatedLocalChargeDetail;
      return {
        ...state,
        localChargeDetails: updatedLocalChargeDetails
      };
    case LocalChargeDetailActions.ADD_LOCAL_CHARGE_DETAIL:
      return {
        ...state,
        localChargeDetails: [...state.localChargeDetails, {...action.payload}]
      };
    case LocalChargeDetailActions.STORE_LOCAL_CHARGE_DETAIL_SUCCESS:
      const newCharge = { ...action.payload };
      return {
        ...state,
        localChargeDetails: [...state.localChargeDetails, newCharge],
        totalRows: +state.totalRows + 1
      };
    case LocalChargeDetailActions.DELETE_LOCAL_CHARGE_DETAIL:
      const indexCharge = action.payload.index;
      return {
        ...state,
        localChargeDetails: state.localChargeDetails.filter((truck, index) => {
          return index !== indexCharge;
        }),
        totalRows: state.totalRows > 0 ? +state.totalRows - 1 : 0
      };
    default:
      return { ...state };
  }
}
