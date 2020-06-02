import { Component, OnInit } from "@angular/core";
import { CustomHeader } from "src/app/main/common/ag-grid-header-custom";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { CRUDshipmentTypeComponent } from "./CRUD_shipmentType/CRUD_shipmentType.component";
import {
  MessageBox,
  MessageBoxButtons,
  MessageBoxIcons,
} from "src/app/form/message/messsage";
import { ShipmentTypeService } from "src/app/main/model/shipment-type/shipment-type.service";
@Component({
  selector: "shipmentType",
  templateUrl: "./shipment-type.component.html",
  styleUrls: ["./shipment-type.component.css"],
})
export class ShipmentTypeComponent implements OnInit {
  constructor(
    public modal: NgbModal,
    public shipmentTypeService: ShipmentTypeService
  ) {}
  columnDefs;
  rowData;

  defaultColDef;
  frameworkComponents;

  gridApi;
  ngOnInit(): void {
    this.columnDefs = [
      {
        headerName: "Shipment Type",
        field: "shipmentTypeWarningName",
        width: 300,
        sortable: true,
        filter: true,
      },
      {
        headerName: "Email Receive",
        field: "emailReceive",
        width: 600,
        sortable: true,
        filter: true,
      },
      {
        headerName: "Notification",
        field: "notification",
        cellRenderer: (params) => {
          return `<input onclick="return false;" type='checkbox' ${
            params.value ? "checked" : ""
          } />`;
        },
        width: 150,
      },
      { headerName: "Notes", field: "notes", width: 800 },
    ];
    this.shipmentTypeService.getAllShipmentTypeWarnings().subscribe((e) => {
      this.rowData = e;
    });
    this.defaultColDef = {
      width: 100,
      headerComponentParams: { menuIcon: "fas fa-filter" },
      sortable: true,
      resizable: true,
      filter: true,
    };
    this.frameworkComponents = { agColumnHeader: CustomHeader };
  }
  onGridReady(params) {
    this.gridApi = params.api;
  }
  openPopup(data, action: string, node) {
    const modalRef = this.modal.open(CRUDshipmentTypeComponent, {
      size: "xl",
      backdrop: false,
      keyboard: true,
      centered: true,
    });
    modalRef.componentInstance.action = action;
    modalRef.componentInstance.data = data;
    modalRef.result.then(
      (result) => {
        // if (result.portID != null && result.portID !== '')
        {
          console.log(result);
          if (action === "Add New") {
            var res = this.gridApi.updateRowData({ add: [result] });
          } else if (action === "Edit") {
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
  add() {
    this.openPopup("", "Add New", "");
  }
  edit(e) {
    this.openPopup(e.data, "Edit", e.node.id);
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
          let res = this.gridApi.updateRowData({ remove: selectedData });
          MessageBox.show(
            this.modal,
            "Successfully Delete!",
            "Notification",
            MessageBoxButtons.ok,
            MessageBoxIcons.information
          );
        }
      });
    }
  }
}
