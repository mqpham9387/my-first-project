import { Port } from '../../port/port';
import { Country } from '../../country/country';
import { Fee } from '../../fee/fee.model';
export class LocalCharge {
    constructor(
        public _id?: string,
        public pricingID?: string,
        public creator?: string,
        public dateCreate?: string,
        public dateModify?: string,
        public portofLoading?: Port,
        public portofDischarge?: Port,
        public transitPort?: Port,
        public notes?: string,
        public service?: string,
        public validDateFrom?: string,
        public validDateTo?: string,
        public updatedBy?: string,
        public localChargeName?: Fee,
        public country?: Country
    ) {
        if (this._id == null) { this._id = null; }
        if (this.pricingID == null) { this.pricingID = null; }
        if (this.creator == null) { this.creator = null; }
        if (this.dateCreate == null) { this.dateCreate = null; }
        if (this.dateModify == null) { this.dateModify = null; }
        if (this.portofLoading == null) { this.portofLoading = null; }
        if (this.portofDischarge == null) { this.portofDischarge = null; }
        if (this.transitPort == null) { this.transitPort = null; }
        if (this.notes == null) { this.notes = null; }
        if (this.service == null) { this.service = null; }
        if (this.validDateFrom == null) { this.validDateFrom = null; }
        if (this.validDateTo == null) { this.validDateTo = null; }
        if (this.updatedBy == null) { this.updatedBy = null; }
        if (this.localChargeName == null) { this.localChargeName = null; }
        if (this.country == null) { this.country = null; }
    }
}