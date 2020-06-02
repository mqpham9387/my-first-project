import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { CustomHeader } from "src/app/main/common/ag-grid-header-custom";
import { PartnerService } from "src/app/main/model/partner/partner.service";
import { AgentService } from "src/app/main/model/partner/agent.service";
import { CityService } from "src/app/main/model/city/city.service";
import { CountryService } from "src/app/main/model/country/country.service";
import { CustomerService } from "src/app/main/model/partner/customer.service";
import { CompanyService } from "src/app/main/model/company/company.service";
import { ContactService } from "src/app/main/model/contact/contact.service";
import { StateService } from "src/app/main/model/state/state.service";
import { CarriersService } from "src/app/main/model/partner/carrier.service";
import { OtherContactService } from "src/app/main/model/partner/otherContact.service";
import { PortService } from "src/app/main/model/port/port.service";
import { CommodityService } from 'src/app/main/model/commodity/commodity.service';
import { FeeService } from 'src/app/main/model/fee/fee.service';
import { serviceService } from 'src/app/main/model/service/service.service';
import { CurrencyService } from 'src/app/main/model/currency/currency.service';
import { ShipmentTypeService } from 'src/app/main/model/shipment-type/shipment-type.service';

@Component({
  selector: "app-lookup-data",
  templateUrl: "./lookup-data.component.html",
  styleUrls: ["./lookup-data.component.css"],
})
export class LookupDataComponent implements OnInit {
  @Input() columnDefs;
  @Input() filterCountry;
  @Input() class;
  @Input() single;
  @Output() notifyParent = new EventEmitter<any>();
  defaultColDef;
  frameworkComponents;
  rowData1 = [];
  rowModelType;
  public paginationPageSize;
  public cacheOverflowSize;
  public maxConcurrentDatasourceRequests;
  public infiniteInitialRowCount;
  public maxBlocksInCache;
  public gridApi;
  public gridColumnApi;
  public rowBuffer;
  cacheBlockSize;
  components: { loadingRenderer: (params: any) => any };
  constructor(
    public activeModal: NgbActiveModal,
    public partnerService: PartnerService,
    public agentService: AgentService,
    public cityService: CityService,
    public countryService: CountryService,
    public customerService: CustomerService,
    public companyService: CompanyService,
    public contactService: ContactService,
    public stateService: StateService,
    public carrierService: CarriersService,
    public otherContact: OtherContactService,
    public portService: PortService,
    public commodityService : CommodityService,
    public feeService : FeeService,
    public serveService: serviceService,
    public currencyService: CurrencyService,
    public shipmentTypeService: ShipmentTypeService
  ) {
    this.rowBuffer = 0;
    this.paginationPageSize = 30;
    this.cacheOverflowSize = 2;
    this.maxConcurrentDatasourceRequests = 1;
    this.infiniteInitialRowCount = 10;
    this.maxBlocksInCache = 100;
    this.frameworkComponents = { agColumnHeader: CustomHeader };
    this.cacheBlockSize = 50;
    this.defaultColDef = {
      width: 120,
      headerComponentParams: { menuIcon: "fas fa-filter" },
      sortable: true,
      resizable: true,
      filter: true,
      floatingFilter: true,
      filterParams: {
        debounceMs: 800,
        suppressAndOrCondition: true,
      },
      cellStyle: {
        "border-right": "1px dotted skyblue",
        "border-left": "1px dotted skyblue",
      },
    };

    this.components = {
      loadingRenderer: function (params) {
        if (params.value !== undefined) {
          return params.value;
        } else {
          return `<div class="spinner-border spinner-border-sm"  role="status">
          <span class="sr-only">Loading...</span>
        </div>`;
        }
      },
    };
  }
  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    {
      let dataSource = {
        getRows: (params) => {
          if (this.class == "agent") {
            this.agentService.getAgents(params).subscribe((results: any) => {
              let totalRows = results.totalRows;
              params.successCallback(results.results, totalRows);
            });
          }
          if (this.class == "customer") {
            this.customerService
              .getCustomer(params)
              .subscribe((results: any) => {
                let totalRows = results.totalRows;
                params.successCallback(results.results, totalRows);
              });
          }
          if (this.class == "country") {
            this.countryService
              .getCountries(params)
              .subscribe((results: any) => {
                let totalRows = results.totalRows;
                params.successCallback(results.results, totalRows);
              });
          }
          if (this.class == "company") {
            this.companyService
              .getCompanies(params)
              .subscribe((results: any) => {
                let totalRows = results.totalRows;
                params.successCallback(results.results, totalRows);
              });
          }
          if (this.class == "city") {
            this.cityService.getCities(params).subscribe((results: any) => {
              let totalRows = results.totalRows;
              params.successCallback(results.results, totalRows);
            });
          }
          if (this.class == "contact") {
            this.contactService
              .getContacts(params)
              .subscribe((results: any) => {
                let totalRows = results.totalRows;
                params.successCallback(results.results, totalRows);
              });
          }
          if (this.class == "state") {
            this.stateService.getStates(params).subscribe((results: any) => {
              let totalRows = results.totalRows;
              params.successCallback(results.results, totalRows);
            });
          }
          if (this.class == "carrier") {
            this.carrierService.getCarrier(params).subscribe((results: any) => {
              let totalRows = results.totalRows;
              params.successCallback(results.results, totalRows);
            });
          }
          if (this.class == "vendor") {
            this.otherContact
              .getOtherContact(params)
              .subscribe((results: any) => {
                let totalRows = results.totalRows;
                params.successCallback(results.results, totalRows);
              });
          }
          if (this.class == "port") {
            console.log(params)
            const a = {filterType: "text", type: "contains", filter: this.filterCountry}
           if(this.filterCountry) {params.filterModel.country = a}
            this.portService.getPorts(params).subscribe((results: any) => {
              let totalRows = results.totalRows;
              params.successCallback(results.results, totalRows);
            });
          }
          if (this.class == "commodity") {
            this.commodityService.getCommoditiesApi(params).subscribe((results: any) => {
              let totalRows = results.totalRows;
              params.successCallback(results.results, totalRows);
            });
          }
          if (this.class == "fee") {
            this.feeService.getAllFee(params).subscribe((results: any) => {
              let totalRows = results.totalRows;
              params.successCallback(results.results, totalRows);
            });
          }
          if (this.class == "service") {
            this.serveService.getServicessApi(params).subscribe((results: any) => {
              let totalRows = results.totalRows;
              params.successCallback(results.results, totalRows);
            });
          }
          if (this.class == "currency") {
            this.currencyService.getCurrenciesApiV2(params).subscribe((results: any) => {
              let totalRows = results.totalRows;
              params.successCallback(results.results, totalRows);
            });
          }
          if (this.class == "hsCode") {
            this.commodityService.getCommoditiesApi(params).subscribe((results: any) => {
              let totalRows = results.totalRows;
              params.successCallback(results.results, totalRows);
            });
          }
          if (this.class == "shipmentType") {
            this.shipmentTypeService.getShipmentTypesApi(params).subscribe((results: any) => {
              let totalRows = results.totalRows;
              params.successCallback(results.results, totalRows);
            });
          }
        },
      };

      this.gridApi.setDatasource(dataSource);
    }
  }

  ngOnInit() {

  }

  valided(event) {
    console.log(event.data);
    this.activeModal.close(event.data);
  }
}
