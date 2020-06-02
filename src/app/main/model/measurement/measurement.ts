export class Measurement {
    _id: string;
    unitID: string;
    description: string;
    originCountry: string;
    kgs: string;
    length: string;
    height: string;
    width: string;
    localUnit: string;
    notes: string;
    isoCode: string;
    rowStatus: string;

    constructor() {
        this.unitID = null;
        this.description = null;
        this.originCountry = null;
        this.kgs = null;
        this.length = null;
        this.height = null;
        this.width = null;
        this.localUnit = null;
        this.notes = null;
        this.isoCode = null;
        this.rowStatus = 'ADD';
    }
}

export class MeasurementApiResult {
    unitID: string;
    message: string;
    value: boolean;
}
