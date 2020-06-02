import { Unit } from '../../unit/unit.model';
import { Company } from '../../company/company';
import { Fee } from '../../fee/fee.model';
import { Partner } from '../../partner/partner';
import { Services } from '../../service/services.model';

export class RateAndChargesCustomsCleanrance {
    constructor(
        public _id?: string,
        public pricingID?: string,
        public creator?: string,
        public dateCreate?: string,
        public dateModify?: string,
        public terminal?: string,
        public purposeOfImEx?: string,
        public channel?: string,
        public min?: number,
        public container20?: number,
        public container40?: number,
        public lcl?: number,
        public air?: number,
        public currency?: string,
        public excludedCommodity?: string,
        public notes?: string,
        public service?: Services,
        public fee?: Fee,
        public unit?: string,
        public companyID?: Company,
        public validDateFrom?: string,
        public validDateTo?: string,
        public updatedBy?: string,
        public type?: string,
        public carrier?: Partner
    ) {
        if (this._id == null) { this._id = null; }
        if (this.pricingID == null) { this.pricingID = null; }
        if (this.creator == null) { this.creator = null; }
        if (this.dateCreate == null) { this.dateCreate = null; }
        if (this.dateModify == null) { this.dateModify = null; }
        if (this.terminal == null) { this.terminal = null; }
        if (this.purposeOfImEx == null) { this.purposeOfImEx = null; }
        if (this.channel == null) { this.channel = null; }
        if (this.min == null) { this.min = null; }
        if (this.container20 == null) { this.container20 = null; }
        if (this.container40 == null) { this.container40 = null; }
        if (this.lcl == null) { this.lcl = null; }
        if (this.air == null) { this.air = null; }
        if (this.currency == null) { this.currency = null; }
        if (this.excludedCommodity == null) { this.excludedCommodity = null; }
        if (this.notes == null) { this.notes = null; }
        if (this.service == null) { this.service = null; }
        if (this.fee == null) { this.fee = null; }
        if (this.unit == null) { this.unit = null; }
        if (this.companyID == null) { this.companyID = null; }
        if (this.validDateFrom == null) { this.validDateFrom = null; }
        if (this.validDateTo == null) { this.validDateTo = null; }
        if (this.updatedBy == null) { this.updatedBy = null; }
        if (this.type == null) { this.type = null; }
        if (this.carrier == null) { this.carrier = null; }
    }
}
