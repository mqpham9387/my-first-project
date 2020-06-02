import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpResponse } from '@angular/common/http';
import { mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { Inquiry } from 'src/app/main/model/inquiry/inquiry.model';
import { InquiryType } from 'src/app/main/model/inquiry/inquiryType.model';
import { Contact } from 'src/app/main/model/contact/contact';
import { Port } from 'src/app/main/model/port/port';
import { PersonContact, Partner } from 'src/app/main/model/partner/partner';
// import * as _ from 'underscore';

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler) {
        return of(null).pipe(mergeMap(() => {
            console.log('Fake Backend Interepted');
            
            var sortedInquiries = inquiries;
            var sortModel = null;
            var sortColId = '';
            var sort = ''; //asc or desc
            var filteredInquiries = inquiries;
            var filterModel;
            var dataResult;
            if (!(req.url == 'http//inquiries')) {
                return next.handle(req);
            }

            sortModel = req.body.sortModel;
            filterModel = req.body.filterModel;
            console.log(filterModel.inquiryID);
            if ('inquiryID' in filterModel) {
                dataResult =  filteredInquiries.filter(function(inquiry) {
                    return inquiry.inquiryID.indexOf(filterModel.inquiryID.filter) !== -1;
                });
            }
            console.log(dataResult);
            
            if(sortModel.length) {
                // implement fake sorting
                sortModel.forEach(element => {
                    sortColId = element.colId;
                    sort = element.sort;
                });

                // if(sort == 'asc') {
                //     sortedUsers = _.sortBy(users, sortColId);
                // } else {
                //     sortedUsers = _.sortBy(users, sortColId).reverse();
                // }
            }

            var resBody = {
                inquiries: sortedInquiries.slice(req.body.startRow, req.body.endRow),
                totalRecords: inquiries.length
            };

            return of(new HttpResponse({ status: 200, body: resBody }));
        }));
    }
}

const inquiries: Inquiry[] = [];

const initialPartner: Partner = {
    _id: "5dad87bebb52a3c9620f7272",
    partnerID: "CS011870",
    creator: "ADMIN",
    dateCreate: "12/12/2019",
    dateModify: "12/12/2019",
    source: "",
    ediCode: "",
    partnerNameAbbr: "CustomerName (Abbr)",
    partnerNameFullEN: "CustomerName (Full - En)",
    partnerNameFullVN: "CustomerName (Full - VN)",
    address: [
        {
            "index": 1,
            "addressInfo": "addressEN",
            "isMainAddress": true,
            "note": ""
        },
        {
            "index": 2,
            "addressInfo": "addressENOther",
            "isMainAddress": false,
            "note": ""
        },
        {
            "index": 3,
            "addressInfo": "addressVN",
            "isMainAddress": false,
            "note": ""
        }
    ],
    country: "",
    city: "",
    state: "",
    zipCode: "",
    personContact: [
        <PersonContact>{
            fullname: "",
            cellPhone: "",
            address: "",
            email: "",
            directLine: "",
            birthday: "12/12/1976",
            note: "",
            position: "",
            group: "partnerDepartmentName"
        }
    ],
    homePhone: "",
    workPhone: "",
    faxNumber: "",
    taxCode: "",
    saleManage: "contactID",
    saleAuthorised: [
        "CT0271",
        "CT0276"
    ],
    group: "",
    location: "locationName",
    category: "categoryName",
    website: "",
    email: "",
    isPublic: true,
    lock: false,
    warning: false,
    warningMessage: "",
    accountReference: "partnerID",
    personAccountNumber: "BankAccount",
    personAccountName: "",
    bankName: "",
    bankAddress: "",
    bankBranch: "",
    swiftCode: "",
    termDaysETDETA: "0",
    termDaysInvoiceDate: "0",
    termDaysMonthlyDate: "0",
    termAmountForCredit: "0",
    notes: "",
    isRefund: false,
    officeAgent: "",
    beneficiarysAddress: "",
    beneficiarysName: "",
    currency: "",
    termCurrencyForCredit: "",
    profileID: "",
    termNotes: "",
    nationality: "",
    preferredCollectionDate: ""
};
const initialPort: Port = {
    _id: "5dce2b0d2821ac3b33fce668",
    portID: "CLIPC",
    portName: "ISLA DE PASCUA",
    country: "CHILE",
    zone: "Zone",
    zoneLocal: "",
    typeService: "SEA&AIR&INLAND",
    unPortCode: "",
    address: "",
    telephoneNo: "NULL",
    personIncharge: "",
    cbmperKGS: 0,
    notes: "",
    maCK: "",
    personModify: "ContactID",
    dateModify: "2019-10-22",
    city: ""
};
const contact: Contact = {
    _id: "5dedd340edfced4be5a33ef2",
    contactID: "CT025",
    creator: null,
    dateCreate: "2006-12-31",
    dateModify: "2006-12-31",
    contactName: "Nguyễn Thanh HIỀN - HCMHIENNT",
    englishName: "HCMHIENNT",
    address: null,
    birthday: null,
    telephone: "0918653659",
    identifyCard: null,
    extNo: "101",
    joiningDate: "2006-12-31",
    position: "LOG MANAGER",
    group: null,
    department: "DP010",
    knowledge: null,
    email: "rachel.vnsgn@beelogistics.com",
    emailPassword: null,
    photo: null,
    photoSize: null,
    approveAmount: 0.0,
    exceptionApproveBy: null,
    saleTargetUSD: 0.0,
    saleTargetLC: 0.0,
    percentBonus: 0.0,
    percentFixedProfit: 0.0,
    userName: "HCMHIENNT",
    password: "123",
    accountUsernameReference: null,
    disable: false,
    stopWorking: false,
    stopWorkingDate: null,
    hideSearch: true,
    isLocalUserInOffice: null,
    accessRight: "",
    accessDescription: "Document Management"
};

for (let i = 0; i < 8; i++) {

    function randomDate(start, end) {
        return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
    }
    let dateCreate = randomDate(new Date(2014, 0, 1), new Date()).toString();
    let dateModify = dateCreate;
    let inquiryTypeID = Math.random() >= 0.4 ? "SeaFreightInquiry" : "AirFreightInquiry"
    const inquiryType: InquiryType = {
        _id: "5dbce260bb52a3c9620fe14a",
        inquiryTypeID: inquiryTypeID,
        inquiryTypeName: inquiryTypeID
    };
    const inquiry = {
        _id: "5e688d77528b433d50" + Math.random().toString(36).substring(7),
        inquiryID: Math.random().toString(36).substring(7).toUpperCase(),
        inquiryType: inquiryType,
        creator: contact,
        dateCreate: dateCreate,
        dateModify: dateModify,
        commodity: "Commodities - commodityName",
        portofLoading: initialPort,
        portofDischarge: initialPort,
        cargoReadyDate: dateCreate,
        client: initialPartner,
        specialRequirement: "string",
        targetRateAndCharges: "string",
        sentTo: contact,
        forwardedTo: contact,
        lastQuotedOn: dateCreate,
        notes: "notes...",
        status: Math.random() >= 0.4,
        isSent: Math.random() >= 0.4
    };
    inquiries.push(inquiry);
}