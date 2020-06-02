import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { formatDate } from '@angular/common';
import { isString, padLeft, isEqual, isEmail, isWebsite, transportValue } from 'src/app/main/common/util';
import { PersonContact, Address, Partner } from 'src/app/main/model/partner/partner';
import { PartnerAppraisal } from 'src/app/main/model/partner-appraisal/partner-appraisal';
import { ContactPersonComponent } from '../../../modal/contact-person/contact-person.component';
import { PartnerService } from 'src/app/main/model/partner/partner.service';
import { CategoryService } from 'src/app/main/model/category/category.service';
import { CityService } from 'src/app/main/model/city/city.service';
import { ContactService } from 'src/app/main/model/contact/contact.service';
import { CountryService } from 'src/app/main/model/country/country.service';
import { PartnerAppraisalService } from 'src/app/main/model/partner-appraisal/partner-appraisal.service';
import { StateService } from 'src/app/main/model/state/state.service';
import { TransactionTypeService } from 'src/app/main/model/transaction-type/transaction-type.service';
import { CustomHeader } from 'src/app/main/common/ag-grid-header-custom';
import { MessageBox, MessageBoxButtons, MessageBoxIcons } from 'src/app/form/message/messsage';
import { CurrencyService } from 'src/app/main/model/currency/currency.service';
import { CarrierCodeService } from 'src/app/main/model/carrier-code/carrier-code.service';
import { PartnerCarrierService } from 'src/app/main/model/partner-carrier/partner-carrier.service';

@Component({
  selector: 'app-carrier-add',
  templateUrl: './carrier-add.component.html',
  styleUrls: ['./carrier-add.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class CarrierAddComponent implements OnInit {
  @Input() carrier;

  public isLoading = true;
  public action = "";
  public partnerClone;
  public partnerAppraisalsClone;
  public partnerCarrierCodeClone;

  partner;

  columnDefsCont;
  rowDataCont = [];
  gridApiCont;
  columnDefsCarrier;
  rowDataCarrier = [];
  gridApiCarrier;
  defaultColDef;
  frameworkComponents;

  saleManage;
  officeAgent;
  country;
  city;
  state;
  accountReference;

  contacts;
  carriers;
  countries;
  states;
  cities;
  categories;
  currencies;

  vCities;
  vStates;
  vCurrencies;

  addressEN;
  addressVN;
  arrAddr = [];

  partnerAppraisals;
  partnerCarrierCode;

  constructor(
    public activeModal: NgbActiveModal,
    public modal: NgbModal,
    public partnerService: PartnerService,
    public partnerAppraisalService: PartnerAppraisalService,
    public countryService: CountryService,
    public stateService: StateService,
    public cityService: CityService,
    public categoryService: CategoryService,
    public contactService: ContactService,
    public transtypeService: TransactionTypeService,
    public currencyService: CurrencyService,
    public carriercodeService: CarrierCodeService,
    public partnercarrierService: PartnerCarrierService
  ) {
    this.columnDefsCont = [
      { headerName: 'Group', field: 'groupView', sortable: true, filter: true },
      { headerName: 'Full Name', field: 'fullname', width: 250, filter: true },
      { headerName: 'Position', field: 'position', filter: true },
      { headerName: 'Email', field: 'email', width: 200, filter: true },
      { headerName: 'Cell Phone', field: 'cellPhone', width: 200, filter: true },
      { headerName: 'Direct Line', field: 'directLine', width: 200, filter: true },
      {
        headerName: 'Birthday', field: 'birthday', filter: true, cellRenderer: (data) => {
          return data.value != null ? formatDate(data.value, 'dd/MM/yyyy', 'en-US') : '';
        }
      },
      { headerName: 'Note', field: 'note', width: 500, filter: true },
    ];
    this.columnDefsCarrier = [
      { headerName: 'Code', field: 'standardID', width: 200, sortable: true, filter: true },
      { headerName: 'Value', field: 'carrierCode', width: 200, sortable: true, filter: true, editable: true }
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
    this.action = this.carrier.action;

    // this.carriers = await this.partnerService.getPartnersApi('COLOADERS');
    // this.contacts = await this.contactService.getContactsApi();
    // this.countries = await this.countryService.getCountriesApi();
    // this.states = await this.stateService.getStatesApi();
    // this.cities = await this.cityService.getCitiesApi();
    this.categories = await this.categoryService.getCategoriesApi('SP');
    this.currencies = await this.currencyService.getCurrenciesApi();

    // this.vStates = this.states;
    // this.vCities = this.cities;
    // var rowCurrency = [];
    // if (this.currencies.length > 0) {
    //   rowCurrency.push({ currency: this.currencies[0].unit })
    //   this.currencies.forEach(currency => {
    //     let find = rowCurrency.findIndex(value => value.currency === currency.unit);
    //     if (find < 0) {
    //       rowCurrency.push({ currency: currency.unit })
    //     }
    //   })
    // }
    // this.vCurrencies = rowCurrency;

    if (this.action == 'EDIT') {
      this.partner = await this.partnerService.getPartnerApi(this.carrier.partnerID);

      this.partnerCarrierCode = await this.partnercarrierService.getPartnerCarriersApiByID(this.partner.partnerID);
      if (this.partnerCarrierCode != null) {
        this.rowDataCarrier = this.partnerCarrierCode;
      }
      else {
        this.rowDataCarrier = [];
      }

      if (this.partner.personContact != null) {
        let rowCont = [];
        this.partner.personContact.forEach(row => {
          let rowNew = Object.assign({}, row);
          rowCont.push(rowNew);
        });
        this.rowDataCont = rowCont;
        this.arrGroup(this.rowDataCont, 'group');
      }
      else {
        this.rowDataCont = [];
      }

      this.arrSort(this.partner.address, 'index');
      this.addressEN = this.partner.address[0];
      this.addressVN = this.partner.address[1];
      if (this.partner.address.length > 2) {
        for (let i = 2; i < this.partner.address.length; i++) {
          this.arrAddr.push(this.partner.address[i]);
        }
      }
      else {
        this.arrAddr.push(new Address())
      }

      // this.saleManage = this.contacts.find(
      //   value => value.contactID === this.partner.saleManage
      // );
      // this.officeAgent = this.carriers.find(
      //   value => value.partnerID === this.partner.officeAgent
      // );
      // this.country = this.countries.find(
      //   value => value.countryID === this.partner.country
      // );
      // this.state = this.states.find(
      //   value => value.stateID === this.partner.state
      // );
      // this.city = this.cities.find(
      //   value => value.cityID === this.partner.city
      // );
      // this.accountReference = this.carriers.find(
      //   value => value.partnerID === this.partner.accountReference
      // );

      this.partnerAppraisals = await this.partnerAppraisalService.getPartnerAppraisalsApiByID(this.partner.partnerID);
      let transServicesAPI = await this.transtypeService.getTransactionTypesApi();
      // transServicesAPI.forEach(serviceAPI => {
      //   if (serviceAPI.transactionTypeID !== '') {
      //     let find = this.partnerAppraisals.findIndex(
      //       service => service.serviceID === serviceAPI.transactionTypeID)
      //     if (find < 0) {
      //       let rowAppraisal = new PartnerAppraisal();
      //       rowAppraisal.serviceID = serviceAPI.transactionTypeID;
      //       rowAppraisal.service_IDKey = serviceAPI._id;
      //       rowAppraisal.serviceName = serviceAPI.transactionTypeName;
      //       rowAppraisal.export = serviceAPI.export;
      //       rowAppraisal.group = serviceAPI.group;
      //       rowAppraisal.add = true
      //       this.partnerAppraisals.push(rowAppraisal);
      //     }
      //     else {
      //       this.partnerAppraisals[find].serviceName = serviceAPI.transactionTypeName;
      //       this.partnerAppraisals[find].export = serviceAPI.export;
      //       this.partnerAppraisals[find].group = serviceAPI.group;
      //     }
      //   }
      // })
      this.arrSort(this.partnerAppraisals, 'group');
    }
    else if (this.action == 'ADD') {
      this.partner = new Partner();

      this.addressEN = new Address();
      this.addressEN.index = 1; this.addressEN.isMainAddress = true;
      this.addressVN = new Address();
      this.addressVN.index = 2; this.addressVN.isMainAddress = true;
      this.arrAddr.push(new Address())

      this.rowDataCont = [];
      this.partnerAppraisals = [];
      let transServicesAPI = await this.transtypeService.getTransactionTypesApi();
      // transServicesAPI.forEach(serviceAPI => {
      //   if (serviceAPI.transactionTypeID !== '') {
      //     let rowAppraisal = new PartnerAppraisal();
      //     rowAppraisal.serviceID = serviceAPI.transactionTypeID;
      //     rowAppraisal.service_IDKey = serviceAPI._id;
      //     rowAppraisal.serviceName = serviceAPI.transactionTypeName;
      //     rowAppraisal.export = serviceAPI.export;
      //     rowAppraisal.group = serviceAPI.group;
      //     rowAppraisal.add = true
      //     this.partnerAppraisals.push(rowAppraisal);
      //   }
      // })
      this.arrSort(this.partnerAppraisals, 'group');
    }

    this.partnerClone = Object.assign({}, this.partner);
    let rowAppraisal = []; console.log(this.partnerAppraisals);
    this.partnerAppraisals.forEach(row => {
      let rowData = Object.assign({}, row);;
      rowAppraisal.push(rowData);
    });
    this.partnerAppraisalsClone = rowAppraisal;

    this.isLoading = false;
  }

  async close() {
    // await this.setValue();
    // if (!isEqual(this.partner, this.partnerClone) || this.rateChange()) {
    //   let dialogResult = MessageBox.show(this.modal, 'Do you want to save data ?', 'Confirm', MessageBoxButtons.yesNoCancel, MessageBoxIcons.question);
    //   dialogResult.then(async (result) => {
    //     if (result === 'YES') {
    //       await this.save();
    //       this.activeModal.close(this.carrier);
    //     }
    //     else if (result === 'NO') {
    //       this.activeModal.close(this.carrier);
    //     }
    //     else if (result === 'CANCEL') {
    //     }
    //   })
    // }
    // else {
    //   this.activeModal.close(this.carrier);
    // }
    this.activeModal.dismiss()
  }

  delete() {
    let dialogResult = MessageBox.show(this.modal, 'Do you want to delete ?', 'Confirm', MessageBoxButtons.yesNo, MessageBoxIcons.question);
    dialogResult.then(async (result) => {
      if (result === 'YES') {
        let res = await this.partnerService.delPartnersApi(this.carrier);
        if (res.value) {
          this.carrier.action = 'DELETE';
          this.activeModal.close(this.carrier);
        }
        else {
          let dialogResult = MessageBox.show(this.modal, res.message, 'Alert', MessageBoxButtons.ok, MessageBoxIcons.warning);
          dialogResult.then((result) => { });
        }
      }
    })
  }

  async setValue() {
    let dataCarrier = [];
    this.rowDataCarrier.forEach(rowData => {
      dataCarrier.push(rowData);
    })
    this.partnerCarrierCode = dataCarrier;

    let dataCont = [];
    this.rowDataCont.forEach(rowData => {
      dataCont.push(rowData);
    })
    this.partner.personContact = dataCont;

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
    this.partner.address = arrAddr;
    this.partner.country =
    this.carrier.country != null ? this.carrier.country.countryID : null;
  this.partner.city = this.carrier.city != null ? this.carrier.city.cityID : null;
  this.partner.state =
    this.carrier.state !== null ? this.carrier.state.stateID : null;
  this.partner.officeAgent =
    this.carrier.officeAgent !== null
      ? this.carrier.officeAgent?.partnerID
      : null;
  this.partner.accountReference =
    this.carrier.accountReference != null
      ? this.carrier.accountReference.partnerID
      : null;
  this.partner.currency =
    this.carrier.currency != null ? this.carrier.currency.currencyID : null;
  this.partner.termCurrencyForCredit =
    this.carrier.termCurrencyForCredit != null
      ? this.carrier.termCurrencyForCredit.currencyID
      : null;
  this.partner.saleManage =
    this.carrier.saleManage !== null ? this.carrier.saleManage.contactID : null;
  }

  async setValue4Save() {
    this.setValue();

    if (this.action == 'ADD') {
      this.partner.creator = 'ADMIN'
      this.partner.dateCreate = formatDate(new Date(), "dd/MM/yyyy", "en-US");
      this.partner.group = 'COLOADERS';
      this.partner.category= this.categories.find(
        value => value.categoryID = this.partner.category
      );if(this.partner.category){this.partner.category=this.partner.category.categoryID}
     }
    else {
       this.partner.creator = 'ADMIN'
      this.partner.dateModify = formatDate(new Date(), "dd/MM/yyyy", "en-US");
      this.partner.dateCreate = this.carrier.dateCreate;
    }
  }

  validData() {
    var isValid = true;
    var message = '';
    if (this.partner.website === undefined || !isWebsite(this.partner.website)) {
      isValid = false;
      message = "The field Website not correct format !";
    }
    if (this.partner.email === undefined || !isEmail(this.partner.email)) {
      isValid = false;
      message = "The field Email not correct format !";
    }
    if (this.partner.email === null || this.partner.email === '') {
      isValid = false;
      message = "The field Email can't be empty !";
    }
    if (this.partner.homePhone == null || this.partner.homePhone === '') {
      isValid = false;
      message = "The field Phone 1 can't be empty !";
    }
    if (this.partner.city == null || this.partner.city === '') {
      isValid = false;
      message = "The field City can't be empty !";
    }
    if (this.partner.country == null || this.partner.country === '') {
      isValid = false;
      message = "The field Country can't be empty !";
    }
    if (this.addressEN == null || this.addressEN === '') {
      isValid = false;
      message = "The field Main Addr (EN) can't be empty !";
    }
    if (this.partner.partnerNameFullEN == null || this.partner.partnerNameFullEN === '') {
      isValid = false;
      message = "The field Name (Full-EN) can't be empty !";
    }
    if (this.partner.partnerNameAbbr == null || this.partner.partnerNameAbbr === '') {
      isValid = false;
      message = "The field Name (Abbr) can't be empty !";
    }

    return { isValid: isValid, message: message };
  }

  async save() {
    await this.setValue4Save();
    await this.rateChange();
    await this.saveData();
  }

  async saveData() {
    var validData = this.validData();
    if (validData.isValid) {
      console.log(this.partner);
      if (this.action === 'ADD') {
        let resApi = await this.partnerService.insPartnersApi(this.partner);
        if (resApi.success) {
          let _id = await this.partnerService.getPartnerApi(resApi.partnerID);
          await this.saveAppraisal(this.partner);
          this.partner._id = _id._id;
          this.action = 'EDIT';
          this.setValueToView();
          let dialogResult = MessageBox.show(this.modal, 'Successfully saved!', 'Notification', MessageBoxButtons.ok, MessageBoxIcons.information);
          dialogResult.then(async (result) => {
            this.partnerClone = { ...this.partner };
            let partnerCarrier = await this.partnercarrierService.getPartnerCarriersApiByID(this.partner.partnerID);
            if (partnerCarrier != null) {
              let rowCarrier = [];
              partnerCarrier.forEach(row => {
                let rowNew = Object.assign({}, row);
                rowCarrier.push(rowNew);
              })
              this.rowDataCarrier = rowCarrier;
            }
            else {
              this.rowDataCarrier = [];
            }
          });
        }
        else {
          let dialogResult = MessageBox.show(this.modal, resApi.message, 'Alert', MessageBoxButtons.ok, MessageBoxIcons.warning);
          dialogResult.then((result) => { });
        }
      }
      else if (this.action === 'EDIT') {
        let resApi = await this.partnerService.updPartnersApi(this.partner);
        if (resApi.value) {
          await this.saveAppraisal(this.partner);
          await this.saveCarrierCode()
          this.setValueToView()
          let dialogResult = MessageBox.show(this.modal, 'Successfully saved!', 'Notification', MessageBoxButtons.ok, MessageBoxIcons.information);
          dialogResult.then((result) => {
            this.partnerClone = { ...this.partner };
          });
        }
        else {
          let dialogResult = MessageBox.show(this.modal, resApi.message, 'Alert', MessageBoxButtons.ok, MessageBoxIcons.warning);
          dialogResult.then((result) => { });
        }
      }
    }
    else {
      let dialogResult = MessageBox.show(this.modal, validData.message, "Alert! Can't Save", MessageBoxButtons.ok, MessageBoxIcons.warning);
      dialogResult.then((result) => { });
    }
  }

  saveCarrierCode() {
    this.partnerCarrierCode.forEach(async carrier => {
      let res = await this.partnercarrierService.updPartnerCarriersApi(carrier)
      if (!res.value) {
        let dialogResult = MessageBox.show(this.modal, res.message, 'Alert', MessageBoxButtons.ok, MessageBoxIcons.warning);
        dialogResult.then((result) => { });
      }
    });
    console.log('saved!', this.partnerAppraisals);
  }

  saveAppraisal(partner) {
    this.partnerAppraisals.forEach(async appraisal => {
      if (appraisal.add) {
        appraisal.partner_IDKey = partner._id;
        appraisal.partnerID = partner.partnerID;
        appraisal.creator = 'ADMIN';
        appraisal.dateCreate = formatDate(new Date(), "dd/MM/yyyy", "en-US");
        appraisal.updateBy = null;
        appraisal.dateUpdate = null;
        let add = await this.partnerAppraisalService.insPartnerAppraisalsApi(appraisal);
        appraisal._id = add._id;
        appraisal.add = false;
        appraisal.edit = true;
      }
      else if (appraisal.edit) {
        appraisal.updateBy = 'ADMIN';
        appraisal.dateUpdate =  formatDate(new Date(), "dd/MM/yyyy", "en-US");
        await this.partnerAppraisalService.updPartnerAppraisalsApi(appraisal)
      }
    });
    console.log('saved!', this.partnerAppraisals);
  }

  setValueToView() {
    // this.carrier = transportValue(this.carrier, this.partner);
    // let accountReference = this.accountReference != null ? this.accountReference.partnerNameAbbr : '';
    // this.carrier.accountReferenceName = (accountReference == null || accountReference === '') ? this.partner.partnerNameAbbr : accountReference;
    // this.carrier.saleManageName = this.saleManage != null ? this.saleManage.contactName : '';
    // this.carrier.countryName = this.country != null ? this.country.countryName : '';
    // this.carrier.stateName = this.state != null ? this.state.stateName : '';
    // this.carrier.cityName = this.city != null ? this.city.cityName : '';
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
    const modalRef = this.modal.open(ContactPersonComponent, { windowClass: 'gr-modal-cont', backdrop: 'static', keyboard: false })
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
    const modalRef = this.modal.open(ContactPersonComponent, { windowClass: 'gr-modal-cont', backdrop: 'static', keyboard: false })
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

  onChangeCountry(event) {
    if (event != '' || event != null) {
      this.vStates = this.states.filter(
        state => state.countryID === this.country.countryID
      );
      this.vCities = this.cities.filter(
        city => city.countryID === this.country.countryID
      );
    }
    else {
      this.vStates = this.states;
      this.vCities = this.cities;
    }
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

  rateChange() {
    var isChanged: boolean = false;
    this.partnerAppraisalsClone.forEach(row => {
      let find = this.partnerAppraisals.find(value => value.serviceID === row.serviceID)
      if (find != undefined && find.priority != row.priority) {
        row.priority = find.priority;
        row.edit = row.add ? false : true;
        isChanged = true;
      }
    })
    return isChanged;
  }
}
