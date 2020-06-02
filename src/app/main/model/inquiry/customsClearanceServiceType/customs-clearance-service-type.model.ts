export class CustomsClearanceServiceType {
    constructor(
        public _id?: string,
        public customsClearanceTypeID?: string,
        public customsClearanceTypeName?: string,
        public isExport?: boolean
    ) {
        if(this._id == null) this._id = null;
        if(this.customsClearanceTypeID == null) this.customsClearanceTypeID = null;
        if(this.customsClearanceTypeName == null) this.customsClearanceTypeName = null;
        if(this.isExport == null) this.isExport = null;
    }
}