import * as QuotationActions from './quotation.actions';

export interface State {
  sentQuotations?: any;
  receivedQuotations?: any;
  totalSentQuotRows?: number;
  totalReceivedQuotRows?: number;
  editQuotation?: any;
}

const initialState: State = {
  sentQuotations: [],
  receivedQuotations: [],
  totalSentQuotRows: -1,
  totalReceivedQuotRows: -1,
  editQuotation: null,
};

export function quotationReducer(
  state: State = initialState,
  action: QuotationActions.QuotationActions
) {
  switch (action.type) {
    case QuotationActions.FETCH_SENT_QUOTATIONS:
      return {
        ...state,
        sentQuotations: [],
        params: action.payload,
      };
    case QuotationActions.SET_SENT_QUOTATIONS:
      return {
        ...state,
        sentQuotations: [...action.payload.sentQuotations],
        totalSentQuotRows: action.payload.totalSentQuotRows,
      };
    case QuotationActions.FETCH_RECEIVED_QUOTATIONS:
      return {
        ...state,
        receivedQuotations: [],
        params: action.payload,
      };
    case QuotationActions.SET_RECEIVED_QUOTATIONS:
      return {
        ...state,
        receivedQuotations: [...action.payload.receivedQuotations],
        totalReceivedQuotRows: action.payload.totalReceivedQuotRows,
      };
    case QuotationActions.ADD_QUOTATION:
      return {
        ...state,
        sentQuotations: [...state.sentQuotations, action.payload],
      };
    case QuotationActions.UPDATE_QUOTATION:
      let updatedQuotation: any;
      let updatedQuotations: any;
      updatedQuotation = {
        ...state.sentQuotations[action.payload.index],
        ...action.payload.updatedQuotation,
      };
      updatedQuotations = [...state.sentQuotations];
      updatedQuotations[action.payload.index] = updatedQuotation;
      return {
        ...state,
        sentQuotations: updatedQuotations,
      };
    case QuotationActions.STORE_QUOTATION_SUCCESS:
      const newQuotation = { ...action.payload };
      return {
        ...state,
        sentQuotations: [...state.sentQuotations, newQuotation],
        totalSentQuotRows: +state.totalSentQuotRows + 1,
      };
    case QuotationActions.STORE_CUSTOM_CLEARANCE__QUOTATION_SUCCESS:
      const result = { ...action.payload };
      console.log(result);

      if (result.creator !== null && result.creator.contactID === 'CT0276') {
        return {
          ...state,
          sentQuotations: [...state.sentQuotations, result],
          totalSentQuotRows: +state.totalSentQuotRows + 1,
        };
      }
      return {
        ...state,
        receivedQuotations: [...state.receivedQuotations, result],
        totalReceivedQuotRows: +state.totalReceivedQuotRows + 1,
      };
    case QuotationActions.DELETE_QUOTATION:
      const indexQuotation = action.payload.index;
      return {
        ...state,
        sentQuotations: state.sentQuotations.filter((quot, index) => {
          return index !== indexQuotation;
        }),
        totalSentQuotRows:
          state.totalSentQuotRows > 0 ? +state.totalSentQuotRows - 1 : 0,
      };
    case QuotationActions.SET_EDIT_QUOTATION:
      return {
        ...state,
        editQuotation: [...action.payload],
      };
    default:
      return { ...state };
  }
}
