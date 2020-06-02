import { Action } from '@ngrx/store';
import { RateAndChargesAir } from 'src/app/main/model/rate-charges/rate-and-charges-air.model';

export const ADD_AIR_FREIGHT = '[AirFreight] Add AirFreight';
export const ADD_AIR_FREIGHTS = '[AirFreight] Add AirFreights';
export const UPDATE_AIR_FREIGHT = '[AirFreight] Update AirFreight';
export const DELETE_AIR_FREIGHT = '[AirFreight] Delete AirFreight';
export const FETCH_AIR_FREIGHTS  = '[AirFreight] Fetch AirFreights';
export const SET_AIR_FREIGHTS = '[AirFreight] Set AirFreights';
export const STORE_AIR_FREIGHT = '[AirFreight] Store AirFreight';
export const STORE_AIR_FREIGHT_SUCCESS = '[AirFreight] Store Air Freight Success';

export class FetchAirFreights implements Action {
  readonly type = FETCH_AIR_FREIGHTS;

  constructor(public payload: any) {}
}

export class SetAirFreights implements Action {
  readonly type = SET_AIR_FREIGHTS;

  constructor(public payload: { airFreights: RateAndChargesAir[], totalRows: number }) {}
}

export class AddAirFreight implements Action {
  readonly type = ADD_AIR_FREIGHT;

  constructor(public payload: RateAndChargesAir) { }
}

export class UpdateAirFreight implements Action {
  readonly type = UPDATE_AIR_FREIGHT;

  constructor(public payload: { index: number, newAirFreight: RateAndChargesAir }) { }
}

export class StoreAirFreight implements Action {
  readonly type = STORE_AIR_FREIGHT;
  constructor(public payload: RateAndChargesAir) { }
}

export class AddAirFreights implements Action {
  readonly type = ADD_AIR_FREIGHTS;

  constructor(public payload: RateAndChargesAir[]) { }
}

export class StoreAirFreightSuccess implements Action {
  readonly type = STORE_AIR_FREIGHT_SUCCESS;

  constructor(public payload: RateAndChargesAir) {}
}

export class DeleteAirFreight implements Action {
  readonly type = DELETE_AIR_FREIGHT;

  constructor(public payload: { index: number, selectedAir?: any }) {}
}

export type AirFreightActions =
  | FetchAirFreights
  | SetAirFreights
  | AddAirFreight
  | UpdateAirFreight
  | AddAirFreights
  | StoreAirFreight
  | StoreAirFreightSuccess
  | DeleteAirFreight;
