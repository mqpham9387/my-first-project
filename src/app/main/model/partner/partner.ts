export class PartnerView {
    _id: string;
    partnerID: string;
    creator: string;
    dateCreate: string;
    dateModify: string;
    source: string;
    ediCode: string;
    partnerNameAbbr: string;
    partnerNameFullEN: string;
    partnerNameFullVN: string;
    address: Address[];
    country: string;
    city: string;
    state: string;
    zipCode: string;
    homePhone: string;
    workPhone: string;
    faxNumber: string;
    taxCode: string;
    saleManage: string;
    group: string;
    location: string;
    category: string;
    website: string;
    email: string;
    isPublic: boolean;
    lock: boolean;
    warning: boolean;
    warningMessage: string;
    accountReference: string;
    personAccountNumber: string;
    personAccountName: string;
    bankName: string;
    bankAddress: string;
    bankBranch: string;
    swiftCode: string;
    termDaysETDETA: string;
    termDaysInvoiceDate: string;
    termDaysMonthlyDate: string;
    termAmountForCredit: string;
    notes: string;
    isRefund: boolean;
    officeAgent: string;
    beneficiarysAddress: string;
    beneficiarysName: string;
    currency: string;
    termCurrencyForCredit: string;
    profileID: string;
    termNotes: string;
    saleManageName: string;
    accountReferenceName: string;
    countryName: string;
    cityName: string;
    sourceName: string;
    stateName: string;
    action: string;

    constructor() {
        this.partnerID = null;
        this.creator = null;
        this.dateCreate = null;
        this.dateModify = null;
        this.source = null;
        this.ediCode = null;
        this.partnerNameAbbr = null;
        this.partnerNameFullEN = null;
        this.partnerNameFullVN = null;
        this.address = [];
        this.country = null;
        this.city = null;
        this.state = null;
        this.zipCode = null;
        this.homePhone = null;
        this.workPhone = null;
        this.faxNumber = null;
        this.taxCode = null;
        this.saleManage = null;
        this.group = null;
        this.location = null;
        this.category = null;
        this.website = null;
        this.email = null;
        this.isPublic = false;
        this.lock = false;
        this.warning = false;
        this.warningMessage = null;
        this.accountReference = null;
        this.personAccountNumber = null;
        this.personAccountName = null;
        this.bankName = null;
        this.bankAddress = null;
        this.bankBranch = null;
        this.swiftCode = null;
        this.termDaysETDETA = null;
        this.termDaysInvoiceDate = null;
        this.termDaysMonthlyDate = null;
        this.termAmountForCredit = null;
        this.notes = null;
        this.isRefund = false;
        this.officeAgent = null;
        this.beneficiarysAddress = null;
        this.beneficiarysName = null;
        this.currency = null;
        this.termCurrencyForCredit = null;
        this.profileID = null;
        this.termNotes = null;
        this.saleManageName = null;
        this.accountReferenceName = null;
        this.countryName = null;
        this.cityName = null;
        this.sourceName = null;
        this.stateName = null;
        this.action = 'ADD';
    }
}

export class Partner {
    _id: string;
    partnerID: string;
    creator: string;
    dateCreate: string;
    dateModify: string;
    source: string;
    ediCode: string;
    partnerNameAbbr: string;
    partnerNameFullEN: string;
    partnerNameFullVN: string;
    address: Address[];
    country: string;
    city: string;
    state: string;
    zipCode: string;
    personContact: PersonContact[];
    homePhone: string;
    workPhone: string;
    faxNumber: string;
    taxCode: string;
    saleManage: string;
    saleAuthorised: string[];
    group: string;
    location: string;
    category: string;
    website: string;
    email: string;
    isPublic: boolean;
    lock: boolean;
    warning: boolean;
    warningMessage: string;
    accountReference: string;
    personAccountNumber: string;
    personAccountName: string;
    bankName: string;
    bankAddress: string;
    bankBranch: string;
    swiftCode: string;
    termDaysETDETA: string;
    termDaysInvoiceDate: string;
    termDaysMonthlyDate: string;
    termAmountForCredit: string;
    notes: string;
    isRefund: boolean;
    officeAgent: string;
    beneficiarysAddress: string;
    beneficiarysName: string;
    currency: string;
    termCurrencyForCredit: string;
    profileID: string;
    nationality: string;
    termNotes: string;
    preferredCollectionDate: string;
    // objectSaleAuthorised: saleAuthorised[];

    constructor() {
        this.partnerID = null;
        this.creator = null;
        this.dateCreate = null;
        this.dateModify = null;
        this.source = null;
        this.ediCode = null;
        this.partnerNameAbbr = null;
        this.partnerNameFullEN = null;
        this.partnerNameFullVN = null;
        this.address = [];
        this.country = null;
        this.city = null;
        this.state = null;
        this.zipCode = null;
        this.personContact = [];
        this.homePhone = null;
        this.workPhone = null;
        this.faxNumber = null;
        this.taxCode = null;
        this.saleManage = null;
        this.saleAuthorised = [];
        this.group = null;
        this.location = null;
        this.category = null;
        this.website = null;
        this.email = null;
        this.isPublic = false;
        this.lock = false;
        this.warning = false;
        this.warningMessage = null;
        this.accountReference = null;
        this.personAccountNumber = null;
        this.personAccountName = null;
        this.bankName = null;
        this.bankAddress = null;
        this.bankBranch = null;
        this.swiftCode = null;
        this.termDaysETDETA = null;
        this.termDaysInvoiceDate = null;
        this.termDaysMonthlyDate = null;
        this.termAmountForCredit = null;
        this.notes = null;
        this.isRefund = false;
        this.officeAgent = null;
        this.beneficiarysAddress = null;
        this.beneficiarysName = null;
        this.currency = null;
        this.termCurrencyForCredit = null;
        this.profileID = null;
        this.nationality = null;
        this.termNotes = null;
        this.preferredCollectionDate = null;
        // this.objectSaleAuthorised = [];
    }
}

export class PersonContact {
    groupView: string;
    group: string;
    fullname: string;
    cellPhone: string;
    address: string;
    email: string;
    directLine: string;
    birthday: string;
    note: string;
    position: string;

    constructor() {
        this.groupView = null;
        this.group = null;
        this.fullname = null;
        this.cellPhone = null;
        this.address = null;
        this.email = null;
        this.directLine = null;
        this.birthday = null;
        this.note = null;
        this.position = null;
    }
}

export class Address {
    index: number;
    addressInfo: string;
    note: string;
    isMainAddress: boolean;

    constructor() {
        this.index = null;
        this.addressInfo = null;
        this.note = null;
        this.isMainAddress = false;
    }
}

export class saleAuthorised {
    contactID: string;
    contactName: string;

    constructor() {
        this.contactID = null;
        this.contactName = null;
    }
}