import { Action } from '@ngrx/store';

import { LocalChargeDetail } from 'src/app/main/model/rate-charges/local-charges/local-charge-detail.model';

export const ADD_LOCAL_CHARGE_DETAIL = '[LocalChargeDetail] Add Local Charge Detail';
export const UPDATE_LOCAL_CHARGE_DETAIL = '[LocalChargeDetail] Update Local Charge Detail';
export const DELETE_LOCAL_CHARGE_DETAIL = '[LocalChargeDetail] Delete Local Charge Detail';
export const FETCH_LOCAL_CHARGE_DETAILS = '[LocalChargeDetail] Fetch Local Charge Details';
export const SET_LOCAL_CHARGE_DETAILS = '[LocalChargeDetail] Set Local Charge Details';
export const STORE_LOCAL_CHARGE_DETAIL = '[LocalChargeDetail] Store Local Charge Detail';
export const STORE_LOCAL_CHARGE_DETAIL_SUCCESS = '[LocalChargeDetail] Store Local Charge Detail Success';

export class FetchLocalChargeDetails implements Action {
  readonly type = FETCH_LOCAL_CHARGE_DETAILS;

  constructor(public payload: any) {}
}

export class SetLocalChargeDetails implements Action {
  readonly type = SET_LOCAL_CHARGE_DETAILS;

  constructor(public payload: { localChargeDetails: LocalChargeDetail[], totalRows: number }) {}
}

export class AddLocalChargeDetail implements Action {
  readonly type = ADD_LOCAL_CHARGE_DETAIL;

  constructor(public payload: LocalChargeDetail) { }
}

export class UpdateLocalChargeDetail implements Action {
  readonly type = UPDATE_LOCAL_CHARGE_DETAIL;

  constructor(public payload: { index: number, newLocalChargeDetail: LocalChargeDetail }) { }
}

export class StoreLocalChargeDetail implements Action {
  readonly type = STORE_LOCAL_CHARGE_DETAIL;
  constructor(public payload: LocalChargeDetail) { }
}

export class StoreLocalChargeDetailSuccess implements Action {
  readonly type = STORE_LOCAL_CHARGE_DETAIL_SUCCESS;

  constructor(public payload: LocalChargeDetail) {}
}

export class DeleteLocalChargeDetail implements Action {
  readonly type = DELETE_LOCAL_CHARGE_DETAIL;

  constructor(public payload: { index: number, selectedLocalChargeDetail?: any }) {}
}

export type LocalChargeDetailActions =
  | FetchLocalChargeDetails
  | SetLocalChargeDetails
  | AddLocalChargeDetail
  | UpdateLocalChargeDetail
  | StoreLocalChargeDetail
  | StoreLocalChargeDetailSuccess
  | DeleteLocalChargeDetail;
