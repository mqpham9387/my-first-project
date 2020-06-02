import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HEADER_POST } from '../../shared/app-settings';
import { Booking, BookingList } from './booking.model';
import { Contact } from '../contact/contact';
import { ShipmentTypes } from './shipment-types.interface';
import { Partner } from '../partner/partner';
import { Port } from '../port/port';
import { Commodity } from '../commodity/commodity';

import { of } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class BookingService {

  readonly httpOptions = { headers: HEADER_POST };

  constructor(private httpclient: HttpClient) {}

  getSentBookings(paramsJson: any): Observable<BookingList> {

    const contact: Contact = {
      _id : "5dedd340edfced4be5a33ec9",
      contactID : "CT0276",
      creator : null,
      dateCreate : '31/12/2019',
      dateModify : '31/12/2019',
      contactName : "NGUYỄN THỊ QUỲNH - BNNTQUYNH",
      englishName : "BNNTQUYNH",
      address : null,
      birthday : null,
      telephone : null,
      identifyCard : null,
      extNo : null,
      joiningDate : '31/12/2019',
      position : "SALES",
      group : null,
      department : "DP055",
      knowledge : null,
      email : "ntquynh@beelogistics.com",
      emailPassword : null,
      photo : null,
      photoSize : null,
      approveAmount : 0.0,
      exceptionApproveBy : null,
      saleTargetUSD : 0.0,
      saleTargetLC : 0.0,
      percentBonus : 0.0,
      percentFixedProfit : 0.0,
      userName : "BNNTQUYNH",
      password : "123",
      accountUsernameReference : null,
      disable : false,
      stopWorking : false,
      stopWorkingDate : null,
      hideSearch : null,
      isLocalUserInOffice : null,
      accessRight : '0',
      accessDescription : "Normal User"
    };
    const shipmentTypeName: ShipmentTypes = {
      _id : '5e67106c528b433d50bb05f7',
      shipmentTypeID : "3",
      shipmentTypeName : "JOINT SALES"
    }
    const partner: Partner = {
      _id : '5dd24b246ee36be7dd986a3f',
      partnerID : "CS021538",
      creator : "",
      dateCreate : '23/04/2020',
      dateModify : '23/04/2020',
      source : "",
      ediCode : "",
      partnerNameAbbr : "AB MAURI VIETNAM",
      partnerNameFullEN : "AB MAURI VIETNAM LTD.",
      partnerNameFullVN : "CÔNG TY TNHH AB MAURI VIỆT NAM",
      address : [
          {
            index: 1,
            addressInfo: 'LA NGA COMMUNE,DINH QUAN DISTRICT, DONG NAI PROVINCE,VIETNAM',
            note: 'text text',
            isMainAddress: true
          }
      ],
      country : "100",
      city : "1",
      state : "",
      zipCode : "",
      personContact : [],
      homePhone : "099999999999",
      workPhone : "35112580",
      faxNumber : "",
      taxCode : "3600234943",
      saleManage : "",
      saleAuthorised : [ "CT0278"],
      group : "CUSTOMERS",
      location : "2",
      category : "",
      website : "",
      email : "anh.t.nguyen@maurilanga.com",
      isPublic : true,
      lock : false,
      warning : false,
      warningMessage : "",
      accountReference : "",
      personAccountNumber : "BankAccount",
      personAccountName : "",
      bankName : "",
      bankAddress : "",
      bankBranch : "",
      swiftCode : "",
      termDaysETDETA : '',
      termDaysInvoiceDate : '',
      termDaysMonthlyDate : '',
      termAmountForCredit : '0.0',
      notes : "",
      isRefund : false,
      officeAgent : "",
      beneficiarysAddress : "",
      beneficiarysName : "",
      currency : "",
      termCurrencyForCredit : "",
      profileID : "",
      termNotes : "",
      nationality : "",
      preferredCollectionDate : ""
    };
    const port: Port = {
      _id : '5dce21f12821ac3b33fcdaa4',
      portID : "ANSMB",
      portName : "ST MICHIELS BAY",
      city : "6",
      country : "117",
      zone : "1",
      zoneLocal : "2",
      typeService : "SEA&AIR&INLAND",
      unPortCode : "",
      address : "",
      telephoneNo : "NULL",
      personIncharge : "",
      cbmperKGS : 0,
      notes : "",
      maCK : "",
      personModify : "ContactID",
      dateModify : '20/10/2019'
    }
    const commodity: Commodity = {
      _id : '5daed7f9bb52a3c9620f7fd4',
      commodityID : "01",
      commodityName : "Paper & Chemical Products",
      commodityDescription : "Paper & Chemical Products",
      hsCode : "01,02"
    };

    const paymentTerm = {
      _id : '5db93cc7bb52a3c9620fc5a8',
      paymentTermID : "2",
      paymentTermName : "FREIGHT PREPAID"
    }
    // fake data
    return of({
      results: [],
      totalRows: 1
    });
    // return this.httpclient.post<BookingList>(
    //   '/sales-service/booking/sent-get-list/',
    //   JSON.stringify(paramsJson),
    //   this.httpOptions
    // ).pipe(
    //   catchError(this.errorHandler)
    // );
  }

  getReceivedBookings(paramsJson: any): Observable<BookingList> {
    const contact: Contact = {
      _id : "5dedd340edfced4be5a33ec9",
      contactID : "CT0276",
      creator : null,
      dateCreate : '31/12/2019',
      dateModify : '31/12/2019',
      contactName : "NGUYỄN THỊ QUỲNH - BNNTQUYNH",
      englishName : "BNNTQUYNH",
      address : null,
      birthday : null,
      telephone : null,
      identifyCard : null,
      extNo : null,
      joiningDate : '31/12/2019',
      position : "SALES",
      group : null,
      department : "DP055",
      knowledge : null,
      email : "ntquynh@beelogistics.com",
      emailPassword : null,
      photo : null,
      photoSize : null,
      approveAmount : 0.0,
      exceptionApproveBy : null,
      saleTargetUSD : 0.0,
      saleTargetLC : 0.0,
      percentBonus : 0.0,
      percentFixedProfit : 0.0,
      userName : "BNNTQUYNH",
      password : "123",
      accountUsernameReference : null,
      disable : false,
      stopWorking : false,
      stopWorkingDate : null,
      hideSearch : null,
      isLocalUserInOffice : null,
      accessRight : '0',
      accessDescription : "Normal User"
    };
    const shipmentTypeName: ShipmentTypes = {
      _id : '5e67106c528b433d50bb05f7',
      shipmentTypeID : "3",
      shipmentTypeName : "JOINT SALES"
    }
    const partner: Partner = {
      _id : '5dd24b246ee36be7dd986a3f',
      partnerID : "CS021538",
      creator : "",
      dateCreate : '23/04/2020',
      dateModify : '23/04/2020',
      source : "",
      ediCode : "",
      partnerNameAbbr : "AB MAURI VIETNAM",
      partnerNameFullEN : "AB MAURI VIETNAM LTD.",
      partnerNameFullVN : "CÔNG TY TNHH AB MAURI VIỆT NAM",
      address : [
          {
            index: 1,
            addressInfo: 'LA NGA COMMUNE,DINH QUAN DISTRICT, DONG NAI PROVINCE,VIETNAM',
            note: 'text text',
            isMainAddress: true
          }
      ],
      country : "100",
      city : "1",
      state : "",
      zipCode : "",
      personContact : [],
      homePhone : "099999999999",
      workPhone : "35112580",
      faxNumber : "",
      taxCode : "3600234943",
      saleManage : "",
      saleAuthorised : [ "CT0278"],
      group : "CUSTOMERS",
      location : "2",
      category : "",
      website : "",
      email : "anh.t.nguyen@maurilanga.com",
      isPublic : true,
      lock : false,
      warning : false,
      warningMessage : "",
      accountReference : "",
      personAccountNumber : "BankAccount",
      personAccountName : "",
      bankName : "",
      bankAddress : "",
      bankBranch : "",
      swiftCode : "",
      termDaysETDETA : '',
      termDaysInvoiceDate : '',
      termDaysMonthlyDate : '',
      termAmountForCredit : '0.0',
      notes : "",
      isRefund : false,
      officeAgent : "",
      beneficiarysAddress : "",
      beneficiarysName : "",
      currency : "",
      termCurrencyForCredit : "",
      profileID : "",
      termNotes : "",
      nationality : "",
      preferredCollectionDate : ""
    };
    const port: Port = {
      _id : '5dce21f12821ac3b33fcdaa4',
      portID : "ANSMB",
      portName : "ST MICHIELS BAY",
      city : "6",
      country : "117",
      zone : "1",
      zoneLocal : "2",
      typeService : "SEA&AIR&INLAND",
      unPortCode : "",
      address : "",
      telephoneNo : "NULL",
      personIncharge : "",
      cbmperKGS : 0,
      notes : "",
      maCK : "",
      personModify : "ContactID",
      dateModify : '20/10/2019'
    }
    const commodity: Commodity = {
      _id : '5daed7f9bb52a3c9620f7fd4',
      commodityID : "01",
      commodityName : "Paper & Chemical Products",
      commodityDescription : "Paper & Chemical Products",
      hsCode : "01,02"
    };

    const paymentTerm = {
      _id : '5db93cc7bb52a3c9620fc5a8',
      paymentTermID : "2",
      paymentTermName : "FREIGHT PREPAID"
    }

    return of({
      results: [],
      totalRows: 1
    });
    // return this.httpclient.post<BookingList>(
    //   '/sales-service/booking/received-get-list/',
    //   JSON.stringify(paramsJson),
    //   this.httpOptions
    // ).pipe(
    //   catchError(this.errorHandler)
    // );
  }

  getBookingTypes(data?: any): Observable<any> {
    if (!data || data === null || data === undefined) {
      data = {
        startRow: 0,
        endRow: 90,
      };
    }
    const httpOptions = { headers: HEADER_POST };

    return this.httpclient
      .post<{ totalRows: number; results: any[] }>(
        '/sales-service/quotation-types/get-list/',
        JSON.stringify(data),
        httpOptions
      )
      .pipe(
        map((data) => {
          return data.results;
        }),
        catchError(this.errorHandler)
      );
  }
  addBookingAir(data): Observable<any> {
    console.log(data);
    return this.httpclient
      .post('/sales-service/quotation/add-quotation-air/', data)
      .pipe(catchError(this.errorHandler));
  }
  updateBooking(data): Observable<any> {
    console.log(data);
    return this.httpclient
      .put('/sales-service/quotation/', data)
      .pipe(catchError(this.errorHandler));
  }
  deleteBookingAir(_id): Observable<any> {
    const options = {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'DELETE',
        'Content-Type': 'application/json; charset=UTF-8',
        Accept: 'application/json',
      }),
      body: { _id: _id },
    };
    return this.httpclient.delete('/sales-service/quotation/', options);
  }

  errorHandler(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      window.alert(error.error.message);
    }
    return throwError('Something bad happened; please try again later.');
  }

  getBookingAir_detail(quotationNo): Observable<any> {
    const a = {
      startRow: 0,
      endRow: 500,
      sortModel: [],
      filterModel: {
        quotationNo: {
          filterType: 'text',
          type: 'equals',
          filter: quotationNo,
        },
      },
    };
    return this.httpclient
      .post('/sales-service/air-quotation-details/get-list/', a)
      .pipe(catchError(this.errorHandler));
  }
  getBookingDetail_CustomClearance(quotationNo): Observable<any> {
    const a = {
      startRow: 0,
      endRow: 50,
      sortModel: [],
      filterModel: {
        quotationNo: {
          filterType: 'text',
          type: 'equals',
          filter: quotationNo,
        },
      },
    };
    return this.httpclient
      .post('/sales-service/quotation-details-customs-clearance/get-list/', a)
      .pipe(catchError(this.errorHandler));
  }
  updateBookingDetail_CustomClearance(data): Observable<any> {
    return this.httpclient
      .post('/sales-service/quotation-details-customs-clearance/', data)
      .pipe(catchError(this.errorHandler));
  }
  updateBookingAirDetail(data): Observable<any> {
    return this.httpclient
      .put('/sales-service/air-quotation-details/', data)
      .pipe(catchError(this.errorHandler));
  }
  createBookingAirDetail(data): Observable<any> {
    return this.httpclient
      .post('/sales-service/air-quotation-details/', data)
      .pipe(catchError(this.errorHandler));
  }
  deleteBookingAirDetail(_id): Observable<any> {
    const options = {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'DELETE',
        'Content-Type': 'application/json; charset=UTF-8',
        Accept: 'application/json',
      }),
      body: { _id: _id },
    };
    return this.httpclient.delete(
      '/sales-service/air-quotation-details/',
      options
    );
  }

  getBookingTruckingNonContainer(quotationNo): Observable<any> {
    const params = {
      startRow: 0,
      endRow: 500,
      sortModel: [],
      filterModel: {
        quotationNo: {
          filterType: 'text',
          type: 'equals',
          filter: quotationNo,
        },
      },
    };

    return this.httpclient
      .post(
        '/sales-service/quotation-details-trucking-non-container/get-list/',
        params
      )
      .pipe(catchError(this.errorHandler));
  }
  updateBookingDetailTruckingNonContainer(data): Observable<any> {
    return this.httpclient
      .put('/sales-service/quotation-details-trucking-non-container/', data)
      .pipe(catchError(this.errorHandler));
  }
  createBookingDetailTruckingNonContainer(data): Observable<any> {
    return this.httpclient
      .post('/sales-service/quotation-details-trucking-non-container/', data)
      .pipe(catchError(this.errorHandler));
  }
  deleteBookingDetailTruckingNonContainer(_id): Observable<any> {
    const options = {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'DELETE',
        'Content-Type': 'application/json; charset=UTF-8',
        Accept: 'application/json',
      }),
      body: { _id: _id },
    };
    return this.httpclient.delete(
      '/sales-service/quotation-details-trucking-non-container/',
      options
    );
  }

  getBookingTruckingContainer(paramsJson: any): Observable<any> {
    const httpOptions = { headers: HEADER_POST };
    return this.httpclient
      .post<{ totalRows: number; results: any[] }>(
        '/sales-service/quotation-details-trucking-container/get-list/',
        JSON.stringify(paramsJson),
        httpOptions
      )
      .pipe(catchError(this.errorHandler));
  }
  updateBookingDetailTruckingContainer(data): Observable<any> {
    return this.httpclient
      .put('/sales-service/quotation-details-trucking-container/', data)
      .pipe(catchError(this.errorHandler));
  }
  deleteBookingDetailTruckingContainer(_id): Observable<any> {
    const options = {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'DELETE',
        'Content-Type': 'application/json; charset=UTF-8',
        Accept: 'application/json',
      }),
      body: { _id: _id },
    };
    return this.httpclient.delete(
      '/sales-service/quotation-details-trucking-container/',
      options
    );
  }

  getQuotDetailsTruckNonCont(paramsJson: any): Observable<any> {
    const httpOptions = { headers: HEADER_POST };
    return this.httpclient
      .post<{ totalRows: number; results: any[] }>(
        '/sales-service/quotation-details-trucking-non-container/get-list/',
        JSON.stringify(paramsJson),
        httpOptions
      )
      .pipe(catchError(this.errorHandler));
  }
  getQuotDetailsCustomsClearance(paramsJson: any): Observable<any> {
    const httpOptions = { headers: HEADER_POST };
    return this.httpclient
      .post<{ totalRows: number; results: any[] }>(
        '/sales-service/quotation-details-customs-clearance/get-list/',
        JSON.stringify(paramsJson),
        httpOptions
      )
      .pipe(catchError(this.errorHandler));
  }
  getBookingDetailsOtherCharges(paramsJson: any): Observable<any> {
    const httpOptions = { headers: HEADER_POST };
    return this.httpclient
      .post<{ totalRows: number; results: any[] }>(
        '/sales-service/quotation-details-other-charges/get-list/',
        JSON.stringify(paramsJson),
        httpOptions
      )
      .pipe(catchError(this.errorHandler));
  }

  updateOtherChargeDetail(data): Observable<any> {
    return this.httpclient
      .put(
        '/sales-service/quotation-details-other-charges/',
        JSON.stringify(data)
      )
      .pipe(catchError(this.errorHandler));
  }

  updateCustomClearance(data): Observable<any> {
    return this.httpclient
      .put('/sales-service/quotation-details-customs-clearance/', data)
      .pipe(catchError(this.errorHandler));
  }
}
