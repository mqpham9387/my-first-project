import { Report } from '../report.model';
import * as ReportActions from './report.actions';

export interface State {
  reports: Report[];
  editedReport: Report;
  editedReportIndex: number;
  totalReportRows?: number;
}

const initialState: State = {
  reports: [],
  editedReport: null,
  editedReportIndex: -1,
  totalReportRows: -1
};

export function reportReducer(
  state: State = initialState,
  action: ReportActions.ReportActions
) {
  switch (action.type) {
    case ReportActions.FETCH_REPORTS:
      return {
        ...state,
        reports: [],
        params: action.payload
      };
    case ReportActions.SET_REPORTS:
      return {
        ...state,
        reports: [...action.payload.reports],
        totalReportRows: action.payload.totalRows
      };
    case ReportActions.ADD_REPORT:
      return {
        ...state,
        reports: [...state.reports, action.payload]
      };
    case ReportActions.UPDATE_REPORT:
        const updatedReport = {
            ...state.reports[action.payload.index],
            ...action.payload.newReport
          };
        const updatedReports = [...state.reports];
        updatedReports[action.payload.index] = updatedReport;
        return {
            ...state,
            reports: updatedReports
            };
    case ReportActions.ADD_REPORTS:
      return {
        ...state,
        reports: [...state.reports, ...action.payload]
      };
    case ReportActions.STORE_REPORT_SUCCESS:
      return {
        ...state,
        reports: [...state.reports, action.payload],
        totalReportRows: +state.totalReportRows + 1
      };
    case ReportActions.DELETE_REPORT:
      const indexRep = action.payload.index;
      return {
        ...state,
        reports: state.reports.filter((report, index) => {
          return index !== indexRep;
        }),
        totalReportRows: state.totalReportRows > 0 ? +state.totalReportRows - 1 : 0
      };
    default:
      return { ...state };
  }
}
