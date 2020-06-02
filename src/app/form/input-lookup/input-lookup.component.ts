import { Component, ViewChild, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { NgbModal, NgbTypeahead } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';

import { LookupDataComponent } from './lookup-data/lookup-data.component';

@Component({
  selector: 'of1-input-lookup',
  templateUrl: './input-lookup.component.html',
  styleUrls: ['./input-lookup.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputLookupComponent),
      multi: true
    }
  ]
})
export class InputLookupComponent implements ControlValueAccessor {
  @Input() public require: boolean = false;
  @Input() public disable= false;
  @Input() public data;
  @Input() public class;
  @ViewChild('inputLookupInstance', { static: false })
  private inputLookupInstance: NgbTypeahead;

  inputLookup;
  onChange: any = () => { };

  constructor(
    private modalService: NgbModal
  ) {
    console.log(this.disable)
   }

  get value() {
    return this.inputLookup;
  }

  set value(value) {
    if (value !== undefined) {
      this.inputLookup = value;
      this.onChange(this.inputLookup);
    }
  }

  registerOnChange(fn) {
    this.onChange = fn;
  }

  registerOnTouched() {
  }

  writeValue(value) {
    if (value !== undefined) {
      this.inputLookup = value
    }
  }

  formatter = (value) => {
    let text = value[this.class+"Name"+(this.class=="partner"?"Abbr":"")];
    if(this.class === 'currency') {
      text = value.currencyID;
    }
    return (text == undefined || text == null) ? "" : text.toUpperCase();
  }

  search = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map(term => term === '' ? []
        : this.data.filter(v => v[this.class+"Name"+(this.class=="partner"?"Abbr":"")].toLowerCase().indexOf(term.toLowerCase()) > -1))
    )

  inputLookupKeydown($event: KeyboardEvent) {    
    if (this.inputLookupInstance.isPopupOpen()) {
      setTimeout(() => {
        const popup = document.getElementById(this.inputLookupInstance.popupId);
        const activeElements = popup.getElementsByClassName('active');
        if (activeElements.length === 1) {
          const elem = (activeElements[0] as any);
          this.scrollIntoViewIfNeededPolyfill(elem as HTMLElement, false);
        }
      });
    }
  }

  private scrollIntoViewIfNeededPolyfill(elem: HTMLElement, centerIfNeeded = true) {
    var parent = elem.parentElement,
      parentComputedStyle = window.getComputedStyle(parent, null),
      parentBorderTopWidth = parseInt(parentComputedStyle.getPropertyValue('border-top-width')),
      overTop = elem.offsetTop - parent.offsetTop < parent.scrollTop,
      overBottom = (elem.offsetTop - parent.offsetTop + elem.clientHeight - parentBorderTopWidth) > (parent.scrollTop + parent.clientHeight),
      alignWithTop = overTop && !overBottom;

    if ((overTop || overBottom) && centerIfNeeded) {
      parent.scrollTop = elem.offsetTop - parent.offsetTop - parent.clientHeight / 2 - parentBorderTopWidth + elem.clientHeight / 2;
    }

    if ((overTop || overBottom) && !centerIfNeeded) {
      elem.scrollIntoView(alignWithTop);
    }
  };

  LookupValid() {
    const modalRef = this.modalService.open(LookupDataComponent, { windowClass: 'gr-modal-lookup', keyboard: false });
    if (this.class === 'company') {
      modalRef.componentInstance.columnDefs = [
        { headerName: 'ID', field: this.class+'ID', width: 150, sortable: true, filter: true },
        { headerName: 'Name', field: this.class+'Name', width: 300, sortable: true, filter: true },
        { headerName: 'Account No (VN)', field: 'vnAccountNo', width: 200, sortable: true, filter: true },
        { headerName: 'Account No (FN)', field: 'fnAccountNo', width: 200, sortable: true, filter: true },
        { headerName: 'Account Name', field: 'accountName', width: 300, sortable: true, filter: true },
        { headerName: 'Bank Name', field: 'bankName', width: 300, sortable: true, filter: true }
      ];
    } else if(this.class === 'line') {
      modalRef.componentInstance.columnDefs = [
        { headerName: 'Line ID', field: 'partnerID', width: 150, sortable: true, filter: true },
        { headerName: 'Line Name', field: 'partnerNameAbbr', width: 300, sortable: true, filter: true }
      ];
    } else if(this.class === 'currency') {
      modalRef.componentInstance.columnDefs = [
        { headerName: 'Currency', field: this.class+'ID', width: 100, sortable: true, filter: true },
        { headerName: 'Currency Name', field: this.class+'Name', width: 200, sortable: true, filter: true},
        { headerName: 'extVNDSales', field: "extVNDSales", width: 200, sortable: true, filter: true }
      ];
    }
    else {
      console.log(this.data);
      
      modalRef.componentInstance.columnDefs = [
        { headerName: 'ID', field: this.class+'ID', width: 150, sortable: true, filter: true },
        { headerName: 'Name', field: this.class+'Name'+(this.class=="partner"?"Abbr":""), width: 300, sortable: true, filter: true }
      ];
    }
    modalRef.componentInstance.rowData = this.data;

    modalRef.componentInstance.class = this.class;
    modalRef.result.then((result) => {
      this.value = result;
      console.log(result)
    }, (reason) => {
      console.log('reason dismiss', reason);
    })
  }
}