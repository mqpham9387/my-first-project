import { Action, createAction } from '@ngrx/store';

import { Vessel } from '../../../../model/vessel/vessel.model';
import { PartnerView } from '../../../../model/partner/partner';

export const ADD_VESSEL = '[Vessel] Add Vessel';
export const ADD_VESSELS = '[Vessel] Add Vessels';
export const UPDATE_VESSEL = '[Vessel] Update Vessel';
export const STORE_VESSELS = '[Vessel] Store Vessel';
export const STORE_EDIT_VESSEL = '[Vessel] Store Edit Vessel';
export const FETCH_VESSELS = '[Vessel] Fetch Vessels';
export const SET_VESSELS = '[Vessel] Set Vessels';
export const STORE_VESSEL_SUCCESS = '[Vessel] Store Vessel Success';
export const DELETE_VESSEL = '[Vessel] Delete Vessel';

export const OPEN_DIALOG = '[Vessel] Open Dialog'
export const CLOSE_DIALOG = '[Vessel Close Dialog]';
export const reset = createAction('[Vessel Component] Reset');


export class FetchVessels implements Action {
  readonly type = FETCH_VESSELS;
}

export class AddVessel implements Action {
  readonly type = ADD_VESSEL;

  constructor(public payload: Vessel) { }
}

export class UpdateVessel implements Action {
  readonly type = UPDATE_VESSEL;

  constructor(public payload: Vessel) { }
}

export class AddVessels implements Action {
  readonly type = ADD_VESSELS;

  constructor(public payload: Vessel[]) { }
}

export class OpenDialog implements Action {
  readonly type = OPEN_DIALOG;

  constructor(public payload: PartnerView) { }
}

export class CloseDialog implements Action {
  readonly type = CLOSE_DIALOG;
}

export class StoreVessels implements Action {
  readonly type = STORE_VESSELS;
  constructor(public payload: Vessel) { }
}

export class SetVessels implements Action {
  readonly type = SET_VESSELS;

  constructor(public payload: Vessel[]) {}
}

export class StoreEditVessel implements Action {
  readonly type = STORE_EDIT_VESSEL;
  constructor(public payload: Vessel) { }
}

export class StoreVesselSuccess implements Action {
  readonly type = STORE_VESSEL_SUCCESS;

  constructor(public payload: Vessel) {}
}

export class DeleteVessel implements Action {
  readonly type = DELETE_VESSEL;

  constructor(public payload: number) {}
}

export type VesselActions =
  | SetVessels
  | FetchVessels
  | AddVessel
  | UpdateVessel
  | AddVessels
  | OpenDialog
  | CloseDialog
  | StoreVessels
  | StoreEditVessel
  | StoreVesselSuccess
  | DeleteVessel;
