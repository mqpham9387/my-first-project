import { Component, OnInit, Input } from "@angular/core";
import { Commodity } from "src/app/main/model/commodity/commodity";
import { CommodityService } from "src/app/main/model/commodity/commodity.service";
import {
  MessageBox,
  MessageBoxButtons,
  MessageBoxIcons,
} from "src/app/form/message/messsage";
import { NgbActiveModal, NgbModal } from "@ng-bootstrap/ng-bootstrap";
@Component({
  selector: "CURD_commodity",
  templateUrl: "./CURD_commodity.component.html",
  styleUrls: ["./CURD_commodity.component.css"],
})
export class CURD_commodityComponent implements OnInit {
  @Input() action: string;
  @Input() data;
  commodity = new Commodity();
  disable = false;
  constructor(
    public commodityService: CommodityService,
    private modal: NgbModal,
    public activeModal: NgbActiveModal
  ) {}
  validData() {
    var isValid = true;
    var message = "";
    if (this.commodity.hsCode == null || this.commodity.hsCode == "") {
      isValid = false;
      message = "The field HS Code can't be empty !";
    }

    return { isValid: isValid, message: message };
  }
  async ngOnInit() {
    if (this.data) {
      this.commodity = this.data;
      if (this.action == "View") {
        this.disable = true;
      }
    }
  }
  async save() {
    var validData = this.validData();
    if (validData.isValid) {
      if (this.action == "Add New") {
        const maxID = await this.commodityService.getMaxIDCommodity();
        this.commodity.commodityID = String(Number(maxID) + 1);
        const resApi = await this.commodityService.insCommoditiesApi(
          this.commodity
        );
        if (resApi.value) {
          let dialogResult = MessageBox.show(
            this.modal,
            "Successfully saved!",
            "Notification",
            MessageBoxButtons.ok,
            MessageBoxIcons.information
          );
          dialogResult.then((result) => {
            console.log(this.commodity);
            this.activeModal.close(this.commodity);
          });
        } else {
          let dialogResult = MessageBox.show(
            this.modal,
            resApi.message,
            "Alert",
            MessageBoxButtons.ok,
            MessageBoxIcons.warning
          );
          dialogResult.then((result) => {});
        }
      }
      if (this.action == "Edit") {
        const upapi = await this.commodityService.updCommoditiesApi(
          this.commodity
        );
        if (upapi.value) {
          let dialogResult = MessageBox.show(
            this.modal,
            "Successfully saved!",
            "Notification",
            MessageBoxButtons.ok,
            MessageBoxIcons.information
          );
          dialogResult.then((result) => {
            console.log(this.commodity);
            this.activeModal.close(this.commodity);
          });
        } else {
          let dialogResult = MessageBox.show(
            this.modal,
            upapi.message,
            "Alert",
            MessageBoxButtons.ok,
            MessageBoxIcons.warning
          );
          dialogResult.then((result) => {});
        }
      }
    } else if (validData.isValid == false) {
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
    // let dialogResult = MessageBox.show(
    //   this.modal,
    //   "Do you want to save data ?",
    //   "Confirm",
    //   MessageBoxButtons.yesNoCancel,
    //   MessageBoxIcons.question
    // );
    // dialogResult.then(async (result) => {
    //   if (result === "YES") {
    //     this.save();
    //   } else if (result === "NO") {
    //     this.activeModal.dismiss();
    //   } else if (result === "CANCEL") {
    //   }
    // });
    this.activeModal.dismiss()
  }
  cancel() {this.activeModal.dismiss()}
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
        this.commodity.commodityID = "Delete";
        this.activeModal.close(this.commodity);
      }
    });
  }
}
