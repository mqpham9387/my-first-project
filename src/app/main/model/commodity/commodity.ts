export class Commodity {
    public _id?: string;
    public commodityID?: string;
    public commodityName?: string;
    public commodityDescription?: string;
    public hsCode?: string;
    public rowStatus?: string;

    constructor() {
        if(this.commodityID == null) this.commodityID = null;
        if(this.commodityName == null) this.commodityName = null;
        if(this.commodityDescription == null) this.commodityDescription = null;
        if(this.hsCode == null) this.hsCode = null;
        if(this.rowStatus == null) this.rowStatus = 'ADD';
    }
}

export class CommodityApiResult {
    commodityID: string;
    message: string;
    value: boolean;
}
