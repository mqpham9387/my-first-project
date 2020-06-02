import { Action } from '@ngrx/store';

import { RateAndChargesCustomsCleanrance } from 'src/app/main/model/rate-charges/customs-cleanrance/customs-cleanrance.model';

export const FETCH_IMPORT_CLEANRANCES = '[Customs Cleanrance] Fetch Import Cleanrances';
export const FETCH_EXPORT_CLEANRANCES = '[Customs Cleanrance] Fetch Export Cleanrances';
export const FETCH_AUX_CLEANRANCES    = '[Customs Cleanrance] Fetch Aux Cleanrances';

export const SET_IMPORT_CLEANRANCES = '[Customs Cleanrance] Set Import Cleanrances';
export const SET_EXPORT_CLEANRANCES = '[Customs Cleanrance] Set Export Cleanrances';
export const SET_AUX_CLEANRANCES    = '[Customs Cleanrance] Set Aux Cleanrances';

export const UPDATE_CLEANRANCE = '[Customs Cleanrance] Update Customs Cleanrance';
export const DELETE_CLEANRANCE = '[Customs Cleanrance] Delete Customs Cleanrance';
export const STORE_CLEANRANCE = '[Customs Cleanrance] Store Cleanrance';
export const STORE_CLEANRANCE_SUCCESS = '[Customs Cleanrance] Store Cleanrance Success';
export class FetchImportCleanrances implements Action {
  readonly type = FETCH_IMPORT_CLEANRANCES;
  constructor(public payload: any) {}
}

export class FetchExportCleanrances implements Action {
  readonly type = FETCH_EXPORT_CLEANRANCES;
  constructor(public payload: any) {}
}

export class FetchAuxCleanrances implements Action {
  readonly type = FETCH_AUX_CLEANRANCES;
  constructor(public payload: any) {}
}

export class SetImportCleanrances implements Action {
  readonly type = SET_IMPORT_CLEANRANCES;
  constructor(public payload: { importClearances: RateAndChargesCustomsCleanrance[], totalIcRows: number }) {}
}
export class SetExportCleanrances implements Action {
  readonly type = SET_EXPORT_CLEANRANCES;
  constructor(public payload: { exportClearances: RateAndChargesCustomsCleanrance[], totalEcRows: number }) {}
}
export class SetAuxCleanrances implements Action {
  readonly type = SET_AUX_CLEANRANCES;
  constructor(public payload: { auxiliaries: RateAndChargesCustomsCleanrance[], totalAuxRows: number }) {}
}

export class UpdateCustomsCleanrance implements Action {
  readonly type = UPDATE_CLEANRANCE;
  constructor(public payload: { index: number, newCustomsCleanrance: RateAndChargesCustomsCleanrance }) { }
}

export class StoreCustomsCleanrance implements Action {
  readonly type = STORE_CLEANRANCE;
  constructor(public payload: RateAndChargesCustomsCleanrance) { }
}

export class StoreCustomsCleanranceSuccess implements Action {
  readonly type = STORE_CLEANRANCE_SUCCESS;
  constructor(public payload: RateAndChargesCustomsCleanrance) { }
}

export class DeleteCustomsCleanrance implements Action {
  readonly type = DELETE_CLEANRANCE;
  constructor(public payload: { index: number, selectedCleanrance?: RateAndChargesCustomsCleanrance }) {}
}

export type CustomsCleanranceActions =
  | FetchImportCleanrances | SetImportCleanrances
  | FetchExportCleanrances | SetExportCleanrances
  | FetchAuxCleanrances | SetAuxCleanrances
  | UpdateCustomsCleanrance
  | StoreCustomsCleanrance
  | StoreCustomsCleanranceSuccess
  | DeleteCustomsCleanrance;
