import { Component, OnInit } from "@angular/core";
import { CustomHeader } from "src/app/main/common/ag-grid-header-custom";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { formatDate } from "@angular/common";
import { PortService } from "src/app/main/model/port/port.service";
import { AddNewPortComponent } from "./addnew/addnew.component";
import {
  MessageBox,
  MessageBoxButtons,
  MessageBoxIcons,
} from "src/app/form/message/messsage";
import { RouterLinkRendererComponent } from "../actionTable/actionTable";
import { from } from "rxjs";
@Component({
  selector: "port-index",
  templateUrl: "./port-index.component.html",
  styleUrls: ["./port-index.component.css"],
})
export class PortIndexComponent implements OnInit {
  columnDefs;
  rowData;

  defaultColDef;
  frameworkComponents;

  gridApi;
  data;
  cacheBlockSize: number;
  paginationPageSize: number;
  components: { loadingRenderer: (params: any) => any };
  constructor(public portService: PortService, private modal: NgbModal) {
    this.columnDefs = [
      {
        headerName: "Pode Code",
        field: "portID",
        width: 120,
        sortable: true,
        filter: true,
      },
      {
        headerName: "Port Name",
        field: "portName",
        width: 250,
        sortable: true,
        filter: true,
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
        headerName: "Geographical region",
        field: "zone",
        width: 200,
        cellRenderer: (data) => {
          if (data.value) {
            return data.value.zoneName;
          }
        },
      },
      {
        headerName: "CBM/KGS conversion ratio",
        field: "cbmperKGS",
        width: 100,
      },
      { headerName: "Contact person", field: "personIncharge", width: 200 },
      { headerName: "Address", field: "address", width: 300 },
      { headerName: "Phone", field: "telephoneNo", width: 200 },
      { headerName: "Mode", field: "typeService", width: 200 },
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
  ngOnInit(): void {}
  onGridReady(params) {
    this.gridApi = params.api;
    let dataSource = {
      getRows: (params) => {
        {
          if (params.sortModel[0]) {
            params.sortModel[0].sort = params.sortModel[0].sort.toUpperCase();
          }
          this.portService.getPorts(params).subscribe((results: any) => {
            let totalRows = results.totalRows;
            params.successCallback(results.results, totalRows);
          });
        }
      },
    };
    this.gridApi.setDatasource(dataSource);
  }
  addnew() {
    this.openPopup(this.data, "Add New", "");
  }
  edit(e) {
    console.log(e.params)
    this.openPopup(e.params.data, "Edit", e.params.rowIndex);
  }
  view(e) {
    this.openPopup(e.data, "View", e.rowIndex);
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
          console.log(selectedData[0]);
          this.portService.delPortApi(selectedData[0]).subscribe((resApi) => {
            if (resApi.value == true) {
              console.log(resApi);
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
  openPopup(data, action: string, node) {
    const modalRef = this.modal.open(AddNewPortComponent, {
      size: "xl",
      backdrop: false,
      keyboard: true,
    });
    modalRef.componentInstance.action = action;
    modalRef.componentInstance.data = data;
    modalRef.result.then(
      (result) => {
        if (result.portID != null && result.portID !== "") {
          console.log(result);
          if (action === "Add New") {
            var res = this.gridApi.updateRowData({ add: [result] });
          } else if (action === "Edit") {
            console.log(node);
            this.gridApi.getRowNode(String(node)).setData(result);
            if (result.portID == "Delete") {
              this.gridApi.updateRowData({ remove: [result] });
            }
          }
        }
      },
      (reason) => {
        console.log("reason dismiss", reason);
      }
    );
  }
}
