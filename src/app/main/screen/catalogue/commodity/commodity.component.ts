import { Component, OnInit } from "@angular/core";
import { CommodityService } from "../../../model/commodity/commodity.service";
import { CustomHeader } from "src/app/main/common/ag-grid-header-custom";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import {
  MessageBox,
  MessageBoxButtons,
  MessageBoxIcons,
} from "src/app/form/message/messsage";
import { CURD_commodityComponent } from "./CURD_commodity/CURD_commodity.component";
import { RouterLinkRendererComponent } from "../actionTable/actionTable";
@Component({
  selector: "commodity",
  templateUrl: "./commodity.component.html",
  styleUrls: ["./commodity.component.css"],
})
export class CommodityComponent implements OnInit {
  columnDefs;
  rowData: [];
  gridApi;
  gridColumnApi;
  defaultColDef;
  frameworkComponents;
  cacheBlockSize: number;
  paginationPageSize: number;
  components: { loadingRenderer: (params: any) => any };
  constructor(
    public commodityService: CommodityService,
    private modal: NgbModal
  ) {
    this.columnDefs = [
      {
        headerName: "ID",
        field: "commodityID",
        width: 150,
        sortable: true,
        filter: true,
      },
      {
        headerName: "HS Code",
        field: "hsCode",
        width: 200,
        sortable: true,
        filter: true,
      },
      {
        headerName: "Description_VN",
        field: "commodityName",
        width: 600,
        sortable: true,
        filter: true,
      },
      {
        headerName: "Description_EN",
        field: "commodityDescription",
        width: 600,
        sortable: true,
        filter: true,
      },
      {
        headerName: "Action",
        width: 100,
        cellRendererFramework: RouterLinkRendererComponent,
        editable: false,
        sortable: false,
        filter: false,
        resizable: false,
        pinned: "right",
        cellRendererParams: {
          editClick: this.edit.bind(this),
          label: "Edit",
          deleteClick: this.delete.bind(this),
        },
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
        "text-align": "center",
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
  onGridReady(params) {
    this.gridApi = params.api;
    let dataSource = {
      getRows: (params) => {
        {
          if (params.sortModel[0]) {
            params.sortModel[0].sort = params.sortModel[0].sort.toUpperCase();
          }
          this.commodityService
            .getCommoditiesApi(params)
            .subscribe((results: any) => {
              let totalRows = results.totalRows;
              params.successCallback(results.results, totalRows);
            });
        }
      },
    };
    this.gridApi.setDatasource(dataSource);
  }
  ngOnInit(): void {
    //  this.commodityService.getCommoditiesApi().subscribe( res=> { this.rowData=res;console.log(res)}
    //     )
  }
  add() {
    this.openPopup("", "Add New", "");
  }
  view(e){this.openPopup(e.data,"View","")}
  edit(e) {
    this.openPopup(e.params.data, "Edit", e.params.node.id);
  }
  openPopup(data, action, node) {
    const modalRef = this.modal.open(CURD_commodityComponent, {
      size: "xl",
      backdrop: false,
      keyboard: true,
    });
    modalRef.componentInstance.action = action;
    modalRef.componentInstance.data = data;
    modalRef.result.then((result) => {
      if (result.commodityID != null && result.commodityID !== "") {
        console.log(result);
        if (action === "Add New") {
          var res = this.gridApi.updateRowData({ add: [result] });
        } else if (action === "Edit") {
          this.gridApi.getRowNode(String(node)).setData(result);
          if (result.commodityID == "Delete") {
            this.gridApi.updateRowData({ remove: [result] });
          }
        }
      }
    });
  }
  delete() {
    let selectedData = this.gridApi.getSelectedRows();
    if (selectedData == "") {
      MessageBox.show(
        this.modal,
        "Please select port to delete",
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
          let resApi = await this.commodityService.delCommoditiesApi(
            selectedData[0]
          );
          console.log(resApi);
          if (resApi.value) {
            let res = this.gridApi.updateRowData({ remove: selectedData });
            console.log(res);
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
  }
}
