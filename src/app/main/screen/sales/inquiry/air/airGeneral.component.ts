import { Component, OnInit, Input, ViewEncapsulation } from "@angular/core";
import { Inquiry } from "src/app/main/model/inquiry/inquiry.model";
import { Store } from "@ngrx/store";
import {
  MessageBox,
  MessageBoxButtons,
  MessageBoxIcons,
} from "src/app/form/message/messsage";
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from "@angular/forms";
import * as fromMain from "src/app/main/store/main.reducer";
import { PartnerService } from "src/app/main/model/partner/partner.service";
import { ContactService } from "src/app/main/model/contact/contact.service";
import { formatDate } from "@angular/common";
import { PortService } from "src/app/main/model/port/port.service";
import * as InquiryActions from "../store/inquiry.actions";
import { CommodityService } from "src/app/main/model/commodity/commodity.service";
import { NgbModal, NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
@Component({
  selector: "air-general",
  templateUrl: "./airGeneral.component.html",
  styleUrls: ["./airGeneral.component.css"],
  // encapsulation: ViewEncapsulation.None
})
export class AirGeneralComponent implements OnInit {
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
  type;
  commodityList;
  disable;
  saveButton = false;
  loadingCommodity=true
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
      commodityDescriptions: new FormControl(),
      deadlineDelivery: new FormControl(),
      cargoIsUnstackable: new FormControl(),
      needExpressService: new FormControl(),
      grossWeight: new FormControl(),
      volume: new FormControl(),
      eachPalletDimension: new FormControl(),
      eachPalletGrossWeight: new FormControl(),
      quantity: new FormControl(),
      nonPalletPackageQuantity: new FormControl(),
    });
  }
  constructor(
    public partnerService: PartnerService,
    public contactService: ContactService,
    public portService: PortService,
    private store: Store<fromMain.MainState>,
    private formBuilder: FormBuilder,
    public commodityService: CommodityService,
    private modal: NgbModal,
    private activeModal: NgbActiveModal
  ) {
    this.createForm();
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
    (this.data.cargoReadyDate != null && this.data.cargoReadyDate != "")
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
      (this.data.dateCreate != null && this.data.dateCreate != "")
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
      (this.data.lastQuotedOn != null && this.data.lastQuotedOn != "")
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
      (this.data.deadlineDelivery != null && this.data.deadlineDelivery != "")
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
    (this.myForm.get("cargoReadyDate").value != "" && this.myForm.get("cargoReadyDate").value != null)
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
      (this.myForm.get("dateCreate").value != "" && this.myForm.get("dateCreate").value != null)
      ? this.myForm
          .get("dateCreate")
          .setValue(
            this.myForm.get("dateCreate").value.split("-").reverse().join("/")
          )
      : this.myForm.get("dateCreate").setValue(null);
      (this.myForm.get("lastQuotedOn").value != "" && this.myForm.get("lastQuotedOn").value != null)
      ? this.myForm
          .get("lastQuotedOn")
          .setValue(
            this.myForm.get("lastQuotedOn").value.split("-").reverse().join("/")
          )
      : this.myForm.get("lastQuotedOn").setValue(null);
      (this.myForm.get("deadlineDelivery").value != "" && this.myForm.get("deadlineDelivery").value != null)
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
    this.getLookup();
    this.inquiri = this.data;
    this.myForm.patchValue(this.data);
    this.setDateView();
    if (this.action == "VIEW") {
      this.myForm.disable();
      this.disable = true;
      this.saveButton = false;
      this.myForm.get("commodity").enable();
    }
    if (this.action == "EDIT") {
      this.saveButton = true;
    }
  }
  async getLookup() {
    // this.clients = await this.partnerService.getPartnersApi("CUSTOMERS");
    // this.contacts = await this.contactService.getContactsApi();
    // this.portService.getPortsApi().subscribe((e) => {
    //   this.ports = e;
    // });
    const a = {
      startRow: 0,
      endRow: 1000,
      sortModel: [],
      filterModel: {},
    };
    this.commodityService.getCommoditiesApi(a).subscribe((e) => {
      this.loadingCommodity=false
      this.commodityList = e.results;
    });
  }
  save() {
    console.log(this.myForm.value);
    
      // TODO: need check if the type of Inquiry is sea/air/customs?
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
         
        } else{let dialogResult = MessageBox.show(
          this.modal,
          validData.message,
          "Alert",
          MessageBoxButtons.ok,
          MessageBoxIcons.warning
        );
        dialogResult.then((result) => {});}}
        if (result === "NO") {
          this.activeModal.close();
        }
      });
    } 
  
  close() {
    this.activeModal.close();
  }
  cancel() {
    this.save()
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
  delete(){
    let dialogResult = MessageBox.show(this.modal, 'Do you want to delete!', 'Confirm', MessageBoxButtons.yesNo, MessageBoxIcons.question);
    dialogResult.then(async (result) => {
      if (result === 'YES') { 
        
        this.store.dispatch(
        new InquiryActions.DeleteInquiry(Number(this.index)))
        MessageBox.show(this.modal, 'Successfully Delete!', 'Notification', MessageBoxButtons.ok, MessageBoxIcons.information)  ;
        this.activeModal.close()
      }
    
    
    
    })
  }
  
}
