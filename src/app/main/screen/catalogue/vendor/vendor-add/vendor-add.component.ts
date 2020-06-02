import { Component, OnInit, Input, ViewEncapsulation } from "@angular/core";
import { NgbActiveModal, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { formatDate } from "@angular/common";
import {
  isString,
  padLeft,
  isEqual,
  transportValue,
  isEmail,
  isWebsite,
} from "src/app/main/common/util";
import { CustomHeader } from "src/app/main/common/ag-grid-header-custom";
import {
  MessageBox,
  MessageBoxButtons,
  MessageBoxIcons,
} from "src/app/form/message/messsage";

import { ContactPersonComponent } from "../../../modal/contact-person/contact-person.component";

import {
  PersonContact,
  Address,
  Partner,
} from "src/app/main/model/partner/partner";
import { PartnerAppraisal } from "src/app/main/model/partner-appraisal/partner-appraisal";

import { PartnerService } from "src/app/main/model/partner/partner.service";
import { CityService } from "src/app/main/model/city/city.service";
import { ContactService } from "src/app/main/model/contact/contact.service";
import { CountryService } from "src/app/main/model/country/country.service";
import { CurrencyService } from "src/app/main/model/currency/currency.service";
import { StateService } from "src/app/main/model/state/state.service";

@Component({
  selector: "app-vendor-add",
  templateUrl: "./vendor-add.component.html",
  styleUrls: ["./vendor-add.component.css"],
  encapsulation: ViewEncapsulation.None,
})
export class VendorAddComponent implements OnInit {
  @Input() vendor;

  public isLoading = true;
  public action = "";
  public partnerClone;

  partner;

  columnDefsCont;
  rowDataCont = [];
  gridApiCont;
  defaultColDef;
  frameworkComponents;

  saleManage;
  country;
  city;
  state;
  accountReference;

  contacts;
  vendors;
  countries;
  states;
  cities;
  currencies;

  vCities;
  vStates;
  vCurrencies;

  addressEN;
  addressVN;
  arrAddr = [];

  constructor(
    public activeModal: NgbActiveModal,
    public modal: NgbModal,
    public partnerService: PartnerService,
    public countryService: CountryService,
    public stateService: StateService,
    public cityService: CityService,
    public contactService: ContactService,
    public currencyService: CurrencyService
  ) {
    this.columnDefsCont = [
      { headerName: "Group", field: "groupView", sortable: true, filter: true },
      { headerName: "Full Name", field: "fullname", width: 250, filter: true },
      { headerName: "Position", field: "position", filter: true },
      { headerName: "Email", field: "email", width: 200, filter: true },
      {
        headerName: "Cell Phone",
        field: "cellPhone",
        width: 200,
        filter: true,
      },
      {
        headerName: "Direct Line",
        field: "directLine",
        width: 200,
        filter: true,
      },
      {
        headerName: "Birthday",
        field: "birthday",
        filter: true,
        cellRenderer: (data) => {
          return data.value != null
            ? formatDate(data.value, "dd/MM/yyyy", "en-US")
            : "";
        },
      },
      { headerName: "Note", field: "note", width: 500, filter: true },
    ];
    this.defaultColDef = {
      width: 120,
      headerComponentParams: { menuIcon: "fas fa-filter" },
      sortable: true,
      resizable: true,
      filter: true,
    };
    this.frameworkComponents = { agColumnHeader: CustomHeader };
  }

  async ngOnInit() {
    this.action = this.vendor.action;

    // this.vendors = await this.partnerService.getPartnersApi("OTHER CONTACTS");
    // this.contacts = await this.contactService.getContactsApi();
    // this.countries = await this.countryService.getCountriesApi();
    // this.states = await this.stateService.getStatesApi();
    // this.cities = await this.cityService.getCitiesApi();
    this.currencies = await this.currencyService.getCurrenciesApi();
    this.vStates = this.states;
    this.vCities = this.cities;
    var rowCurrency = [];
    if (this.currencies.length > 0) {
      rowCurrency.push({ currency: this.currencies[0].unit });
      this.currencies.forEach((currency) => {
        let find = rowCurrency.findIndex(
          (value) => value.currency === currency.unit
        );
        if (find < 0) {
          rowCurrency.push({ currency: currency.unit });
        }
      });
    }
    this.vCurrencies = rowCurrency;

    if (this.action === "EDIT") {
      this.partner = await this.partnerService.getPartnerApi(
        this.vendor.partnerID
      );

      if (this.partner.personContact != null) {
        let rowCont = [];
        this.partner.personContact.forEach((row) => {
          let rowNew = Object.assign({}, row);
          rowCont.push(rowNew);
        });
        this.rowDataCont = rowCont;
        this.arrGroup(this.rowDataCont, "group");
      } else {
        this.rowDataCont = [];
      }

      this.arrSort(this.partner.address, "index");
      this.addressEN = this.partner.address[0];
      this.addressVN = this.partner.address[1];
      if (this.partner.address.length > 2) {
        for (let i = 2; i < this.partner.address.length; i++) {
          this.arrAddr.push(this.partner.address[i]);
        }
      } else {
        this.arrAddr.push(new Address());
      }

      // this.saleManage = this.contacts.find(
      //   value => value.contactID === this.partner.saleManage
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
      // this.accountReference = this.vendors.find(
      //   value => value.partnerID === this.partner.accountReference
      // );

      this.onChangeCountry();
    } else if (this.action === "ADD") {
      this.partner = new Partner();

      this.addressEN = new Address();
      this.addressEN.index = 1;
      this.addressEN.isMainAddress = true;
      this.addressVN = new Address();
      this.addressVN.index = 2;
      this.addressVN.isMainAddress = true;
      this.arrAddr.push(new Address());

      this.rowDataCont = [];
    }

    this.partnerClone = Object.assign({}, this.partner);
    this.isLoading = false;
  }

  async close() {
    await this.setValue();
    if (!isEqual(this.partner, this.partnerClone)) {
      let dialogResult = MessageBox.show(
        this.modal,
        "Do you want to save data ?",
        "Confirm",
        MessageBoxButtons.yesNoCancel,
        MessageBoxIcons.question
      );
      dialogResult.then(async (result) => {
        if (result === "YES") {
          await this.save();
          this.activeModal.close(this.vendor);
        } else if (result === "NO") {
          this.activeModal.close(this.vendor);
        } else if (result === "CANCEL") {
        }
      });
    } else {
      this.activeModal.close(this.vendor);
    }
  }

  delete() {
    let dialogResult = MessageBox.show(
      this.modal,
      "Do you want to delete ?",
      "Confirm",
      MessageBoxButtons.yesNo,
      MessageBoxIcons.question
    );
    dialogResult.then(async (result) => {
      if (result === "YES") {
        let res = await this.partnerService.delPartnersApi(this.vendor);
        if (res.value) {
          this.vendor.action = "DELETE";
          this.activeModal.close(this.vendor);
        } else {
          let dialogResult = MessageBox.show(
            this.modal,
            res.message,
            "Alert",
            MessageBoxButtons.ok,
            MessageBoxIcons.warning
          );
          dialogResult.then((result) => {});
        }
      }
    });
  }

  setValue() {
    let dataCont = [];
    this.rowDataCont.forEach((rowData) => {
      dataCont.push(rowData);
    });
    this.partner.personContact = dataCont;

    let arrAddr = [];
    arrAddr.push(this.addressEN);
    arrAddr.push(this.addressVN);
    let addrIndex = 3;
    this.arrAddr.forEach((addr) => {
      if (addr.addressInfo != null && addr.addressInfo !== "") {
        addr.index = addrIndex;
        arrAddr.push(addr);
        addrIndex += 1;
      }
    });
    this.partner.address = arrAddr;

    this.partner.country =
      this.vendor.country != null ? this.vendor.country.countryID : null;
    this.partner.city =
      this.vendor.city != null ? this.vendor.city.cityID : null;
    this.partner.state =
      this.vendor.state !== null ? this.vendor.state.stateID : null;
    this.partner.currency =
      this.vendor.currency != null ? this.vendor.currency.currencyID : null;
    this.partner.termCurrencyForCredit =
      this.vendor.termCurrencyForCredit != null
        ? this.vendor.termCurrencyForCredit.currencyID
        : null;
    this.partner.accountReference =
      this.vendor.accountReference != null
        ? this.vendor.accountReference.partnerID
        : null;
    this.partner.saleManage =
      this.vendor.saleManage !== null ? this.vendor.saleManage.contactID : null;
  }

  async setValue4Save() {
    this.setValue();

    if (this.action === "ADD") {
      this.partner.creator = "ADMIN";
      this.partner.dateCreate = formatDate(new Date(), "dd/MM/yyyy", "en-US");
      this.partner.dateModify = null
      this.partner.group = "OTHER CONTACTS";
    } else if (this.action === "EDIT") {
      this.partner.dateModify = formatDate(new Date(), "dd/MM/yyyy", "en-US");
      this.partner.dateCreate = this.vendor.dateCreate;
    }
  }

  validData() {
    var isValid = true;
    var message = "";
    if (this.partner.website == undefined || !isWebsite(this.partner.website)) {
      isValid = false;
      message = "The field Website not correct format !";
    }
    if (this.partner.email == undefined || !isEmail(this.partner.email)) {
      isValid = false;
      message = "The field Email not correct format !";
    }
    if (this.partner.email === null || this.partner.email === "") {
      isValid = false;
      message = "The field Email can't be empty !";
    }
    if (this.partner.homePhone == null || this.partner.homePhone === "") {
      isValid = false;
      message = "The field Phone 1 can't be empty !";
    }
    if (this.partner.city == null || this.partner.city === "") {
      isValid = false;
      message = "The field City can't be empty !";
    }
    if (this.partner.country == null || this.partner.country === "") {
      isValid = false;
      message = "The field Country can't be empty !";
    }
    if (this.addressEN == null || this.addressEN === "") {
      isValid = false;
      message = "The field Main Addr (EN) can't be empty !";
    }
    if (
      this.partner.partnerNameFullEN == null ||
      this.partner.partnerNameFullEN === ""
    ) {
      isValid = false;
      message = "The field Name (Full-EN) can't be empty !";
    }
    if (
      this.partner.partnerNameAbbr == null ||
      this.partner.partnerNameAbbr === ""
    ) {
      isValid = false;
      message = "The field Name (Abbr) can't be empty !";
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
      console.log(this.partner);
      if (this.action === "ADD") {
        let resApi = await this.partnerService.insPartnersApi(this.partner);
        if (resApi.success) {
          let _id = await this.partnerService.getPartnerApi(resApi.partnerID);
          this.partner._id = _id._id;
          this.action = "EDIT";
          this.setValueToView();
          let dialogResult = MessageBox.show(
            this.modal,
            "Successfully saved!",
            "Notification",
            MessageBoxButtons.ok,
            MessageBoxIcons.information
          );
          dialogResult.then((result) => {
            this.partnerClone = { ...this.partner };
          });
        } else {
          let dialogResult = MessageBox.show(
            this.modal,
            resApi.message,
            "Alert",
            MessageBoxButtons.ok,
            MessageBoxIcons.warning
          );
          dialogResult.then((result) => {});
        }
      } else if (this.action === "EDIT") {
        let resApi = await this.partnerService.updPartnersApi(this.partner);
        if (resApi) {
          this.setValueToView();
          let dialogResult = MessageBox.show(
            this.modal,
            "Successfully saved!",
            "Notification",
            MessageBoxButtons.ok,
            MessageBoxIcons.information
          );
          dialogResult.then((result) => {
            this.partnerClone = { ...this.partner };
          });
        } else {
          let dialogResult = MessageBox.show(
            this.modal,
            resApi.message,
            "Alert!",
            MessageBoxButtons.ok,
            MessageBoxIcons.warning
          );
          dialogResult.then((result) => {});
        }
      }
    } else {
      let dialogResult = MessageBox.show(
        this.modal,
        validData.message,
        "Alert! Can't Save",
        MessageBoxButtons.ok,
        MessageBoxIcons.warning
      );
      dialogResult.then((result) => {});
    }
  }

  setValueToView() {
    // this.vendor = transportValue(this.vendor, this.partner);
    // let accountReference = this.accountReference != null ? this.accountReference.partnerNameAbbr : '';
    // this.vendor.accountReferenceName = (accountReference == null || accountReference === '') ? this.partner.partnerNameAbbr : accountReference;
    // this.vendor.saleManageName = this.saleManage != null ? this.saleManage.contactName : '';
    // this.vendor.countryName = this.country != null ? this.country.countryName : '';
    // this.vendor.stateName = this.state != null ? this.state.stateName : '';
    // this.vendor.cityName = this.city != null ? this.city.cityName : '';
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
      },
    };
    this.gridApiCont.setDatasource(dataSource);
  }

  addNewCont() {
    let addNew = new PersonContact();
    const modalRef = this.modal.open(ContactPersonComponent, {
      windowClass: "gr-modal-cont",
      backdrop: false,
      keyboard: false,
    });
    modalRef.componentInstance.action = "ADD";
    modalRef.componentInstance.data = addNew;
    modalRef.result.then(
      (result) => {
        this.rowDataCont.push(result);
        this.arrGroup(this.rowDataCont, "group");
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
          },
        };
        this.gridApiCont.setDatasource(dataSource);
      },
      (reason) => {
        console.log("reason dismiss", reason);
      }
    );
  }

  editCont(event) {
    let edit = <PersonContact>event.data;
    let rowIndex = event.rowIndex;
    const modalRef = this.modal.open(ContactPersonComponent, {
      windowClass: "gr-modal-cont",
      backdrop: false,
      keyboard: false,
    });
    modalRef.componentInstance.action = "EDIT";
    modalRef.componentInstance.data = edit;
    modalRef.result.then(
      (result) => {
        this.rowDataCont[rowIndex] = result;
        this.arrGroup(this.rowDataCont, "group");
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
          },
        };
        this.gridApiCont.setDatasource(dataSource);
      },
      (reason) => {
        console.log("reason dismiss", reason);
      }
    );
  }

  deleteCont() {
    var selectedNode = this.gridApiCont.getSelectedNodes();
    this.rowDataCont.splice(selectedNode[0].id, 1);
    this.arrGroup(this.rowDataCont, "group");
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
      },
    };
    this.gridApiCont.setDatasource(dataSource);
  }

  onChangeCountry() {
    if (this.country != null && this.country !== "") {
      this.vStates = this.states.filter(
        (state) => state.countryID === this.country.countryID
      );
      this.vCities = this.cities.filter(
        (city) => city.countryID === this.country.countryID
      );
    } else {
      this.vStates = this.states;
      this.vCities = this.cities;
    }
  }

  addMore() {
    this.arrAddr.push(new Address());
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
    let group = "";
    for (let i = 0; i < array.length; i++) {
      if (group !== array[i][sortBy]) {
        group = array[i][sortBy];
        array[i].groupView = group;
      }
    }
  }
}
