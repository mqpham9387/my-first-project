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

import { AuthorisedComponent } from "../../../modal/authorised/authorised.component";
import { ContactPersonComponent } from "../../../modal/contact-person/contact-person.component";
import { DoCheck, KeyValueDiffers, KeyValueDiffer } from "@angular/core";
import {
  PersonContact,
  Address,
  Partner,
  saleAuthorised,
} from "src/app/main/model/partner/partner";
import { PartnerAppraisal } from "src/app/main/model/partner-appraisal/partner-appraisal";

import { PartnerService } from "src/app/main/model/partner/partner.service";
import { CityService } from "src/app/main/model/city/city.service";
import { CompanyService } from "src/app/main/model/company/company.service";
import { ContactService } from "src/app/main/model/contact/contact.service";
import { CountryService } from "src/app/main/model/country/country.service";
import { CurrencyService } from "src/app/main/model/currency/currency.service";
import { LocationService } from "src/app/main/model/location/location.service";
import { PartnerAppraisalService } from "src/app/main/model/partner-appraisal/partner-appraisal.service";
import { StateService } from "src/app/main/model/state/state.service";
import { SourceService } from "src/app/main/model/source/source.service";
import { TransactionTypeService } from "src/app/main/model/transaction-type/transaction-type.service";

@Component({
  selector: "app-agent-add",
  templateUrl: "./agent-add.component.html",
  styleUrls: ["./agent-add.component.css"],
  encapsulation: ViewEncapsulation.None,
})
export class AgentAddComponent implements OnInit {
  @Input() agent;

  public isLoading = true;
  public action = "";
  public partnerClone;
  public partnerAppraisalsClone;

  partner;

  count = 0;
  columnDefsCont;
  rowDataCont = [];
  gridApiCont;
  columnDefsAuthor;
  rowDataAuthor = [];
  gridApiAuthor;
  defaultColDef;
  frameworkComponents;

  saleManage;
  officeAgent;
  country;
  city;
  state;
  source;
  accountReference;
  profileID;
  a='ssss'
  contacts;
  agents;
  countries;
  states;
  cities;
  locations;
  sources;
  currencies;
  companies;

  vCities;
  vStates;
  vCurrencies;

  addressEN;
  addressVN;
  arrAddr = [];

  partnerAppraisals;

  constructor(
    public activeModal: NgbActiveModal,
    public modal: NgbModal,
    public partnerService: PartnerService,
    public partnerAppraisalService: PartnerAppraisalService,
    public companyService: CompanyService,
    public countryService: CountryService,
    public stateService: StateService,
    public cityService: CityService,
    public locationService: LocationService,
    public sourceService: SourceService,
    public contactService: ContactService,
    public currencyService: CurrencyService,
    public transtypeService: TransactionTypeService
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
          return data.value != null && data.value != ""
            ? formatDate(data.value, "dd/MM/yyyy", "en-US")
            : "";
        },
      },
      { headerName: "Note", field: "note", width: 500, filter: true },
    ];
    this.columnDefsAuthor = [
      {
        headerName: "Contact Name",
        width: 300,
        field: "contactName",
        sortable: true,
        filter: true,
      },
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
    this.action = this.agent.action;
    if (this.action == "ADD") {
      this.partner = new Partner();
      this.addressEN = new Address();
      this.addressEN.index = 1;
      this.addressEN.isMainAddress = true;
      this.addressVN = new Address();
      this.addressVN.index = 2;
      this.addressVN.isMainAddress = true;
      this.arrAddr.push(new Address());
      this.rowDataCont = [];
      this.rowDataAuthor = [];
      this.partnerAppraisals = [];
      let transServicesAPI = await this.transtypeService.getTransactionTypesApi();
      // transServicesAPI.forEach((serviceAPI) => {
      //   if (serviceAPI.transactionTypeID !== "") {
      //     let rowAppraisal = new PartnerAppraisal();
      //     rowAppraisal.serviceID = serviceAPI.transactionTypeID;
      //     rowAppraisal.service_IDKey = serviceAPI._id;
      //     rowAppraisal.serviceName = serviceAPI.transactionTypeName;
      //     rowAppraisal.export = serviceAPI.export;
      //     rowAppraisal.group = serviceAPI.group;
      //     rowAppraisal.add = true;
      //     this.partnerAppraisals.push(rowAppraisal);
      //   }
      // });
      this.arrSort(this.partnerAppraisals, "group");
      this.lookup();
    }
    if (this.action === "EDIT") {
      this.partner = await this.partnerService.getPartnerApi(
        this.agent.partnerID
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

      this.rowDataAuthor =
        this.partner.objectSaleAuthorised != null
          ? this.partner.objectSaleAuthorised
          : [];

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

      this.partnerAppraisals = await this.partnerAppraisalService.getPartnerAppraisalsApiByID(
        this.partner.partnerID
      );
      let transServicesAPI = await this.transtypeService.getTransactionTypesApi();
      transServicesAPI.forEach((serviceAPI) => {
        if (serviceAPI.transactionTypeID !== "") {
          let find = this.partnerAppraisals.findIndex(
            (value) => value.serviceID === serviceAPI.transactionTypeID
          );
          if (find < 0) {
            let rowAppraisal = new PartnerAppraisal();
            rowAppraisal.serviceID = serviceAPI.transactionTypeID;
            rowAppraisal.service_IDKey = serviceAPI._id;
            rowAppraisal.serviceName = serviceAPI.transactionTypeName;
            rowAppraisal.export = serviceAPI.export;
            rowAppraisal.group = serviceAPI.group;
            rowAppraisal.add = true;
            this.partnerAppraisals.push(rowAppraisal);
          } else {
            this.partnerAppraisals[find].serviceName =
              serviceAPI.transactionTypeName;
            this.partnerAppraisals[find].export = serviceAPI.export;
            this.partnerAppraisals[find].group = serviceAPI.group;
          }
        }
      });
      this.arrSort(this.partnerAppraisals, "group");
      await this.lookup();
      // this.onChangeCountry();
    }

    this.partnerClone = Object.assign({}, this.partner);
    let rowAppraisal = [];
    this.partnerAppraisals.forEach((row) => {
      let rowData = Object.assign({}, row);
      rowAppraisal.push(rowData);
    });
    this.partnerAppraisalsClone = rowAppraisal;
    this.isLoading = false;
  }

  async lookup() {
    this.locations = await this.locationService.getLocationsApi();
    this.sources = await this.sourceService.getSourcesApi();
    this.currencies = await this.currencyService.getCurrenciesApi();
  }

  async close() {
    // await this.setValue();
    // if (!isEqual(this.partner, this.partnerClone) || this.rateChange()) {
    // let dialogResult = MessageBox.show(
    //   this.modal,
    //   "Do you want to save data ?",
    //   "Confirm",
    //   MessageBoxButtons.yesNoCancel,
    //   MessageBoxIcons.question
    // );
    // dialogResult.then(async (result) => {
    //   if (result === "YES") {
    //     await this.save();
    //     this.activeModal.close(this.agent);
    //   } else if (result === "NO") {
    //     this.activeModal.close(this.agent);
    //   } else if (result === "CANCEL") {
    //   }
    // });
    // } else {
    //   this.activeModal.close(this.agent);
    // }
    this.activeModal.dismiss()
  }

  quota() {
    window.alert("Button Quotation clicked!");
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
        let res: any = await this.partnerService.delPartnersApi(this.agent);
        if (res.value) {
          this.agent.action = "DELETE";
          this.activeModal.close(this.agent);
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
    let dataAuthor = [];
    this.rowDataAuthor.forEach((rowData) => {
      dataAuthor.push(rowData.contactID);
    });
    this.partner.saleAuthorised = dataAuthor;

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
      this.agent.country != null ? this.agent.country.countryID : null;
    this.partner.city = this.agent.city != null ? this.agent.city.cityID : null;
    this.partner.state =
      this.agent.state !== null ? this.agent.state.stateID : null;
    this.partner.officeAgent =
      this.agent.officeAgent !== null
        ? this.agent.officeAgent?.partnerID
        : null;
    this.partner.accountReference =
      this.agent.accountReference != null
        ? this.agent.accountReference.partnerID
        : null;
    this.partner.currency =
      this.agent.currency != null ? this.agent.currency.currencyID : null;
    this.partner.termCurrencyForCredit =
      this.agent.termCurrencyForCredit != null
        ? this.agent.termCurrencyForCredit.currencyID
        : null;
    this.partner.source =
      this.agent.source != null ? this.agent.source.sourceID : null;
    this.partner.profileID =
      this.agent.profileID != null ? this.agent.profileID.companyID : null;
    this.partner.saleManage =
      this.agent.saleManage !== null ? this.agent.saleManage.contactID : null;
  }

  async setValue4Save() {
    this.setValue();

    if (this.action === "ADD") {
      this.partner.creator = "ADMIN";
      this.partner.dateCreate = formatDate(new Date(), "dd/MM/yyyy", "en-US");
      this.partner.dateModify = null;
      this.partner.group = "AGENTS";
    } else if (this.action === "EDIT") {
      this.partner.dateModify = formatDate(new Date(), "dd/MM/yyyy", "en-US");
      this.partner.dateCreate = this.agent.dateCreate;
    }
  }

  validData() {
    var isValid = true;
    var message = "";
    if (this.partner.source == null || this.partner.source === "") {
      isValid = false;
      message = "The field Source can't be empty !";
    }
    if (this.partner.location == null || this.partner.location === "") {
      isValid = false;
      message = "The field Location can't be empty !";
    }
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
    await this.rateChange();
    await this.saveData();
  }

  async saveData() {
    var validData = this.validData();
    if (validData.isValid) {
      console.log(this.partner);
      if (this.action === "ADD") {
        let resApi: any = await this.partnerService.insPartnersApi(
          this.partner
        );
        if (resApi.success) {
          let _id = await this.partnerService.getPartnerApi(resApi.partnerID);
          await this.saveAppraisal(this.partner);
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
        let resApi: any = await this.partnerService.updPartnersApi(
          this.partner
        );
        if (resApi.value) {
          await this.saveAppraisal(this.partner);
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

  saveAppraisal(partner) {
    this.partnerAppraisalsClone.forEach(async (appraisal) => {
      if (appraisal.add) {
        appraisal.partner_IDKey = partner._id;
        appraisal.partnerID = partner.partnerID;
        appraisal.creator = "ADMIN";
        appraisal.dateCreate = formatDate(new Date(), "yyyy-MM-dd", "en-US");
        appraisal.updateBy = "ADMIN";
        appraisal.dateUpdate = formatDate(new Date(), "yyyy-MM-dd", "en-US");
        let add = await this.partnerAppraisalService.insPartnerAppraisalsApi(
          appraisal
        );
        appraisal._id = add._id;
        appraisal.add = false;
        appraisal.edit = true;
      } else if (appraisal.edit) {
        appraisal.updateBy = "ADMIN";
        appraisal.dateUpdate = formatDate(new Date(), "yyyy-MM-dd", "en-US");
        await this.partnerAppraisalService.updPartnerAppraisalsApi(appraisal);
      }
    });
    console.log("saved!", this.partnerAppraisalsClone);
  }

  setValueToView() {
    // this.agent = transportValue(this.agent, this.partner);
    // let accountReference =
    //   this.accountReference != null
    //     ? this.accountReference.partnerNameAbbr
    //     : "";
    // this.agent.accountReferenceName =
    //   accountReference == null || accountReference === ""
    //     ? this.partner.partnerNameAbbr
    //     : accountReference;
    // this.agent.saleManageName =
    //   this.saleManage != null ? this.saleManage.contactName : "";
    // this.agent.countryName =
    //   this.country != null ? this.country.countryName : "";
    // this.agent.stateName = this.state != null ? this.state.stateName : "";
    // this.agent.cityName = this.city != null ? this.city.cityName : "";
    // this.agent.sourceName = this.source != null ? this.source.sourceName : "";
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
      backdrop: "static",
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
      backdrop: "static",
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

  onGridReadyAuthor(params) {
    this.gridApiAuthor = params.api;
  }

  addNewAuthor() {
    let addNew = new saleAuthorised();
    const modalRef = this.modal.open(AuthorisedComponent, {
      windowClass: "gr-modal-author",
      backdrop: "static",
      keyboard: false,
    });
    modalRef.componentInstance.action = "ADD";
    modalRef.componentInstance.data = addNew;
    modalRef.componentInstance.rowDataAuthor = this.rowDataAuthor;
    modalRef.result.then(
      (result) => {
        this.rowDataAuthor.push(result);
        var res = this.gridApiAuthor.updateRowData({ add: [result] });
      },
      (reason) => {
        console.log("reason dismiss", reason);
      }
    );
  }

  editAuthor(event) {
    let edit = event.data;
    let rowIndex = event.rowIndex;
    const modalRef = this.modal.open(AuthorisedComponent, {
      windowClass: "gr-modal-author",
      backdrop: "static",
      keyboard: false,
    });
    modalRef.componentInstance.action = "EDIT";
    modalRef.componentInstance.data = edit;
    modalRef.componentInstance.rowDataAuthor = this.rowDataAuthor;
    modalRef.result.then(
      (result) => {
        this.rowDataAuthor[rowIndex] = result;
        var res = this.gridApiAuthor.updateRowData({ update: [result] });
      },
      (reason) => {
        console.log("reason dismiss", reason);
      }
    );
  }

  deleteAuthor() {
    var selectedData = this.gridApiAuthor.getSelectedRows();
    var selectedNode = this.gridApiAuthor.getSelectedNodes();
    var res = this.gridApiAuthor.updateRowData({ remove: selectedData });
    let remove = this.rowDataAuthor.splice(selectedNode[0].id, 1);
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

  rateChange() {
    var isChanged: boolean = false;
    this.partnerAppraisalsClone.forEach((row) => {
      let find = this.partnerAppraisals.find(
        (value) => value.serviceID === row.serviceID
      );
      if (find != undefined && find.priority != row.priority) {
        row.priority = find.priority;
        row.edit = row.add ? false : true;
        isChanged = true;
      }
    });
    return isChanged;
  }
}
