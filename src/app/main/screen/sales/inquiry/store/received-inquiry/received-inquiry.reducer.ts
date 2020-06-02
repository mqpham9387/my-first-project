import { Inquiry } from 'src/app/main/model/inquiry/inquiry.model';
import * as ReceivedInquiryActions from './received-inquiry.actions';


const receivedInquiries: Inquiry[] = [];

export interface State {
    receivedInquiries: Inquiry[];
    editedInquiry: Inquiry;
    editedInquiryIndex: number;
    params?: any;
    totalReceivedRows?: number;
}

const initialState: State = {
    receivedInquiries: receivedInquiries,
    editedInquiry: null,
    editedInquiryIndex: -1,
    totalReceivedRows: -1
};

export function receivedInquiryReducer(
    state: State = initialState,
    action: ReceivedInquiryActions.ReceivedInquiryActions
) {
    switch (action.type) {
        case ReceivedInquiryActions.FETCH_RECEIVED_INQUIRIES:
            return {
                ...state,
                receivedInquiries: [...state.receivedInquiries],
                params: action.payload,
            };
        case ReceivedInquiryActions.SET_RECEIVED_INQUIRY:
            console.log(action.payload);
            
            return {
                ...state,
                receivedInquiries: [...action.payload.receivedInquiries],
                totalReceivedRows: action.payload.totalReceivedRows
            };
        case ReceivedInquiryActions.ADD_INQUIRY:
            return {
                ...state,
                receivedInquiries: [...state.receivedInquiries, action.payload]
            };
        case ReceivedInquiryActions.UPDATE_INQUIRY:
            const updatedInquiry = {
                ...state.receivedInquiries[action.payload.index],
                ...action.payload.newInquiry
            };
        
            const updatedInquiries = [...state.receivedInquiries];
            updatedInquiries[action.payload.index] = updatedInquiry;
        
            return {
                ...state,
                receivedInquiries: updatedInquiries
            };
        case ReceivedInquiryActions.STORE_INQUIRY_SUCCESS:
            return {
                ...state,
                receivedInquiries: [...state.receivedInquiries, action.payload],
                totalReceivedRows: state.totalReceivedRows + 1
            };
        case ReceivedInquiryActions.DELETE_INQUIRY:  
            return {
                ...state,
                receivedInquiries: state.receivedInquiries.filter((inquiry, index) => {
                  return index !== action.payload;
                })
            };
        default:
            return {...state };
    }
}