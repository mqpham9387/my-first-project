import { Component, OnInit, Input,ViewEncapsulation } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { formatDate } from '@angular/common';
import { isString, padLeft, isEqual, isEmail, isWebsite, transportValue } from 'src/app/main/common/util';

import { PersonContact, Address } from 'src/app/main/model/lead/lead';

import { ContactPersonComponent } from '../../../modal/contact-person/contact-person.component';

import { LeadService } from 'src/app/main/model/lead/lead.service';
import { CountryService } from 'src/app/main/model/country/country.service';
import { StateService } from 'src/app/main/model/state/state.service';
import { CityService } from 'src/app/main/model/city/city.service';
import { ContactService } from 'src/app/main/model/contact/contact.service';

import { CustomHeader } from 'src/app/main/common/ag-grid-header-custom';
import { MessageBox, MessageBoxButtons, MessageBoxIcons } from 'src/app/form/message/messsage';
import { PartnerTransaction } from 'src/app/main/model/partnerTransaction/partnerTransaction';
import { TransactionComponent } from '../../../modal/transaction/transaction.component';
import { PartnerTransactionService } from 'src/app/main/model/partnerTransaction/partnerTransaction.service';
import { Partner, PartnerView } from 'src/app/main/model/partner/partner';
import { CustomerAddComponent } from '../../customer/customer-add/customer-add.component';
import { PartnerService } from 'src/app/main/model/partner/partner.service';

@Component({
  selector: 'app-lead-add',
  templateUrl: './lead-add.component.html',
  styleUrls: ['./lead-add.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class LeadAddComponent implements OnInit {
  @Input() lead;

  public isLoading = true;
  public action;
  public leadClone;

  leadApi;

  columnDefsCont;
  rowDataCont = [];
  gridApiCont;
  columnDefsTrans;
  rowDataTrans = [];
  gridApiTrans;
  columnDefsQuota;
  rowDataQuota = [];
  defaultColDef;
  frameworkComponents;

  saleManage;
  officeAgent;
  country;
  city;
  state;

  contacts;
  customers;
  countries;
  states;
  cities;

  vCities;
  vStates;

  addressEN;
  addressVN;
  arrAddr = [];

  constructor(
    public activeModal: NgbActiveModal,
    public modal: NgbModal,
    public partnerService: PartnerService,
    public leadService: LeadService,
    public countryService: CountryService,
    public stateService: StateService,
    public cityService: CityService,
    public contactService: ContactService,
    public partnertransactionService: PartnerTransactionService
  ) {
    this.columnDefsCont = [
      { headerName: 'Group', field: 'groupView', sortable: true, filter: true },
      { headerName: 'Full Name', field: 'fullname', width: 250, filter: true },
      { headerName: 'Position', field: 'position', filter: true },
      { headerName: 'Email', field: 'email', width: 200, filter: true },
      { headerName: 'Cell Phone', field: 'cellPhone', width: 200, filter: true },
      { headerName: 'Dỉrect Line', field: 'directLine', width: 200, filter: true },
      {
        headerName: 'Birthday', field: 'birthday', filter: true, cellRenderer: (data) => {
          return (data.value != null && data.value != '') ? formatDate(data.value, 'dd/MM/yyyy', 'en-US') : '';
        }
      },
      { headerName: 'Note', field: 'note', width: 500, filter: true },
    ];
    this.columnDefsTrans = [
      {
        headerName: 'Date', field: 'dateCreate', width: 120, sortable: true, filter: true, cellRenderer: (data) => {
          return data.value != null ? formatDate(data.value, 'dd/MM/yyyy', 'en-US') : '';
        }
      },
      { headerName: 'User', field: 'username', width: 120, sortable: true, filter: true },
      { headerName: 'Transaction content', width: 300, field: 'description', sortable: true, filter: true }
    ];
    this.columnDefsQuota = [
      { headerName: 'No.', field: 'id', width: 150, sortable: true, filter: true },
      {
        headerName: 'Date', field: 'date', width: 120, sortable: true, filter: true, cellRenderer: (data) => {
          return (data.value != null && data.value != '') ? formatDate(data.value, 'dd/MM/yyyy', 'en-US') : '';
        }
      },
      { headerName: 'POL/Airport of origin', field: 'pol', width: 300, sortable: true, filter: true },
      { headerName: 'POD/Airport of destination', field: 'pod', width: 300, sortable: true, filter: true }
    ];
    this.defaultColDef = {
      width: 120,
      headerComponentParams: { menuIcon: 'fas fa-filter' },
      sortable: true,
      resizable: true,
      filter: true
    };
    this.frameworkComponents = { agColumnHeader: CustomHeader };
  }

  async ngOnInit() {
    this.action = this.lead.action;

    // this.customers = await this.partnerService.getPartnersApi('CUSTOMERS');
    // this.contacts = await this.contactService.getContactsApi();
    // this.countries = await this.countryService.getCountriesApi();
    // this.states = await this.stateService.getStatesApi();
    // this.cities = await this.cityService.getCitiesApi();
    // this.vStates = this.states;
    // this.vCities = this.cities;


    if (this.action == 'EDIT') {
      //this.onChangeCountry(this.partner.country);
      this.leadApi = Object.assign({},this.lead);
      this.rowDataCont = this.leadApi?.personContact != null ? this.leadApi.personContact : []
      this.arrGroup(this.rowDataCont, 'group');
      this.arrSort(this.leadApi?.address, 'index');
      this.addressEN = this.leadApi?.address[0];
      this.addressVN = this.leadApi?.address[1];
      if (this.leadApi?.address.length > 2) {
        for (let i = 2; i < this.leadApi?.address.length; i++) {
          this.arrAddr.push(this.leadApi?.address[i]);
        }
      }
      else {
        this.arrAddr.push(new Address())
      }

      // this.saleManage = this.contacts.find(
      //   value => value.contactID === this.leadApi.saleManage
      // );
      // this.officeAgent = this.customers.find(
      //   value => value.partnerID === this.leadApi.officeAgent
      // );
      // this.country = this.countries.find(
      //   value => value.countryID === this.leadApi.country
      // );
      // this.state = this.states.find(
      //   value => value.stateID === this.leadApi.state
      // );
      // this.city = this.cities.find(
      //   value => value.cityID === this.leadApi.city
      // );

      this.onChangeCountry();
    }
    else if (this.action == 'ADD') {
      this.leadApi = this.lead;

      this.addressEN = new Address();
      this.addressEN.index = 1; this.addressEN.isMainAddress = true;
      this.addressVN = new Address();
      this.addressVN.index = 2; this.addressVN.isMainAddress = true;
      this.arrAddr.push(new Address())

      this.rowDataCont = [];
      this.rowDataTrans = [];
      this.rowDataQuota = [
        {
          id: 'QO00123',
          date: '2019-12-12',
          pol: 'HCM',
          pod: 'HN'
        }
      ];
    }

    this.leadClone = this.leadApi;
    this.isLoading = false;
  }

  async close() {
    // this.setValue;
    // if (!isEqual(this.leadApi, this.leadClone)) {
    //   let dialogResult = MessageBox.show(this.modal, 'Do you want to save data ?', 'Confirm', MessageBoxButtons.yesNoCancel, MessageBoxIcons.question);
    //   dialogResult.then(async (result) => {
    //     if (result === 'YES') {
    //       await this.save();
    //       this.activeModal.close(this.lead);
    //     }
    //     else if (result === 'NO') {
    //       this.activeModal.close(this.lead);
    //     }
    //     else if (result === 'CANCEL') {
    //     }
    //   })
    // }
    // else {
    //   this.activeModal.close(this.lead);
    // }
    this.activeModal.close()
  }

  convertCus() {
    let addNew = new PartnerView();
    addNew =  this.leadApi;
    addNew.partnerID = '';
    addNew.action = 'CONVERT';debugger
    const modalRef = this.modal.open(CustomerAddComponent, { windowClass: 'gr-modal-full', backdrop: false, keyboard: false })
    modalRef.componentInstance.customer = addNew;
    modalRef.result.then((result) => {
      if (result.action === 'ADD') {
        console.log(result);
      }
    });
  }

  quota() {
    window.alert('Button Make a Quotation clicked!');
  }

  delete() {
    let dialogResult = MessageBox.show(this.modal, 'Do you want to delete ?', 'Confirm', MessageBoxButtons.yesNo, MessageBoxIcons.question);
    dialogResult.then(async (result) => {
      if (result === 'YES') {
        let res = await this.leadService.delLeadsApi(this.leadApi);
        if (res.value) {
          this.lead.action = 'DELETE';
          this.activeModal.close(this.lead);
        }
        else {
          let dialogResult = MessageBox.show(this.modal, res.message, 'Alert', MessageBoxButtons.ok, MessageBoxIcons.warning);
          dialogResult.then((result) => { });
        }
      }
    })
  }

  setValue() {
    this.leadApi.personContact = this.rowDataCont;

    let arrAddr = [];
    arrAddr.push(this.addressEN);
    arrAddr.push(this.addressVN);
    let addrIndex = 3;
    this.arrAddr.forEach(addr => {
      if (addr.addressInfo != null && addr.addressInfo != '') {
        addr.index = addrIndex;
        arrAddr.push(addr);
        addrIndex += 1;
      }
    })
    this.leadApi.address = arrAddr;
    this.leadApi.saleManage = this.lead.saleManage != null ? this.lead.saleManage.contactID : null;
    this.leadApi.officeAgent = this.lead.officeAgent != null ? this.lead.officeAgent.partnerID : null;
    this.leadApi.country = this.lead.country != null ? this.lead.country.countryID : null;
    this.leadApi.state = this.lead.state != null ? this.lead.state.stateID : null;
    this.leadApi.city = this.lead.city != null ? this.lead.city.cityID : null;debugger
  }

  async setValue4Save() {
   this.setValue();
    if (this.action == 'ADD') {
      this.leadApi.creator = 'ADMIN'
      this.leadApi.dateCreate = formatDate(new Date(), "dd/MM/yyyy", "en-US");

      this.leadApi.group = 'LEADS';

    }
    else {
      this.leadApi.dateModify = formatDate(new Date(), "dd/MM/yyyy", "en-US");;
      this.leadApi.dateCreate = this.lead.dateCreate
    }
  }

  validData() {
    var isValid = true;
    var message = '';
    if (this.leadApi.partnerNameAbbr == null || this.leadApi.partnerNameAbbr === '') {
      isValid = false;
      message = "The field Name (Abbr) can't be empty !"
    }
    if (this.leadApi.partnerNameFullEN == null || this.leadApi.partnerNameFullEN === '') {
      isValid = false;
      message = "The field Name (Full-EN) can't be empty !"
    }
    if (this.addressEN == null || this.addressEN === '') {
      isValid = false;
      message = "The field Main Addr (EN) can't be empty !"
    }
    if (this.leadApi.country == null || this.leadApi.country === '') {
      isValid = false;
      message = "The field Country can't be empty !"
    }
    if (this.leadApi.city == null || this.leadApi.city === '') {
      isValid = false;
      message = "The field City can't be empty !"
    }
    if (this.leadApi.homePhone == null || this.leadApi.homePhone === '') {
      isValid = false;
      message = "The field Phone 1 can't be empty !"
    }
    if (this.leadApi.email == null || this.leadApi.email === '') {
      isValid = false;
      message = "The field Email can't be empty !"
    }
    if (!isEmail(this.leadApi.email)) {
      isValid = false;
      message = "The field Email not correct format !"
    }
    if (this.leadApi.website != null && this.leadApi.website !== '' && !isWebsite(this.leadApi.website)) {
      isValid = false;
      message = "The field Website not correct format !"
    }

    return { isValid: isValid, message: message };
  }

  async save() {
    await this.setValue4Save();
    await this.saveData();
  }

  async saveData() {
    var validData = this.validData();
    if (validData.isValid) {
      console.log(this.leadApi);
      if (this.action === 'ADD') {
        let resApi = await this.leadService.insLeadsApi(this.leadApi);
        if (resApi) {
          let _id = await this.leadService.getLeadApi(resApi.partnerID);
          this.leadApi._id = _id._id;
          this.action = 'EDIT';
          this.setValueToView();
          let dialogResult = MessageBox.show(this.modal, 'Successfully saved!', 'Notification', MessageBoxButtons.ok, MessageBoxIcons.information);
          dialogResult.then((result) => {
            this.leadClone = { ...this.leadApi };
          });
        }
        else {
          let dialogResult = MessageBox.show(this.modal, resApi.message, 'Alert', MessageBoxButtons.ok, MessageBoxIcons.warning);
          dialogResult.then((result) => { });
        }
      }
      else if (this.action === 'EDIT') {
        let resApi = await this.leadService.updLeadsApi(this.leadApi);debugger
        if (resApi) {

          let dialogResult = MessageBox.show(this.modal, 'Successfully saved!', 'Notification', MessageBoxButtons.ok, MessageBoxIcons.information);
          dialogResult.then((result) => {
            this.leadClone = { ...this.leadApi };
          });
        }
        else {
          let dialogResult = MessageBox.show(this.modal, resApi.message, 'Alert', MessageBoxButtons.ok, MessageBoxIcons.warning);
          dialogResult.then((result) => { });
        }
      }
    }
    else {
      let dialogResult = MessageBox.show(this.modal, validData.message, 'Alert', MessageBoxButtons.ok, MessageBoxIcons.warning);
      dialogResult.then((result) => { });
    }
  }

  setValueToView() {
    // this.lead = transportValue(this.lead, this.leadApi);
    // this.lead.countryName = this.country != null ? this.country.countryName : '';
    // this.lead.stateName = this.state != null ? this.state.stateName : '';
    // this.lead.cityName = this.city != null ? this.city.cityName : '';
    // this.lead.saleManageName = this.saleManage != null ? this.saleManage.contactName : '';
  }

  onGridReadyCont(params) {
    this.gridApiCont = params.api;
    let row = this.rowDataCont;
    let dataSource = {
      rowCount: null,
      getRows: function (params) {
        setTimeout(function () {
          var rowsThisPage = row.slice(params.startRow, params.endRow);
          var lastRow = -1;
          if (row.length <= params.endRow) {
            lastRow = row.length;
          }
          params.successCallback(rowsThisPage, lastRow);
        }, 100);
      }
    };
    this.gridApiCont.setDatasource(dataSource);
  }

  addNewCont() {
    let addNew = new PersonContact;
    const modalRef = this.modal.open(ContactPersonComponent, { windowClass: 'gr-modal-cont', backdrop: false, keyboard: false })
    modalRef.componentInstance.action = 'ADD'
    modalRef.componentInstance.data = addNew
    modalRef.result.then((result) => {
      this.rowDataCont.push(result);
      this.arrGroup(this.rowDataCont, 'group');
      let row = this.rowDataCont;
      let dataSource = {
        rowCount: null,
        getRows: function (params) {
          setTimeout(function () {
            var rowsThisPage = row.slice(params.startRow, params.endRow);
            var lastRow = -1;
            if (row.length <= params.endRow) {
              lastRow = row.length;
            }
            params.successCallback(rowsThisPage, lastRow);
          }, 100);
        }
      };
      this.gridApiCont.setDatasource(dataSource);
    }, (reason) => {
      console.log('reason dismiss', reason);
    })
  }

  editCont(event) {
    let edit = <PersonContact>event.data;
    let rowIndex = event.rowIndex;
    const modalRef = this.modal.open(ContactPersonComponent, { windowClass: 'gr-modal-cont', backdrop: false, keyboard: false })
    modalRef.componentInstance.action = 'EDIT'
    modalRef.componentInstance.data = edit
    modalRef.result.then((result) => {
      this.rowDataCont[rowIndex] = result;
      this.arrGroup(this.rowDataCont, 'group');
      let row = this.rowDataCont;
      let dataSource = {
        rowCount: null,
        getRows: function (params) {
          setTimeout(function () {
            var rowsThisPage = row.slice(params.startRow, params.endRow);
            var lastRow = -1;
            if (row.length <= params.endRow) {
              lastRow = row.length;
            }
            params.successCallback(rowsThisPage, lastRow);
          }, 100);
        }
      };
      this.gridApiCont.setDatasource(dataSource);
    }, (reason) => {
      console.log('reason dismiss', reason);
    })
  }

  deleteCont() {
    let dialogResult = MessageBox.show(this.modal, 'Do you want to delete ?', 'Confirm', MessageBoxButtons.yesNo, MessageBoxIcons.question);
    dialogResult.then((result) => {
      if (result === 'YES') {
        var selectedNode = this.gridApiCont.getSelectedNodes()
        this.rowDataCont.splice(selectedNode[0].id, 1);
        this.arrGroup(this.rowDataCont, 'group');
        let row = this.rowDataCont;
        let dataSource = {
          rowCount: null,
          getRows: function (params) {
            setTimeout(function () {
              var rowsThisPage = row.slice(params.startRow, params.endRow);
              var lastRow = -1;
              if (row.length <= params.endRow) {
                lastRow = row.length;
              }
              params.successCallback(rowsThisPage, lastRow);
            }, 100);
          }
        }
        this.gridApiCont.setDatasource(dataSource);
      }
    });
  }

  onGridReadyTrans(params) {
    this.gridApiTrans = params.api;
  }

  addNewTrans() {
    let addNew = new PartnerTransaction();
    console.log(addNew);
    addNew.action = "ADD";
    addNew.partnerID = this.leadApi.partnerID;
    this.openPopupTrans(addNew);
  }

  editTrans(event) {
    let edit = <PartnerTransaction>event.data;
    console.log(edit);
    edit.action = "EDIT";
    edit.partnerID = this.leadApi.partnerID;
    this.openPopupTrans(edit);
  }

  deleteTrans() {
    let selectedData = this.gridApiTrans.getSelectedRows();
    let dialogResult = MessageBox.show(this.modal, 'Do you want to delete!', 'Confirm', MessageBoxButtons.yesNo, MessageBoxIcons.question);
    dialogResult.then((result) => {
      if (result === 'YES') {
        console.log(selectedData[0]);
        this.partnertransactionService.delPartnerTransactionsApi(selectedData[0]).subscribe(
          data => {
            if (data.value === true) {
              var res = this.gridApiTrans.updateRowData({ remove: selectedData });
              console.log(res);
            }
            else {
              window.alert(data.message);
            }
          }
        );
      }
    });
  }

  openPopupTrans(trans) {
    const modalRef = this.modal.open(TransactionComponent, { windowClass: 'gr-modal-trans', backdrop: false, keyboard: false })
    modalRef.componentInstance.data = trans;
    modalRef.result.then((result) => {
      if (result.partnerID != null && result.partnerID !== '') {
        console.log(result);
        if (result.action === 'ADD') {
          var res = this.gridApiTrans.updateRowData({ add: [result] });
          console.log(res, result.action);
        }
        else if (result.action === 'EDIT') {
          var res = this.gridApiTrans.updateRowData({ update: [result] });
          console.log(res, result.action);
        }
      }
    }, (reason) => {
      console.log('reason dismiss', reason);
    });
  }

  onChangeCountry() {
    // if (this.country !== '' && this.country !== null) {
    //   this.vStates = this.states.filter(
    //     state => state.countryID === this.country.countryID
    //   );
    //   this.vCities = this.cities.filter(
    //     city => city.countryID === this.country.countryID
    //   );
    // }
    // else {
    //   this.vStates = this.states;
    //   this.vCities = this.cities;
    // }
  }

  addMore() {
    this.arrAddr.push(new Address())
  }

  arrSort(array, sortBy: string) {
    array.sort(function (a, b) {
      var A = isString(a[sortBy]) ? a[sortBy].toUpperCase() : a[sortBy]; // bỏ qua hoa thường
      var B = isString(b[sortBy]) ? b[sortBy].toUpperCase() : b[sortBy]; // bỏ qua hoa thường
      if (A < B) {
        return -1;
      }
      if (A > B) {
        return 1;
      }
      //trùng nhau
      return 0;
    });
  }

  arrGroup(array, sortBy: string) {
    this.arrSort(array, sortBy);
    let group = '';
    for (let i = 0; i < array.length; i++) {
      if (group != array[i][sortBy]) {
        group = array[i][sortBy]
        array[i].groupView = group
      }
    }
  }
}
