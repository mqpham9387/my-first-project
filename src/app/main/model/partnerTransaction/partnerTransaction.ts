export class PartnerTransaction {
    _id: string;
    transactionID: string;
    dateCreate: string;
    transactionDate: string;
    description: string;
    companyContact: string;
    guestPersonals: string;
    category: string;
    fieldInterested: string;
    competitor: string;
    transactionStatus: string;
    nextDateContact: string;
    notes: string;
    username: string;
    partnerID: string;
    action: string;

    constructor() {
        this.transactionID = null;
        this.dateCreate = null;
        this.transactionDate = null;
        this.description = null;
        this.companyContact = null;
        this.guestPersonals = null;
        this.category = null;
        this.fieldInterested = null;
        this.competitor = null;
        this.transactionStatus = null;
        this.nextDateContact = null;
        this.notes = null;
        this.username = null;
        this.partnerID = null;
        this.action = 'ADD';
    }
}
