import { Currency } from '../../currency/currency';
import { Fee } from '../../fee/fee.model';

export class LocalChargeDetail {
    constructor(
        public _id?: string,
        public pricingID?: string,
        public fee?: Fee,
        public amount?: string,
        public chargePer?: string,
        public minCharge?: string,
        public notes?: string,
        public currency?: Currency,
        public rowStatus?: string
    ) {
        if (this._id == null) { this._id = null; }
        if (this.pricingID == null) { this.pricingID = null; }
        if (this.fee == null) { this.fee = null; }
        if (this.amount == null) { this.amount = null; }
        if (this.chargePer == null) { this.chargePer = null; }
        if (this.minCharge == null) { this.minCharge = null; }
        if (this.notes == null) { this.notes = null; }
        if (this.currency == null) { this.currency = null; }
        if (this.rowStatus == null) { this.rowStatus = 'ADD'; }
    }
}