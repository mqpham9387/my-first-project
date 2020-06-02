import { Inquiry } from 'src/app/main/model/inquiry/inquiry.model';
import * as InquiryActions from './inquiry.actions';

const inquiries: Inquiry[] = [];

export interface State {
    inquiries: Inquiry[];
    editedInquiry: Inquiry;
    editedInquiryIndex: number;
    params?: any;
    totalRows?: number;
}

const initialState: State = {
    inquiries: inquiries,
    editedInquiry: null,
    editedInquiryIndex: -1,
    totalRows: -1
};

export function inquiryReducer(
    state: State = initialState,
    action: InquiryActions.InquiryActions
) {
    switch (action.type) {
        case InquiryActions.FETCH_SENTS_INQUIRY:
            return {
                ...state,
                inquiries: [...state.inquiries],
                params: action.payload,
            };
        case InquiryActions.SET_SENTS_INQUIRY:
            console.log(action.payload);
            
            return {
                ...state,
                inquiries: [...action.payload.inquiries],
                totalRows: action.payload.totalRows
            };
        case InquiryActions.ADD_INQUIRY:
            return {
                ...state,
                inquiries: [...state.inquiries, action.payload]
            };
        case InquiryActions.UPDATE_INQUIRY:
            const updatedInquiry = {
                ...state.inquiries[action.payload.index],
                ...action.payload.newInquiry
            };
        
            const updatedInquiries = [...state.inquiries];
            updatedInquiries[action.payload.index] = updatedInquiry;
        
            return {
                ...state,
                inquiries: updatedInquiries
            };
        case InquiryActions.ADD_INQUIRYS:
            return {
                ...state,
                inquiries: [...state.inquiries, ...action.payload]
            };
        case InquiryActions.STORE_INQUIRY_SUCCESS:
            return {
                ...state,
                inquiries: [...state.inquiries, action.payload],
                totalRows: state.totalRows + 1
            };
        case InquiryActions.DELETE_INQUIRY:
            return {
                ...state,
                inquiries: state.inquiries.filter((inquiry, index) => {
                  return index !== action.payload;
                }),
                totalRows: state.totalRows - 1 
            };
        default:
            return {...state };
    }
}