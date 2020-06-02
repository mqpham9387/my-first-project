import { MakeBookingComponent } from './make-booking/make-booking.component';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css'],
})
export class BookingComponent implements OnInit, OnDestroy {
  constructor(private modal: NgbModal) {}

  ngOnInit() {}

  addNew() {
    const modalRef = this.modal.open(MakeBookingComponent, {
      size: 'lg',
      backdrop: 'static',
      keyboard: false,
    });
    modalRef.componentInstance.agent = '';
    modalRef.result.then(
      (result) => {},
      (reason) => {
        console.log('reason dismiss', reason);
      }
    );
    this.openPopup("a");
  }

  openPopup(data) {
    // const modalRef = this.modal.open(CrudAirQuotationComponent, {
    //   windowClass: 'airQuotation',
    //   backdrop: 'static',
    //   keyboard: false,
    // });
    // modalRef.componentInstance.agent = '';
    // modalRef.result.then(
    //   (result) => {},
    //   (reason) => {
    //     console.log('reason dismiss', reason);
    //   }
    // );
  }

  ngOnDestroy() {
  }
}
