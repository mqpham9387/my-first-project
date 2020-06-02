export class BookingDetailSeaFcl {
    constructor(
        public _id?: string,
        public bookingNo?: string,
        public container20GPDC?: string,
        public container40GPDC?: string,
        public container45GPDC?: string,
        public containerHQGPDC?: string,
        public container20RF?: string,
        public container40RF?: string,
        public container20OT?: string,
        public container40OT?: string,
        public container20FR?: string,
        public container40FR?: string,
        public container20ISOTank?: string,
        public isoTankType?: string,
        public requestedTemperatureRF?: string,
        public cargoDimensionsOT?: string,
        public cargoWeightOT?: string,
        public cargoDimensionsFR?: string,
        public cargoWeightFR?: string
    ) {
        //
    }
}