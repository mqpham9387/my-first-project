export class ServiceInquiryVolumeFCL {
    constructor(
        public _id ?: string,
        public inquiryID ?: string,
        public containerType ?: string,
        public container20 ?: number,
        public container40 ?: number,
        public containerHQ ?: number,
        public contatner45 ?: number,
        public requestedTemperature ?: string,
        public cargoDimensions ?: string,
        public cargoWeight ?: string,
        public type ?: string
    ) {
        if(this._id == null) this._id = null;
        if(this.inquiryID == null) this.inquiryID = null;
        if(this.containerType == null) this.containerType = null;
        if(this.container20 == null) this.container20 = null;
        if(this.container40 == null) this.container40 = null;
        if(this.containerHQ == null) this.containerHQ = null;
        if(this.contatner45 == null) this.contatner45 = null;
        if(this.requestedTemperature == null) this.requestedTemperature = null;
        if(this.cargoDimensions == null) this.cargoDimensions = null;
        if(this.cargoWeight == null) this.cargoWeight = null;
        if(this.type == null) this.type = null;
    }
}