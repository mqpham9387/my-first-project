import { Action } from '@ngrx/store';

import { Inquiry } from 'src/app/main/model/inquiry/inquiry.model';

export const ADD_INQUIRY = '[ReceivedInquiry] Add Inquiry';
export const ADD_INQUIRYS = '[ReceivedInquiry] Add Inquirys';
export const UPDATE_INQUIRY = '[ReceivedInquiry] Update Inquiry';
export const DELETE_INQUIRY = '[ReceivedInquiry] Delete Inquiry';
export const FETCH_RECEIVED_INQUIRIES  = '[ReceivedInquiry] Fetch Received Inquiries';
export const SET_RECEIVED_INQUIRY = '[ReceivedInquiry] Set Received Inquiry';
export const SET_INQUIRYS = '[ReceivedInquiry] Set Inquirys';
export const STORE_INQUIRY = '[ReceivedInquiry] Store Inquiry';
export const STORE_INQUIRY_SUCCESS = '[ReceivedInquiry] Store Inquiry Success';

export class FetchReceivedInquiries implements Action {
  readonly type = FETCH_RECEIVED_INQUIRIES;

  constructor(public payload: any) {}
}

export class SetReceivedInquiry implements Action {
  readonly type = SET_RECEIVED_INQUIRY;

  constructor(public payload: { receivedInquiries: Inquiry[], totalReceivedRows: number }) {}
}

export class AddInquiry implements Action {
  readonly type = ADD_INQUIRY;

  constructor(public payload: Inquiry) { }
}

export class UpdateInquiry implements Action {
  readonly type = UPDATE_INQUIRY;

  constructor(public payload: { index: number, newInquiry: Inquiry }) { }
}

export class StoreInquiry implements Action {
  readonly type = STORE_INQUIRY;
  constructor(public payload: Inquiry) { }
}

export class StoreInquirySuccess implements Action {
  readonly type = STORE_INQUIRY_SUCCESS;

  constructor(public payload: Inquiry) {}
}

export class DeleteInquiry implements Action {
  readonly type = DELETE_INQUIRY;

  constructor(public payload: number) {}
}

export type ReceivedInquiryActions =
  | FetchReceivedInquiries
  | SetReceivedInquiry
  | AddInquiry
  | UpdateInquiry
  | StoreInquiry
  | StoreInquirySuccess
  | DeleteInquiry;
