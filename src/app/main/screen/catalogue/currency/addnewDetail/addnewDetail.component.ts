import { Component, OnInit, ViewEncapsulation, Input } from "@angular/core";
import { CurrencyService } from "src/app/main/model/currency/currency.service";
import { CurrencyExchangeRateService } from "src/app/main/model/currency/currencyExchange.service";
import { CurrencyExchangeRateDetail } from "src/app/main/model/currency/currency";
import {
  MessageBox,
  MessageBoxButtons,
  MessageBoxIcons,
} from "src/app/form/message/messsage";
import { NgbModal, NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { FormControl, FormBuilder, FormGroup } from '@angular/forms';
import { formatNumber } from '@angular/common';
declare var $: any;
@Component({
  selector: "app-name",
  templateUrl: "./addnewDetail.component.html",
  styleUrls: ["./addnewDetail.component.css"],
  // encapsulation: ViewEncapsulation.None
})
export class AddNewDetailComponent implements OnInit {
  @Input() action;
  @Input() data;
  @Input() rowDataDetail;
  test;
  currencyExchangeRates = new CurrencyExchangeRateDetail();
  currencyID;
  newArrayDetail: Array<CurrencyExchangeRateDetail>;
  // myForm: FormGroup;
  // createForm() {
  //   this.myForm = this.formBuilder.group({
  //     extVNDSales: new FormControl(""),
  //     cargoReadyDate: new FormControl(""),
      
  //   });}
  constructor(
    public currencyService: CurrencyService,
    public currencyExchangeRateService: CurrencyExchangeRateService,
    private modal: NgbModal,
    private formBuilder: FormBuilder,
    public activeModal: NgbActiveModal
  ) {}

  async ngOnInit() {
    this.test = await this.currencyService.getCurrenciesApi();
    console.log(this.rowDataDetail);
    
    // this.myForm.get('extVNDSales').valueChanges.subscribe(
    //   e=>formatNumber(e,'en')
    // )
  }
  validData() {
    var isValid = true;
    var message = "";
    if (this.currencyID == null || this.currencyID.source === "") {
      isValid = false;
      message = "Currency can't be empty !";
      console.log(this.currencyID)
    }

    return { isValid: isValid, message: message };
  }

  async save() {
    var validData = this.validData();
    if (validData.isValid) {
      const USDValue = this.test.find((value) => value.currencyID === "USD");
      this.currencyExchangeRates.currencyID = this.currencyID.currencyID;
      this.currencyExchangeRateService
        .createExchangeRateDetails(
          this.currencyExchangeRates,
          this.data,
          USDValue
        )
        .subscribe((res) => {
          if (res) {
            let dialogResult = MessageBox.show(
              this.modal,
              "Successfully saved!",
              "Notification",
              MessageBoxButtons.ok,
              MessageBoxIcons.information
            );
            dialogResult.then((result) => {});
            this.activeModal.close(this.currencyExchangeRates);
          }
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

  close() {
    this.activeModal.close();
  }
}
