import { Component, OnInit } from "@angular/core";
import { CustomHeader } from "src/app/main/common/ag-grid-header-custom";
import {
  MessageBox,
  MessageBoxButtons,
  MessageBoxIcons,
} from "src/app/form/message/messsage";
import { ButtonRendererComponent } from "src/app/main/common/button-renderer.component";
import { isRowNull } from "src/app/main/common/util";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { Measurement } from "src/app/main/model/measurement/measurement";
import { MeasurementService } from "src/app/main/model/measurement/measurement.service";

@Component({
  selector: "app-measurement",
  templateUrl: "./measurement.component.html",
  styleUrls: ["./measurement.component.css"],
})
export class MeasurementComponent implements OnInit {
  columnDefs;
  rowData;
  rowDataClone = [];
  rowDelete = [];
  defaultColDef;
  frameworkComponents;
  localeText;
  gridApi;

  suppressClickEdit: boolean = false;
  editMode: boolean = false;
  isLoading: boolean = true;

  constructor(
    private measurementService: MeasurementService,
    private modal: NgbModal
  ) {
    this.columnDefs = [
      { headerName: "ID", field: "unitID", width: 150 },
      { headerName: "Description", field: "description", width: 350 },
      { headerName: "Local Unit", field: "localUnit", width: 150 },
      { headerName: "Custom Code", field: "isoCode", width: 150 },
      {
        headerName: "",
        field: "rowStatus",
        width: 80,
        cellRenderer: "buttonRenderer",
        editable: false,
        sortable: false,
        filter: false,
        resizable: false,
        cellRendererParams: {
          onClick: this.edit.bind(this),
          onClick1: this.delete.bind(this),
        },
      },
    ];
    this.defaultColDef = {
      width: 120,
      headerComponentParams: { menuIcon: "fas fa-filter" },
      sortable: true,
      resizable: true,
      filter: true,
      editable: true,
    };
    this.frameworkComponents = {
      agColumnHeader: CustomHeader,
      buttonRenderer: ButtonRendererComponent,
    };
  }

  async ngOnInit() {
    this.rowData = await this.measurementService.getUnitsApi();
    this.rowData.forEach((row) => {
      row.rowStatus = "";
    });
    this.rowDataClone = this.cloneData(this.rowData);

    this.isLoading = false;
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.setDataSource(this.gridApi, this.rowData);
  }
  rowEditingStarted(params) {
    let index = params.rowIndex;
    this.rowData[index].rowStatus =
      this.rowData[index].rowStatus !== "ADD" ? "EDIT" : "ADD";
  }
  edit(params) {
    this.suppressClickEdit = true;
    this.editMode = true;
    this.gridApi.startEditingCell({
      rowIndex: params.params.rowIndex,
      colKey: "unitID",
    });
    console.log(params.params);
  }

  addNew() {
    const newRows = { rowStatus: "ADD" };
    this.rowData.splice(0, 0, newRows);
    this.gridApi.updateRowData({ add: [newRows], addIndex: 0 });
    this.editMode = true;
    this.gridApi.startEditingCell({ rowIndex: 0, colKey: "unitID" });
  }
  delete(params) {
    let dialogResult = MessageBox.show(
      this.modal,
      "Do you want to delete this row ?",
      "Confirm",
      MessageBoxButtons.yesNo,
      MessageBoxIcons.question
    );
    dialogResult.then(async (result) => {
      if (result === "YES") {
        console.log(params);
        const a = await this.measurementService.delUnitsApi(params.params.data);
        let del = this.rowData.splice(params.params.rowIndex, 1);
        this.rowDelete.push(del);
        this.setDataSource(this.gridApi, this.rowData);
      }
    });
  }
  cancel() {
    let dialogResult = MessageBox.show(
      this.modal,
      "Do you want to cancel ?",
      "Confirm",
      MessageBoxButtons.yesNo,
      MessageBoxIcons.question
    );
    dialogResult.then((result) => {
      if (result === "YES") {
        this.suppressClickEdit = true;
        this.editMode = false;
        this.gridApi.stopEditing();
        console.log("rowDataClone", this.rowDataClone);
        this.rowDelete = [];
        this.rowData = this.cloneData(this.rowDataClone);
        console.log(this.rowData);
        this.setDataSource(this.gridApi, this.rowData);
      }
    });
  }
  async save() {
    this.suppressClickEdit = true;
    this.editMode = false;
    this.gridApi.stopEditing();
    let res = await this.saveData();
    console.log("save!", this.rowDataClone);
    if (res) {
      this.rowDelete = [];
      this.setDataSource(this.gridApi, this.rowData);
      let dialogResult = MessageBox.show(
        this.modal,
        "Successfully saved!",
        "Notification",
        MessageBoxButtons.ok,
        MessageBoxIcons.information
      );
      dialogResult.then((result) => {});
    }
  }
  async saveData() {
    for (let i = 0; i < this.rowData.length; i++) {
      if (this.rowData[i]?.rowStatus === "ADD") {
        if (!isRowNull(this.rowData[i])) {
          let res = await this.measurementService.insUnitsApi(this.rowData[i]);
          if (res.value) {
            let _id = await this.measurementService.getUnitApi(
              this.rowData[i].unitID
            );
            this.rowData[i]._id = _id._id;
            this.rowData[i].rowStatus = "";
          }
          console.log("Add: ", this.rowData[i]);
        }
      } else if (this.rowData[i]?.rowStatus === "EDIT") {
        console.log("Update: ", this.rowData[i]);
        let res = await this.measurementService.updUnitsApi(this.rowData[i]);
        if (res.value === true) {
          this.rowData[i].rowStatus = "";
        }
      }
    }
    for (let i = 0; i < this.rowDelete.length; i++) {
      console.log("delete", this.rowDelete[i]);
      let res = await this.measurementService.delUnitsApi(this.rowDelete[i]);
    }
    this.rowDataClone = this.cloneData(this.rowData);
    return true;
  }
  setDataSource(gridApi, rowData) {
    let row = this.rowData;
    let dataSource = {
      rowCount: null,
      getRows: function (params) {
        setTimeout(function () {
          var rowsThisPage = row.slice(params.startRow, params.endRow);
          var lastRow = -1;
          if (rowData.length <= params.endRow) {
            lastRow = rowData.length;
          }
          params.successCallback(rowsThisPage, lastRow);
        }, 100);
      },
    };
    gridApi.setDatasource(dataSource);
  }

  cloneData(rowData) {
    let rowClone = [];
    rowData.forEach((row) => {
      let newRow = Object.assign({}, row);
      rowClone.push(newRow);
    });
    return rowClone;
  }
}
