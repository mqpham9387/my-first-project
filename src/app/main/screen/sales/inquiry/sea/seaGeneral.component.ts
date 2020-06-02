import { Component, OnInit, Input, forwardRef } from "@angular/core";
import { Inquiry } from "src/app/main/model/inquiry/inquiry.model";
import { Store } from "@ngrx/store";
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
  NG_VALUE_ACCESSOR,
} from "@angular/forms";
import {
  MessageBox,
  MessageBoxButtons,
  MessageBoxIcons,
} from "src/app/form/message/messsage";
import * as fromMain from "src/app/main/store/main.reducer";
import { PartnerService } from "src/app/main/model/partner/partner.service";
import { ContactService } from "src/app/main/model/contact/contact.service";
import { formatDate } from "@angular/common";
import { PortService } from "src/app/main/model/port/port.service";
import * as InquiryActions from "../store/inquiry.actions";
import { CommodityService } from "src/app/main/model/commodity/commodity.service";
import { Observable } from "rxjs";
import { Commodity } from "src/app/main/model/commodity/commodity";
import { TermService } from "src/app/main/model/term/term.service";
import { NgbModal, NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { CustomHeader } from "src/app/main/common/ag-grid-header-custom";
import { ButtonRendererComponent } from "src/app/main/common/button-renderer.component";
@Component({
  selector: "sea-general",
  templateUrl: "./seaGeneral.component.html",
  styleUrls: ["./seaGeneral.component.css"],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SeaGeneralComponent),
      multi: true,
    },
  ],
})
export class SeaGeneralComponent implements OnInit {
  @Input() data;
  @Input() index;
  @Input() action;
  client;
  clients;
  contacts;
  creator;
  cargoReadyDate;
  dateCreate;
  dateModify;
  inquiri: Inquiry;
  ports;
  myForm: FormGroup;
  columnDefs;
  rowData;
  commodityList;
  term;
  disable;
  saveButton;
  defaultColDef;
  loadingCommodity = true;
  contType = [
    { containerType: "unitID, notes: CONTAINER TYPE" },
    { containerType: "GP/DC" },
    { containerType: "RF" },
    { containerType: "OT" },
    { containerType: "FR" },
    { containerType: "ISO Tank" },
  ];
  contTypeSelect = [];
  frameworkComponents;
  gridApi;
  editMode = false;
  arrayTest = [];
  createForm() {
    this.myForm = this.formBuilder.group({
      inquiryID: new FormControl(""),
      cargoReadyDate: new FormControl(""),
      commodity: new FormControl(""),
      client: new FormControl(""),
      specialRequirement: new FormControl(""),
      creator: new FormControl(""),
      dateCreate: new FormControl(""),
      sentTo: new FormControl(""),
      forwardedTo: new FormControl(""),
      targetRateAndCharges: new FormControl(""),
      lastQuotedOn: new FormControl(""),
      portofDischarge: new FormControl(""),
      portofLoading: new FormControl(""),
      purposeOfExport: new FormControl(),
      purposeOfImport: new FormControl(),
      portToPort: new FormControl(""),
      portToDoor: new FormControl(""),
      doorToPort: new FormControl(""),
      doorToDoor: new FormControl(""),
      term: new FormControl(),
      pickupAt: new FormControl(),
      deliveryTo: new FormControl(),
      customsClearanceAtOrigin: new FormControl(),
      customsClearanceAtDestination: new FormControl(),
      customsClearance: new FormControl(),
      cargoIsUnstackable: new FormControl(),
      volume: new FormControl(),
      grossWeight: new FormControl(),
      commodityDescriptions: new FormControl(),
      isFCL: new FormControl(),
      isLCL: new FormControl(),
      deadlineDelivery: new FormControl(),
    });
  }
  constructor(
    public partnerService: PartnerService,
    public contactService: ContactService,
    public portService: PortService,
    private store: Store<fromMain.MainState>,
    private formBuilder: FormBuilder,
    public commodityService: CommodityService,
    private termService: TermService,
    private modal: NgbModal,
    private activeModal: NgbActiveModal
  ) {
    this.createForm();
    this.columnDefs = [
      {
        headerName: "Type",
        field: "containerType",
        cellEditor: "agSelectCellEditor",
        width: 200,
        cellEditorParams: {
          values: this.contTypeSelect,
        },
        // cellRenderer: function (data: any) {
        //   console.log(data)
        // },
        onCellValueChanged: function (data: any) {
          data.colDef.cellEditorParams.values = data.colDef.cellEditorParams.values.filter(
            (e) => e !== data.newValue
          );
          console.log(data);
        },
      },
      {
        headerName: "20'",
        field: "container20",
        width: 70,
        cellStyle: { "text-align": "right" },
      },
      {
        headerName: " 40'",
        field: "container40",
        width: 70,
        cellStyle: { "text-align": "right" },
      },
      {
        headerName: "HQ",
        field: "containerHQ",
        width: 70,
        cellStyle: { "text-align": "right" },
      },
      {
        headerName: "45'",
        field: "container45",
        width: 70,
        cellStyle: { "text-align": "right" },
      },
      {
        headerName: "Cargo Dimensions",
        field: "cargoDimensions",
        width: 150,
        cellStyle: { "text-align": "right" },
      },
      {
        headerName: "Cargo Weight",
        field: "cargoWeight",
        width: 100,
        cellStyle: { "text-align": "right" },
      },
      {
        headerName: "Requested temperature",
        field: "requestedTemperature",
        width: 250,
      },
      {
        headerName: "Action",
        width: 100,
        cellRenderer: "buttonRenderer",
        editable: false,
        sortable: false,
        filter: false,
        resizable: false,
        pinned: "right",
        cellRendererParams: {
          onClick: this.editTable.bind(this),
          label: "Edit",
          onClick1: this.deleteTable.bind(this),
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
  onGridReady(params) {
    this.gridApi = params.api;
  }
  getTerm() {
    if (this.data.portToPort) {
      this.myForm.get("term").setValue("Port To Port");
    }
    if (this.data.portToDoor) {
      this.myForm.get("term").setValue("Port To Door");
    }
    if (this.data.doorToPort) {
      this.myForm.get("term").setValue("Door To Port");
    }
    if (this.data.doorToDoor) {
      this.myForm.get("term").setValue("Door To Door");
    }
  }
  setTerm() {
    if (this.myForm.get("term").value == "PTP") {
      this.myForm.get("portToPort").setValue(true);
      this.myForm.get("portToDoor").setValue(false);
      this.myForm.get("doorToDoor").setValue(false);
      this.myForm.get("doorToPort").setValue(false);
    }
    if (this.myForm.get("term").value == "PTD") {
      this.myForm.get("portToDoor").setValue(true);
      this.myForm.get("portToPort").setValue(false);
      this.myForm.get("doorToDoor").setValue(false);
      this.myForm.get("doorToPort").setValue(false);
    }
    if (this.myForm.get("term").value == "DTD") {
      this.myForm.get("doorToDoor").setValue(true);
      this.myForm.get("portToPort").setValue(false);
      this.myForm.get("portToDoor").setValue(false);
      this.myForm.get("doorToPort").setValue(false);
    }
    if (this.myForm.get("term").value == "DTP") {
      this.myForm.get("doorToPort").setValue(true);
      this.myForm.get("portToPort").setValue(false);
      this.myForm.get("portToDoor").setValue(false);
      this.myForm.get("doorToDoor").setValue(false);
    }
  }
  setDateView() {
    this.data.cargoReadyDate != null && this.data.cargoReadyDate != ""
      ? this.myForm
          .get("cargoReadyDate")
          .setValue(
            formatDate(
              this.data.cargoReadyDate.split("/").reverse().join("-"),
              "yyyy-MM-dd",
              "en-US"
            )
          )
      : this.myForm.get("cargoReadyDate").setValue("");
    this.data.dateCreate != null && this.data.dateCreate != ""
      ? this.myForm
          .get("dateCreate")
          .setValue(
            formatDate(
              this.data.dateCreate.split("/").reverse().join("-"),
              "yyyy-MM-dd",
              "en-US"
            )
          )
      : null;
    this.data.lastQuotedOn != null && this.data.lastQuotedOn != ""
      ? this.myForm
          .get("lastQuotedOn")
          .setValue(
            formatDate(
              this.data.lastQuotedOn.split("/").reverse().join("-"),
              "yyyy-MM-dd",
              "en-US"
            )
          )
      : null;
    this.data.deadlineDelivery != null && this.data.deadlineDelivery != ""
      ? this.myForm
          .get("deadlineDelivery")
          .setValue(
            formatDate(
              this.data.deadlineDelivery.split("/").reverse().join("-"),
              "yyyy-MM-dd",
              "en-US"
            )
          )
      : null;
  }
  setDateSave() {
    this.myForm.get("cargoReadyDate").value != "" &&
    this.myForm.get("cargoReadyDate").value != null
      ? this.myForm
          .get("cargoReadyDate")
          .setValue(
            this.myForm
              .get("cargoReadyDate")
              .value.split("-")
              .reverse()
              .join("/")
          )
      : this.myForm.get("cargoReadyDate").setValue(null);
    this.myForm.get("dateCreate").value != "" &&
    this.myForm.get("dateCreate").value != null
      ? this.myForm
          .get("dateCreate")
          .setValue(
            this.myForm.get("dateCreate").value.split("-").reverse().join("/")
          )
      : this.myForm.get("dateCreate").setValue(null);
    this.myForm.get("lastQuotedOn").value != "" &&
    this.myForm.get("lastQuotedOn").value != null
      ? this.myForm
          .get("lastQuotedOn")
          .setValue(
            this.myForm.get("lastQuotedOn").value.split("-").reverse().join("/")
          )
      : this.myForm.get("lastQuotedOn").setValue(null);
    this.myForm.get("deadlineDelivery").value != "" &&
    this.myForm.get("deadlineDelivery").value != null
      ? this.myForm
          .get("deadlineDelivery")
          .setValue(
            this.myForm
              .get("deadlineDelivery")
              .value.split("-")
              .reverse()
              .join("/")
          )
      : this.myForm.get("deadlineDelivery").setValue(null);
  }
  ngOnInit() {
    this.contType.forEach((e) => {
      this.contTypeSelect.push(e.containerType);
    });

    this.getLookup();
    this.getTerm();
    this.myForm.patchValue(this.data);
    if (this.data.volume || this.data.grossWeight) {
      this.myForm.get("isLCL").setValue(true);
    }
    if (this.data.serviceInquiryVolumeFCL) {
      this.rowData = JSON.parse(
        JSON.stringify(this.data.serviceInquiryVolumeFCL)
      );
      this.myForm.get("isFCL").setValue(true);
    }
    if (this.action == "VIEW") {
      this.myForm.disable();
      this.disable = true;
    }
    if (this.action == "EDIT") {
      this.saveButton = true;
    }
    this.setDateView();
    if (!this.myForm.get("isLCL").value) {
      this.myForm.get("volume").disable();
      this.myForm.get("cargoIsUnstackable").disable();
      this.myForm.get("grossWeight").disable();
      this.myForm.get("volume").reset(null);
      this.myForm.get("cargoIsUnstackable").reset(null);
      this.myForm.get("grossWeight").reset(null);
    }
    if (this.myForm.get("isLCL").value) {
      this.myForm.get("volume").enable();
      this.myForm.get("cargoIsUnstackable").enable();
      this.myForm.get("grossWeight").enable();
    }
    this.valueChange();
    console.log(this.rowData);
  }
  valueChange() {
    this.myForm.get("isLCL").valueChanges.subscribe((e) => {
      if (!this.myForm.get("isLCL").value) {
        this.myForm.get("volume").disable();
        this.myForm.get("cargoIsUnstackable").disable();
        this.myForm.get("grossWeight").disable();
        this.myForm.get("volume").reset(null);
        this.myForm.get("cargoIsUnstackable").reset(null);
        this.myForm.get("grossWeight").reset(null);
      }
      if (this.myForm.get("isLCL").value) {
        this.myForm.get("volume").enable();
        this.myForm.get("cargoIsUnstackable").enable();
        this.myForm.get("grossWeight").enable();
      }
    });
  }
  async getLookup() {
   
    const a = {
      startRow: 0,
      endRow: 1000,
      sortModel: [],
      filterModel: {},
    };
    this.commodityService.getCommoditiesApi(a).subscribe((e) => {
      this.loadingCommodity = false;
      this.commodityList = e.results;
     
    });
    this.termService.getTerm().subscribe((e) => (this.term = e));
      
  }
  save() {
    let dialogResult = MessageBox.show(
      this.modal,
      "Do you want to save data ?",
      "Confirm",
      MessageBoxButtons.yesNoCancel,
      MessageBoxIcons.question
    );
    dialogResult.then(async (result) => {
      if (result === "YES") {
        let validData = this.validData(this.myForm.value);
        if (validData.isValid) {
          this.setDateSave();
          this.setTerm();
          this.inquiri = Object.assign({}, this.data, this.myForm.value);
          this.inquiri.serviceInquiryVolumeFCL = JSON.parse(
            JSON.stringify(this.rowData)
          );
          delete this.inquiri.termofService;
          console.log(this.inquiri);
          this.store.dispatch(
            new InquiryActions.UpdateInquiry({
              index: this.index,
              newInquiry: this.inquiri,
            })
          );
          let dialogResult = MessageBox.show(
            this.modal,
            "Successfully saved!",
            "Notification",
            MessageBoxButtons.ok,
            MessageBoxIcons.information
          );
          dialogResult.then((result) => {
            this.activeModal.close(this.inquiri);
          });
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
  cancel() {
    this.save();
  }
  close() {
    this.activeModal.close();
  }
  protected validData(form) {
    let isValid = true;
    let message = "";

    if (form.sentTo == null || form.sentTo === "") {
      isValid = false;
      message = message
        ? message + "'Sent to' can't be empty."
        : "'Sent to' can't be empty. ";
    }
    if (form.client == null || form.client === "") {
      isValid = false;
      message = message
        ? message + "'Client' can't be empty."
        : "'Client' can't be empty.";
    }
    if (form.dateCreate == null || form.dateCreate === "") {
      isValid = false;
      message = message
        ? message + "'Create On' can't be empty."
        : "'Create On' can't be empty.";
    }
    if (form.creator == null || form.creator === "") {
      isValid = false;
      message = message
        ? message + "'Create By' can't be empty."
        : "'Create By' can't be empty.";
    }
    if (form.commodity == null) {
      isValid = false;
      message = message
        ? message + "'Commodity Type' can't be empty."
        : "'Commodity Type' can't be empty.";
    }
    if (
      form.commodityDescriptions == null ||
      form.commodityDescriptions == ""
    ) {
      isValid = false;
      message = message
        ? message + "'Commodity' can't be empty."
        : "'Commodity' can't be empty.";
    }
    if (form.term == null || form.term == "") {
      isValid = false;
      message = message
        ? message + "'Term of service' can't be empty."
        : "'Term of service' can't be empty.";
    }

    return { isValid: isValid, message: message };
  }
  delete() {
    let dialogResult = MessageBox.show(
      this.modal,
      "Do you want to delete!",
      "Confirm",
      MessageBoxButtons.yesNo,
      MessageBoxIcons.question
    );
    dialogResult.then(async (result) => {
      if (result === "YES") {
        this.store.dispatch(
          new InquiryActions.DeleteInquiry(Number(this.index))
        );
        MessageBox.show(
          this.modal,
          "Successfully Delete!",
          "Notification",
          MessageBoxButtons.ok,
          MessageBoxIcons.information
        );
        this.activeModal.close();
      }
    });
  }
  editTable(e) {
    console.log(e.params);
    this.gridApi.startEditingCell({
      rowIndex: e.params.rowIndex,
      colKey: "containerType",
    });
  }
  deleteTable(e) {
    console.log(e);
  }
  addNewCont() {
    this.editMode = true;
    const newRows = {};
    this.rowData.splice(0, 0, newRows);
    this.gridApi.updateRowData({ add: [newRows], addIndex: 0 });
    this.gridApi.redrawRows();
    this.gridApi.startEditingCell({ rowIndex: 0, colKey: "containerType" });
  }
  saveEditTable() {
    this.gridApi.stopEditing();
    this.editMode = false;

    console.log(this.rowData);
  }
  cancelEditTable() {}
}
