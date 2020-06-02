export class QuotationType {
    constructor(
        public _id?: string,
        public quotationTypeID?: string,
        public quotationTypeName?: string,
    ) {
        if(this._id === null) { this._id = null; }
        if(this.quotationTypeID === null) { this.quotationTypeID = null; }
        if(this.quotationTypeName === null) { this.quotationTypeName = null; }
    }
}
