import { Component, OnInit, OnDestroy, ViewChild, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription, Observable } from 'rxjs';
import * as fromMain from '../../../store/main.reducer';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-inquiry',
  templateUrl: './inquiry.component.html',
  styleUrls: ['./inquiry.component.css']
})

export class InquiryComponent implements OnInit, OnDestroy {

  activeNav = 1;
  
  constructor(
    private modal: NgbModal,
    private store: Store<fromMain.MainState>
  ) {}

  ngOnInit() {

  }

  ngOnDestroy() {

  }
}
