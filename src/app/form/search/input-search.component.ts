import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AdvanceLookComponent } from './search-advance/advance-look.component';


@Component({
  selector: 'of1-input-search',
  templateUrl: './input-search.component.html',
  styleUrls: ['./input-search.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputSearchComponent),
      multi: true
    }
  ]
})
export class InputSearchComponent implements ControlValueAccessor {
  @Input() public require: boolean = false;
  @Input() public disable= false;
  @Input() public data;

  inputLookup :any;

  searchData = [
    { columnName: "inquiryID", isCheck: false, value: null },
    { columnName: "commodity", isCheck: false, value: null },
    { columnName: "inquiryType", isCheck: false, value: null },
    { columnName: "client", isCheck: false, value: null },
    { columnName: "pol", isCheck: false, value: null },
    { columnName: "pod", isCheck: false, value: null },
    { columnName: "createdBy", isCheck: false, value: null },
    { columnName: "sentTo", isCheck: false, value: null },
    { columnName: "termofService", isCheck: false, value: null },
  ];

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

  searchAdvance() {
    const modalRef = this.modalService.open(AdvanceLookComponent, {
      windowClass: "gr-modal-advance",
      backdrop: "static",
      keyboard: false,
    });
    console.log(this.searchData);

    modalRef.componentInstance.action = "SEARCH_ADVANCE";
    modalRef.componentInstance.searchData = this.searchData;
    modalRef.result.then(
      (result) => {
        console.log(result);
      },
      (reason) => {
        console.log("reason dismiss", reason);
      }
    );
  }

  onRemoveSeachItem(item: any) {
    console.log(item);
    let key = +item.key;
    let searchItem = item.value;
    if (searchItem.isCheck) {
      this.searchData[key].isCheck = false;
      this.searchData[key].value = null;
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

}
