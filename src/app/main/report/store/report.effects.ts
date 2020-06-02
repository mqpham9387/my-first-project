import { Injectable } from '@angular/core';
import { Actions, ofType, Effect } from '@ngrx/effects';
import { map, withLatestFrom, switchMap } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import * as ReportActions from './report.actions';

import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';
import * as fromMain from 'src/app/main/store/main.reducer';
import { Report } from '../report.model';
import { HEADER_POST, HEADER_PUT, HEADER_DELETE } from 'src/app/main/shared/app-settings';

@Injectable()
export class ReportEffects {
  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private store: Store <fromMain.MainState>
  ) {}

  @Effect()
  fetchReports = this.actions$.pipe(
    ofType(ReportActions.FETCH_REPORTS),
    switchMap((action) => {
      console.log(action);
      const paramsJson = {
        startRow: (action as any).payload.startRow,
        endRow: (action as any).payload.endRow,
        sortModel: (action as any).payload.sortModel,
        filterModel: (action as any).payload.filterModel
      };

      const httpOptions = { headers: HEADER_POST };

      return this.http.post < { totalRows: number, results: Report[] } > (
        '/report-service/report/get-list/', JSON.stringify(paramsJson), httpOptions
      );
    }),
    map(reports => {
      return { reports: reports.results, totalRows: reports.totalRows };
    }),
    map(reports => {
      console.log(reports);
      return new ReportActions.SetReports(reports);
    })
  );

  @Effect()
  storeReport = this.actions$.pipe(
    ofType < ReportActions.StoreReport > (ReportActions.STORE_REPORT),
    switchMap(
      (actionData) => {
        const aReport = actionData.payload;
        const newRep = this.transformData(aReport);
        const { _id, ...newReport } = newRep;
        const httpOptions = { headers: HEADER_POST };

        return this.http.post < Report > (
          '/report-service/report/',
          JSON.stringify(newReport),
          httpOptions
        );
      }
    ),
    map((report: any) => {
      const reportSuccess = { ...report };

      return new ReportActions.StoreReportSuccess(reportSuccess);
    })
  );

  // save edited data
  @Effect({ dispatch: false })
  updateReport = this.actions$.pipe(
    ofType < ReportActions.UpdateReport > (ReportActions.UPDATE_REPORT),
    withLatestFrom(this.store.select('reports')),
    switchMap(([actionData, reportState]) => {
      const report = actionData.payload.newReport;
      const updatedReport = this.transformData(report);
      const httpOptions = { headers: HEADER_PUT };

      return this.http.put(
        '/report-service/report/',
        JSON.stringify(updatedReport),
        httpOptions
      );
    })
  );

  @Effect({ dispatch: false })
  deleteReport = this.actions$.pipe(
    ofType < ReportActions.DeleteReport > (ReportActions.DELETE_REPORT),
    withLatestFrom(this.store.select('reports')),
    switchMap(([actionData, reportState]) => {
      const deletedReport = actionData.payload.selectedReport;
      const id = deletedReport._id;
      const bodyJson = JSON.stringify({ id });
      const options = { headers: HEADER_DELETE, body: bodyJson };

      return this.http.delete('/report-service/report/', options);
    })
  );

  private transformData(data: any) {
    const cloneData = {...data };

    return cloneData;
  }
}
