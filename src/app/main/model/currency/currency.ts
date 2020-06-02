export class Currency {
    _id: string;
    id: string;
    unit: string;
    price: number;
    kbExchangeRate: number;
    extVNDSales: number;
    extVNDSalesKB: number;
    notes: string;
    
    constructor() {
        this.id = null;
        this.unit = null;
        this.price = null;
        this.kbExchangeRate = null;
        this.extVNDSales = null;
        this.extVNDSalesKB = null;
        this.notes = null;
    }
}
export class CurrencyExchangeRate{
    _id
    exchangeRateID
    description
    fromDate
    toDate
    creator
    appliedFor
    notes
    dateCreate
    dateModify
    constructor(init?: Partial<CurrencyExchangeRate>) {
        this._id = null;
        this.exchangeRateID = null;
        this.description = null;
        this.fromDate = null;
        this.toDate = null;
        this.creator = "ADMIN";
        this.appliedFor = [];
    
        Object.assign(this, init);

    }
}
export class CurrencyExchangeRateDetail{
    exchangeRateID
    currencyID
    price
    kbExchangeRate
    extVNDSales
    commissionExtVNDSales
    notes
    constructor(init?: Partial<CurrencyExchangeRate>) {
        this.exchangeRateID = null;
        this.currencyID = null;
        this.price = null;
        this.kbExchangeRate = null;
        this.extVNDSales = null;
        this.commissionExtVNDSales = null;
       
        Object.assign(this, init);

    }
}
