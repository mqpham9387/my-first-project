import { Port } from '../port/port';
import { Currency } from '../currency/currency';

export class QuotationTruckNonCont {
    constructor(
        public _id?: string,
        public quotationNo?: string,
        public pickup?: Port,
        public delivery?: Port,
        public truck20?: string,
        public truck40?: string,
        public truck500kgs?: string,
        public truckTonLevel1?: string,
        public truckTonLevel2?: string,
        public truckTonLevel3?: string,
        public truckTonLevel4?: string,
        public truckTonLevel5?: string,
        public truckTonLevel6?: string,
        public truckTonLevel7?: string,
        public truckTonLevel8?: string,
        public truckTonLevel9?: string,
        public truckTonLevel10?: string,
        public truckTonLevel11?: string,
        public truckTonLevel12?: string,
        public truckTonLevel13?: string,
        public truckTonLevel14?: string,
        public truckTonLevel15?: string,
        public truckTonLevel16?: string,
        public isOriginCharges?: string,
        public currency?: Currency,
        public notes?: string,
        public linkOtherQuotation?: string
    ) {
        if (this._id === null) { this._id = null; }
        if (this.quotationNo === null) { this.quotationNo = null; }
        if (this.pickup === null) { this.pickup = null; }
        if (this.delivery === null) { this.delivery = null; }
        if (this.truck20 === null) { this.truck20 = null; }
        if (this.truck40 === null) { this.truck40 = null; }
        if (this.truck500kgs === null) { this.truck500kgs = null; }
        if (this.truckTonLevel1 === null) { this.truckTonLevel1 = null; }
        if (this.truckTonLevel2 === null) { this.truckTonLevel2 = null; }
        if (this.truckTonLevel3 === null) { this.truckTonLevel3 = null; }
        if (this.truckTonLevel4 === null) { this.truckTonLevel4 = null; }
        if (this.truckTonLevel5 === null) { this.truckTonLevel5 = null; }
        if (this.truckTonLevel6 === null) { this.truckTonLevel6 = null; }
        if (this.truckTonLevel7 === null) { this.truckTonLevel7 = null; }
        if (this.truckTonLevel8 === null) { this.truckTonLevel8 = null; }
        if (this.truckTonLevel9 === null) { this.truckTonLevel9 = null; }
        if (this.truckTonLevel10 === null) { this.truckTonLevel10 = null; }
        if (this.truckTonLevel11 === null) { this.truckTonLevel11 = null; }
        if (this.truckTonLevel12 === null) { this.truckTonLevel12 = null; }
        if (this.truckTonLevel13 === null) { this.truckTonLevel13 = null; }
        if (this.truckTonLevel14 === null) { this.truckTonLevel14 = null; }
        if (this.truckTonLevel15 === null) { this.truckTonLevel15 = null; }
        if (this.truckTonLevel16 === null) { this.truckTonLevel16 = null; }
        if (this.isOriginCharges === null) { this.isOriginCharges = null; }
        if (this.currency === null) { this.currency = null; }
        if (this.notes === null) { this.notes = null; }
        if (this.linkOtherQuotation === null) { this.linkOtherQuotation = null; }
    }
}
