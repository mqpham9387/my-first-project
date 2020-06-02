import { Partner } from '../partner/partner';
import { Port } from '../port/port';
import { Currency } from '../currency/currency';

export class RateAndChargesSea {
    constructor(
        public _id ?: string,
        public pricingID ?: string,
        public creator ?: string,
        public dateCreate ?: string,
        public dateModify ?: string,
        public portofLoading ?: Port,
        public portofDischarge ?: Port,
        public transitPort ?: Port,
        public carrierID ?: Partner,
        public importMode ?: boolean,
        public freightChargeLCL ?: number,
        public minimumChargeLCL ?: number,
        public container20 ?: number,
        public container40 ?: number,
        public container45 ?: number,
        public containerHC ?: number,
        public others ?: number,
        public subCharge1 ?: string,
        public subCharge2 ?: string,
        public subCharge3 ?: string,
        public containerType ?: string,
        public currency ?: Currency,
        public includeAddon ?: boolean,
        public emptyReturn ?: string,
        public transitTime ?: string,
        public frequency ?: string,
        public cutOff ?: string,
        public notes ?: string,
        public validDateFrom ?: string,
        public validDateTo ?: string,
        public remarks ?: string,
        public isLCL ?: boolean,
        public isPublic ?: boolean,
        public customsClearanceAtDestination ?: boolean,
        public customsClearanceAtOrigin ?: boolean
    ) {
        if (this._id == null) { this._id = null; }
        if (this.pricingID == null) { this.pricingID = null; }
        if (this.creator == null) { this.creator = null; }
        if (this.dateCreate == null) { this.dateCreate = null; }
        if (this.dateModify == null) { this.dateModify = null; }
        if (this.portofLoading == null) { this.portofLoading = null; }
        if (this.portofDischarge == null) { this.portofDischarge = null; }
        if (this.transitPort == null) { this.transitPort = null; }
        if (this.carrierID == null) { this.carrierID = null; }
        if (this.importMode == null) { this.importMode = false; }
        if (this.freightChargeLCL == null) { this.freightChargeLCL = null; }
        if (this.minimumChargeLCL == null) { this.minimumChargeLCL = null; }
        if (this.container20 == null) { this.container20 = null; }
        if (this.container40 == null) { this.container40 = null; }
        if (this.container45 == null) { this.container45 = null; }
        if (this.containerHC == null) { this.containerHC = null; }
        if (this.others == null) { this.others = null; }
        if (this.subCharge1 == null) { this.subCharge1 = null; }
        if (this.subCharge2 == null) { this.subCharge2 = null; }
        if (this.subCharge3 == null) { this.subCharge3 = null; }
        if (this.containerType == null) { this.containerType = null; }
        if (this.currency == null) { this.currency = null; }
        if (this.includeAddon == null) { this.includeAddon = null; }
        if (this.emptyReturn == null) { this.emptyReturn = null; }
        if (this.transitTime == null) { this.transitTime = null; }
        if (this.frequency == null) { this.frequency = null; }
        if (this.cutOff == null) { this.cutOff = null; }
        if (this.notes == null) { this.notes = null; }
        if (this.validDateFrom == null) { this.validDateFrom = null; }
        if (this.validDateTo == null) { this.validDateTo = null; }
        if (this.remarks == null) { this.remarks = null; }
        if (this.isLCL == null) { this.isLCL = false; }
        if (this.isPublic == null) { this.isPublic = false; }
        if (this.customsClearanceAtDestination == null) { this.customsClearanceAtDestination = false; }
        if (this.customsClearanceAtOrigin == null) { this.customsClearanceAtOrigin = false; }
    }
}