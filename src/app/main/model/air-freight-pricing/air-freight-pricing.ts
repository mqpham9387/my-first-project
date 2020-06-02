import { Partner } from "../partner/partner";
export class AirFreightPricing {
    
    constructor(
        public _id ?: string,
        public code?: string,
        public pricingID ?: string,
        public creator ?: string, // user input
        public dateCreate ?: string,
        public dateModify ?: string,
        public origin ?: string,
        public destination ?: string,
        public airlineID ?: Partner, // vendor from partner = partnerID
        public departmentID ?: string,
        public minQuantity ?: number,
        public min ?: number,
        public normal ?: number,
        public level3 ?: number,
        public level4 ?: number,
        public level5 ?: number,
        public level6 ?: number,
        public level7 ?: number,
        public fsc ?: number,
        public ssc ?: number,
        public gwc ?: boolean,
        public currency ?: string,
        public date ?: string,
        public validDate ?: string,
        public tt ?: string,
        public frequency ?: string,
        public cutOff ?: string,
        public notes ?: string,
        public isPublic ?: boolean,
        public commodity ?: string,
        public lockedRCD ?: boolean,
        public carrierID ?: Partner,  // from partner = partnerID
        public amsHBL ?: number,
        public amsMBL ?: number,
        public awbSET ?: number,
        public xrayKG ?: number,
        public tcsKG ?: number,
        public action?: string
    ) {
        if(this._id == null) this._id = null;
        if(this.code == null) this.code= null;
        if(this.pricingID == null) this.pricingID = null;
        if(this.creator == null) this.creator = null;
        if(this.dateCreate == null) this.dateCreate = null;
        if(this.dateModify == null) this.dateModify = null;
        if(this.origin == null) this.origin = null;
        if(this.destination == null) this.destination = null;
        if(this.airlineID == null) this.airlineID = null;
        if(this.departmentID == null) this.departmentID = null;
        if(this.minQuantity == null) this.minQuantity = null;
        if(this.min == null) this.min = null;
        if(this.normal == null) this.normal = null;
        if(this.level3 == null) this.level3 = null;
        if(this.level4 == null) this.level4 = null;
        if(this.level5 == null) this.level5 = null;
        if(this.level6 == null) this.level6 = null;
        if(this.level7 == null) this.level7 = null;
        if(this.fsc == null) this.fsc = null;
        if(this.ssc == null) this.ssc = null;
        if(this._id == null) this.gwc = null;
        if(this.gwc == null) this.currency = null;
        if(this.date == null) this.date = null;
        if(this.validDate == null) this.validDate = null;
        if(this.tt == null) this.tt = null;
        if(this.frequency == null) this.frequency = null;
        if(this.cutOff == null) this.cutOff = null;
        if(this.notes == null) this.notes = null;
        if(this.isPublic == null) this.isPublic = null;
        if(this.commodity == null) this.commodity = null;
        if(this.lockedRCD == null) this.lockedRCD = null;
        if(this.carrierID == null) this.carrierID = null;
        if(this.amsHBL == null) this.amsHBL = null;
        if(this.amsMBL == null) this.amsMBL = null;
        if(this.awbSET == null) this.awbSET = null;
        if(this.xrayKG == null) this.xrayKG = null;
        if(this.tcsKG == null) this.tcsKG = null;
        if(this.action == null) this.action = null;
    }
}