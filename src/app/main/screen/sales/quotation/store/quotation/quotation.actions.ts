import { Action } from '@ngrx/store';

import { Quotation } from 'src/app/main/model/quotation/quotation.model';

export const ADD_QUOTATION = '[Quotation] Add Quotation';
export const UPDATE_QUOTATION = '[Quotation] Update Quotation';
export const DELETE_QUOTATION = '[Quotation] Delete Quotation';
export const FETCH_SENT_QUOTATIONS = '[Quotation] Fetch Sent Quotations';
export const FETCH_RECEIVED_QUOTATIONS =
  '[Quotation] Fetch Received Quotations';
export const SET_SENT_QUOTATIONS = '[Quotation] Set Sent Quotations';
export const SET_RECEIVED_QUOTATIONS = '[Quotation] Set Received Quotations';
export const STORE_QUOTATION = '[Quotation] Store Quotation';
export const STORE_QUOTATION_SUCCESS = '[Quotation] Store Quotation Success';

export const STORE_CUSTOM_CLEARANCE_QUOTATION =
  '[Quotation] Store Custom Clearance Quotation';
export const STORE_CUSTOM_CLEARANCE__QUOTATION_SUCCESS =
  '[Quotation] Store Custom Clearance Quotation Success';
export const DELETE_CUSTOM_CLEARANCE = '[Quotation] Delete Custom Clearance';
export const UPDATE_CUSTOM_CLEARANCE = '[Quotation] Update Custom Clearance';

export const STORE_OTHER_CHARGE_DETAIL =
  '[Quotation] Store Other Charge Detail';
export const UPDATE_OTHER_CHARGE_DETAIL =
  '[Quotation] Update Other Charge Detail';
export const DELETE_OTHER_CHARGE_DETAIL =
  '[Quotation] Delete Other Charge Detail';

export const STORE_TRUCKING_NON_CONTAINER =
  '[Quotation] Store Trucking Non Container';
export const UPDATE_TRUCKING_NON_CONTAINER =
  '[Quotation] Update Trucking Non Container';
export const DELETE_TRUCKING_NON_CONTAINER =
  '[Quotation] Delete Trucking Non Container';

export const STORE_TRUCKING_CONTAINER = '[Quotation] Store Trucking Container';
export const UPDATE_TRUCKING_CONTAINER =
  '[Quotation] Update Trucking Container';
export const DELETE_TRUCKING_CONTAINER =
  '[Quotation] Delete Trucking Container';

export const GET_EDIT_QUOTATION = '[Quotation] Get Edit Quotation';
export const SET_EDIT_QUOTATION = '[Quotation] Set Edit Quotation';

export class FetchSentQuotations implements Action {
  readonly type = FETCH_SENT_QUOTATIONS;
  constructor(public payload: any) {}
}
export class FetchReceivedQuotations implements Action {
  readonly type = FETCH_RECEIVED_QUOTATIONS;
  constructor(public payload: any) {}
}

export class SetSentQuotations implements Action {
  readonly type = SET_SENT_QUOTATIONS;
  constructor(
    public payload: { sentQuotations: Quotation[]; totalSentQuotRows: number }
  ) {}
}

export class SetReceivedQuotations implements Action {
  readonly type = SET_RECEIVED_QUOTATIONS;
  constructor(
    public payload: {
      receivedQuotations: Quotation[];
      totalReceivedQuotRows: number;
    }
  ) {}
}

export class AddQuotation implements Action {
  readonly type = ADD_QUOTATION;
  constructor(public payload: Quotation) {}
}

export class UpdateQuotation implements Action {
  readonly type = UPDATE_QUOTATION;
  constructor(public payload: { index: number; updatedQuotation: any }) {}
}

export class StoreQuotation implements Action {
  readonly type = STORE_QUOTATION;
  constructor(public payload: Quotation) {}
}

export class StoreQuotationSuccess implements Action {
  readonly type = STORE_QUOTATION_SUCCESS;
  constructor(public payload: Quotation) {}
}

export class StoreCustomClearanceQuotation implements Action {
  readonly type = STORE_CUSTOM_CLEARANCE_QUOTATION;
  constructor(public payload: any) {}
}

export class StoreCustomClearanceQuotationSuccess implements Action {
  readonly type = STORE_CUSTOM_CLEARANCE__QUOTATION_SUCCESS;
  constructor(public payload: any) {}
}

export class UpdateCustomClearance implements Action {
  readonly type = UPDATE_CUSTOM_CLEARANCE;
  constructor(public payload: any) {}
}

export class DeleteQuotation implements Action {
  readonly type = DELETE_QUOTATION;
  constructor(public payload: { index: number; selectedQuotaion?: any }) {}
}
export class GetEditQuotation implements Action {
  readonly type = GET_EDIT_QUOTATION;
  constructor(public payload: any) {}
}
export class SetEditQuotation implements Action {
  readonly type = SET_EDIT_QUOTATION;
  constructor(public payload: any) {}
}

export class StoreOtherChargeDetail implements Action {
  readonly type = STORE_OTHER_CHARGE_DETAIL;
  constructor(public payload: any) {}
}

export class UpdateOtherChargeDetail implements Action {
  readonly type = UPDATE_OTHER_CHARGE_DETAIL;
  constructor(public payload: any) {}
}
export class DeleteOtherChargeDetail implements Action {
  readonly type = DELETE_OTHER_CHARGE_DETAIL;
  constructor(public payload: string) {}
}

export class StoreTruckingNonContainer implements Action {
  readonly type = STORE_TRUCKING_NON_CONTAINER;
  constructor(public payload: any) {}
}

export class UpdateTruckingNonContainer implements Action {
  readonly type = UPDATE_TRUCKING_NON_CONTAINER;
  constructor(public payload: any) {}
}

export class DeleteTruckingNonContainer implements Action {
  readonly type = DELETE_TRUCKING_NON_CONTAINER;
  constructor(public payload: string) {}
}

export class StoreTruckingContainer implements Action {
  readonly type = STORE_TRUCKING_CONTAINER;
  constructor(public payload: any) {}
}

export class UpdateTruckingContainer implements Action {
  readonly type = UPDATE_TRUCKING_CONTAINER;
  constructor(public payload: any) {}
}

export class DeleteTruckingContainer implements Action {
  readonly type = DELETE_TRUCKING_CONTAINER;
  constructor(public payload: string) {}
}
export class DeleteCustomClearance implements Action {
  readonly type = DELETE_CUSTOM_CLEARANCE;
  constructor(public payload: string) {}
}

export type QuotationActions =
  | FetchSentQuotations
  | FetchReceivedQuotations
  | SetSentQuotations
  | SetReceivedQuotations
  | AddQuotation
  | GetEditQuotation
  | SetEditQuotation
  | UpdateQuotation
  | StoreQuotation
  | StoreQuotationSuccess
  | StoreCustomClearanceQuotation
  | StoreCustomClearanceQuotationSuccess
  | DeleteCustomClearance
  | DeleteQuotation
  | UpdateOtherChargeDetail
  | StoreOtherChargeDetail
  | DeleteOtherChargeDetail
  | StoreTruckingNonContainer
  | UpdateTruckingNonContainer
  | DeleteTruckingNonContainer
  | StoreTruckingContainer
  | UpdateTruckingContainer
  | DeleteTruckingContainer;
