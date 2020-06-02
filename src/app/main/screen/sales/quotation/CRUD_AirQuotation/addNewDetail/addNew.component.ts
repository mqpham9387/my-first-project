import { Component, OnInit, ViewEncapsulation, Input } from "@angular/core";
import { NgbActiveModal, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { CustomHeader } from "src/app/main/common/ag-grid-header-custom";
import { ButtonRendererComponent } from "src/app/main/common/button-renderer.component";
import { GridHeaderActions2Component } from "src/app/main/common/button-header-ag";
import { ButtonRenderer2Component } from "src/app/main/common/button-renderer2.component";
import {
  MessageBox,
  MessageBoxButtons,
  MessageBoxIcons,
} from "src/app/form/message/messsage";
import { formatNumber } from '@angular/common';

@Component({
  selector: "selector-name",
  templateUrl: "./addnew.component.html",
  styleUrls: ["./addnew.component.css"],
  encapsulation: ViewEncapsulation.None,
})
export class AddNewDetailComponent implements OnInit {
  @Input() data;
  @Input() action;
  defaultColDef;
  frameworkComponents;
  columnOriginCharge;
  columnDesCharge;
  gridApi;
  gridApi1;
  rowData = [];
  rowData1 = [];
  otherCharges;
  testNull: boolean = false;
  myForm: FormGroup;
  results;

  constructor(
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private modal: NgbModal
  ) {
    this.createForm();
    this.columnOriginCharge = [
      {
        headerName: "Charge",
        field: "feeName",
        width: 150,
        sortable: true,
        filter: true,
        cellEditor: "Editor",
        cellEditorParams: {
          class: "fee",
        },
        cellRenderer: (data) => {
          if (data.value) {
            return data.value.feeNameLocal;
          }
        },
      },
      {
        headerName: "Amount",
        field: "amount",
        width: 300,
        sortable: true,
        filter: true,
        valueSetter: function numberValueSetter(params) {
          if (
            isNaN(parseFloat(params.newValue)) ||
            !isFinite(params.newValue) ||  params.newValue==0
          ) {
            return false;
          }
          params.data.amount = params.newValue;
          return true;
        },
        valueParser: 'Number(newValue)',
      },
      {
        headerName: "Unit",
        field: "unit",
        width: 150,
        sortable: true,
        filter: true,
      },
      {
        headerName: "Currency",
        field: "currency",
        width: 150,
        sortable: true,
        filter: true,
        // cellEditor: 'Editor',
        // cellEditorParams:{
        //   class : 'currency'
        // },
        // cellRenderer: (data) => {
        //   if (data.value) {
        //     return data.value.currencyID;
        //   }
        // },
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
        headerComponentFramework: GridHeaderActions2Component,
        headerComponentParams: {
          onClick: this._addNewDetail.bind(this),
        },
        cellRendererParams: {
          onClick: this.editTable.bind(this),
          onClick1: this.cancelAction.bind(this),
          onClick3: this.addAction.bind(this),
          onClick4: this.cancelAction.bind(this),
        },
      },
    ];
    this.columnDesCharge = [
      {
        headerName: "Charge",
        field: "feeName",
        width: 150,
        sortable: true,
        filter: true,
        cellEditor: "Editor",
        cellEditorParams: {
          class: "fee",
        },
        cellRenderer: (data) => {
          if (data.value) {
            return data.value.feeNameLocal;
          }
        },
      },
      {
        headerName: "Amount",
        field: "amount",
        width: 300,
        sortable: true,
        filter: true,
        valueSetter: function numberValueSetter(params) {
          if (
            isNaN(parseFloat(params.newValue)) ||
            !isFinite(params.newValue) ||  params.newValue==0
          ) {
            return false;
          }
          params.data.amount = params.newValue;
          return true;
        },

      },
      {
        headerName: "Unit",
        field: "unit",
        width: 150,
        sortable: true,
        filter: true,
      },
      {
        headerName: "Currency",
        field: "currency",
        width: 150,
        sortable: true,
        filter: true,
        // cellEditor: 'Editor',
        // cellEditorParams:{
        //   class : 'currency'
        // },
        // cellRenderer: (data) => {
        //   if (data.value) {
        //     return data.value.currencyID;
        //   }
        // },
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
        headerComponentFramework: GridHeaderActions2Component,
        headerComponentParams: {
          onClick: this.addNewDetail1.bind(this),
        },
        cellRendererParams: {
          onClick: this.editTable1.bind(this),
          onClick1: this.cancelAction1.bind(this),
          onClick3: this.addAction1.bind(this),
          onClick4: this.cancelAction1.bind(this),
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
      Editor: ButtonRenderer2Component,
    };
  }

  ngOnInit() {
    if (this.action == "EDIT") {
      this.myForm.patchValue(this.data);
      console.log(this.data);
      this.data.localCharges.forEach((e) => {
        if (e.isOriginCharges) {
          this.rowData.push(e);
        } else {
          this.rowData1.push(e);
        }
      });
    }
  }
  close() {
    this.activeModal.dismiss();
  }
  createForm() {
    this.myForm = this.formBuilder.group({
      portofLoading: new FormControl(""),
      portofDischarge: new FormControl(""),
      carrierID: new FormControl(""),
      minQuantity: new FormControl(""),
      level1: new FormControl(""),
      level2: new FormControl(""),
      level3: new FormControl(""),
      level4: new FormControl(""),
      level5: new FormControl(""),
      level6: new FormControl(""),
      level7: new FormControl(""),
      fsc: new FormControl(""),
      ssc: new FormControl(""),
      awbFee: new FormControl(""),
      ams: new FormControl(""),
      otherCharges: new FormControl(""),
      transitTime: new FormControl(""),
      frequency: new FormControl(""),
      routing: new FormControl(""),
      validity: new FormControl(""),
      currency: new FormControl(""),
      notes: new FormControl(""),
    });
  }
  onGridReady(params) {
    this.gridApi = params.api;
  }
  onGridReady1(params) {
    this.gridApi1 = params.api;
  }
  _addNewDetail() {
    if (!this.testNull) {

      const newRows = { rowStatus: "ADD" };
      this.rowData.splice(0, 0, newRows);
      this.gridApi.updateRowData({ add: [newRows], addIndex: 0 });
      this.gridApi.startEditingCell({ rowIndex: 0, colKey: "feeName" });
    }
    this.testNull = true;
  }
  addNewDetail1() {
    if (!this.testNull) {
      const newRows = { rowStatus: "ADD" };
      this.rowData1.splice(0, 0, newRows);
      this.gridApi1.updateRowData({ add: [newRows], addIndex: 0 });
      this.gridApi1.startEditingCell({ rowIndex: 0, colKey: "feeName" });
    }
    this.testNull = true;
  }
  test2(e) {
    console.log(e);
    if (!e.data?.feeName) {
      let dialogResult = MessageBox.show(
        this.modal,
        "Null Error !",
        "Alert ! ",
        MessageBoxButtons.ok,
        MessageBoxIcons.warning
      );
      dialogResult.then((result) => {});

      {
        this.gridApi.startEditingCell({
          rowIndex: e.rowIndex,
          colKey: "feeName",
        });
        this.testNull = true;
      }
    } else {
      e.data.rowStatus = "";
      this.testNull = false;
    }
  }
  checkValid(e) {
    console.log(e);
    if (!e.data?.feeName) {
      let dialogResult = MessageBox.show(
        this.modal,
        "Null Error !",
        "Alert ! ",
        MessageBoxButtons.ok,
        MessageBoxIcons.warning
      );
      dialogResult.then((result) => {});

      {
        this.gridApi1.startEditingCell({
          rowIndex: e.rowIndex,
          colKey: "feeName",
        });
        this.testNull = true;
      }
    } else {
      e.data.rowStatus = null;
      this.testNull = false;
    }
  }
  editTable(e) {
    this.gridApi.startEditingCell({
      rowIndex: e.params.node.rowIndex,
      colKey: "feeName",
    });
  }
  editTable1(e) {
    this.gridApi1.startEditingCell({
      rowIndex: e.params.node.rowIndex,
      colKey: "feeName",
    });
  }
  delete() {}
  addToList() {
    this.gridApi.stopEditing();
    this.gridApi1.stopEditing();
    if (this.data) {
      this.results = Object.assign(this.data, this.myForm.value);
    } else {
      this.results = this.myForm.value;
    }
    this.rowData.forEach((e) => {
      e.isOriginCharges = true;
    });
    this.rowData1.forEach((e) => {
      e.isOriginCharges = false;
    });
    this.otherCharges = this.rowData.concat(this.rowData1);
    this.results.localCharges = this.otherCharges;
    this.activeModal.close(this.results);
  }

  addAction(e) {
    this.gridApi.stopEditing();
  }
  addAction1(e) {
    this.gridApi1.stopEditing();
  }
  cancelAction(e) {
    console.log(e);
    this.gridApi.updateRowData({ remove: [e.params.data] });
    this.rowData.splice(e.params.node.rowIndex, 1);
    this.testNull = false;
  }
  cancelAction1(e) {
    console.log(e);
    this.gridApi1.updateRowData({ remove: [e.params.data] });
    this.rowData1.splice(e.params.node.rowIndex, 1);
    this.testNull = false;
  }
}
