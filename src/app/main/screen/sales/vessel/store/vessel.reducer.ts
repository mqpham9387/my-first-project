import { Vessel } from '../../../../model/vessel/vessel.model';
import * as VesselActions from './vessel.actions';

export interface State {
    vessels: Vessel[];
    editedVessel: Vessel;
    editedVesselIndex: number;
}

const initialState: State = {
    vessels: [],
    editedVessel: null,
    editedVesselIndex: -1
};

export function vesselReducer(
    state: State = initialState,
    action: VesselActions.VesselActions
) {
    switch (action.type) {
        case VesselActions.SET_VESSELS:
            return {
                ...state,
                vessels: [...action.payload]
            };
        case VesselActions.ADD_VESSEL:
            return {
                ...state,
                vessels: [...state.vessels, action.payload]
            };
        case VesselActions.UPDATE_VESSEL:
            const updatingVessel = action.payload;
            const oldVessels = state.vessels;
            const newVessels = oldVessels.map(
                (vessel: Vessel) => {
                    if (vessel._id === updatingVessel._id) {
                        return updatingVessel;
                    } else {
                        return vessel;
                    }
                }
            )
            return {
                ...state,
                vessels: newVessels
            };
        case VesselActions.ADD_VESSELS:
            return {
                ...state,
                vessels: [...state.vessels, ...action.payload]
            };
        case VesselActions.STORE_VESSEL_SUCCESS:
            return {
                ...state,
                vessels: [...state.vessels, action.payload]
            };
        case VesselActions.DELETE_VESSEL:

            return {
                ...state,
                vessels: state.vessels.filter((vessel, index) => {
                    return index !== action.payload;
                })
            };
        default:
            return { ...state };
    }
}
