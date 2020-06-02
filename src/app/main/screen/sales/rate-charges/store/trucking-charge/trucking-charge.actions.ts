import { Action } from '@ngrx/store';

import { TruckingCharge } from 'src/app/main/model/rate-charges/trucking-charge/trucking-charge.model';

export const ADD_TRUCKING_CHARGE = '[TruckingCharge] Add Trucking Charge';
export const UPDATE_TRUCKING_CHARGE = '[TruckingCharge] Update Trucking Charge';
export const DELETE_TRUCKING_CHARGE = '[TruckingCharge] Delete Trucking Charge';
export const FETCH_TRUCKING_CHARGES = '[TruckingCharge] Fetch Trucking Charges';
export const SET_TRUCKING_CHARGES = '[TruckingCharge] Set Trucking Charges';
export const STORE_TRUCKING_CHARGE = '[TruckingCharge] Store Trucking Charge';
export const STORE_TRUCKING_CHARGE_SUCCESS = '[TruckingCharge] Store Trucking Charge Success';

export class FetchTruckingCharges implements Action {
  readonly type = FETCH_TRUCKING_CHARGES;

  constructor(public payload: any) {}
}

export class SetTruckingCharges implements Action {
  readonly type = SET_TRUCKING_CHARGES;

  constructor(public payload: { truckingCharges: TruckingCharge[], totalRows: number }) {}
}

export class AddTruckingCharge implements Action {
  readonly type = ADD_TRUCKING_CHARGE;

  constructor(public payload: TruckingCharge) { }
}

export class UpdateTruckingCharge implements Action {
  readonly type = UPDATE_TRUCKING_CHARGE;

  constructor(public payload: { index: number, newTruckingCharge: TruckingCharge }) { }
}

export class StoreTruckingCharge implements Action {
  readonly type = STORE_TRUCKING_CHARGE;
  constructor(public payload: TruckingCharge) { }
}

export class StoreTruckingChargeSuccess implements Action {
  readonly type = STORE_TRUCKING_CHARGE_SUCCESS;

  constructor(public payload: TruckingCharge) {}
}

export class DeleteTruckingCharge implements Action {
  readonly type = DELETE_TRUCKING_CHARGE;

  constructor(public payload: { index: number, selectedTruck?: any }) {}
}

export type TruckingChargeActions =
  | FetchTruckingCharges
  | SetTruckingCharges
  | AddTruckingCharge
  | UpdateTruckingCharge
  | StoreTruckingCharge
  | StoreTruckingChargeSuccess
  | DeleteTruckingCharge;
