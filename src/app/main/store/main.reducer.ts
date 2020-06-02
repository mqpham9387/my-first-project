import { ActionReducerMap } from '@ngrx/store';

import * as fromInquiry from '../screen/sales/inquiry/store/inquiry.reducer';
import * as fromReceivedInquiry from 'src/app/main/screen/sales/inquiry/store/received-inquiry/received-inquiry.reducer';
import * as fromQuotation from '../screen/sales/quotation/store/quotation/quotation.reducer';
import * as fromVessel from '../screen/sales/vessel/store/vessel.reducer';
import * as fromAirFreights from 'src/app/main/screen/sales/rate-charges/store/air-freight/air-freight.reducer';
import * as fromSeaFreights from 'src/app/main/screen/sales/rate-charges/store/sea-freight/sea-freight.reducer';
import * as fromTruckingCharges from 'src/app/main/screen/sales/rate-charges/store/trucking-charge/trucking-charge.reducer';
import * as fromLocalCharges from 'src/app/main/screen/sales/rate-charges/store/local-charge/local-charge.reducer';
import * as fromLocalChargeDetails from 'src/app/main/screen/sales/rate-charges/store/local-charge-detail/local-charge-detail.reducer';
import * as fromCustomsCleanrances from 'src/app/main/screen/sales/rate-charges/store/customs-clearance/customs-clearance.reducer';
import * as fromReports from 'src/app/main/report/store/report.reducer';

export interface MainState {
  inquiries: fromInquiry.State;
  receivedInquiries: fromReceivedInquiry.State;
  quotations: fromQuotation.State;
  vessels: fromVessel.State;
  airfreights: fromAirFreights.State;
  seafreights: fromSeaFreights.State;
  truckingCharges: fromTruckingCharges.State;
  localCharges: fromLocalCharges.State;
  localChargeDetails: fromLocalChargeDetails.State;
  cCleanrances: fromCustomsCleanrances.State
  reports: fromReports.State;
}

export const mainReducer: ActionReducerMap<MainState> = {
  inquiries: fromInquiry.inquiryReducer,
  receivedInquiries: fromReceivedInquiry.receivedInquiryReducer,
  quotations: fromQuotation.quotationReducer,
  vessels: fromVessel.vesselReducer,
  airfreights: fromAirFreights.airFreightReducer,
  seafreights: fromSeaFreights.seaFreightReducer,
  truckingCharges: fromTruckingCharges.truckingChargeReducer,
  localCharges: fromLocalCharges.localChargeReducer,
  localChargeDetails: fromLocalChargeDetails.localChargeDetailReducer,
  cCleanrances: fromCustomsCleanrances.customCleanranceReducer,
  reports: fromReports.reportReducer
};
