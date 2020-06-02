import { TruckingCharge } from 'src/app/main/model/rate-charges/trucking-charge/trucking-charge.model';
import * as TruckingChargeActions from './trucking-charge.actions';

export interface State {
  truckingCharges?: any;
  totalRows?: number;
}

const initialState: State = {
  truckingCharges: [],
  totalRows: -1
};

export function truckingChargeReducer(state: State = initialState, action: TruckingChargeActions.TruckingChargeActions) {
  switch (action.type) {
    case TruckingChargeActions.FETCH_TRUCKING_CHARGES:
      return {
        ...state,
        truckingCharges: [],
        params: action.payload
      };
    case TruckingChargeActions.SET_TRUCKING_CHARGES:
      return {
        ...state,
        truckingCharges: [...action.payload.truckingCharges],
        totalRows: action.payload.totalRows
      };
    case TruckingChargeActions.ADD_TRUCKING_CHARGE:
      return {
        ...state,
        truckingCharges: [...state.truckingCharges, action.payload]
      };
    case TruckingChargeActions.UPDATE_TRUCKING_CHARGE:
      let updatedSeaFreight: any;
      let updatedSeaFreights: any;
      updatedSeaFreight = {
        ...state.truckingCharges[action.payload.index],
        ...action.payload.newTruckingCharge
      };
      updatedSeaFreights = [...state.truckingCharges];
      updatedSeaFreights[action.payload.index] = updatedSeaFreight;
      return {
        ...state,
        truckingCharges: updatedSeaFreights
      };
    case TruckingChargeActions.ADD_TRUCKING_CHARGE:
      return {
        ...state,
        truckingCharges: [...state.truckingCharges, {...action.payload}]
      };
    case TruckingChargeActions.STORE_TRUCKING_CHARGE_SUCCESS:
      const newTruckingCharge = { ...action.payload };
      return {
        ...state,
        truckingCharges: [...state.truckingCharges, newTruckingCharge],
        totalRows: +state.totalRows + 1
      };
    case TruckingChargeActions.DELETE_TRUCKING_CHARGE:
      const indexTruck = action.payload.index;
      return {
        ...state,
        truckingCharges: state.truckingCharges.filter((truck, index) => {
          return index !== indexTruck;
        }),
        totalRows: state.totalRows > 0 ? +state.totalRows - 1 : 0
      };
    default:
      return { ...state };
  }
}
