import { Partner } from "../partner/partner";
import { Port } from "../port/port";
import { Currency } from "../currency/currency";
export class SeaFreightPricing {
    
    constructor(
        public _id ?: string,
        public pricingID ?: string,
        public creator ?: string,
        public dateCreated ?: string,
        public dateModified ?: string,
        public portofLoading ?: Port,      // port
        public portofDischarge ?: Port,    // port
        public destination ?: Port,        // port
        public importMode ?: boolean,
        public lines ?: Partner,              // parter
        public service ?: string,
        public commodity ?: string,
        public carrier ?: Partner,
        public accountReference ?: string,
        public lclMin ?: number,
        public lcl ?: number,
        public ctn20DC ?: number,
        public ctn20RF ?: number,
        public ctn40DC ?: number,
        public ctn40RF ?: number,
        public ctn40HC ?: number,
        public ctn45HC ?: number,
        public ctn20DCKB ?: number,
        public ctn20RFKB ?: number,
        public ctn40DCKB ?: number,
        public ctn40RFKB ?: number,
        public ctn40HCKB ?: number,
        public others ?: number,
        public containerType ?: string,
        public currency ?: Currency,
        public tt ?: string,
        public includeAddon ?: boolean,
        public emptyReturn ?: string,
        public frequency ?: string,
        public cutOff ?: string,
        public vat ?: number,
        public vatContractor ?: boolean,
        public publicPrice ?: boolean,
        public dem ?: number,
        public det ?: number,
        public sto ?: number,
        public transitPort ?: string,
        public notes ?: string,
        public remarks ?: string,
        public effectDate ?: string,
        public validDateTo ?: string
    ) {
        if(this._id == null) this._id = null;
        if(this.pricingID == null) this.pricingID = null;
        if(this.creator == null) this.creator = null;
        if(this.dateCreated == null) this.dateCreated = null;
        if(this.dateModified == null) this.dateModified = null;
        if(this.portofLoading == null) this.portofLoading = null;
        if(this.portofDischarge == null) this.portofDischarge = null;
        if(this.destination == null) this.destination = null;
        if(this.importMode == null) this.importMode = null;
        if(this.lines == null) this.lines = null;
        if(this.service == null) this.service = null;
        if(this.commodity == null) this.commodity = null;
        if(this.carrier == null) this.carrier = null;
        if(this.accountReference == null) this.accountReference = null;
        if(this.lclMin == null) this.lclMin = null;
        if(this.lcl == null) this.lcl = null;
        if(this.ctn20DC == null) this.ctn20DC = null;
        if(this.ctn20RF == null) this.ctn20RF = null;
        if(this.ctn40DC == null) this.ctn40DC = null;
        if(this.ctn40RF == null) this.ctn40RF = null;
        if(this.ctn40HC == null) this.ctn40HC = null;
        if(this.ctn45HC == null) this.ctn45HC = null;
        if(this.ctn20DCKB == null) this.ctn20DCKB = null;
        if(this.ctn20RFKB == null) this.ctn20RFKB = null;
        if(this.ctn40DCKB == null) this.ctn40DCKB = null;
        if(this.ctn40RFKB == null) this.ctn40RFKB = null;
        if(this.ctn40HCKB == null) this.ctn40HCKB = null;
        if(this.others == null) this.others = null;
        if(this.containerType == null) this.containerType = null;
        if(this.currency == null) this.currency = null;
        if(this.tt == null) this.tt = null;
        if(this.includeAddon == null) this.includeAddon = null;
        if(this.emptyReturn == null) this.emptyReturn = null;
        if(this.frequency == null) this.frequency = null;
        if(this.cutOff == null) this.cutOff = null;
        if(this.vat == null) this.vat = null;
        if(this.vatContractor == null) this.vatContractor = null;
        if(this.publicPrice == null) this.publicPrice = null;
        if(this.dem == null) this.dem = null;
        if(this.det == null) this.det = null;
        if(this.sto == null) this.sto = null;
        if(this.transitPort == null) this.transitPort = null;
        if(this.notes == null) this.notes = null;
        if(this.remarks == null) this.remarks = null;
        if(this.effectDate == null) this.effectDate = null;
        if(this.validDateTo == null) this.validDateTo = null;
    }
}