import { LocalCharge } from 'src/app/main/model/rate-charges/local-charges/local-charge.model';
import * as LocalChargeActions from './local-charge.actions';

export interface State {
  localCharges?: any;
  totalRows?: number;
}

const initialState: State = {
  localCharges: [],
  totalRows: -1
};

export function localChargeReducer(state: State = initialState, action: LocalChargeActions.LocalChargeActions) {
  switch (action.type) {
    case LocalChargeActions.FETCH_LOCAL_CHARGES:
      return {
        ...state,
        localCharges: [],
        params: action.payload
      };
    case LocalChargeActions.SET_LOCAL_CHARGES:
      return {
        ...state,
        localCharges: [...action.payload.localCharges],
        totalRows: action.payload.totalRows
      };
    case LocalChargeActions.ADD_LOCAL_CHARGE:
      return {
        ...state,
        localCharges: [...state.localCharges, action.payload]
      };
    case LocalChargeActions.UPDATE_LOCAL_CHARGE:
      let updatedLocalCharge: any;
      let updatedLocalCharges: any;
      updatedLocalCharge = {
        ...state.localCharges[action.payload.index],
        ...action.payload.newLocalCharge
      };
      updatedLocalCharges = [...state.localCharges];
      updatedLocalCharges[action.payload.index] = updatedLocalCharge;
      return {
        ...state,
        localCharges: updatedLocalCharges
      };
    case LocalChargeActions.ADD_LOCAL_CHARGE:
      return {
        ...state,
        localCharges: [...state.localCharges, {...action.payload}]
      };
    case LocalChargeActions.STORE_LOCAL_CHARGE_SUCCESS:
      const newLocalCharge = { ...action.payload };
      return {
        ...state,
        localCharges: [...state.localCharges, newLocalCharge],
        totalRows: +state.totalRows + 1
      };
    case LocalChargeActions.DELETE_LOCAL_CHARGE:
      const indexTruck = action.payload.index;
      return {
        ...state,
        localCharges: state.localCharges.filter((truck, index) => {
          return index !== indexTruck;
        }),
        totalRows: state.totalRows > 0 ? +state.totalRows - 1 : 0
      };
    default:
      return { ...state };
  }
}
