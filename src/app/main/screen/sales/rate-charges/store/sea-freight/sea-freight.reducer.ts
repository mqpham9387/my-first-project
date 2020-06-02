import { RateAndChargesSea } from 'src/app/main/model/rate-charges/rate-and-charges-sea.model';
import * as SeaFreightActions from './sea-freight.actions';

export interface State {
  seaFreights?: any;
  otSeaFreights?: any;
  gpSeaFreights?: any;
  rcSeaFreights?: any;
  frSeaFreights?: any;
  isoSeaFreights?: any;
  editedSeaFreight: RateAndChargesSea;
  editedSeaFreightsIndex: number;
  params?: any;
  totalRows?: number;
  totalGPRows?: number;
  totalOTRows?: number;
  totalRCRows?: number;
  totalFRRows?: number;
  totalISORows?: number;
}

const initialState: State = {
  seaFreights: [],
  otSeaFreights: [],
  gpSeaFreights: [],
  rcSeaFreights: [],
  frSeaFreights: [],
  isoSeaFreights: [],
  editedSeaFreight: null,
  editedSeaFreightsIndex: -1,
  totalRows: -1,
  totalGPRows: -1,
  totalOTRows: -1,
  totalRCRows: -1,
  totalFRRows: -1,
  totalISORows: -1
};

export function seaFreightReducer(state: State = initialState, action: SeaFreightActions.SeaFreightActions) {
  switch (action.type) {
    case SeaFreightActions.FETCH_SEA_FREIGHTS:
      return {
        ...state,
        seaFreights: [],
        params: action.payload
      };
    case SeaFreightActions.FETCH_OT_SEA_FREIGHTS:
      return {
        ...state,
        otSeaFreights: [],
        params: action.payload
      };
    case SeaFreightActions.FETCH_GP_SEA_FREIGHTS:
      return {
        ...state,
        gpSeaFreights: [],
        params: action.payload
      };
    case SeaFreightActions.FETCH_RC_SEA_FREIGHTS:
      return {
        ...state,
        rcSeaFreights: [],
        params: action.payload
      };
    case SeaFreightActions.FETCH_FR_SEA_FREIGHTS:
      return {
        ...state,
        frSeaFreights: [],
        params: action.payload
      };
    case SeaFreightActions.FETCH_ISO_SEA_FREIGHTS:
      return {
        ...state,
        isoSeaFreights: [],
        params: action.payload
      };
    case SeaFreightActions.SET_SEA_FREIGHTS:
      return {
        ...state,
        seaFreights: [...action.payload.seaFreights],
        totalRows: action.payload.totalRows
      };
    case SeaFreightActions.SET_GP_SEA_FREIGHTS:
      return {
        ...state,
        gpSeaFreights: [...action.payload.gpSeaFreights ],
        totalGPRows: action.payload.totalRows
      };
    case SeaFreightActions.SET_OT_SEA_FREIGHTS:
      return {
        ...state,
        otSeaFreights: [...action.payload.otSeaFreights ],
        totalOTRows: action.payload.totalRows
      };
    case SeaFreightActions.SET_RC_SEA_FREIGHTS:
      return {
        ...state,
        rcSeaFreights: [...action.payload.rcSeaFreights ],
        totalRCRows: action.payload.totalRows
      };
    case SeaFreightActions.SET_FR_SEA_FREIGHTS:
      return {
        ...state,
        frSeaFreights: [...action.payload.frSeaFreights ],
        totalFRRows: action.payload.totalRows
      };
    case SeaFreightActions.SET_ISO_SEA_FREIGHTS:
      return {
        ...state,
        isoSeaFreights: [...action.payload.isoSeaFreights ],
        totalISORows: action.payload.totalRows
      };
    case SeaFreightActions.ADD_SEA_FREIGHT:
      return {
        ...state,
        seaFreights: [...state.seaFreights, action.payload]
      };
    case SeaFreightActions.UPDATE_SEA_FREIGHT:
      const newSea = action.payload.newSeaFreight;

      let updatedSeaFreight: any;
      let updatedSeaFreights: any;
      switch (newSea.containerType) {
        case 'GP': // General Purpose
          updatedSeaFreight = {
            ...state.gpSeaFreights[action.payload.index],
            ...action.payload.newSeaFreight
          };
          updatedSeaFreights = [...state.gpSeaFreights];
          updatedSeaFreights[action.payload.index] = updatedSeaFreight;
          return {
            ...state,
            gpSeaFreights: updatedSeaFreights
          };
        case 'RF': // Refridgerated Container
          updatedSeaFreight = {
            ...state.rcSeaFreights[action.payload.index],
            ...action.payload.newSeaFreight
          };
          updatedSeaFreights = [...state.rcSeaFreights];
          updatedSeaFreights[action.payload.index] = updatedSeaFreight;
          return {
            ...state,
            rcSeaFreights: updatedSeaFreights
          };
        case 'FR': // Flat Rack
          updatedSeaFreight = {
            ...state.frSeaFreights[action.payload.index],
            ...action.payload.newSeaFreight
          };
          updatedSeaFreights = [...state.frSeaFreights];
          updatedSeaFreights[action.payload.index] = updatedSeaFreight;
          return {
            ...state,
            frSeaFreights: updatedSeaFreights
          };
        case 'OT': // Open Top Container
          updatedSeaFreight = {
            ...state.otSeaFreights[action.payload.index],
            ...action.payload.newSeaFreight
          };
          updatedSeaFreights = [...state.otSeaFreights];
          updatedSeaFreights[action.payload.index] = updatedSeaFreight;
          return {
            ...state,
            otSeaFreights: updatedSeaFreights
          };
        case 'ISOT': // ISO Tank
          updatedSeaFreight = {
            ...state.isoSeaFreights[action.payload.index],
            ...action.payload.newSeaFreight
          };
          updatedSeaFreights = [...state.isoSeaFreights];
          updatedSeaFreights[action.payload.index] = updatedSeaFreight;
          return {
            ...state,
            isoSeaFreights: updatedSeaFreights
          };
        default:
          return {
            ...state,
            seaFreights: updatedSeaFreights
          };
      }
    case SeaFreightActions.ADD_SEA_FREIGHTS:
      return {
        ...state,
        seaFreights: [...state.seaFreights, ...action.payload]
      };
    case SeaFreightActions.STORE_SEA_FREIGHT_SUCCESS:
      // TODO: add to FCL sea if have???
      console.log(action.payload);
      const newSeaFreight = { ...action.payload };
      switch (newSeaFreight.containerType) {
        case 'GP': // General Purpose
          return {
            ...state,
            gpSeaFreights: [...state.gpSeaFreights, newSeaFreight],
            totalGPRows: +state.totalGPRows + 1
          };
        case 'DC': // Dry Container
          // return {
          //   ...state,
          //   rcSeaFreights: [...state.rcSeaFreights, action.payload]
          // };
        case 'RF': // Refridgerated Container
          return {
            ...state,
            rcSeaFreights: [...state.rcSeaFreights, newSeaFreight],
            totalRCRows: +state.totalRCRows + 1
          };
        case 'FR': // Flat Rack
          return {
            ...state,
            frSeaFreights: [...state.frSeaFreights, newSeaFreight],
            totalFRRows: +state.totalFRRows + 1
          };
        case 'OT': // Open Top Container
          return {
            ...state,
            otSeaFreights: [...state.otSeaFreights, newSeaFreight],
            totalOTRows: +state.totalOTRows + 1
          };
        case 'ISOT': // ISO Tank
          return {
            ...state,
            isoSeaFreights: [...state.isoSeaFreights, newSeaFreight],
            totalISORows: +state.totalISORows + 1
          };
      }
      return {
        ...state,
        seaFreights: [...state.seaFreights, action.payload]
      };
    case SeaFreightActions.DELETE_SEA_FREIGHT:
      const indexSea = action.payload.index;
      const containerType = action.payload.selectedSea.containerType.unitID;
      switch (containerType) {
        case 'GP': // General Purpose
          return {
            ...state,
            gpSeaFreights: state.gpSeaFreights.filter((seaF, index) => {
              return index !== indexSea;
            }),
            totalGPRows: state.totalGPRows > 0 ? +state.totalGPRows - 1 : 0
          };
        case 'RF': // Refridgerated Container
          return {
            ...state,
            rcSeaFreights: state.rcSeaFreights.filter((seaF, index) => {
              return index !== indexSea;
            }),
            totalRCRows: state.totalRCRows > 0 ? +state.totalRCRows - 1 : 0
          };
        case 'FR': // Flat Rack
          return {
            ...state,
            frSeaFreights: state.frSeaFreights.filter((seaF, index) => {
              return index !== indexSea;
            }),
            totalFRRows: state.totalFRRows > 0 ? +state.totalFRRows - 1 : 0
          };
        case 'OT': // Open Top Container
          return {
            ...state,
            otSeaFreights: state.otSeaFreights.filter((seaF, index) => {
              return index !== indexSea;
            }),
            totalOTRows: state.totalOTRows > 0 ? +state.totalOTRows - 1 : 0
          };
        case 'ISOT': // ISO Tank
          return {
            ...state,
            isoSeaFreights: state.isoSeaFreights.filter((seaF, index) => {
              return index !== indexSea;
            }),
            totalISORows: state.totalISORows > 0 ? +state.totalISORows - 1 : 0
          };
        default:
          return {
            ...state,
            seaFreights: state.seaFreights.filter((seaF, index) => {
              return index !== action.payload.index;
            }),
            totalRows: state.totalRows > 0 ? +state.totalRows - 1 : 0
          };
      }
    default:
      return { ...state };
  }
}
