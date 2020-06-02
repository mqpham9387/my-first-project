import { Component, OnInit } from "@angular/core";
import { formatCurrency, formatNumber } from "@angular/common";
import { ContactService } from "../../../model/contact/contact.service";
import { CurrencyService } from "src/app/main/model/currency/currency.service";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { updateRatesComponent } from "./updateRates/updateRates.component";
import { CompanyService } from "src/app/main/model/company/company.service";
import { CurrencyExchangeRate } from "src/app/main/model/currency/currency";
import { ButtonRendererComponent } from "src/app/main/common/button-renderer.component";
import { AddNewDetailComponent } from "./addnewDetail/addnewDetail.component";
import { AddNewComponent } from "./addnew/addnew.component";
import { CustomHeader } from "src/app/main/common/ag-grid-header-custom";
import { CurrencyExchangeRateService } from "src/app/main/model/currency/currencyExchange.service";
import {
  MessageBox,
  MessageBoxButtons,
  MessageBoxIcons,
} from "src/app/form/message/messsage";
import { formatDate } from "@angular/common";
import { GridHeaderActionsComponent } from "src/app/main/common/button-header-ag";
import { ButtonRenderer2Component } from 'src/app/main/common/button-renderer2.component';

@Component({
  selector: "currency",
  templateUrl: "./currency.component.html",
  styleUrls: ["./currency.component.css"],
})
export class CurrencyComponent implements OnInit {
  dateTimeLimit: string = formatDate(new Date("2050"), "dd/MM/yyyy", "en-US");
  contact;
  fromDate;
  toDate;
  contacts;
  columnDefs;
  columnDefs1;
  rowData;
  rowData1;
  gridApi;
  gridApi1;
  gridColumnApi;
  dropdownList = [];
  defaultColDef;
  edit = false;
  frameworkComponents;
  deleteArray = new Array();
  maxDate;
  minDate;
  components;
  defaultColDef1;
  localCurency = "VND";
  currencyExchangeRate = new CurrencyExchangeRate();
  constructor(
    public contactService: ContactService,
    public currencyService: CurrencyService,
    private modalService: NgbModal,
    private companyService: CompanyService,
    public modal: NgbModal,
    public currencyExchangeRateService: CurrencyExchangeRateService
  ) {
    this.columnDefs = [
      {
        headerName: "Currency",
        field: "currencyID",
        width: 150,
        sortable: true,
        filter: true,
        editable: false,
        // cellRenderer: "buttonRenderer2",
        // cellRendererParams: {
        //   onClick: this.editTable.bind(this),
        //   label: "Edit",
        //   onClick1: this.delete.bind(this),
        // },
      },
      {
        headerName: "Exchange Rate (USD)",
        field: "extUSD",
        width: 200,
        sortable: true,
        filter: true,
        editable: false,
        cellStyle: { "text-align": "right","border-left": "1px dotted skyblue", },
        cellRenderer: (data) => {
          return data.value ? formatNumber(data.value, "en", "1.0-10") : "";
        },
      },
      {
        headerName: "Commission Ex (USD)",
        field: "commissionExtUSD",
        width: 200,
        sortable: true,
        filter: true,
        editable: false,
        cellStyle: { "text-align": "right","border-left": "1px dotted skyblue", },
        cellRenderer: (data) => {
          return data.value ? formatNumber(data.value, "en", "1.0-10") : "";
        },
      },
      {
        headerName: "Exchange Rate (Local Currency)",
        field: "extVNDSales",
        width: 230,
        sortable: true,
        filter: true,
        cellStyle: { "text-align": "right","border-left": "1px dotted skyblue", },
        valueSetter: function numberValueSetter(params) {
          if (
            isNaN(parseFloat(params.newValue)) ||
            !isFinite(params.newValue) ||  params.newValue==0
          ) {
            return false;
          }
          params.data.extVNDSales = params.newValue;
          return true;
        },
        cellRenderer: (data) => {
          return data.value
            ? formatNumber(data.value, "en", "1.0-10")
            : "";
        },
      },
      {
        headerName: "Commission Ex (Local Currency)",
        field: "commissionExtVNDSales",
        width: 230,
        sortable: true,
        filter: true,
        cellStyle: { "text-align": "right","border-left": "1px dotted skyblue", },
        valueSetter: function numberValueSetter(params) {
          if (
            isNaN(parseFloat(params.newValue)) ||
            !isFinite(params.newValue) || params.newValue==0
          ) {
            return false;
          }
          params.data.commissionExtVNDSales = params.newValue;
          return true;
        },
        cellRenderer: (data) => {
          return data.value
            ? formatNumber(data.value, "en", "1.0-10")
            : "";
        },
      },
      {
        headerName: "notes",
        field: "notes",
        width: 500,
        sortable: true,
        filter: true,
      },
      {
        headerName: "",
        width: 100,
        cellRenderer: "buttonRenderer",
        editable: false,
        sortable: false,
        filter: true,
        resizable: false,
        pinned: "right",
        headerComponentFramework: GridHeaderActionsComponent,
        headerComponentParams: {
          onClick: this.addNewDetail.bind(this),
          onClick1: this.saveEdit.bind(this),
          onClick2: this.closeEdit.bind(this),
        },
        cellRendererParams: {
          onClick: this.editTable.bind(this),
          label: "Edit",
          onClick1: this.delete.bind(this),
        },
      },
    ];
    this.defaultColDef1 = {
      width: 120,
      headerComponentParams: { menuIcon: "fas fa-filter" },
      sortable: true,
      resizable: true,
      filter: true,
      filterParams: {
        debounceMs: 800,
        suppressAndOrCondition: true,
      },
      cellStyle: {

        "border-left": "1px dotted skyblue",
      },
    };
    this.columnDefs1 = [
      {
        headerName: "Ref No",
        field: "exchangeRateID",
        width: 200,
        sortable: true,
        filter: true,
      },
      {
        headerName: "From",
        field: "fromDate",
        width: 120,
        sortable: true,
        filter: "agDateColumnFilter",
        filterParams: {
          defaultOption: "inRange",
          filterOptions: ["inRange"],
          suppressAndOrCondition: true,
          applyButton: true,
          resetButton: true,
        },
        cellRenderer: (data) => {
          if (data.value) {
            let a = data.value.split("/").reverse().join("-");
            return data.value != null && data.value != ""
              ? formatDate(a, "dd/MM/yyyy", "en-US")
              : "";
          }
        },
      },
      {
        headerName: "To",
        field: "toDate",
        width: 120,
        sortable: true,
        filter: "agDateColumnFilter",
        filterParams: {
          defaultOption: "inRange",
          filterOptions: ["inRange"],
          suppressAndOrCondition: true,
          applyButton: true,
          resetButton: true,
        },
        cellRenderer: (data) => {
          if (data.value) {
            let a = data.value.split("/").reverse().join("-");
            return data.value != null && data.value != ""
              ? formatDate(a, "dd/MM/yyyy", "en-US")
              : "";
          }
        },
      },
      {
        headerName: "Created by",
        field: "creator",
        width: 150,
        sortable: true,
        filter: true,
      },
      {
        headerName: "Date Create ",
        field: "dateCreate",
        width: 120,
        sortable: true,
        filter: "agDateColumnFilter",
        filterParams: {
          defaultOption: "inRange",
          filterOptions: ["inRange"],
          suppressAndOrCondition: true,
          applyButton: true,
          resetButton: true,
        },
      },
      {
        headerName: "Date Modify",
        field: "dateModify",
        width: 120,
        sortable: true,
        filter: "agDateColumnFilter",
        filterParams: {
          defaultOption: "inRange",
          filterOptions: ["inRange"],
          suppressAndOrCondition: true,
          applyButton: true,
          resetButton: true,
        },
      },
      {
        headerName: "Applied for",
        field: "appliedFor",
        width: 500,
        sortable: true,
        filter: true,
      },
      {
        headerName: "Notes",
        field: "notes",
        width: 300,
        sortable: true,
        filter: true,
      },
      ,
    ];

    this.defaultColDef = {
      width: 120,
      headerComponentParams: { menuIcon: "fas fa-filter" },
      sortable: true,
      resizable: true,
      filter: true,
      editable: true,
      cellStyle: {

        "border-left": "1px dotted skyblue",
      },
    };
    this.frameworkComponents = {
      agColumnHeader: CustomHeader,
      buttonRenderer: ButtonRendererComponent,
      buttonRenderer2: ButtonRenderer2Component
    };
    this.components = {
      loadingRenderer: function (params) {
        if (params.value !== undefined) {
          return params.value;
        } else {
          return `<div class="spinner-border spinner-border-sm"  role="status">
          <span class="sr-only">Loading...</span>
        </div>`;
        }
      },
    };
  }
  setValueDatetoSave() {
    this.currencyExchangeRate.fromDate = formatDate(
      this.fromDate,
      "dd/MM/yyyy",
      "en-US"
    );
    this.currencyExchangeRate.toDate = formatDate(
      this.toDate,
      "dd/MM/yyyy",
      "en-US"
    );
  }
  setValueDatetoView() {
    {
      if (this.currencyExchangeRate.fromDate != null) {
        let a = this.currencyExchangeRate.fromDate
          .split("/")
          .reverse()
          .join("-");
        this.fromDate = formatDate(a, "yyyy-MM-dd", "en-US");
      } else {
        this.fromDate = null;
      }
    }
    {
      if (this.currencyExchangeRate.toDate != null) {
        let b = this.currencyExchangeRate.toDate.split("/").reverse().join("-");
        this.toDate = formatDate(b, "yyyy-MM-dd", "en-US");
      } else {
        this.toDate = null;
      }
    }
  }
  saveEdit() {
    const b = this.rowData1.find((e) => e.currencyID === "USD");
    this.edit = false;
    this.gridApi1.stopEditing();
    this.rowData1.forEach((element) => {
      {
        element.extUSD = (element.extVNDSales * 1) / Number(b.extVNDSales);
        element.commissionExtUSD =
          (element.commissionExtVNDSales * 1) / Number(b.commissionExtVNDSales);
      }
     });
    if (this.deleteArray.length !== 0) {
      this.deleteArray.forEach((element) => {
        this.currencyExchangeRateService
          .deleteExchangeRateDetails(element)
          .subscribe();
      });
    }
    this.currencyExchangeRateService
      .updateExchangeRateDetails(this.rowData1)
      .subscribe((e) => {
        let dialogResult = MessageBox.show(
          this.modal,
          "Successfully saved!",
          "Notification",
          MessageBoxButtons.ok,
          MessageBoxIcons.information
        );
      });
    this.gridApi1.redrawRows();
  }
  closeEdit() {
    this.edit = false;
    this.pickRow("");
  }
  delete(e) {
    if (e.params.data.currencyID == "USD") {
      let dialogResult = MessageBox.show(
        this.modal,
        "Can't delete USD ",
        "Attention",
        MessageBoxButtons.ok,
        MessageBoxIcons.warning
      );
      dialogResult.then((result) => {});
    } else {
      this.edit = true;
      this.gridApi1.updateRowData({
        remove: [e.params.data],
      });
      this.deleteArray.push(e.params.data);
    }
  }
  onGridReady(params) {
    this.gridApi = params.api;
    {
      let dataSource = {
        getRows: (params) => {
          {
            if (params.sortModel[0]) {
              params.sortModel[0].sort = params.sortModel[0].sort.toUpperCase();
            }
            this.currencyExchangeRateService
              .getCurrenciesExchangeRateApi(params)
              .subscribe((results: any) => {
                let totalRows = results.totalRows;
                params.successCallback(results.results, totalRows);
              });
          }
        },
      };
      this.gridApi.setDatasource(dataSource);
    }
  }
  onGridReady1(params) {
    this.gridApi1 = params.api;
    // let dataSource = {
    //   getRows: (params) => {
    //     {
    //       if (params.sortModel[0]) {
    //         params.sortModel[0].sort = params.sortModel[0].sort.toUpperCase();
    //       }
    //       this.currencyExchangeRateService
    //         .getCurrenciesExchangeRateApi(params)
    //         .subscribe((results: any) => {
    //           let totalRows = results.totalRows;
    //           params.successCallback(results.results, totalRows);
    //         });
    //     }
    //   },
    // };
    // this.gridApi1.setDatasource(dataSource);
  }
  editTable(params) {
    if (params.params.data.currencyID != "USD") {
      const b = this.rowData1.find((e) => e.currencyID === "USD");
      console.log(b);
      if (
        b.extVNDSales == null ||
        b.commissionExtVNDSales == null ||
        b.extVNDSales == 0 ||
        b.commissionExtVNDSales == 0
      ) {
        let dialogResult = MessageBox.show(
          this.modal,
          "Missing exchange rate USD ! Please input USD ",
          "Attention",
          MessageBoxButtons.ok,
          MessageBoxIcons.error
        );
        dialogResult.then((result) => {});
      } else {
        this.edit = true;
        console.log(params.params.data)
        this.gridApi1
          .getRowNode(params.params.rowIndex)
          .setData(params.params.data);
        this.gridApi1.startEditingCell({
          rowIndex: params.params.rowIndex,
          colKey: "currencyID",
        });
      }
    } else {
      this.edit = true;
      this.gridApi1
        .getRowNode(params.params.rowIndex)
        .setData(params.params.data);
      this.gridApi1.startEditingCell({
        rowIndex: params.params.rowIndex,
        colKey: "currencyID",
      });
    }
  }
  async ngOnInit() {
    // this.contacts = await this.contactService.getContactsApi();
    this.dropdownList = await this.companyService.getCompaniesApi();
    // this.currencyExchangeRateService
    //   .getCurrenciesExchangeRateApi()
    //   .subscribe((res) => {
    //     this.rowData = res;
    //     console.log(this.rowData);
    //   });

    this.setValueDatetoView();
  }
  deleteparent() {
    let selectedData = this.gridApi.getSelectedRows();
    if (selectedData == "") {
      MessageBox.show(
        this.modal,
        "Please select Ref No to delete",
        "Alert",
        MessageBoxButtons.ok,
        MessageBoxIcons.warning
      );
    } else {
      let dialogResult = MessageBox.show(
        this.modal,
        "Do you want to delete!",
        "Confirm",
        MessageBoxButtons.yesNo,
        MessageBoxIcons.question
      );
      dialogResult.then(async (result) => {
        if (result === "YES") {
          this.currencyExchangeRateService
            .deleteCurrencyExchangeRate(selectedData[0])
            .subscribe((resApi) => {
              console.log(resApi);
              if (resApi.success == true) {
                let res = this.gridApi.updateRowData({ remove: selectedData });
                MessageBox.show(
                  this.modal,
                  "Successfully Delete!",
                  "Notification",
                  MessageBoxButtons.ok,
                  MessageBoxIcons.information
                );
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
            });
        }
      });
    }
  }

  updateRates() {
    const ref = this.modalService.open(updateRatesComponent, {
      windowClass: "gr-modal-haft",
      scrollable: true,
      backdrop: false,
    });
  }
  focusout() {
    const a = this.gridApi.getSelectedRows();
    const b = this.gridApi.getSelectedNodes();
    this.setValueDatetoSave();
    this.currencyExchangeRateService
      .editCurrencyExchangeRate(this.currencyExchangeRate, a[0]._id)
      .subscribe((e) => {
        console.log(e, JSON.stringify(this.currencyExchangeRate));
        if (!e.success) {
          this.pickRow("");
          let dialogResult = MessageBox.show(
            this.modal,
            e.message,
            "Alert",
            MessageBoxButtons.ok,
            MessageBoxIcons.warning
          );
          dialogResult.then((result) => {});
        } else {
          console.log(b[0].id);
          this.gridApi.getRowNode(b[0].id).setData(this.currencyExchangeRate);
        }
      });
  }

  pickRow(e) {
    {
      const a = this.gridApi.getSelectedRows();
      let b = this.currencyExchangeRateService
        .getCurrencyExchangeRate(a[0].exchangeRateID)
        .subscribe((res) => {
          this.currencyExchangeRate = res;
          this.setValueDatetoView();
        });
      console.log(b);
      this.edit = false;
      this.rowData1 = [];
      this.currencyExchangeRateService
        .getCurrencyExchangeRateDetails(a[0].exchangeRateID)
        .subscribe((res) => {
          this.rowData1 = res.results;
          const c = this.rowData1?.find((e) => e.currencyID === "USD");
          // this.rowData1.sort(function (x, y) {
          //   return x == c ? -1 : y == c ? 1 : 0;
          // });
          if (!c) {
            const d = { currencyID: "USD" };
            console.log(a[0]);
            this.currencyExchangeRateService
              .createExchangeRateDetails(d, a[0].exchangeRateID, "")
              .subscribe((e) => {
                this.currencyExchangeRateService
                  .getCurrencyExchangeRateDetails(a[0].exchangeRateID)
                  .subscribe((res) => {
                    this.rowData1 = res;
                    // this.rowData1.sort(function (x, y) {
                    //   return x == c ? -1 : y == c ? 1 : 0;
                    // });
                  });
              });
          }
        });
    }
  }
  addNew() {
    this.openPopup1("", "Add New", "");
  }
  addNewDetail() {
    const b = this.rowData1?.find((e) => e.currencyID === "USD");
    console.log(b);
    if (
      b.extVNDSales == null ||
      b.commissionExtVNDSales == null ||
      b.extVNDSales == 0 ||
      b.commissionExtVNDSales == 0
    ) {
      let dialogResult = MessageBox.show(
        this.modal,
        "Missing exchange rate USD!",
        "Attention",
        MessageBoxButtons.ok,
        MessageBoxIcons.error
      );
      dialogResult.then((result) => {});
    } else {
      const a = this.gridApi.getSelectedRows();
      this.openPopup(a[0].exchangeRateID, "Add New", "");
    }
  }
  openPopup(data, action: string, node) {
    const modalRef = this.modal.open(AddNewDetailComponent, {
      size: "lg",
      backdrop: false,
      keyboard: true,
      centered: true,
    });
    modalRef.componentInstance.action = action;
    modalRef.componentInstance.data = data;
    modalRef.componentInstance.rowDataDetail = this.rowData1;
    modalRef.result.then(
      (result) => {
        {
          console.log(result);
          if (action === "Add New") {
            // var res = this.gridApi1.updateRowData({ add: [result] });
            this.pickRow("");
          }
        }
      },
      (reason) => {
        console.log("reason dismiss", reason);
      }
    );
  }
  openPopup1(data, action: string, node) {
    const modalRef = this.modal.open(AddNewComponent, {
      size: "lg",
      backdrop: false,
      keyboard: true,
      centered: true,
    });
    modalRef.componentInstance.action = action;
    modalRef.componentInstance.data = data;
    modalRef.componentInstance.refNo = data;
    modalRef.result.then(
      (result) => {
        {
          console.log(result);
          if (action === "Add New") {
            this.gridApi.purgeInfiniteCache();
          }
        }
      },
      (reason) => {
        console.log("reason dismiss", reason);
      }
    );
  }
  public onSelectAll() {
    const selected = this.dropdownList.map((item) => item.companyID);
    this.currencyExchangeRate.appliedFor = selected;
    this.focusout();
  }

  public onClearAll() {
    this.currencyExchangeRate.appliedFor = [];
    this.focusout();
  }
}
