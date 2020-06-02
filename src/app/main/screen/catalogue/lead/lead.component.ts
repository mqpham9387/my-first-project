import { Component, OnInit } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { formatDate } from "@angular/common";
import { CustomHeader } from "src/app/main/common/ag-grid-header-custom";
import {
  MessageBox,
  MessageBoxButtons,
  MessageBoxIcons,
} from "src/app/form/message/messsage";

import { LeadAddComponent } from "./lead-add/lead-add.component";
import { LeadView } from "src/app/main/model/lead/lead";
import { LeadService } from 'src/app/main/model/partner/lead.service';

@Component({
  selector: "app-lead",
  templateUrl: "./lead.component.html",
  styleUrls: ["./lead.component.css"],
})
export class LeadComponent implements OnInit {
  columnDefs;
  rowData;
  rowClassRules;
  defaultColDef;
  frameworkComponents;
  localeText;
  gridApi;
  cacheBlockSize: number;
  paginationPageSize: number;
  components: { loadingRenderer: (params: any) => any };

  constructor(private modal: NgbModal,private leadService : LeadService) {
    this.columnDefs = [
      {
        headerName: "Lead No.",
        field: "partnerID",
        width: 150,
        sortable: true,
        filter: true,
        cellRenderer: "loadingRenderer",
      },
      {
        headerName: "Lead Name (Abbr)",
        field: "partnerNameAbbr",
        width: 300,
        sortable: true,
        filter: true,
      },
      {
        headerName: "Address",
        field: "address",
        width: 500,
        sortable: true,
        filter: true,
        cellRenderer: (data) => {
          if (data.value) {
            let a;
            data.value.forEach((element) => {
              if (element.isMainAddress) {
                a = element.addressInfo;
              }
            });
            return a;
          }
        },
      },
      {
        headerName: "City",
        field: "city",
        width: 150,
        cellRenderer: (data) => {
          if (data.value) {
            return data.value.cityName;
          }
        },
      },
      {
        headerName: "Country",
        field: "country",
        width: 150,
        cellRenderer: (data) => {
          if (data.value) {
            return data.value.countryName;
          }
        },
      },
      { headerName: "Tel", field: "homePhone", width: 200 },
      { headerName: "Fax", field: "faxNumber", width: 200 },
      { headerName: "Taxcode", field: "taxCode", width: 100 },
      {
        headerName: "Acc Ref",
        field: "accountReference",
        width: 300,
        cellRenderer: (data) => {
          if (data.value) {
            return data.value.partnerNameAbbr;
          }
        },
      },
      {
        headerName: "Date Modify",
        field: "dateModify",
        width: 190,
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
        headerName: "User Manage",
        field: "saleManage",
        width: 300,
        cellRenderer: (data) => {
          if (data.value) {
            return data.value.contactName;
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
    ];
    this.defaultColDef = {
      width: 120,
      headerComponentParams: { menuIcon: "fas fa-filter" },
      sortable: true,
      resizable: true,
      filter: true,
      filterParams: {
        debounceMs: 800,
        suppressAndOrCondition: true,
        // applyButton:true,
        // resetButton:true,
      },
      cellStyle: {

        "border-left": "1px dotted skyblue",
      },
    };
    this.cacheBlockSize = 50;
    this.paginationPageSize = 50;
    this.frameworkComponents = { agColumnHeader: CustomHeader };
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

  async ngOnInit() {}

  onGridReady(params) {
    this.gridApi = params.api;
    {
      let dataSource = {
        getRows: (params) => {
          {
            if (params.sortModel[0]) {
              params.sortModel[0].sort = params.sortModel[0].sort.toUpperCase();
            }
            this.leadService
              .getLeads(params)
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

  addNew() {
    let addNew = new LeadView();
    console.log(addNew);
    addNew.action = "ADD";
    this.openPopup(addNew);
  }

  edit(event) {
    let edit = <LeadView>event.data;
    console.log(edit);
    edit.action = "EDIT";
    this.openPopup(edit);
  }

  delete() {
    let selectedData = this.gridApi.getSelectedRows();
    let dialogResult = MessageBox.show(
      this.modal,
      "Do you want to delete ?",
      "Confirm",
      MessageBoxButtons.yesNo,
      MessageBoxIcons.question
    );
    dialogResult.then(async (result) => {
      console.log(result);
      if (result === "YES") {
        // console.log("debug1");
        // let resApi = await this.leadService.delLeadsApi(selectedData[0]);
        // if (resApi.value) {
        //   let res = this.gridApi.updateRowData({ remove: selectedData });
        //   console.log(res);
        // } else {
        //   let dialogResult = MessageBox.show(
        //     this.modal,
        //     resApi.message,
        //     "Alert",
        //     MessageBoxButtons.ok,
        //     MessageBoxIcons.warning
        //   );
        //   dialogResult.then((result) => {});
        // }
      }
    });
  }

  openPopup(lead) {
    const modalRef = this.modal.open(LeadAddComponent, {
      windowClass: "gr-modal-full",
      backdrop: "static",
      keyboard: false,
    });
    modalRef.componentInstance.lead = lead;
    modalRef.result.then(
      (result) => {
        if (result.action === "DELETE") {

          this.gridApi.purgeInfiniteCache();
        } else if (result.action === "ADD") {

          this.gridApi.purgeInfiniteCache();
        } else if (result.action === "EDIT") {

          this.gridApi.purgeInfiniteCache();
        }
      },
      (reason) => {
        console.log("reason dismiss", reason);
      }
    );
  }
}
