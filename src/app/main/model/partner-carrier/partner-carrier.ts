export class PartnerCarrier {
    _id: string;
    standardID: string;
    carrierCode: string;
    partnerID: string;
    notes: string;
    add: boolean;
    edit: boolean;

    constructor() {
        this.standardID = null;
        this.carrierCode = null;
        this.partnerID = null;
        this.notes = null;
        this.add = false;
        this.edit = false;
    }
}
