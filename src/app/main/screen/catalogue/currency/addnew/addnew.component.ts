import { Component, OnInit, Input, ViewEncapsulation } from "@angular/core";
import { CurrencyExchangeRate } from "src/app/main/model/currency/currency";
import { CompanyService } from "src/app/main/model/company/company.service";
import { CurrencyExchangeRateService } from "src/app/main/model/currency/currencyExchange.service";
import {
  MessageBox,
  MessageBoxButtons,
  MessageBoxIcons,
} from "src/app/form/message/messsage";
import { NgbModal, NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { formatDate } from "@angular/common";
@Component({
  selector: "app-name",
  templateUrl: "./addnew.component.html",
  styleUrls: ["./addnew.component.css"],
  // encapsulation: ViewEncapsulation.None
})
export class AddNewComponent implements OnInit {
  @Input() action;
  dropdownList;
  currencyExchangeRate = new CurrencyExchangeRate();
  constructor(
    public companyService: CompanyService,
    public currencyExchangeRateService: CurrencyExchangeRateService,
    private modal: NgbModal,
    public activeModal: NgbActiveModal
  ) {}

  async ngOnInit() {
    this.dropdownList = await this.companyService.getCompaniesApi();
  }
  setValueDatetoSave() {
    this.currencyExchangeRate.fromDate = formatDate(
      this.currencyExchangeRate.fromDate,
      "dd/MM/yyyy",
      "en-US"
    );
    this.currencyExchangeRate.toDate = formatDate(
      this.currencyExchangeRate.toDate,
      "dd/MM/yyyy",
      "en-US"
    );
  }
  validData() {
    var isValid = true;
    var message = "";
    if (
      this.currencyExchangeRate.fromDate == null ||
      this.currencyExchangeRate.fromDate === ""
    ) {
      isValid = false;
      message = message
        ? message + "'Applied From' can't be empty."
        : "'Applied From' can't be empty. ";
    }
    if (
      this.currencyExchangeRate.toDate == null ||
      this.currencyExchangeRate.toDate === ""
    ) {
      isValid = false;
      message = message
        ? message + "'Applied To' can't be empty."
        : "'Applied To' can't be empty. ";
    }

    return { isValid: isValid, message: message };
  }
  save() {
    var validData = this.validData();
    if (validData.isValid) {
      this.setValueDatetoSave();
      this.currencyExchangeRateService
        .createCurrencyExchangeRate(this.currencyExchangeRate)
        .subscribe(e=>{
          let dialogResult = MessageBox.show(
            this.modal,
            "Successfully saved!",
            "Notification",
            MessageBoxButtons.ok,
            MessageBoxIcons.information
          );
          dialogResult.then((result) => {});
          this.activeModal.close(this.currencyExchangeRate);
          
          console.log(e)});
     
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
  public onSelectAll() {
    const selected = this.dropdownList.map(item => item.companyID);
    this.currencyExchangeRate.appliedFor=selected;
   
  }
  
  public onClearAll() {
    this.currencyExchangeRate.appliedFor=[];
    
  }
}
