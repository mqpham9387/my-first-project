import { Action } from '@ngrx/store';

import { Report } from '../report.model';

export const ADD_REPORT = '[Report] Add Report';
export const ADD_REPORTS = '[Report] Add Reports';
export const UPDATE_REPORT = '[Report] Update Report';
export const STORE_REPORT = '[Report] Store Report';
export const STORE_EDIT_REPORT = '[Report] Store Edit Report';
export const FETCH_REPORTS = '[Report] Fetch Reports';
export const SET_REPORTS = '[Report] Set Reports';
export const STORE_REPORT_SUCCESS = '[Report] Store Report Success';
export const DELETE_REPORT = '[Report] Delete Report';


export class FetchReports implements Action {
  readonly type = FETCH_REPORTS;
  constructor(public payload: any) {}
}

export class AddReport implements Action {
  readonly type = ADD_REPORT;

  constructor(public payload: Report) { }
}

export class UpdateReport implements Action {
  readonly type = UPDATE_REPORT;

  constructor(public payload: { index: number, newReport: Report }) { }
}

export class AddReports implements Action {
  readonly type = ADD_REPORTS;

  constructor(public payload: Report[]) { }
}

export class StoreReport implements Action {
  readonly type = STORE_REPORT;
  constructor(public payload: Report) { }
}

export class SetReports implements Action {
  readonly type = SET_REPORTS;

  constructor(public payload: { reports: Report[], totalRows: number }) {}
}

export class StoreEditReport implements Action {
  readonly type = STORE_EDIT_REPORT;
  constructor(public payload: Report) { }
}

export class StoreReportSuccess implements Action {
  readonly type = STORE_REPORT_SUCCESS;

  constructor(public payload: Report) {}
}

export class DeleteReport implements Action {
  readonly type = DELETE_REPORT;

  constructor(public payload: { index: number, selectedReport: any }) {}
}

export type ReportActions =
  | SetReports
  | FetchReports
  | AddReport
  | UpdateReport
  | AddReports
  | StoreReport
  | StoreEditReport
  | StoreReportSuccess
  | DeleteReport;
