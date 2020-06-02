export class TransactionType {
    _id: string;
    transactionTypeID: string;
    transactionTypeName: string;
    request: boolean;
    export: boolean;
    rateRequired: boolean;
    sign: string;
    sMonth: string;
    no: string;
    ys: string;
    sYear: string;
    increment: string;
    idResetOn: number;
    noDaysLock: number;
    dayofLogisticsLock: number;
    lockAgainAfterUnlock: number;
    approveManager: string;
    managerAPP: boolean;
    typeList: string;
    group: string;

    constructor() {
        this.transactionTypeID = null;
        this.transactionTypeName = null;
        this.request = false;
        this.export = false;
        this.rateRequired = false;
        this.sign = null;
        this.sMonth = null;
        this.no = null;
        this.ys = null;
        this.sYear = null;
        this.increment = null;
        this.idResetOn = null;
        this.noDaysLock = null;
        this.dayofLogisticsLock = null;
        this.lockAgainAfterUnlock = null;
        this.approveManager = null;
        this.managerAPP = false;
        this.typeList = null;
        this.group = null;
    }
}
