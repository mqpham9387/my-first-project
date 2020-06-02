import { Component, OnInit, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as fromMain from '../../../../store/main.reducer';


@Component({
  selector: 'app-search-advance',
  templateUrl: './search-advance.component.html',
  styleUrls: ['./search-advance.component.css']
})
export class SearchAdvanceComponent implements OnInit {
  @Input() searchData: any;
  @Input() action: any;

  isLoading = true;
  isInquiryID = false;
  inquiryID = '';
  isCommodity = false;
  commodity = '';
  isInquiryType = false;
  inquiryType = ''; // get from type
  isClient = false;
  client = '';
  isPod = false;
  pod = '';
  isPol = false;
  pol = '';
  isCreatedBy = false;
  createdBy = '';
  isSentTo = false;
  sendTo = '';
  isTermofService = false;
  termofService = '';

  // dateModify = formatDate(new Date(), 'yyyy-MM-dd', 'en-US');
  constructor(
    private store: Store<fromMain.MainState>,
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