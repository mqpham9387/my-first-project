export class Port {
    _id: string;
    portID: string;
    portName: string;
    country: string;
    zone: string;
    zoneLocal: string;
    typeService: string;
    unPortCode: string;
    address: string;
    telephoneNo: string;
    personIncharge: string;
    cbmperKGS: number;
    notes: string;
    maCK: string;
    personModify: string;
    dateModify: string;
    countryName?
    cityName?
    zoneName?
    city?: string
    constructor() {
        this._id = null;
        this.portID = null;
        this.portName = null;
        this.country = null;
        this.zone = null;
        this.zoneLocal = null;
        this.typeService = null;
        this.unPortCode = null;
        this.address = null;
        this.telephoneNo = null;
        this.personIncharge = null;
        this.cbmperKGS = null;
        this.notes = null;
        this.maCK = null;
        this.city =null;
        this.personModify = null;
        this.dateModify = null;
        if(this.city == null) this.city = null;
    }
}
