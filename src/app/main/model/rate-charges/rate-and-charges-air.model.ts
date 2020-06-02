import { Partner } from '../partner/partner';
import { Currency } from '../currency/currency';
import { Port } from '../port/port';

export class RateAndChargesAir {
    constructor(
        public _id ?: string,
        public pricingID ?: string,
        public creator ?: string,
        public dateCreate ?: string,
        public dateModify ?: string,
        public origin ?: Port,
        public destination ?: Port,
        public carrierID ?: Partner,
        public min ?: number,
        public level1 ?: number,
        public level2 ?: number,
        public level3 ?: number,
        public level4 ?: number,
        public level5 ?: number,
        public level6 ?: number,
        public fsc ?: number,
        public ssc ?: number,
        public awbSET ?: number,
        public amsHBL ?: number,
        public amsMBL ?: number,
        public xrayKG ?: number,
        public tcsKG ?: number,
        public gwc ?: boolean,
        public currency ?: Currency,
        public otherCharges ?: string,
        public transitTime ?: string,
        public frequency ?: string,
        public cutOff ?: string,
        public routing ?: string,
        public validDateFrom ?: string,
        public validDateTo ?: string,
        public notes ?: string,
        public updatedBy ?: string,
        public status ?: string,
        public isPublic ?: boolean,
        public lockedRCD ?: boolean
    ) {
        if (this._id == null) { this._id = null; }
        if (this.pricingID == null) { this.pricingID = ''; }
        if (this.creator == null) { this.creator = null; }
        if (this.dateCreate == null) { this.dateCreate = ''; }
        if (this.dateModify == null) { this.dateModify = ''; }
        if (this.origin == null) { this.origin = null; }
        if (this.destination == null) { this.destination = null; }
        if (this.carrierID == null) { this.carrierID = null; }
        if (this.min == null) { this.min = 0; }
        if (this.level1 == null) { this.level1 = 0; }
        if (this.level2 == null) { this.level2 = 0; }
        if (this.level3 == null) { this.level3 = 0; }
        if (this.level4 == null) { this.level4 = 0; }
        if (this.level5 == null) { this.level5 = 0; }
        if (this.level6 == null) { this.level6 = 0; }
        if (this.fsc == null) { this.fsc = 0; }
        if (this.ssc == null) { this.ssc = 0; }
        if (this.awbSET == null) { this.awbSET = 0; }
        if (this.amsHBL == null) { this.amsHBL = 0; }
        if (this.amsMBL == null) { this.amsMBL = 0; }
        if (this.xrayKG == null) { this.xrayKG = 0; }
        if (this.tcsKG == null) { this.tcsKG = 0; }
        if (this.gwc == null) { this.gwc = false; }
        if (this.currency == null) { this.currency = null; }
        if (this.otherCharges == null) { this.otherCharges = ''; }
        if (this.transitTime == null) { this.transitTime = ''; }
        if (this.frequency == null) { this.frequency = ''; }
        if (this.cutOff == null) { this.cutOff = ''; }
        if (this.routing == null) { this.routing = ''; }
        if (this.validDateFrom == null) { this.validDateFrom = ''; }
        if (this.validDateTo == null) { this.validDateTo = ''; }
        if (this.notes == null) { this.notes = null; }
        if (this.updatedBy == null) { this.updatedBy = ''; }
        if (this.status == null) { this.status = ''; }
        if (this.isPublic == null) { this.isPublic = false; }
        if (this.lockedRCD == null) { this.lockedRCD = false; }
    }
}
