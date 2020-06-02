export class BookingDetailsFreightCharges {
    constructor(
        public _id?: string,
        public bookingNo?: string,
        public description?: string,
        public currency?: string,
        public unitPrice?: string,
        public quantity?: string,
        public amount?: string,
        public vat?: string,
        public totalIncludeVAT?: string,
    ) {
        //
    }
}
