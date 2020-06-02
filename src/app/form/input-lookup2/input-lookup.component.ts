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
import { PortService } from 'src/app/main/model/port/port.service';
import { CommodityService } from 'src/app/main/model/commodity/commodity.service';
import { FeeService } from 'src/app/main/model/fee/fee.service';
import { serviceService } from 'src/app/main/model/service/service.service';
import { CurrencyService } from 'src/app/main/model/currency/currency.service';
import { ShipmentTypeService } from 'src/app/main/model/shipment-type/shipment-type.service';

@Component({
  selector: "of1-input-lookup2",
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
  @Input() public filterCountry :Observable<any>;
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
    public portService : PortService,
    public commodityService : CommodityService,
    public feeService : FeeService,
    public serveService: serviceService,
    public currencyService: CurrencyService,
    public shipmentTypeService: ShipmentTypeService
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
    if(this.class == "port"){
      text = value.portName
    }
    if(this.class == "commodity")
    {
      text = value.commodityName
    }
    if(this.class == "fee")
    {
      text = value.feeNameLocal
    }
    if(this.class == 'service')
    {
      text = value.serviceName
    }
    if(this.class == 'currency')
    {
      text = value.currencyName
    }
    if(this.class == "hsCode")
    {
      text = value.hsCode
    }
    if(this.class == "shipmentType")
    {
      text = value.shipmentTypeWarningName
    }
    if (value == "" || typeof value == 'string') {
      text = "";
    }
    value;

    return text == undefined || text == null ? "" : text.toUpperCase();
  };

  search = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(369),
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
        if (this.class == "port") {
          return this.portService.search(term).pipe(
            tap(() => (this.searchFailed = false)),
            catchError(() => {
              this.searchFailed = true;
              return of([]);
            })
          );
        }
        if (this.class == "commodity") {
          return this.commodityService.search(term).pipe(
            tap(() => (this.searchFailed = false)),
            catchError(() => {
              this.searchFailed = true;
              return of([]);
            })
          );
        }
        if (this.class == "fee") {
          return this.feeService.search(term).pipe(
            tap(() => (this.searchFailed = false)),
            catchError(() => {
              this.searchFailed = true;
              return of([]);
            })
          );
        }
        if (this.class == "service") {
          return this.serveService.search(term).pipe(
            tap(() => (this.searchFailed = false)),
            catchError(() => {
              this.searchFailed = true;
              return of([]);
            })
          );
        }
        if (this.class == "currency") {
          return this.currencyService.search(term).pipe(
            tap(() => (this.searchFailed = false)),
            catchError(() => {
              this.searchFailed = true;
              return of([]);
            })
          );
        }
        if (this.class == "hsCode") {
          return this.commodityService.search(term).pipe(
            tap(() => (this.searchFailed = false)),
            catchError(() => {
              this.searchFailed = true;
              return of([]);
            })
          );
        }
        if (this.class == "shipmentType") {
          return this.shipmentTypeService.search(term).pipe(
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
    }
    else if (this.class === "port") {
      modalRef.componentInstance.columnDefs = [
        {
          headerName: "Port ID",
          field: "portID",
          width: 100,
          sortable: true,
          filter: true,
        },
        {
          headerName: "Port Name",
          field: "portName",
          width: 200,
          sortable: true,
          filter: true,
        },
        {
          headerName: "City",
          field: "city",
          width: 150,
          cellRenderer: (data) => {
            if (data.value) {
              return data.value.cityName;
            }
          },
          sortable: true,
          filter: true,
        },
        {
          headerName: "Country",
          field: "country",
          width: 150,
          sortable: true,
          filter: true,
          cellRenderer: (data) => {
            if (data.value) {
              return data.value.countryName;
            }
          },
        },

      ];
      modalRef.componentInstance.filterCountry = this.filterCountry
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
    }
    else if (
      this.class === "contact"

    ) {
      modalRef.componentInstance.columnDefs = [
        {
          headerName: "Eng Name",
          field: "englishName",
          width: 150,
          sortable: true,
          filter: true,
        },
        {
          headerName: "Name",
          field: "contactName",
          width: 300,
          sortable: true,
          filter: true,
        },
        {
          headerName: "Position",
          field: "position",
          width: 100,
          sortable: true,
          filter: true,
        },

      ];
    }
    else if (this.class === "fee") {
      modalRef.componentInstance.columnDefs = [
        {
          headerName: "Description (English)",
          field: "feeNameEnglish",
          width: 100,
          sortable: true,
          filter: true,
        },
        {
          headerName: "Description (local language)",
          field:"feeNameLocal",
          width: 300,
          sortable: true,
          filter: true,
        },
        {
          headerName: "Charge group",
          field: "groupName",
          width: 150,
          sortable: true,
          filter: true,
        },
      ];
    }
    else if (this.class === "commodity") {
      modalRef.componentInstance.columnDefs = [
        {
          headerName: "HS Code",
          field: "hsCode",
          width: 100,
          sortable: true,
          filter: true,
        },
        {
          headerName: "Commodity Name",
          field:"commodityName",
          width: 200,
          sortable: true,
          filter: true,
        },
        {
          headerName: "Commodity Description",
          field: "commodityDescription",
          width: 300,
          sortable: true,
          filter: true,
        },
      ];
    } else if (this.class === "service") {
      modalRef.componentInstance.columnDefs = [
        {
          headerName: "ServiceID",
          field: "serviceID",
          width: 180,
          sortable: true,
          filter: true,
        },
        {
          headerName: "Service Name",
          field:"serviceName",
          width: 320,
          sortable: true,
          filter: true,
        }
      ];
    }else if (this.class === "hsCode") {
      modalRef.componentInstance.columnDefs = [
        {
          headerName: "HS Code",
          field: "hsCode",
          width: 100,
          sortable: true,
          filter: true,
        },
        {
          headerName: "Commodity Name",
          field:"commodityName",
          width: 200,
          sortable: true,
          filter: true,
        },
        {
          headerName: "Commodity Description",
          field: "commodityDescription",
          width: 300,
          sortable: true,
          filter: true,
        },
      ];
    }else if (this.class === "shipmentType") {
      modalRef.componentInstance.columnDefs = [
        {
          headerName: "ID",
          field: "shipmentTypeWarningID",
          width: 100,
          sortable: true,
          filter: true,
        },
        {
          headerName: "Name",
          field:"shipmentTypeWarningName",
          width: 200,
          sortable: true,
          filter: true,
        },
        {
          headerName: "Email Receive",
          field: "emailReceive",
          width: 300,
          sortable: true,
          filter: true,
        },
      ];
    }else {


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
