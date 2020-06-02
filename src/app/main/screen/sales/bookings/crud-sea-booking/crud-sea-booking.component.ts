import { Booking } from 'src/app/main/model/booking/booking.model';
import { Component, OnInit, Input } from "@angular/core";
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ButtonRendererComponent } from "src/app/main/common/button-renderer.component";
import { CustomHeader } from "src/app/main/common/ag-grid-header-custom";
import { TermService } from "src/app/main/model/term/term.service";
import { Observable } from "rxjs";
import { Commodity } from "src/app/main/model/commodity/commodity";
import { CommodityService } from "src/app/main/model/commodity/commodity.service";
import * as BookingActions from '../store/booking.actions';
import * as fromMain from "src/app/main/store/main.reducer";
import { PartnerService } from "src/app/main/model/partner/partner.service";
import { ContactService } from "src/app/main/model/contact/contact.service";
import { formatDate } from "@angular/common";
import { PortService } from "src/app/main/model/port/port.service";
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

@Component({
  selector: 'app-crud-sea-booking',
  templateUrl: './crud-sea-booking.component.html',
  styleUrls: ['./crud-sea-booking.component.css']
})
export class CRUDSeaBookingComponent implements OnInit {
  @Input() customClearance: Booking;
  @Input() action: any;
  myForm: FormGroup;
  disable;
  @Input() data;
  @Input() index;
  frameworkComponents;
  gridApi;
  editMode = false;
  arrayTest = [];
  client;
  clients;
  contacts;
  creator;
  cargoReadyDate;
  dateCreate;
  dateModify;
  ports;
  columnDefs;
  rowData;
  commodityList;
  term;
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
    private formBuilder: FormBuilder,
    private modal: NgbModal,
    private activeModal: NgbActiveModal,
    public partnerService: PartnerService,
    public contactService: ContactService,
    public portService: PortService,
    private store: Store<fromMain.MainState>,
    public commodityService: CommodityService,
    private termService: TermService,

  ) {}

  ngOnInit(): void {
    this.contType.forEach((e) => {
      this.contTypeSelect.push(e.containerType);
    });
    this.getLookup();
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

  }
  cancel(){
    this.activeModal.close(this.customClearance)
  }
  onGridReady(params) {
    this.gridApi = params.api;
  }


}
