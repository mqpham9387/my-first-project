import { Action } from '@ngrx/store';

import { RateAndChargesSea } from 'src/app/main/model/rate-charges/rate-and-charges-sea.model';

export const ADD_SEA_FREIGHT = '[SeaFreight] Add Sea Freight';
export const ADD_SEA_FREIGHTS = '[SeaFreight] Add Sea Freights';
export const UPDATE_SEA_FREIGHT = '[SeaFreight] Update Sea Freight';
export const DELETE_SEA_FREIGHT = '[SeaFreight] Delete Sea Freight';
export const FETCH_SEA_FREIGHTS = '[SeaFreight] Fetch Sea Freights';
export const FETCH_OT_SEA_FREIGHTS = '[SeaFreight] Fetch Ot Sea Freights';
export const FETCH_GP_SEA_FREIGHTS = '[SeaFreight] Fetch Gp Sea Freights';
export const FETCH_RC_SEA_FREIGHTS = '[SeaFreight] Fetch Rc Sea Freights';
export const FETCH_FR_SEA_FREIGHTS = '[SeaFreight] Fetch Fr Sea Freights';
export const FETCH_ISO_SEA_FREIGHTS = '[SeaFreight] Fetch Iso Sea Freights';
export const SET_SEA_FREIGHTS = '[SeaFreight] Set Sea Freights';
export const SET_OT_SEA_FREIGHTS = '[SeaFreight] Set Ot Sea Freights';
export const SET_GP_SEA_FREIGHTS = '[SeaFreight] Set Gp Sea Freights';
export const SET_RC_SEA_FREIGHTS = '[SeaFreight] Set Rc Sea Freights';
export const SET_FR_SEA_FREIGHTS = '[SeaFreight] Set Fr Sea Freights';
export const SET_ISO_SEA_FREIGHTS = '[SeaFreight] Set Iso Sea Freights';
export const STORE_SEA_FREIGHT = '[SeaFreight] Store Sea Freight';
export const STORE_SEA_FREIGHT_SUCCESS = '[SeaFreight] Store Sea Freight Success';

export class FetchSeaFreights implements Action {
  readonly type = FETCH_SEA_FREIGHTS;

  constructor(public payload: any) {}
}
export class FetchOtSeaFreights implements Action {
  readonly type = FETCH_OT_SEA_FREIGHTS;

  constructor(public payload: any) {}
}

export class FetchGpSeaFreights implements Action {
  readonly type = FETCH_GP_SEA_FREIGHTS;

  constructor(public payload: any) {}
}

export class FetchRcSeaFreights implements Action {
  readonly type = FETCH_RC_SEA_FREIGHTS;

  constructor(public payload: any) {}
}
export class FetchFrSeaFreights implements Action {
  readonly type = FETCH_FR_SEA_FREIGHTS;

  constructor(public payload: any) {}
}
export class FetchIsoSeaFreights implements Action {
  readonly type = FETCH_ISO_SEA_FREIGHTS;

  constructor(public payload: any) {}
}

export class SetSeaFreights implements Action {
  readonly type = SET_SEA_FREIGHTS;

  constructor(public payload: { seaFreights: RateAndChargesSea[], totalRows: number }) {}
}

export class SetOtSeaFreights implements Action {
  readonly type = SET_OT_SEA_FREIGHTS;

  constructor(public payload: { otSeaFreights: RateAndChargesSea[], totalRows: number }) {}
}
export class SetGpSeaFreights implements Action {
  readonly type = SET_GP_SEA_FREIGHTS;

  constructor(public payload: { gpSeaFreights: RateAndChargesSea[], totalRows: number }) {}
}
export class SetRcSeaFreights implements Action {
  readonly type = SET_RC_SEA_FREIGHTS;

  constructor(public payload: { rcSeaFreights: RateAndChargesSea[], totalRows: number }) {}
}
export class SetFrSeaFreights implements Action {
  readonly type = SET_FR_SEA_FREIGHTS;

  constructor(public payload: { frSeaFreights: RateAndChargesSea[], totalRows: number }) {}
}
export class SetIsoSeaFreights implements Action {
  readonly type = SET_ISO_SEA_FREIGHTS;

  constructor(public payload: { isoSeaFreights: RateAndChargesSea[], totalRows: number }) {}
}

export class AddSeaFreight implements Action {
  readonly type = ADD_SEA_FREIGHT;

  constructor(public payload: RateAndChargesSea) { }
}

export class UpdateSeaFreight implements Action {
  readonly type = UPDATE_SEA_FREIGHT;

  constructor(public payload: { index: number, newSeaFreight: RateAndChargesSea }) { }
}

export class AddSeaFreights implements Action {
  readonly type = ADD_SEA_FREIGHTS;

  constructor(public payload: RateAndChargesSea[]) { }
}

export class StoreSeaFreight implements Action {
  readonly type = STORE_SEA_FREIGHT;
  constructor(public payload: RateAndChargesSea) { }
}

export class StoreSeaFreightSuccess implements Action {
  readonly type = STORE_SEA_FREIGHT_SUCCESS;

  constructor(public payload: RateAndChargesSea) {}
}

export class DeleteSeaFreight implements Action {
  readonly type = DELETE_SEA_FREIGHT;

  constructor(public payload: { index: number, selectedSea?: any }) {}
}

export type SeaFreightActions =
  | FetchSeaFreights   | SetSeaFreights
  | FetchOtSeaFreights | SetOtSeaFreights
  | FetchGpSeaFreights | SetGpSeaFreights
  | FetchRcSeaFreights | SetRcSeaFreights
  | FetchFrSeaFreights | SetFrSeaFreights
  | FetchIsoSeaFreights | SetIsoSeaFreights
  | AddSeaFreight
  | UpdateSeaFreight
  | StoreSeaFreight
  | StoreSeaFreightSuccess
  | AddSeaFreights
  | DeleteSeaFreight;
