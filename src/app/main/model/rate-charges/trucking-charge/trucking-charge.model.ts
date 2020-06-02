import { Currency } from '../../currency/currency';
import { City } from '../../city/city';
import { Area } from '../../area/area.model';

export class TruckingCharge {
    constructor(
        public _id?: string,
        public pricingID?: string,
        public creator?: string,
        public dateCreate?: string,
        public dateModify?: string,
        public pickupCity?: City,
        public pickupArea?: Area,
        public deliveryCity?: City,
        public deliveryArea?: Area,
        public truck20?: number,
        public truck40?: number,
        public truck500kgs?: number,
        public truckTonLevel1?: number,
        public truckTonLevel2?: number,
        public truckTonLevel3?: number,
        public truckTonLevel4?: number,
        public truckTonLevel5?: number,
        public truckTonLevel6?: number,
        public truckTonLevel7?: number,
        public truckTonLevel8?: number,
        public truckTonLevel9?: number,
        public truckTonLevel10?: number,
        public truckTonLevel11?: number,
        public truckTonLevel12?: number,
        public truckTonLevel13?: number,
        public truckTonLevel14?: number,
        public truckTonLevel15?: number,
        public truckTonLevel16?: number,
        public notes?: string,
        public freeDetentionTime?: string,
        public detentionCharge?: string,
        public validDateFrom?: string,
        public validDateTo?: string,
        public updatedBy?: string,
        public currency?: Currency
    ) {
        if (this._id == null) { this._id = null; }
        if (this.pricingID == null) { this.pricingID = null; }
        if (this.creator == null) { this.creator = null; }
        if (this.dateCreate == null) { this.dateCreate = null; }
        if (this.dateModify == null) { this.dateModify = null; }
        if (this.pickupCity == null) { this.pickupCity = null; }
        if (this.pickupArea == null) { this.pickupArea = null; }
        if (this.deliveryCity == null) { this.deliveryCity = null; }
        if (this.deliveryArea == null) { this.deliveryArea = null; }
        if (this.truck20 == null) { this.truck20 = null; }
        if (this.truck40 == null) { this.truck40 = null; }
        if (this.truck500kgs == null) { this.truck500kgs = null; }
        if (this.truckTonLevel1 == null) { this.truckTonLevel1 = null; }
        if (this.truckTonLevel2 == null) { this.truckTonLevel2 = null; }
        if (this.truckTonLevel3 == null) { this.truckTonLevel3 = null; }
        if (this.truckTonLevel4 == null) { this.truckTonLevel4 = null; }
        if (this.truckTonLevel5 == null) { this.truckTonLevel5 = null; }
        if (this.truckTonLevel6 == null) { this.truckTonLevel6 = null; }
        if (this.truckTonLevel7 == null) { this.truckTonLevel7 = null; }
        if (this.truckTonLevel8 == null) { this.truckTonLevel8 = null; }
        if (this.truckTonLevel9 == null) { this.truckTonLevel9 = null; }
        if (this.truckTonLevel10 == null) { this.truckTonLevel10 = null; }
        if (this.truckTonLevel11 == null) { this.truckTonLevel11 = null; }
        if (this.truckTonLevel12 == null) { this.truckTonLevel12 = null; }
        if (this.truckTonLevel13 == null) { this.truckTonLevel13 = null; }
        if (this.truckTonLevel14 == null) { this.truckTonLevel14 = null; }
        if (this.truckTonLevel15 == null) { this.truckTonLevel15 = null; }
        if (this.truckTonLevel16 == null) { this.truckTonLevel16 = null; }
        if (this.notes == null) { this.notes = null; }
        if (this.freeDetentionTime == null) { this.freeDetentionTime = null; }
        if (this.detentionCharge == null) { this.detentionCharge = null; }
        if (this.validDateFrom == null) { this.validDateFrom = null; }
        if (this.validDateTo == null) { this.validDateTo = null; }
        if (this.updatedBy == null) { this.updatedBy = null; }
        if (this.currency == null) { this.currency = null; }
    }
}