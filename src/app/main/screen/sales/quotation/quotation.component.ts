import { Component, OnInit, OnDestroy } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { CrudSeaQuotationComponent } from "./CRUD_SeaQuotation/CRUD_quotation.component";
import { CrudAirQuotationComponent } from './CRUD_AirQuotation/CRUD_quotation.component';
import { MakeQuotationComponent } from './make-quotation/make-quotation.component';
@Component({
  selector: "app-quotation",
  templateUrl: "./quotation.component.html",
  styleUrls: ["./quotation.component.css"],
})
export class QuotationComponent implements OnInit, OnDestroy {
  constructor(private modal: NgbModal) {}

  ngOnInit() {}

  ngOnDestroy() {
    // this.subscription.unsubscribe();
  }

  addNew() {
    const modalRef = this.modal.open(MakeQuotationComponent, {
      size: 'lg',
      backdrop: "static",
      keyboard: false,
    });
    modalRef.componentInstance.agent = "";
    modalRef.result.then(
      (result) => {},
      (reason) => {
        console.log("reason dismiss", reason);
      }
    );
    // this.openPopup("a");
  }


  openPopup(data) {
    const modalRef = this.modal.open(CrudAirQuotationComponent, {
      windowClass: "airQuotation",
      backdrop: "static",
      keyboard: false,
    });
    modalRef.componentInstance.agent = "";
    modalRef.result.then(
      (result) => {},
      (reason) => {
        console.log("reason dismiss", reason);
      }
    );
  }
}
