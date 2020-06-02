import { Component, OnInit, ViewEncapsulation, Input } from "@angular/core";
import { FormGroup, FormControl, FormBuilder, FormArray } from "@angular/forms";
import { CustomHeader } from "src/app/main/common/ag-grid-header-custom";
import { RouterLinkRendererComponent } from "../../../catalogue/actionTable/actionTable";
import { GridHeaderActions2Component } from "src/app/main/common/button-header-ag";
import { NgbModal, NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { AddNewDetailComponent } from "./addNewDetail/addNew.component";
import { ButtonRendererComponent } from "src/app/main/common/button-renderer.component";
import {
  MessageBox,
  MessageBoxButtons,
  MessageBoxIcons,
} from "src/app/form/message/messsage";
import { QuotationService } from "src/app/main/model/quotation/quotation.service";
import { Quotation1 } from "src/app/main/model/quotation/quotation.model";
import { formatDate } from "@angular/common";
import { objSize } from "src/app/form/input-date/util";

@Component({
  selector: "app-name",
  templateUrl: "./CRUD_quotation.component.html",
  styleUrls: ["./CRUD_quotation.component.css"],
  encapsulation: ViewEncapsulation.None,
})
export class CrudAirQuotationComponent implements OnInit {
  @Input() action;
  @Input() data;
  rowDataDetail = [];
  myForm: FormGroup;
  disable = false;
  defaultColDef;
  defaultColDef1;
  gridDetailApi;
  cacheBlockSize: number;
  paginationPageSize: number;
  frameworkComponents;
  components: { loadingRenderer: (params: any) => any };
  columnDetailDefs;
  columnOriginCharge;
  activeIds: string[] = [];
  gridApi;
  gridApi1;
  rowData;
  rowDataClone = [];
  rowDataClone1 = [];
  rowDataVolume = [];
  rowData1;
  columnVolume;
  volumeGridApi;
  testNull: any;
  truckingColumn;
  truckingGridApi;
  truckingRowData = [];
  truckingColumn1;
  truckingGridApi1;
  truckingRowData1 = [];
  constructor(
    private formBuilder: FormBuilder,
    private modal: NgbModal,
    private quotationService: QuotationService,
    public activeModal: NgbActiveModal
  ) {
    this.defaultColDef = {
      width: 120,
      headerComponentParams: { menuIcon: "fas fa-filter" },
      sortable: true,
      resizable: true,
      filter: true,
      cellStyle: {
        "border-left": "1px dotted skyblue",
      },
      editable: true,
    };
    this.defaultColDef1 = {
      width: 120,
      headerComponentParams: { menuIcon: "fas fa-filter" },
      sortable: true,
      resizable: true,
      filter: true,
      cellStyle: {
        "border-left": "1px dotted skyblue",
        "text-align": "right",
      },
      editable: true,
    };
    // this.cacheBlockSize = 50;
    // this.paginationPageSize = 50;
    this.frameworkComponents = {
      agColumnHeader: CustomHeader,
      buttonRenderer: ButtonRendererComponent,
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
    this.columnDetailDefs = [
      {
        headerName: "Origin Airport",
        field: "portofLoading",
        width: 200,
        sortable: true,
        filter: true,
        cellRenderer: (data) => {
          if (data.value) {
            return data.value.portID;
          }
        },
      },
      {
        headerName: "Destination Airport",
        field: "portofDischarge",
        width: 200,
        sortable: true,
        filter: true,
        cellRenderer: (data) => {
          if (data.value) {
            return data.value.portID;
          }
        },
      },
      {
        headerName: "Carrier",
        field: "carrierID",
        width: 250,
        sortable: true,
        filter: true,
        cellRenderer: (data) => {
          if (data.value) {
            return data.value.partnerNameFullEN;
          }
        },
      },
      {
        headerName: "MIN",
        field: "minQuantity",
        width: 100,
        sortable: true,
        filter: true,
      },
      {
        headerName: "-45",
        field: "level1",
        width: 100,
        sortable: true,
        filter: true,
      },
      {
        headerName: "+45",
        field: "level2",
        width: 100,
        sortable: true,
        filter: true,
      },
      {
        headerName: "+100",
        field: "level3",
        width: 100,
        sortable: true,
        filter: true,
      },
      {
        headerName: "+300",
        field: "level4",
        width: 100,
        sortable: true,
        filter: true,
      },
      {
        headerName: "+500",
        field: "level5",
        width: 100,
        sortable: true,
        filter: true,
      },
      {
        headerName: "+1000",
        field: "level6",
        width: 100,
        sortable: true,
        filter: true,
      },
      {
        headerName: "FSC",
        field: "fsc",
        width: 100,
        sortable: true,
        filter: true,
      },
      {
        headerName: "SSC",
        field: "ssc",
        width: 100,
        sortable: true,
        filter: true,
      },
      {
        headerName: "Other charges",
        field: "otherCharges",
        width: 100,
        sortable: true,
        filter: true,
      },
      {
        headerName: "T.T",
        field: "transitTime",
        width: 100,
        sortable: true,
        filter: true,
      },
      {
        headerName: "Frequency",
        field: "frequency",
        width: 100,
        sortable: true,
        filter: true,
      },
      {
        headerName: "Validity",
        field: "frequency",
        width: 100,
        sortable: true,
        filter: true,
      },
      {
        headerName: "Currency",
        field: "currency",
        width: 100,
        sortable: true,
        filter: true,
      },
      {
        headerName: "Notes",
        field: "notes",
        width: 400,
        sortable: true,
        filter: true,
      },
      {
        headerName: "Action",
        width: 100,
        field: "rowStatus",
        cellRenderer: "buttonRenderer",
        headerComponentFramework: GridHeaderActions2Component,
        headerComponentParams: {
          onClick: this.addNewDetail.bind(this),
        },
        editable: false,
        sortable: false,
        filter: false,
        resizable: false,
        pinned: "right",
        cellRendererParams: {
          onClick: this.editDetail.bind(this),
          onClick1: this.deleteDetail.bind(this),
        },
      },
    ];
    this.columnOriginCharge = [
      {
        headerName: "Charge",
        field: "feeName",
        width: 150,
        sortable: true,
        filter: true,
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
      },
      {
        headerName: "Unit",
        field: "unit",
        width: 300,
        sortable: true,
        filter: true,
      },
      {
        headerName: "Currency",
        field: "currency",
        width: 100,
        sortable: true,
        filter: true,
      },
    ];
    this.columnVolume = [
      {
        headerName: "No",
        field: "index",
        width: 50,
        sortable: true,
        filter: true,
        editable: false,
      },
      {
        headerName: "Quantity of pallet(s)",
        field: "quantity",
        width: 150,
        sortable: true,
        filter: true,
        // valueSetter: function numberValueSetter(params) {
        //   if (
        //     isNaN(parseFloat(params.newValue)) ||
        //     !isFinite(params.newValue) ||  params.newValue==0
        //   ) {
        //     return false;
        //   }
        //   params.data.quantity = params.newValue;
        //   return true;
        // },
        valueGetter: function (params) {
          return params.data.quantity;
        },
      },
      {
        headerName: "Dimension of each pallet ",
        field: "dimension",
        width: 300,
        sortable: true,
        filter: true,
        valueSetter: function numberValueSetter(params) {
          if (
            isNaN(parseFloat(params.newValue)) ||
            !isFinite(params.newValue) ||
            params.newValue == 0
          ) {
            return false;
          }
          params.data.dimension = params.newValue;
          return true;
        },
      },
      {
        headerName: "GW of each pallet",
        field: "grossWeight",
        width: 300,
        sortable: true,
        filter: true,
        valueSetter: function numberValueSetter(params) {
          if (
            isNaN(parseFloat(params.newValue)) ||
            !isFinite(params.newValue) ||
            params.newValue == 0
          ) {
            return false;
          }
          params.data.grossWeight = params.newValue;
          return true;
        },
        valueGetter: function (params) {
          return params.data.grossWeight;
        },
      },
      {
        headerName: "Action",
        width: 100,
        field: "rowStatus",
        cellRenderer: "buttonRenderer",
        headerComponentFramework: GridHeaderActions2Component,
        headerComponentParams: {
          onClick: this.addNewVolume.bind(this),
        },
        editable: false,
        sortable: false,
        filter: false,
        resizable: false,
        pinned: "right",
        cellRendererParams: {
          onClick3: this.addActionTableVolume.bind(this),
          onClick: this.editVolumeTable.bind(this),
          onClick1: this.cancelActionVolumeTable.bind(this),
          onClick4: this.cancelActionVolumeTable.bind(this),
        },
      },
    ];
    this.truckingColumn = [
      {
        headerName: "20'Truck",
        field: "truck20",
        width: 80,
        sortable: true,
        filter: true,
        valueParser: "Number(newValue)",
        valueSetter: function numberValueSetter(params) {
          if (
            isNaN(parseFloat(params.newValue)) ||
            !isFinite(params.newValue) ||
            params.newValue == 0
          ) {
            return false;
          }
          params.data.truck20 = params.newValue;
          return true;
        },
      },
      {
        headerName: "40'Truck",
        field: "truck40",
        width: 80,
        sortable: true,
        filter: true,
        valueParser: "Number(newValue)",
        valueSetter: function numberValueSetter(params) {
          if (
            isNaN(parseFloat(params.newValue)) ||
            !isFinite(params.newValue) ||
            params.newValue == 0
          ) {
            return false;
          }
          params.data.truck40 = params.newValue;
          return true;
        },
      },
      {
        headerName: "500kgsTruck",
        field: "truck500kgs",
        width: 80,
        sortable: true,
        filter: true,
        valueParser: "Number(newValue)",
        valueSetter: function numberValueSetter(params) {
          if (
            isNaN(parseFloat(params.newValue)) ||
            !isFinite(params.newValue) ||
            params.newValue == 0
          ) {
            return false;
          }
          params.data.truck500kgs = params.newValue;
          return true;
        },
      },
      {
        headerName: "1.5-tonTruck",
        field: "truckTonLevel1",
        width: 100,
        sortable: true,
        filter: true,
        valueParser: "Number(newValue)",
        valueSetter: function numberValueSetter(params) {
          if (
            isNaN(parseFloat(params.newValue)) ||
            !isFinite(params.newValue) ||
            params.newValue == 0
          ) {
            return false;
          }
          params.data.truckTonLevel1 = params.newValue;
          return true;
        },
      },
      {
        headerName: "2-tonTruck",
        field: "truckTonLevel2",
        width: 100,
        sortable: true,
        filter: true,
        valueParser: "Number(newValue)",
        valueSetter: function numberValueSetter(params) {
          if (
            isNaN(parseFloat(params.newValue)) ||
            !isFinite(params.newValue) ||
            params.newValue == 0
          ) {
            return false;
          }
          params.data.truckTonLevel2 = params.newValue;
          return true;
        },
      },
      {
        headerName: "2.5-tonTruck",
        field: "truckTonLevel2",
        width: 100,
        sortable: true,
        filter: true,
        valueParser: "Number(newValue)",
        valueSetter: function numberValueSetter(params) {
          if (
            isNaN(parseFloat(params.newValue)) ||
            !isFinite(params.newValue) ||
            params.newValue == 0
          ) {
            return false;
          }
          params.data.truckTonLevel2 = params.newValue;
          return true;
        },
      },
      {
        headerName: "3.5-tonTruck",
        field: "truckTonLevel4",
        width: 100,
        sortable: true,
        filter: true,
        valueParser: "Number(newValue)",
        valueSetter: function numberValueSetter(params) {
          if (
            isNaN(parseFloat(params.newValue)) ||
            !isFinite(params.newValue) ||
            params.newValue == 0
          ) {
            return false;
          }
          params.data.truckTonLevel4 = params.newValue;
          return true;
        },
      },
      {
        headerName: "5-tonTruck",
        field: "truckTonLevel5",
        width: 100,
        sortable: true,
        filter: true,
        valueParser: "Number(newValue)",
        valueSetter: function numberValueSetter(params) {
          if (
            isNaN(parseFloat(params.newValue)) ||
            !isFinite(params.newValue) ||
            params.newValue == 0
          ) {
            return false;
          }
          params.data.truckTonLevel5 = params.newValue;
          return true;
        },
      },
      {
        headerName: "6.5-tonTruck",
        field: "truckTonLevel6",
        width: 100,
        sortable: true,
        filter: true,
        valueParser: "Number(newValue)",
        valueSetter: function numberValueSetter(params) {
          if (
            isNaN(parseFloat(params.newValue)) ||
            !isFinite(params.newValue) ||
            params.newValue == 0
          ) {
            return false;
          }
          params.data.truckTonLevel6 = params.newValue;
          return true;
        },
      },
      {
        headerName: "8-tonTruck",
        field: "truckTonLevel7",
        width: 100,
        sortable: true,
        filter: true,
        valueParser: "Number(newValue)",
        valueSetter: function numberValueSetter(params) {
          if (
            isNaN(parseFloat(params.newValue)) ||
            !isFinite(params.newValue) ||
            params.newValue == 0
          ) {
            return false;
          }
          params.data.truckTonLevel7 = params.newValue;
          return true;
        },
      },
      {
        headerName: "9.5-tonTruck",
        field: "truckTonLevel8",
        width: 100,
        sortable: true,
        filter: true,
        valueParser: "Number(newValue)",
        valueSetter: function numberValueSetter(params) {
          if (
            isNaN(parseFloat(params.newValue)) ||
            !isFinite(params.newValue) ||
            params.newValue == 0
          ) {
            return false;
          }
          params.data.truckTonLevel8 = params.newValue;
          return true;
        },
      },
      {
        headerName: "11-tonTruck",
        field: "truckTonLevel9",
        width: 100,
        sortable: true,
        filter: true,
        valueParser: "Number(newValue)",
        valueSetter: function numberValueSetter(params) {
          if (
            isNaN(parseFloat(params.newValue)) ||
            !isFinite(params.newValue) ||
            params.newValue == 0
          ) {
            return false;
          }
          params.data.truckTonLevel9 = params.newValue;
          return true;
        },
      },
      {
        headerName: "13-tonTruck",
        field: "truckTonLevel10",
        width: 100,
        sortable: true,
        filter: true,
        valueParser: "Number(newValue)",
        valueSetter: function numberValueSetter(params) {
          if (
            isNaN(parseFloat(params.newValue)) ||
            !isFinite(params.newValue) ||
            params.newValue == 0
          ) {
            return false;
          }
          params.data.truckTonLevel10 = params.newValue;
          return true;
        },
      },
      {
        headerName: "15-tonTruck",
        field: "truckTonLevel11",
        width: 100,
        sortable: true,
        filter: true,
        valueParser: "Number(newValue)",
        valueSetter: function numberValueSetter(params) {
          if (
            isNaN(parseFloat(params.newValue)) ||
            !isFinite(params.newValue) ||
            params.newValue == 0
          ) {
            return false;
          }
          params.data.truckTonLevel11 = params.newValue;
          return true;
        },
      },
      {
        headerName: "16.5-tonTruck",
        field: "truckTonLevel12",
        width: 100,
        sortable: true,
        filter: true,
        valueParser: "Number(newValue)",
        valueSetter: function numberValueSetter(params) {
          if (
            isNaN(parseFloat(params.newValue)) ||
            !isFinite(params.newValue) ||
            params.newValue == 0
          ) {
            return false;
          }
          params.data.truckTonLevel12 = params.newValue;
          return true;
        },
      },
      {
        headerName: "18-tonTruck",
        field: "truckTonLevel13",
        width: 100,
        sortable: true,
        filter: true,
        valueParser: "Number(newValue)",
        valueSetter: function numberValueSetter(params) {
          if (
            isNaN(parseFloat(params.newValue)) ||
            !isFinite(params.newValue) ||
            params.newValue == 0
          ) {
            return false;
          }
          params.data.truckTonLevel13 = params.newValue;
          return true;
        },
      },
      {
        headerName: "20-tonTruck",
        field: "truckTonLevel14",
        width: 100,
        sortable: true,
        filter: true,
        valueParser: "Number(newValue)",
        valueSetter: function numberValueSetter(params) {
          if (
            isNaN(parseFloat(params.newValue)) ||
            !isFinite(params.newValue) ||
            params.newValue == 0
          ) {
            return false;
          }
          params.data.truckTonLevel14 = params.newValue;
          return true;
        },
      },
      {
        headerName: "22-tonTruck",
        field: "truckTonLevel15",
        width: 100,
        sortable: true,
        filter: true,
        valueParser: "Number(newValue)",
        valueSetter: function numberValueSetter(params) {
          if (
            isNaN(parseFloat(params.newValue)) ||
            !isFinite(params.newValue) ||
            params.newValue == 0
          ) {
            return false;
          }
          params.data.truckTonLevel15 = params.newValue;
          return true;
        },
      },
      {
        headerName: "Action",
        width: 100,
        field: "rowStatus",
        cellRenderer: "buttonRenderer",
        headerComponentFramework: GridHeaderActions2Component,
        headerComponentParams: {
          onClick: this.addNewTrucking.bind(this),
        },
        editable: false,
        sortable: false,
        filter: false,
        resizable: false,
        pinned: "right",
        cellStyle: {
          "border-left": "1px dotted skyblue",
        },
        cellRendererParams: {
          onClick1: this.cancelActionTrucking.bind(this),
          onClick4: this.cancelActionTrucking.bind(this),
          onClick3: this.addActionTrucking.bind(this),
        },
      },
    ];
    this.truckingColumn1 = [
      {
        headerName: "20'Truck",
        field: "truck20",
        width: 80,
        sortable: true,
        filter: true,
        valueParser: "Number(newValue)",
        valueSetter: function numberValueSetter(params) {
          if (
            isNaN(parseFloat(params.newValue)) ||
            !isFinite(params.newValue) ||
            params.newValue == 0
          ) {
            return false;
          }
          params.data.truck20 = params.newValue;
          return true;
        },
      },
      {
        headerName: "40'Truck",
        field: "truck40",
        width: 80,
        sortable: true,
        filter: true,
        valueParser: "Number(newValue)",
        valueSetter: function numberValueSetter(params) {
          if (
            isNaN(parseFloat(params.newValue)) ||
            !isFinite(params.newValue) ||
            params.newValue == 0
          ) {
            return false;
          }
          params.data.truck40 = params.newValue;
          return true;
        },
      },
      {
        headerName: "500kgsTruck",
        field: "truck500kgs",
        width: 80,
        sortable: true,
        filter: true,
        valueParser: "Number(newValue)",
        valueSetter: function numberValueSetter(params) {
          if (
            isNaN(parseFloat(params.newValue)) ||
            !isFinite(params.newValue) ||
            params.newValue == 0
          ) {
            return false;
          }
          params.data.truck500kgs = params.newValue;
          return true;
        },
      },
      {
        headerName: "1.5-tonTruck",
        field: "truckTonLevel1",
        width: 100,
        sortable: true,
        filter: true,
        valueParser: "Number(newValue)",
        valueSetter: function numberValueSetter(params) {
          if (
            isNaN(parseFloat(params.newValue)) ||
            !isFinite(params.newValue) ||
            params.newValue == 0
          ) {
            return false;
          }
          params.data.truckTonLevel1 = params.newValue;
          return true;
        },
      },
      {
        headerName: "2-tonTruck",
        field: "truckTonLevel2",
        width: 100,
        sortable: true,
        filter: true,
        valueParser: "Number(newValue)",
        valueSetter: function numberValueSetter(params) {
          if (
            isNaN(parseFloat(params.newValue)) ||
            !isFinite(params.newValue) ||
            params.newValue == 0
          ) {
            return false;
          }
          params.data.truckTonLevel2 = params.newValue;
          return true;
        },
      },
      {
        headerName: "2.5-tonTruck",
        field: "truckTonLevel2",
        width: 100,
        sortable: true,
        filter: true,
        valueParser: "Number(newValue)",
        valueSetter: function numberValueSetter(params) {
          if (
            isNaN(parseFloat(params.newValue)) ||
            !isFinite(params.newValue) ||
            params.newValue == 0
          ) {
            return false;
          }
          params.data.truckTonLevel2 = params.newValue;
          return true;
        },
      },
      {
        headerName: "3.5-tonTruck",
        field: "truckTonLevel4",
        width: 100,
        sortable: true,
        filter: true,
        valueParser: "Number(newValue)",
        valueSetter: function numberValueSetter(params) {
          if (
            isNaN(parseFloat(params.newValue)) ||
            !isFinite(params.newValue) ||
            params.newValue == 0
          ) {
            return false;
          }
          params.data.truckTonLevel4 = params.newValue;
          return true;
        },
      },
      {
        headerName: "5-tonTruck",
        field: "truckTonLevel5",
        width: 100,
        sortable: true,
        filter: true,
        valueParser: "Number(newValue)",
        valueSetter: function numberValueSetter(params) {
          if (
            isNaN(parseFloat(params.newValue)) ||
            !isFinite(params.newValue) ||
            params.newValue == 0
          ) {
            return false;
          }
          params.data.truckTonLevel5 = params.newValue;
          return true;
        },
      },
      {
        headerName: "6.5-tonTruck",
        field: "truckTonLevel6",
        width: 100,
        sortable: true,
        filter: true,
        valueParser: "Number(newValue)",
        valueSetter: function numberValueSetter(params) {
          if (
            isNaN(parseFloat(params.newValue)) ||
            !isFinite(params.newValue) ||
            params.newValue == 0
          ) {
            return false;
          }
          params.data.truckTonLevel6 = params.newValue;
          return true;
        },
      },
      {
        headerName: "8-tonTruck",
        field: "truckTonLevel7",
        width: 100,
        sortable: true,
        filter: true,
        valueParser: "Number(newValue)",
        valueSetter: function numberValueSetter(params) {
          if (
            isNaN(parseFloat(params.newValue)) ||
            !isFinite(params.newValue) ||
            params.newValue == 0
          ) {
            return false;
          }
          params.data.truckTonLevel7 = params.newValue;
          return true;
        },
      },
      {
        headerName: "9.5-tonTruck",
        field: "truckTonLevel8",
        width: 100,
        sortable: true,
        filter: true,
        valueParser: "Number(newValue)",
        valueSetter: function numberValueSetter(params) {
          if (
            isNaN(parseFloat(params.newValue)) ||
            !isFinite(params.newValue) ||
            params.newValue == 0
          ) {
            return false;
          }
          params.data.truckTonLevel8 = params.newValue;
          return true;
        },
      },
      {
        headerName: "11-tonTruck",
        field: "truckTonLevel9",
        width: 100,
        sortable: true,
        filter: true,
        valueParser: "Number(newValue)",
        valueSetter: function numberValueSetter(params) {
          if (
            isNaN(parseFloat(params.newValue)) ||
            !isFinite(params.newValue) ||
            params.newValue == 0
          ) {
            return false;
          }
          params.data.truckTonLevel9 = params.newValue;
          return true;
        },
      },
      {
        headerName: "13-tonTruck",
        field: "truckTonLevel10",
        width: 100,
        sortable: true,
        filter: true,
        valueParser: "Number(newValue)",
        valueSetter: function numberValueSetter(params) {
          if (
            isNaN(parseFloat(params.newValue)) ||
            !isFinite(params.newValue) ||
            params.newValue == 0
          ) {
            return false;
          }
          params.data.truckTonLevel10 = params.newValue;
          return true;
        },
      },
      {
        headerName: "15-tonTruck",
        field: "truckTonLevel11",
        width: 100,
        sortable: true,
        filter: true,
        valueParser: "Number(newValue)",
        valueSetter: function numberValueSetter(params) {
          if (
            isNaN(parseFloat(params.newValue)) ||
            !isFinite(params.newValue) ||
            params.newValue == 0
          ) {
            return false;
          }
          params.data.truckTonLevel11 = params.newValue;
          return true;
        },
      },
      {
        headerName: "16.5-tonTruck",
        field: "truckTonLevel12",
        width: 100,
        sortable: true,
        filter: true,
        valueParser: "Number(newValue)",
        valueSetter: function numberValueSetter(params) {
          if (
            isNaN(parseFloat(params.newValue)) ||
            !isFinite(params.newValue) ||
            params.newValue == 0
          ) {
            return false;
          }
          params.data.truckTonLevel12 = params.newValue;
          return true;
        },
      },
      {
        headerName: "18-tonTruck",
        field: "truckTonLevel13",
        width: 100,
        sortable: true,
        filter: true,
        valueParser: "Number(newValue)",
        valueSetter: function numberValueSetter(params) {
          if (
            isNaN(parseFloat(params.newValue)) ||
            !isFinite(params.newValue) ||
            params.newValue == 0
          ) {
            return false;
          }
          params.data.truckTonLevel13 = params.newValue;
          return true;
        },
      },
      {
        headerName: "20-tonTruck",
        field: "truckTonLevel14",
        width: 100,
        sortable: true,
        filter: true,
        valueParser: "Number(newValue)",
        valueSetter: function numberValueSetter(params) {
          if (
            isNaN(parseFloat(params.newValue)) ||
            !isFinite(params.newValue) ||
            params.newValue == 0
          ) {
            return false;
          }
          params.data.truckTonLevel14 = params.newValue;
          return true;
        },
      },
      {
        headerName: "22-tonTruck",
        field: "truckTonLevel15",
        width: 100,
        sortable: true,
        filter: true,
        valueParser: "Number(newValue)",
        valueSetter: function numberValueSetter(params) {
          if (
            isNaN(parseFloat(params.newValue)) ||
            !isFinite(params.newValue) ||
            params.newValue == 0
          ) {
            return false;
          }
          params.data.truckTonLevel15 = params.newValue;
          return true;
        },
      },
      {
        headerName: "Action",
        width: 100,
        field: "rowStatus",
        cellRenderer: "buttonRenderer",
        headerComponentFramework: GridHeaderActions2Component,
        headerComponentParams: {
          onClick: this.addNewTrucking1.bind(this),
        },
        editable: false,
        sortable: false,
        filter: false,
        resizable: false,
        pinned: "right",
        cellStyle: {
          "border-left": "1px dotted skyblue",
        },
        cellRendererParams: {
          onClick1: this.cancelActionTrucking1.bind(this),
          onClick4: this.cancelActionTrucking1.bind(this),
          onClick3: this.addActionTrucking1.bind(this),
        },
      },
    ];
  }
  createForm() {
    this.myForm = this.formBuilder.group({
      _id: new FormControl(),
      quotationNo: new FormControl(""),
      client: new FormControl(""),
      creator: new FormControl(""),
      dateCreate: new FormControl(""),
      dateModify: new FormControl(""),
      quotationDate: new FormControl(""),
      termofService: new FormControl(""),
      commodity: new FormControl(""),
      hsCode: new FormControl(""),
      sentTo: new FormControl(""),
      pickupAt: new FormControl(""),
      deliveryTo: new FormControl(""),
      deadlineDelivery: new FormControl(""),
      volume: new FormControl(),
      volumeUnit: new FormControl(),
      quantity: new FormControl(""),
      dimensions: new FormControl(""),
      grossWeight: new FormControl(""),
      nonPalletPackageQuantity: new FormControl(""),
      isExport: new FormControl(),
      clearanceTerminal: new FormControl(),
      purposeOfImport: new FormControl(),
      purposeOfExport: new FormControl(),
      specialRequirements: new FormControl(),
      targetedRateAndCharges: new FormControl(),
      blFee: new FormControl(),
      thcOrigin: new FormControl(),
      cfsOrigin: new FormControl(),
      telexRelease: new FormControl(),
      doFee: new FormControl(),
      thcDestination: new FormControl(),
      cfsDestination: new FormControl(),
      handlingFee: new FormControl(),
      containerCleaningFee: new FormControl(),
      cic: new FormControl(),
      awb_SET: new FormControl(),
      ams_HBL: new FormControl(),
      ams_MBL: new FormControl(),
      terminalCharge_KG: new FormControl(),
      xray_KG: new FormControl(),
      laborCharge: new FormControl(),
      currency: new FormControl(),
      customsClearance: this.formBuilder.array([
        this.formBuilder.group({
          terminal: new FormControl(),
          purposeOfImEx: new FormControl(),
          terminalImEx: new FormControl(),
          chargePer20: new FormControl(),
          chargePer40: new FormControl(),
          chargePerLCLShpt: new FormControl(),
          currency: new FormControl(),
          isOriginCharges: new FormControl(true),
          quotationNo: new FormControl(),
          _id: new FormControl(),
        }),
        this.formBuilder.group({
          terminal: new FormControl(),
          purposeOfImEx: new FormControl(),
          terminalImEx: new FormControl(),
          chargePer20: new FormControl(),
          chargePer40: new FormControl(),
          chargePerLCLShpt: new FormControl(),
          currency: new FormControl(),
          isOriginCharges: new FormControl(false),
          quotationNo: new FormControl(),
          _id: new FormControl(),
        }),
      ]),
      customsClearanceAtOrigin: new FormControl(),
      customsClearanceAtDestination: new FormControl(),
      cargoIsUnstackable: new FormControl(),
      packageCanBeTilted: new FormControl(),
      needExpressService: new FormControl(),
      remarks: new FormControl(),
      quotationType: new FormControl(),
      saveDraft: new FormControl(),
      logInfo: new FormControl(),
      cargoReadyDateTo: new FormControl(),
      cargoReadyDateFrom: new FormControl(),
    });
  }

  ngOnInit(): void {
    this.createForm();
    // this.rowDataDetail.forEach(row => {
    //   row.rowStatus = '';
    // });

    if (this.action == "EDIT") {
      this.myForm.patchValue(this.data);
      this.activeIds = [this.myForm.get("termofService").value];
      this.rowDataVolume = JSON.parse(
        JSON.stringify(this.data.palletizedPackage)
      );
      this.myForm
        .get("cargoReadyDateFrom")
        .setValue(this.data.cargoReadyDateFrom.split("/").reverse().join("-"));
      this.myForm
        .get("cargoReadyDateTo")
        .setValue(this.data.cargoReadyDateTo.split("/").reverse().join("-"));
      this.quotationService
        .getQuotationAir_detail(this.data.quotationNo)
        .subscribe((e) => {
          console.log(e);
          this.rowDataDetail = JSON.parse(JSON.stringify(e.results));
        });
      this.quotationService
        .getQuotationDetail_CustomClearance(this.data.quotationNo)
        .subscribe((e) => {
          this.myForm.get("customsClearance").patchValue(e.results);
        });
      this.quotationService
        .getQuotationTruckingNonContainer(this.data.quotationNo)
        .subscribe((e) => {
          console.log(e.results);
          e.results.forEach((i) => {
            if (i.isOriginCharges) {
              this.truckingRowData = this.truckingRowData.concat(i);
            } else {
              this.truckingRowData1 = this.truckingRowData1.concat(i);
            }
          });
        });
    }
    this.myForm.get("creator").setValue("CT0276");
  }

  test(e) {
    this.myForm.get("customsClearanceAtOrigin").reset();
    this.myForm.get("customsClearanceAtDestination").reset();
    this.myForm.get("pickupAt").reset();
    this.myForm.get("deliveryTo").reset();
    this.myForm.get("purposeOfImport").reset();
    this.myForm.get("purposeOfExport").reset();
    this.activeIds = [this.myForm.get("termofService").value];
  }
  onGridDetailReady(e) {
    this.gridDetailApi = e.api;
    // this.setDataSource(this.gridDetailApi, this.rowDataDetail);
  }
  onGridReady(params) {
    this.gridApi = params.api;
  }
  onGridReady1(params) {
    this.gridApi1 = params.api;
  }
  onVolumeGridReady(params) {
    this.volumeGridApi = params.api;
  }
  onTruckingGridReady(params) {
    this.truckingGridApi = params.api;
  }
  onTruckingGridReady1(params) {
    this.truckingGridApi1 = params.api;
  }
  save(e) {
    let dialogResult = MessageBox.show(
      this.modal,
      "Do you want to save data ?",
      "Confirm",
      MessageBoxButtons.yesNoCancel,
      MessageBoxIcons.question
    );
    dialogResult.then((result) => {
      if (result === "YES") {
        let validData = this.validData(this.myForm.value);
        if (validData.isValid) {
          let result = {
            general: new Quotation1(),
            quotationDetails_Air: [],
            quotationDetails_TruckingNonContainers: [],
            quotationDetails_CustomsClearance: [],
          };
          result.quotationDetails_CustomsClearance = this.myForm.get(
            "customsClearance"
          ).value;
          const b = this.myForm.get("termofService").value;
          result.general = this.myForm.value;
          {
            if (b == "PTP") {
              result.general.portToPort = true;
              result.general.doorToPort = false;
              result.general.portToDoor = false;
              result.general.doorToDoor = false;
            }
            if (b == "DTP") {
              result.general.doorToPort = true;
              result.general.portToPort = false;
              result.general.portToDoor = false;
              result.general.doorToDoor = false;
            }
            if (b == "PTD") {
              result.general.portToDoor = true;
              result.general.doorToPort = false;
              result.general.portToPort = false;
              result.general.doorToDoor = false;
            }
            if (b == "DTD") {
              result.general.doorToDoor = true;
              result.general.portToDoor = false;
              result.general.doorToPort = false;
              result.general.portToPort = false;
            }
          }
          {
            this.rowDataDetail.forEach((e) => {
              e.portofDischarge = e.portofDischarge?.portID;
              e.portofLoading = e.portofLoading?.portID;
              e.carrierID = e.carrierID?.partnerID;
              e.localCharges.forEach((e) => {
                e.feeName = e.feeName?.feeID;
              });
            });
          }
          result.general.quotationType = "AirFreightQuotation";
          result.quotationDetails_Air = this.rowDataDetail;
          this.rowDataVolume.forEach((e) => {
            delete e["rowStatus"];
          });
          result.general.palletizedPackage = this.rowDataVolume;
          this.truckingRowData.forEach((e) => {
            e.isOriginCharges = true;
          });
          this.truckingRowData1.forEach((e) => {
            e.isOriginCharges = false;
          });
          let sumTruckingData = this.truckingRowData.concat(
            this.truckingRowData1
          );
          result.quotationDetails_TruckingNonContainers = sumTruckingData;
          result.general.cargoReadyDateFrom = formatDate(
            this.myForm.get("cargoReadyDateFrom").value
              ? this.myForm.get("cargoReadyDateFrom").value
              : null,
            "dd/MM/yyyy",
            "en-US"
          );
          result.general.cargoReadyDateTo = formatDate(
            this.myForm.get("cargoReadyDateTo").value
              ? this.myForm.get("cargoReadyDateTo").value
              : null,
            "dd/MM/yyyy",
            "en-US"
          );
          result.general.client = this.myForm.get("client").value.partnerID;
          result.general.commodity = this.myForm.get(
            "commodity"
          ).value.commodityID;
          result.general.sentTo = this.myForm.get("sentTo").value.contactID;
          result.general.pickupAt = this.myForm.get("pickupAt").value?.portID;
          result.general.deliveryTo = this.myForm.get(
            "deliveryTo"
          ).value?.portID;
          if (this.action != "EDIT") {
            console.log(result);
            result.general.dateCreate = formatDate(
              new Date(),
              "dd/MM/yyyy",
              "en-US"
            );
            console.log(result, JSON.stringify(result));
            this.quotationService.addQuotationAir(result).subscribe((e) => {
              console.log(e);
            });
          } else {
            result.general.dateModify = formatDate(
              new Date(),
              "dd/MM/yyyy",
              "en-US"
            );
            this.quotationService
              .getQuotationTruckingNonContainer(this.data.quotationNo)
              .subscribe((e) => {
                function comparer(otherArray) {
                  return function (current) {
                    return (
                      otherArray.filter(function (other) {
                        return other._id == current._id;
                      }).length == 0
                    );
                  };
                }
                let a = e.results.filter(
                  comparer(result.quotationDetails_TruckingNonContainers)
                );
                a.forEach((e) => {
                  this.quotationService
                    .deleteQuotationDetailTruckingNonContainer(e._id)
                    .subscribe();
                });
              });
            this.myForm.get("customsClearance").value.forEach((e) => {
              this.quotationService
                .updateQuotationDetail_CustomClearance(e)
                .subscribe();
            });

            result.quotationDetails_TruckingNonContainers.forEach((e) => {
              if (e._id) {
                this.quotationService
                  .updateQuotationDetailTruckingNonContainer(e)
                  .subscribe();
              } else {
                e.quotationNo = this.data.quotationNo;
                this.quotationService
                  .createQuotationDetailTruckingNonContainer(e)
                  .subscribe();
              }
            });
            this.quotationService
              .getQuotationAir_detail(this.data.quotationNo)
              .subscribe((e) => {
                function comparer(otherArray) {
                  return function (current) {
                    return (
                      otherArray.filter(function (other) {
                        return other._id == current._id;
                      }).length == 0
                    );
                  };
                }
                let a = e.results.filter(comparer(result.quotationDetails_Air));
                a.forEach((e) => {
                  this.quotationService
                    .deleteQuotationAirDetail(e._id)
                    .subscribe();
                });
              });
            result.quotationDetails_Air.forEach((e) => {
              console.log(e);
              if (e._id) {
                e.localCharges.forEach((i) => {
                  i.quotationDetail_IDKey = e._id;
                });
                this.quotationService.updateQuotationAirDetail(e).subscribe();
              } else {
                e.quotationNo = this.data.quotationNo;
                debugger;
                this.quotationService
                  .createQuotationAirDetail(e)
                  .subscribe((e) => {
                    console.log(e);
                  });
              }
            });
            this.quotationService
              .updateQuotation(result.general)
              .subscribe((e) => {
                console.log(e, result);
                if (e.success) {
                  const str =
                    result.general.quotationNo + "  " + "Successfully saved!";
                  let dialogResult = MessageBox.show(
                    this.modal,
                    str,
                    "Notification",
                    MessageBoxButtons.ok,
                    MessageBoxIcons.information
                  );
                  this.quotationService
                    .getQuotationAir_detail(this.data.quotationNo)
                    .subscribe((e) => {
                      console.log(e);
                      this.rowDataDetail = JSON.parse(
                        JSON.stringify(e.results)
                      );
                    });
                  // this.activeModal.close(result.general);
                }
              });
          }
          console.log(JSON.stringify(result.general));
        } else {
          let dialogResult = MessageBox.show(
            this.modal,
            validData.message,
            "Alert",
            MessageBoxButtons.ok,
            MessageBoxIcons.warning
          );
          dialogResult.then((result) => {});
        }
      }
      if (result === "NO") {
        this.activeModal.close();
      }
    });
  }
  editDetail(e) {
    console.log(e);
    const modalRef = this.modal.open(AddNewDetailComponent, {
      windowClass: "detail",
      backdrop: "static",
      keyboard: false,
    });
    modalRef.componentInstance.data = e.params.data;
    modalRef.componentInstance.action = "EDIT";
    modalRef.result.then(
      (result) => {
        let a = Object.assign(result, e.params.data);
        this.gridDetailApi.applyTransaction({ update: a[0] });
        let node = this.gridDetailApi.getDisplayedRowAtIndex(
          e.params.node.rowIndex
        );
        node.setSelected(true);
        this.pickRow("");
      },
      (reason) => {
        console.log("reason dismiss", reason);
      }
    );
  }
  deleteDetail(e) {
    this.gridDetailApi.applyTransaction({ remove: [e.params.data] });
    this.testNull = false;
    this.rowDataDetail.splice(e.params.node.rowIndex, 1);
  }
  addNewDetail() {
    this.openPopup("");
  }
  protected validData(form) {
    let isValid = true;
    let message = "";

    if (form.sentTo == null || form.sentTo === "") {
      isValid = false;
      message = message
        ? message + "" + "'Sent to' can't be empty."
        : "'Sent to' can't be empty. ";
    }
    if (form.client == null || form.client === "") {
      isValid = false;
      message = message
        ? message + "" + " 'Client' can't be empty."
        : "'Client' can't be empty.";
    }

    if (form.commodity == null) {
      isValid = false;
      message = message
        ? message + "" + "'Commodity Type' can't be empty."
        : "'Commodity Type' can't be empty.";
    }
    // if (
    //   form.commodityDescriptions == null ||
    //   form.commodityDescriptions == ""
    // ) {
    //   isValid = false;
    //   message = message
    //     ? message + "\n" + " 'Commodity' can't be empty."
    //     : "'Commodity' can't be empty.";
    // }
    if (form.termofService == null || form.termofService == "") {
      isValid = false;
      message = message
        ? message + "" + "'Term of service' can't be empty."
        : "'Term of service' can't be empty.";
    }
    if (this.testNull) {
      isValid = false;
      message = message
        ? message + "" + "Action Add New Table not done yet"
        : "Action Add New Table not done yet";
    }

    return { isValid: isValid, message: message };
  }
  setDataSource(gridApi, rowData) {
    let row = this.rowDataDetail;
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
  async pickRow(e) {
    this.rowDataClone = [];
    this.rowDataClone1 = [];
    let a = this.gridDetailApi.getSelectedRows();
    await a[0].localCharges.forEach((element) => {
      if (element.isOriginCharges) {
        this.rowDataClone.push(element);
      } else {
        this.rowDataClone1.push(element);
      }
    });
    this.rowData = this.rowDataClone;
    this.rowData1 = this.rowDataClone1;
    console.log(a);
  }
  openPopup(data) {
    const modalRef = this.modal.open(AddNewDetailComponent, {
      windowClass: "detail",
      backdrop: "static",
      keyboard: false,
    });
    modalRef.result.then(
      (result) => {
        this.gridDetailApi.applyTransaction({ add: [result], addIndex: 0 });
        this.rowDataDetail.push(result);
        let node = this.gridDetailApi.getDisplayedRowAtIndex(0);
        node.setSelected(true);
      },
      (reason) => {
        console.log("reason dismiss", reason);
      }
    );
  }
  addNewVolume() {
    if (!this.testNull) {
      const newRows = {
        rowStatus: "ADD",
        index: this.rowDataVolume[this.rowDataVolume.length - 1]?.index
          ? this.rowDataVolume[this.rowDataVolume.length - 1].index + 1
          : 1,
      };
      // this.rowDataVolume.splice(0, 0, newRows);
      this.rowDataVolume.push(newRows);
      this.volumeGridApi.applyTransaction({ add: [newRows] });
      this.volumeGridApi.startEditingCell({
        rowIndex: this.rowDataVolume.length - 1,
        colKey: "index",
      });
    }
    this.testNull = true;
  }
  tableVolumeChange(e) {
    if (!e.data?.quantity || !e.data?.dimension || !e.data?.grossWeight) {
      let dialogResult = MessageBox.show(
        this.modal,
        "Null Error !",
        "Alert ! ",
        MessageBoxButtons.ok,
        MessageBoxIcons.warning
      );
      dialogResult.then((result) => {});
      {
        this.volumeGridApi.startEditingCell({
          rowIndex: e.rowIndex,
          colKey: "quantity",
        });
        this.testNull = true;
      }
    } else {
      this.volumeGridApi.stopEditing();
      delete e.data.rowStatus;
      this.testNull = false;
    }
  }
  addActionTableVolume(e) {
    this.volumeGridApi.stopEditing();
  }
  editVolumeTable(e) {
    this.volumeGridApi.startEditingCell({
      rowIndex: e.params.node.rowIndex,
      colKey: "index",
    });
  }
  cancelActionVolumeTable(e) {
    this.volumeGridApi.applyTransaction({ remove: [e.params.data] });
    this.rowDataVolume.splice(e.params.node.rowIndex, 1);
    this.testNull = false;
  }

  addNewTrucking() {
    if (!this.testNull) {
      const newRows = { rowStatus: "ADD" };
      this.truckingRowData.push(newRows);
      this.truckingGridApi.applyTransaction({ add: [newRows] });
      this.truckingGridApi.startEditingCell({
        rowIndex: this.truckingRowData.length - 1,
        colKey: "truck20",
      });
    }
    this.testNull = true;
  }
  addActionTrucking(e) {
    this.truckingGridApi.stopEditing();
  }
  tableTruckingChange(e) {
    if (objSize(e.data) <= 1) {
      let dialogResult = MessageBox.show(
        this.modal,
        "Null Error !",
        "Alert ! ",
        MessageBoxButtons.ok,
        MessageBoxIcons.warning
      );
      dialogResult.then((result) => {
        this.truckingGridApi.startEditingCell({
          rowIndex: e.rowIndex,
          colKey: "truck20",
        });
        this.testNull = true;
      });
    } else {
      delete e.data.rowStatus;
      this.testNull = false;
    }
  }
  cancelActionTrucking(e) {
    this.truckingGridApi.applyTransaction({ remove: [e.params.data] });
    this.testNull = false;
    this.truckingRowData.splice(e.params.node.rowIndex, 1);
  }
  addNewTrucking1() {
    if (!this.testNull) {
      const newRows = { rowStatus: "ADD" };
      this.truckingRowData1.push(newRows);
      this.truckingGridApi1.applyTransaction({ add: [newRows] });
      this.truckingGridApi1.startEditingCell({
        rowIndex: this.truckingRowData1.length - 1,
        colKey: "truck20",
      });
    }
    this.testNull = true;
  }
  addActionTrucking1() {
    this.truckingGridApi1.stopEditing();
  }
  tableTruckingChange1(e) {
    if (objSize(e.data) <= 1) {
      let dialogResult = MessageBox.show(
        this.modal,
        "Null Error !",
        "Alert ! ",
        MessageBoxButtons.ok,
        MessageBoxIcons.warning
      );
      dialogResult.then((result) => {});

      {
        this.truckingGridApi1.startEditingCell({
          rowIndex: e.rowIndex,
          colKey: "truck20",
        });
        this.testNull = true;
      }
    } else {
      delete e.data.rowStatus;
      this.testNull = false;
    }
  }
  cancelActionTrucking1(e) {
    console.log(e);
    this.truckingGridApi1.applyTransaction({ remove: [e.params.data] });
    this.testNull = false;
    this.truckingRowData1.splice(e.params.node.rowIndex, 1);
  }
  pickRowTrucking() {}
  close() {
    this.activeModal.dismiss();
  }
  deleteQuo() {
    this.quotationService.deleteQuotationAir(this.data._id).subscribe((e) => {
      if (e.success) {
        const str = this.data.quotationNo + "  " + "Successfully delete!";
        let dialogResult = MessageBox.show(
          this.modal,
          str,
          "Notification",
          MessageBoxButtons.ok,
          MessageBoxIcons.information
        );
        this.activeModal.dismiss();
      } else {
        let dialogResult = MessageBox.show(
          this.modal,
          e.message,
          "Notification by BACK-END",
          MessageBoxButtons.ok,
          MessageBoxIcons.information
        );
      }
    });
  }
}
