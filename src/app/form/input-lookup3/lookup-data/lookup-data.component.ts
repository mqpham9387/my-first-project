import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { CustomHeader } from "src/app/main/common/ag-grid-header-custom";
import { PartnerService } from "src/app/main/model/partner/partner.service";
import { AgentService } from "src/app/main/model/partner/agent.service";
import { CityService } from "src/app/main/model/city/city.service";
import { CountryService } from "src/app/main/model/country/country.service";
import { CustomerService } from "src/app/main/model/partner/customer.service";
import { CompanyService } from 'src/app/main/model/company/company.service';
import { ContactService } from 'src/app/main/model/contact/contact.service';
import { StateService } from 'src/app/main/model/state/state.service';
import { CarriersService } from 'src/app/main/model/partner/carrier.service';
import { OtherContactService } from 'src/app/main/model/partner/otherContact.service';

@Component({
  selector: "app-lookup-data",
  templateUrl: "./lookup-data.component.html",
  styleUrls: ["./lookup-data.component.css"],
})
export class LookupDataComponent implements OnInit {
  @Input() columnDefs;
  @Input() rowData;
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
  constructor(
    public activeModal: NgbActiveModal,
    public partnerService: PartnerService,
    public agentService: AgentService,
    public cityService: CityService,
    public countryService: CountryService,
    public customerService: CustomerService,
    public companyService : CompanyService,
    public contactService : ContactService,
    public stateService : StateService,
    public carrierService : CarriersService,
    public otherContact : OtherContactService
  ) {
    this.defaultColDef = {
      width: 120,
      headerComponentParams: { menuIcon: "fas fa-filter" },
      sortable: true,
      resizable: true,
      filter: true,
      suppressAndOrCondition: true,
      floatingFilter: true,
    };
    this.rowBuffer = 0;
    this.paginationPageSize = 30;
    this.cacheOverflowSize = 2;
    this.maxConcurrentDatasourceRequests = 1;
    this.infiniteInitialRowCount = 10;
    this.maxBlocksInCache = 100;
    this.frameworkComponents = { agColumnHeader: CustomHeader };
    this.cacheBlockSize = 50;
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
            this.cityService
              .getCities(params)
              .subscribe((results: any) => {
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
            this.stateService
              .getStates(params)
              .subscribe((results: any) => {
                let totalRows = results.totalRows;
                params.successCallback(results.results, totalRows);
              });
          }
          if (this.class == "carrier") {
            this.carrierService
              .getCarrier(params)
              .subscribe((results: any) => {
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
        },
      };

      this.gridApi.setDatasource(dataSource);
    }
  }

  ngOnInit() {
    console.log(this.rowData);
  }

  valided(event) {
    console.log(event.data);
    this.activeModal.close(event.data);
  }
}
