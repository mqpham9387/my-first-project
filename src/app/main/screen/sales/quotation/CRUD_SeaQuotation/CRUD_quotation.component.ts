import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { FormGroup, FormBuilder, FormControl } from "@angular/forms";
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: "app-name",
  templateUrl: "./CRUD_quotation.component.html",
  styleUrls: ["./CRUD_quotation.component.css"],
  encapsulation: ViewEncapsulation.None,
})
export class CrudSeaQuotationComponent implements OnInit {
  action;
  myForm: FormGroup;
  disable;
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
    private activeModal: NgbActiveModal
  ) {}

  ngOnInit(): void {}
}
