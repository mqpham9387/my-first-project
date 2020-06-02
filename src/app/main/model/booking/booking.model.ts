import { Contact } from '../contact/contact';
import { Partner } from '../partner/partner';
import { Port } from '../port/port';
import { Commodity } from '../commodity/commodity';
import { Quotation } from '../quotation/quotation.model';
import { Currency } from '../currency/currency';
import { BookingType } from './booking-type.interface';

export interface BookingList {
    results: Booking[];
    totalRows: number;
}

export interface PalletizedPackage {
    index?: number;
    quantity?: number;
    dimension?: string;
    grossWeight?: string;
}

export interface ShipmentTypeWarnings {
    _id?: string;
    shipmentTypeWarningID?: string;
    shipmentTypeWarningName?: string;
    notification?: string;
    notes?: string;
    emailReceive?: string;
    warningAfter?: string;
}

export class Booking {
    constructor(
        public _id?: string,
        public bookingNo?: string,
        public client?: string,
        public creator?: Contact,
        public dateCreate?: string,
        public dateModify?: string,
        public termofService?: string,
        public commodity?: Commodity,
        public commodityType?: ShipmentTypeWarnings,
        public hsCode?: Commodity,
        public sentTo?: Contact,
        public quotationNo?: Quotation,
        public remarks?: string,
        public portofLoading?: Port,
        public portofDischarge?: Port,
        public carrierID?: Partner,     // partnerID - group : CARRIER
        public etd?: string,
        public eta?: string,
        public closingTime?: string,
        public closingDate?: string,
        public feederVesselVoyage?: string,
        public mVesselVoyage?: string,
        public cyDate?: string,
        public cyATorCTC?: string,
        public returnDate?: string,
        public retATorCTC?: string,
        public pickupAddress?: string,
        public deliveryAddress?: string,
        public purposeOfImport?: string,
        public purposeOfExport?: string,
        public doorToDoor?: boolean,
        public doorToPort?: boolean,
        public portToDoor?: boolean,
        public portToPort?: boolean,
        public customsClearanceAtOrigin?: boolean,
        public customsClearanceAtDestination?: boolean,
        public stuffingPlace?: string,
        public volume?: string,
        public volumeUnit?: string,
        public grossWeight?: string,
        public grossWeightUnit?: string,
        public numberOfPackages?: string,
        public cargoIsUnstackable?: boolean,
        public palletizedPackage?: string,
        public nonPalletPackageQuantity?: string,
        public currency?: Currency,
        public status?: string,
        public bookingType?: BookingType,
    ) {
    }
}