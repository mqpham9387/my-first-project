import { Component, OnInit } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { formatDate } from "@angular/common";
import { CustomHeader } from "src/app/main/common/ag-grid-header-custom";
import {
  MessageBox,
  MessageBoxButtons,
  MessageBoxIcons,
} from "src/app/form/message/messsage";
import { AgentAddComponent } from "./agent-add/agent-add.component";
import { PartnerView } from "src/app/main/model/partner/partner";
import { PartnerService } from "src/app/main/model/partner/partner.service";
import { AgentService } from "src/app/main/model/partner/agent.service";

@Component({
  selector: "app-agent",
  templateUrl: "./agent.component.html",
  styleUrls: ["./agent.component.css"],
})
export class AgentComponent implements OnInit {
  defaultColDef;
  frameworkComponents;
  rowData = [];
  rowModelType;
  columnDefs;
  paginationPageSize;
  gridApi;
  gridColumnApi;
  rowClassRules;
  cacheBlockSize;
  components;
  rowId

  constructor(
    private modal: NgbModal,
    private partnerService: PartnerService,
    public agentService: AgentService
  ) {
    this.columnDefs = [
      {
        headerName: "Agent No.",
        field: "partnerID",
        width: 150,
        sortable: true,
        filter: true,
        cellRenderer: 'loadingRenderer',
      },
      {
        headerName: "Agent Name (Abbr)",
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
      {
        headerName: "Source",
        field: "source",
        width: 150,
        cellRenderer: (data) => {
          if (data.value) {
            return data.value.sourceName;
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
        filter: 'agDateColumnFilter',
        filterParams :{
          defaultOption:'inRange',
          filterOptions:['inRange'],
          suppressAndOrCondition: true,
          applyButton:true,
          resetButton:true
         }

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
        headerName: "Locked",
        field: "lock",
        width: 100,
        sortable: true,
        filter: false,
        filterParams: {
          filterOptions: [],
        },
        cellRenderer: (data) => {
          if (data.value) {
            return `<input onclick="return false;" type='checkbox' ${data.value ? "checked" : ""} />`;
          }
        },
      },
      {
        headerName: "Warning",
        field: "warning",
        width: 100,
        sortable: true,
        filter: false,

        filterParams: {
          filterOptions: [],
        },
        cellRenderer: (data) => {
          if (data.value) {
            return `<input onclick="return false;" type='checkbox' ${data.value ? "checked" : ""} />`;
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
    this.rowClassRules = {
      'status-lock': function (params) { if( params.data) {return params.data.lock === true;} },
      'status-warning': function (params) { if( params.data) {return params.data.warning === true;} }
    };
    this.defaultColDef = {
      width: 120,
      headerComponentParams: { menuIcon: "fas fa-filter" },
      sortable: true,
      resizable: true,
      filter: true,
      filterParams: {
        debounceMs: 800,
        suppressAndOrCondition :true,
        // applyButton:true,
        // resetButton:true,
       },
    cellStyle: {"border-left": "1px dotted skyblue"},
    };
    this.cacheBlockSize = 50;
    this.paginationPageSize = 50;
    this.frameworkComponents = { agColumnHeader: CustomHeader };
    this.components = {
      loadingRenderer: function(params) {
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

  async ngOnInit() {
    // this.rowData = await this.partnerService.getPartnersApi('AGENTS');
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    {
      let dataSource = {
        getRows: (params) => {
          {
            if (params.sortModel[0]) {
              params.sortModel[0].sort = params.sortModel[0].sort.toUpperCase();
            }
            this.agentService.getAgents(params).subscribe((results: any) => {
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
    let addNew = new PartnerView();
    console.log(addNew);
    addNew.action = "ADD";
    this.openPopup(addNew);
  }

  edit(event) {


    let edit = <PartnerView>event.data;
    this.rowId=this.gridApi.getSelectedNodes()
    edit.action = "EDIT";
    this.openPopup(edit);

  }

  delete() {
    let selectedData = this.gridApi.getSelectedRows();
    let dialogResult = MessageBox.show(
      this.modal,
      "Do you want to delete!",
      "Confirm",
      MessageBoxButtons.yesNo,
      MessageBoxIcons.question
    );
    dialogResult.then(async (result) => {
      if (result === "YES") {
        let resApi:any = await this.partnerService.delPartnersApi(selectedData[0]);
        if (resApi.value) {
          this.gridApi.purgeInfiniteCache();
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
    });
  }

  Export() {
    window.alert("Button Export click!!");
  }

  openPopup(agent) {
    const modalRef = this.modal.open(AgentAddComponent, {
      windowClass: "gr-modal-full",
      backdrop: "static",
      keyboard: false,
    });
    modalRef.componentInstance.agent = agent;
    modalRef.result.then(
      (result) => {
        if (result.partnerID != null && result.partnerID !== "") {
          console.log(result);
          if (result.action === "DELETE") {
            this.gridApi.purgeInfiniteCache();

          } else if (result.action === "ADD") {
            this.gridApi.purgeInfiniteCache();

          } else if (result.action === "EDIT") {
            this.gridApi.purgeInfiniteCache();
          }
        }
      },
      (reason) => {
        this.gridApi.purgeInfiniteCache();
      }
    );
  }
}
