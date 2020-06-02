import { RateAndChargesAir } from 'src/app/main/model/rate-charges/rate-and-charges-air.model';
import * as AirFreightActions from './air-freight.actions';

export interface State {
    airFreights?: any;
    editedAirFreight: RateAndChargesAir;
    editedAirFreightsIndex: number;
    params?: any;
    totalRows?: number;
}

const initialState: State = {
    airFreights: [],
    editedAirFreight: null,
    editedAirFreightsIndex: -1,
    totalRows: -1
};

export function airFreightReducer( state: State = initialState, action: AirFreightActions.AirFreightActions) {
    switch (action.type) {
        case AirFreightActions.FETCH_AIR_FREIGHTS:
            return {
                ...state,
                airFreights: [...state.airFreights],
                params: action.payload
            };
        case AirFreightActions.SET_AIR_FREIGHTS:
            return {
                ...state,
                airFreights: [...action.payload.airFreights],
                totalRows: action.payload.totalRows
            };
        case AirFreightActions.ADD_AIR_FREIGHT:
            return {
                ...state,
                airFreights: [...state.airFreights, action.payload]
            };
        case AirFreightActions.UPDATE_AIR_FREIGHT:
            const updatedAirFreight = {
                ...state.airFreights[action.payload.index],
                ...action.payload.newAirFreight
            };

            const updatedAirFreights = [...state.airFreights];
            updatedAirFreights[action.payload.index] = updatedAirFreight;

            return {
                ...state,
                airFreights: updatedAirFreights
            };
        case AirFreightActions.ADD_AIR_FREIGHTS:
            return {
                ...state,
                airFreights: [...state.airFreights, ...action.payload]
            };
        case AirFreightActions.STORE_AIR_FREIGHT_SUCCESS:
            return {
                ...state,
                airFreights: [...state.airFreights, action.payload],
                totalRows: state.totalRows + 1
            };
        case AirFreightActions.DELETE_AIR_FREIGHT:
            const indexAir = action.payload.index;
            return {
                ...state,
                airFreights: state.airFreights.filter((air, index) => {
                return index !== indexAir;
                }),
                totalRows: state.totalRows > 0 ? +state.totalRows - 1 : 0
            };
        default:
            return { ...state };
    }
}
