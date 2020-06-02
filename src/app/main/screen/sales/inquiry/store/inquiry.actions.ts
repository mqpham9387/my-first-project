import { Action } from '@ngrx/store';

import { Inquiry } from '../../../../model/inquiry/inquiry.model';

export const ADD_INQUIRY = '[Inquiry] Add Inquiry';
export const ADD_INQUIRYS = '[Inquiry] Add Inquirys';
export const UPDATE_INQUIRY = '[Inquiry] Update Inquiry';
export const DELETE_INQUIRY = '[Inquiry] Delete Inquiry';
export const FETCH_SENTS_INQUIRY  = '[Inquiry] Fetch Sents Inquiry';
export const SET_SENTS_INQUIRY = '[Inquiry] Set Sents Inquiry';
export const SET_INQUIRYS = '[Inquiry] Set Inquirys';
export const STORE_INQUIRY = '[Inquiry] Store Inquiry';
export const STORE_INQUIRY_SUCCESS = '[Inquiry] Store Inquiry Success';

export class FetchSentInquirys implements Action {
  readonly type = FETCH_SENTS_INQUIRY;

  constructor(public payload: any) {}
}

export class SetSentsInquiry implements Action {
  readonly type = SET_SENTS_INQUIRY;

  constructor(public payload: { inquiries: Inquiry[], totalRows: number }) {}
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

export class AddInquirys implements Action {
  readonly type = ADD_INQUIRYS;

  constructor(public payload: Inquiry[]) { }
}

export class StoreInquirySuccess implements Action {
  readonly type = STORE_INQUIRY_SUCCESS;

  constructor(public payload: Inquiry) {}
}

export class DeleteInquiry implements Action {
  readonly type = DELETE_INQUIRY;

  constructor(public payload: number) {}
}

export type InquiryActions =
  | FetchSentInquirys
  | SetSentsInquiry
  | AddInquiry
  | UpdateInquiry
  | AddInquirys
  | StoreInquiry
  | StoreInquirySuccess
  | DeleteInquiry;
