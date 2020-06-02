import { Component, OnInit, Input } from '@angular/core';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-advance-search',
  templateUrl: './advance-search.component.html',
  styleUrls: ['./advance-search.component.css']
})
export class AdvanceSearchComponent implements OnInit {
  @Input() searchData: any;
  @Input() action: any;

  constructor(
    private activeModal: NgbActiveModal
  ) {}

  ngOnInit() {
    console.log(this.searchData);
  }

  onApply() {
    this.activeModal.dismiss(this.searchData);
  }

  toggleVisibility(event) {
    console.log(event.target);
  }

  close() {
    this.searchData = [];
    this.activeModal.dismiss(this.searchData);
  }
}
