import { RateAndChargesCustomsCleanrance } from 'src/app/main/model/rate-charges/customs-cleanrance/customs-cleanrance.model';
import * as CustomsCleanranceActions from './customs-clearance.actions';

export interface State {
  importClearances?: any;
  exportClearances?: any;
  auxiliaries?: any;
  editedCustomsCleanrance: RateAndChargesCustomsCleanrance;
  editedCustomsCleanrancesIndex: number;

  totalIcRows?: number;
  totalEcRows?: number;
  totalAuxRows?: number;
}

const initialState: State = {
  importClearances: [],
  exportClearances: [],
  auxiliaries: [],
  editedCustomsCleanrance: null,
  editedCustomsCleanrancesIndex: -1,
  totalIcRows: -1,
  totalEcRows: -1,
  totalAuxRows: -1
};

export function customCleanranceReducer(state: State = initialState, action: CustomsCleanranceActions.CustomsCleanranceActions) {
  switch (action.type) {
    case CustomsCleanranceActions.FETCH_IMPORT_CLEANRANCES:
      return {
        ...state,
        importClearances: [],
        params: action.payload
      };
    case CustomsCleanranceActions.FETCH_EXPORT_CLEANRANCES:
      return {
        ...state,
        exportClearances: [],
        params: action.payload
      };
    case CustomsCleanranceActions.FETCH_AUX_CLEANRANCES:
      return {
        ...state,
        auxiliaries: [],
        params: action.payload
      };
    case CustomsCleanranceActions.SET_IMPORT_CLEANRANCES:
      return {
        ...state,
        importClearances: [...action.payload.importClearances],
        totalIcRows: action.payload.totalIcRows
      };
    case CustomsCleanranceActions.SET_EXPORT_CLEANRANCES:
      return {
        ...state,
        exportClearances: [...action.payload.exportClearances ],
        totalEcRows: action.payload.totalEcRows
      };
    case CustomsCleanranceActions.SET_AUX_CLEANRANCES:
      return {
        ...state,
        auxiliaries: [...action.payload.auxiliaries ],
        totalAuxRows: action.payload.totalAuxRows
      };

    case CustomsCleanranceActions.UPDATE_CLEANRANCE:
      const newCc = action.payload.newCustomsCleanrance;
      let updatedCustomsCleanrance: any;
      let updatedCustomsCleanrances: any;
      switch (newCc.type) {
        case 'Export':
          updatedCustomsCleanrance = {
            ...state.exportClearances[action.payload.index],
            ...action.payload.newCustomsCleanrance
          };
          updatedCustomsCleanrances = [...state.exportClearances];
          updatedCustomsCleanrances[action.payload.index] = updatedCustomsCleanrance;
          return {
            ...state,
            exportClearances: updatedCustomsCleanrances
          };
        case 'Import':
          updatedCustomsCleanrance = {
            ...state.importClearances[action.payload.index],
            ...action.payload.newCustomsCleanrance
          };
          updatedCustomsCleanrances = [...state.importClearances];
          updatedCustomsCleanrances[action.payload.index] = updatedCustomsCleanrance;
          return {
            ...state,
            importClearances: updatedCustomsCleanrances
          };
        case 'Auxiliary Services':
          updatedCustomsCleanrance = {
            ...state.auxiliaries[action.payload.index],
            ...action.payload.newCustomsCleanrance
          };
          updatedCustomsCleanrances = [...state.auxiliaries];
          updatedCustomsCleanrances[action.payload.index] = updatedCustomsCleanrance;
          return {
            ...state,
            auxiliaries: updatedCustomsCleanrances
          };

        default:
          return {...state};
      }

    case CustomsCleanranceActions.STORE_CLEANRANCE_SUCCESS:
      console.log(action.payload);
      const newCustomsCleanrance = { ...action.payload };
      switch (newCustomsCleanrance.type) {
        case 'Export':
          return {
            ...state,
            exportClearances: [...state.exportClearances, newCustomsCleanrance],
            totalEcRows: +state.totalEcRows + 1
          };

        case 'Import':
          return {
            ...state,
            importClearances: [...state.importClearances, newCustomsCleanrance],
            totalIcRows: +state.totalIcRows + 1
          };
        case 'Auxiliary Services':
          return {
            ...state,
            auxiliaries: [...state.auxiliaries, newCustomsCleanrance],
            totalAuxRows: +state.totalAuxRows + 1
          };
        default:
          return {
            ...state
          };
      }
    case CustomsCleanranceActions.DELETE_CLEANRANCE:
      const indexCc = action.payload.index;
      const containerType = action.payload.selectedCleanrance.type
      switch (containerType) {
        case 'Export':
          return {
            ...state,
            exportClearances: state.exportClearances.filter((cleanrance, index) => {
              return index !== indexCc;
            }),
            totalEcRows: state.totalEcRows > 0 ? +state.totalEcRows - 1 : 0
          };
        case 'Import':
          return {
            ...state,
            importClearances: state.importClearances.filter((cleanrance, index) => {
              return index !== indexCc;
            }),
            totalIcRows: state.totalIcRows > 0 ? +state.totalIcRows - 1 : 0
          };
        case 'Auxiliary Services':
          return {
            ...state,
            auxiliaries: state.auxiliaries.filter((cleanrance, index) => {
              return index !== indexCc;
            }),
            totalAuxRows: state.totalAuxRows > 0 ? +state.totalAuxRows - 1 : 0
          };
        default:
          return {...state};
      }
    default:
      return { ...state };
  }
}
