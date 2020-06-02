import { Action } from '@ngrx/store';

import { LocalCharge } from 'src/app/main/model/rate-charges/local-charges/local-charge.model';

export const ADD_LOCAL_CHARGE = '[LocalCharge] Add Local Charge';
export const UPDATE_LOCAL_CHARGE = '[LocalCharge] Update Local Charge';
export const DELETE_LOCAL_CHARGE = '[LocalCharge] Delete Local Charge';
export const FETCH_LOCAL_CHARGES = '[LocalCharge] Fetch Local Charges';
export const SET_LOCAL_CHARGES = '[LocalCharge] Set Local Charges';
export const STORE_LOCAL_CHARGE = '[LocalCharge] Store Local Charge';
export const STORE_LOCAL_CHARGE_SUCCESS = '[LocalCharge] Store Local Charge Success';

export class FetchLocalCharges implements Action {
  readonly type = FETCH_LOCAL_CHARGES;

  constructor(public payload: any) {}
}

export class SetLocalCharges implements Action {
  readonly type = SET_LOCAL_CHARGES;

  constructor(public payload: { localCharges: LocalCharge[], totalRows: number }) {}
}

export class AddLocalCharge implements Action {
  readonly type = ADD_LOCAL_CHARGE;

  constructor(public payload: LocalCharge) { }
}

export class UpdateLocalCharge implements Action {
  readonly type = UPDATE_LOCAL_CHARGE;

  constructor(public payload: { index: number, newLocalCharge: LocalCharge }) { }
}

export class StoreLocalCharge implements Action {
  readonly type = STORE_LOCAL_CHARGE;
  constructor(public payload: LocalCharge) { }
}

export class StoreLocalChargeSuccess implements Action {
  readonly type = STORE_LOCAL_CHARGE_SUCCESS;

  constructor(public payload: LocalCharge) {}
}

export class DeleteLocalCharge implements Action {
  readonly type = DELETE_LOCAL_CHARGE;

  constructor(public payload: { index: number, selectedLocalCharge?: any }) {}
}

export type LocalChargeActions =
  | FetchLocalCharges
  | SetLocalCharges
  | AddLocalCharge
  | UpdateLocalCharge
  | StoreLocalCharge
  | StoreLocalChargeSuccess
  | DeleteLocalCharge;
