export class InquiryType {
    constructor(
        public _id ?: string,
        public inquiryTypeID ? : string,
        public inquiryTypeName ? : string
    ) {
        if(this._id == null) this._id = null;
        if(this.inquiryTypeID == null) this.inquiryTypeID = null;
        if(this.inquiryTypeName == null) this.inquiryTypeName = null;
    }
};