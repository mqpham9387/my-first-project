import {
  Component,
  ViewChild,
  forwardRef,
  Input,
  Output,
  EventEmitter,
} from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";
import { NgbModal, NgbTypeahead } from "@ng-bootstrap/ng-bootstrap";
import { Observable, of } from "rxjs";
import {
  debounceTime,
  distinctUntilChanged,
  map,
  tap,
  switchMap,
  catchError,
} from "rxjs/operators";
import { LookupDataComponent } from "./lookup-data/lookup-data.component";
import { PartnerService } from "src/app/main/model/partner/partner.service";
import { AgentService } from "src/app/main/model/partner/agent.service";
import { CityService } from "src/app/main/model/city/city.service";
import { CustomerService } from "src/app/main/model/partner/customer.service";
import { CountryService } from "src/app/main/model/country/country.service";
import { ContactService } from "src/app/main/model/contact/contact.service";
import { StateService } from "src/app/main/model/state/state.service";
import { CarriersService } from "src/app/main/model/partner/carrier.service";
import { OtherContactService } from "src/app/main/model/partner/otherContact.service";

@Component({
  selector: "of1-input-lookup3",
  templateUrl: "./input-lookup.component.html",
  styleUrls: ["./input-lookup.component.css"],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputLookupComponent),
      multi: true,
    },
  ],
})
export class InputLookupComponent implements ControlValueAccessor {
  @Input() public require: boolean = false;
  @Input() public disable = false;
  @Input() public data;
  @Input() public class;
  @Output() notifyParent = new EventEmitter<any>();
  @ViewChild("inputLookupInstance", { static: false })
  private inputLookupInstance: NgbTypeahead;
  searching = false;
  searchFailed = false;
  inputLookup;
  onChange: any = () => {};

  constructor(
    private modalService: NgbModal,
    public partnerService: PartnerService,
    public countryService: CountryService,
    public cityService: CityService,
    public agentService: AgentService,
    public customerService: CustomerService,
    public contactService: ContactService,
    public stateService: StateService,
    public carrierService: CarriersService,
    public vendorService: OtherContactService,
    
  ) {
    
  }

  get value() {
    return this.inputLookup;
  }

  set value(value) {
    if (value !== null || value !== "") {
      {
        this.inputLookup = value;
        this.onChange(this.inputLookup);
      }
    } else {
      this.inputLookup = null;
      this.onChange(this.inputLookup);
    }
  }
  modelChanged() {
    if (this.value == undefined) {
      this.value = "";
    }
  }
  registerOnChange(fn) {
    this.onChange = fn;
  }

  registerOnTouched() {}

  writeValue(value) {
    if (value !== undefined) {
      this.inputLookup = value;
    }
  }
  ngOnInit(): void {
    console.log(this.data);
  }

  formatter = (value) => {
    let text;
    if (this.class === "currency") {
      text = value.currencyID;
    }
    if (
      this.class == "agent" ||
      this.class == "customer" ||
      this.class == "carrier" ||
      this.class == "vendor"
    ) {
      text = value.partnerNameAbbr;
    }
    if (this.class == "country") {
      text = value.countryName;
    }
    if (this.class == "company") {
      text = value.companyName;
    }
    if (this.class == "city") {
      text = value.cityName;
    }
    if (this.class == "contact") {
      text = value.contactName;
    }
    if (this.class == "state") {
      text = value.stateName;
    }

    if (value == "" || typeof value == 'string') {
      text = "";
    }
    value;
    console.log(text);
    return text == undefined || text == null ? "" : text.toUpperCase();
  };

  search = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(800),
      distinctUntilChanged(),
      tap(() => (this.searching = true)),
      switchMap((term) => {
        if (this.class == "agent") {
          return this.agentService.search(term).pipe(
            tap(() => (this.searchFailed = false)),
            catchError(() => {
              this.searchFailed = true;
              return of([]);
            })
          );
        }
        if (this.class == "contact") {
          return this.contactService.search(term).pipe(
            tap(() => (this.searchFailed = false)),
            catchError(() => {
              this.searchFailed = true;
              return of([]);
            })
          );
        }
        if (this.class == "customer") {
          return this.customerService.search(term).pipe(
            tap(() => (this.searchFailed = false)),
            catchError(() => {
              this.searchFailed = true;
              return of([]);
            })
          );
        }
        if (this.class == "country") {
          return this.countryService.search(term).pipe(
            tap(() => (this.searchFailed = false)),
            catchError(() => {
              this.searchFailed = true;
              return of([]);
            })
          );
        }
        if (this.class == "company") {
          return this.countryService.search(term).pipe(
            tap(() => (this.searchFailed = false)),
            catchError(() => {
              this.searchFailed = true;
              return of([]);
            })
          );
        }
        if (this.class == "city") {
          return this.cityService.search(term).pipe(
            tap(() => (this.searchFailed = false)),
            catchError(() => {
              this.searchFailed = true;
              return of([]);
            })
          );
        }
        if (this.class == "state") {
          return this.stateService.search(term).pipe(
            tap(() => (this.searchFailed = false)),
            catchError(() => {
              this.searchFailed = true;
              return of([]);
            })
          );
        }
        if (this.class == "carrier") {
          return this.carrierService.search(term).pipe(
            tap(() => (this.searchFailed = false)),
            catchError(() => {
              this.searchFailed = true;
              return of([]);
            })
          );
        }
        if (this.class == "vendor") {
          return this.vendorService.search(term).pipe(
            tap(() => (this.searchFailed = false)),
            catchError(() => {
              this.searchFailed = true;
              return of([]);
            })
          );
        }
      }),
      tap(() => (this.searching = false))
    );

  inputLookupKeydown($event: KeyboardEvent) {
    if (this.inputLookupInstance.isPopupOpen()) {
      setTimeout(() => {
        const popup = document.getElementById(this.inputLookupInstance.popupId);
        const activeElements = popup.getElementsByClassName("active");
        if (activeElements.length === 1) {
          const elem = activeElements[0] as any;
          this.scrollIntoViewIfNeededPolyfill(elem as HTMLElement, false);
        }
      });
    }
  }

  private scrollIntoViewIfNeededPolyfill(
    elem: HTMLElement,
    centerIfNeeded = true
  ) {
    var parent = elem.parentElement,
      parentComputedStyle = window.getComputedStyle(parent, null),
      parentBorderTopWidth = parseInt(
        parentComputedStyle.getPropertyValue("border-top-width")
      ),
      overTop = elem.offsetTop - parent.offsetTop < parent.scrollTop,
      overBottom =
        elem.offsetTop -
          parent.offsetTop +
          elem.clientHeight -
          parentBorderTopWidth >
        parent.scrollTop + parent.clientHeight,
      alignWithTop = overTop && !overBottom;

    if ((overTop || overBottom) && centerIfNeeded) {
      parent.scrollTop =
        elem.offsetTop -
        parent.offsetTop -
        parent.clientHeight / 2 -
        parentBorderTopWidth +
        elem.clientHeight / 2;
    }

    if ((overTop || overBottom) && !centerIfNeeded) {
      elem.scrollIntoView(alignWithTop);
    }
  }

  LookupValid() {
    const modalRef = this.modalService.open(LookupDataComponent, {
      windowClass: "gr-modal-lookup",
      keyboard: false,
    });
    if (this.class === "company") {
      modalRef.componentInstance.columnDefs = [
        {
          headerName: "ID",
          field: this.class + "ID",
          width: 150,
          sortable: true,
          filter: true,
        },
        {
          headerName: "Name",
          field: this.class + "Name",
          width: 300,
          sortable: true,
          filter: true,
        },
        {
          headerName: "Account No (VN)",
          field: "vnAccountNo",
          width: 200,
          sortable: true,
          filter: true,
        },
        {
          headerName: "Account No (FN)",
          field: "fnAccountNo",
          width: 200,
          sortable: true,
          filter: true,
        },
        {
          headerName: "Account Name",
          field: "accountName",
          width: 300,
          sortable: true,
          filter: true,
        },
        {
          headerName: "Bank Name",
          field: "bankName",
          width: 300,
          sortable: true,
          filter: true,
        },
      ];
    } else if (this.class === "line") {
      modalRef.componentInstance.columnDefs = [
        {
          headerName: "Line ID",
          field: "partnerID",
          width: 150,
          sortable: true,
          filter: true,
        },
        {
          headerName: "Line Name",
          field: "partnerNameAbbr",
          width: 300,
          sortable: true,
          filter: true,
        },
      ];
    } else if (this.class === "currency") {
      modalRef.componentInstance.columnDefs = [
        {
          headerName: "Currency",
          field: this.class + "ID",
          width: 100,
          sortable: true,
          filter: true,
        },
        {
          headerName: "Currency Name",
          field: this.class + "Name",
          width: 200,
          sortable: true,
          filter: true,
        },
        {
          headerName: "extVNDSales",
          field: "extVNDSales",
          width: 200,
          sortable: true,
          filter: true,
        },
      ];
    } else if (
      this.class === "agent" ||
      this.class == "customer" ||
      this.class == "carrier" ||
      this.class == "vendor"
    ) {
      modalRef.componentInstance.columnDefs = [
        {
          headerName: "ID",
          field: "partnerID",
          width: 150,
          sortable: true,
          filter: true,
        },
        {
          headerName: "Name",
          field: "partnerNameAbbr",
          width: 300,
          sortable: true,
          filter: true,
        },
      ];
    } else {
      console.log(this.data);

      modalRef.componentInstance.columnDefs = [
        {
          headerName: "ID",
          field: this.class + "ID",
          width: 150,
          sortable: true,
          filter: true,
        },
        {
          headerName: "Name",
          field: this.class + "Name" + (this.class == "partner" ? "Abbr" : ""),
          width: 300,
          sortable: true,
          filter: true,
        },
      ];
    }
    modalRef.componentInstance.class = this.class;
    modalRef.result.then(
      (result) => {
        this.value = result;
      },
      (reason) => {
        console.log("reason dismiss", reason);
      }
    );
  }
}
