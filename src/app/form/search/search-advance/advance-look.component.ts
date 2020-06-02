import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-advance-look',
  templateUrl: './advance-look.component.html',
  styleUrls: ['./advance-look.component.css']
})
export class AdvanceLookComponent implements OnInit {
  @Input() searchData
  @Input() action

  // dateModify = formatDate(new Date(), 'yyyy-MM-dd', 'en-US');
  constructor(
    private activeModal: NgbActiveModal,
    private modal: NgbModal
  ) {}

  ngOnInit() {
    console.log(this.searchData);
  }

  onApply() {
    // console.log("Close, and set data search.");
    // console.log(this.searchData);
    this.activeModal.dismiss(this.searchData);
  }

  toggleVisibility(event) {
    console.log(event.target);
  }

  close() {
    this.searchData = [];
    this.activeModal.dismiss(this.searchData);
  }

  validData() {
  }



}