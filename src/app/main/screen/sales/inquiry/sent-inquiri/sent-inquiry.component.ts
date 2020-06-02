import { Component, OnInit, OnDestroy, ViewChild, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription, Observable } from 'rxjs';
import * as fromMain from '../../../../store/main.reducer';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { CustomHeader } from 'src/app/main/common/ag-grid-header-custom';
import { formatDate } from '@angular/common';

import { map } from 'rxjs/operators';
import { AgGridAngular } from 'ag-grid-angular';
import { GridOptions, IGetRowsParams } from 'ag-grid-community';

import { MessageBox, MessageBoxButtons, MessageBoxIcons } from 'src/app/form/message/messsage';

import * as InquiryActions from '../store/inquiry.actions';
import { RouterLinkRendererComponent } from '../router-link-render/router-link-render.component';
import { Inquiry } from 'src/app/main/model/inquiry/inquiry.model';
import { SearchAdvanceComponent } from '../search-advance/search-advance.component';
import { InquiryService } from 'src/app/main/model/inquiry/inquiry.service';
import { PartnerService } from 'src/app/main/model/partner/partner.service';
import { SeaGeneralComponent } from '../sea/seaGeneral.component';
import { CustomClearanceEditComponent } from '../inquiry-edit/custom-clearance-edit/custom-clearance-edit.component';
import { MakeInquiryComponent } from '../inquiry-add/make-inquiry/make-inquiry.component';
import { FilterModel } from 'src/app/main/model/search/filter-model';
import { AirGeneralComponent } from '../air/airGeneral.component';

@Component({
  selector: 'app-sent-inquiry',
  templateUrl: './sent-inquiry.component.html',
  styleUrls: ['./sent-inquiry.component.css'],
})
export class SentInquiryComponent implements OnInit, OnDestroy {
  @Input() data;
  @ViewChild('sentInquiryGrid') sentInquiryGrid: AgGridAngular;

  subscription: Subscription;
  sentInquiries: Inquiry[];

  public gridOptions: Partial<GridOptions>;
  public gridApi: any;
  public gridColumnApi: any;
  public columnDefs: any;
  public cacheOverflowSize: any;
  public maxConcurrentDatasourceRequests: any;
  public infiniteInitialRowCount: any;

  rowData: any;
  rowClassRules: any;
  defaultColDef: any;
  frameworkComponents: any;

  rowDataCont = [];
  columnDefsAuthor: any;
  rowDataAuthor = [];
  public columnSentInquiryDefs: any;

  isLoading = true;
  partners: any;

  fromDate = formatDate(new Date(), "yyyy-MM-dd", "en-US");
  toDate: string;
  dateTimeLimit: string = formatDate(new Date("2050"), "dd/MM/yyy", "en-US");
  criterions = [
    { id: 1, headerName: 'ID', columnName: 'inquiryID' },
    { id: 2, headerName: 'Type', columnName: 'inquiryType' },
    { id: 3, headerName: 'Client' },
    { id: 4, headerName: 'Commodity', columnName: 'commodity' },
    { id: 5, headerName: 'POL', columnName: 'portofLoading' },
    { id: 6, headerName: 'POD', columnName: 'portofDischarge'}
    // { id: 7, headerName: 'Status' }
  ];
  selectedCri;
  criterionValue;

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

  constructor(
    private modal: NgbModal,
    private store: Store<fromMain.MainState>,
    private inquiryService: InquiryService,
    private partnerService: PartnerService
  ) {
    // =========== Grid config ==============================================
    this.rowClassRules = {
      "status-lock": function (params) {
        return params.data.lock === true;
      },
      "status-warning": function (params) {
        return params.data.warning === true;
      },
    };
    this.defaultColDef = {
      width: 120,
      headerComponentParams: { menuIcon: "fas fa-filter" },
      sortable: true,
      resizable: true,
      filter: true,
    };
    this.frameworkComponents = { agColumnHeader: CustomHeader };
    this.cacheOverflowSize = 1;
    this.maxConcurrentDatasourceRequests = 1000;
    this.infiniteInitialRowCount = 100;
    this.gridOptions = {
      headerHeight: 45,
      rowHeight: 30,
      cacheBlockSize: 100,
      paginationPageSize: 100,
      rowModelType: 'infinite',
    }
    // ======================================================================
    this.columnSentInquiryDefs = [
      { headerName: 'ID', field: 'inquiryID', width: 100, sortable: false, filter: false },
      { headerName: 'Type', field: 'inquiryType', width: 150, sortable: false, filter: false },
      { headerName: 'Client', field: 'client.partnerNameAbbr', width: 150, sortable: false, filter: false },
      {
        headerName: 'Commodity', field: 'commodity.commodityName', width: 220, sortable: false, filter: false, cellRenderer: (data) => {
          return data.value != null ? data.value : '';
        }
      },
      
      
     
      {
        headerName: "POL",
        field: "portofLoading.portID",
        width: 150,
        sortable: false,
        filter: false,
        cellRenderer: (data) => {
          return data.value != null ? data.value : "";
        },
      },
      {
        headerName: "POD",
        field: "portofDischarge.portID",
        width: 150,
        sortable: false,
        filter: false,
      },
      {
        headerName: "Created On",
        field: "dateCreate",
        width: 150,
        sortable: false,
        filter: false,
        // cellRenderer: (data) => {
        //   return data.value != null
        //     ? formatDate(data.value, "dd/MM/yyyy", "en-US")
        //     : "";
        // },
      },
      {
        headerName: "Created By",
        field: "creator.contactName",
        width: 150,
        sortable: false,
        filter: false,
      },
      {
        headerName: "Status",
        field: "status",
        width: 150,
        sortable: false,
        filter: false,
        cellRenderer: (data) => {
          return data.value ? "Quoted" : "No Quote";
        },
      },
      {
        headerName: "Action",
        width: 150,
        cellRendererFramework: RouterLinkRendererComponent,
        editable: false,
        sortable: false,
        filter: false,
        resizable: false,
        pinned: "right",
        cellRendererParams: {
          editClick: this.edit.bind(this),
          deleteClick: this.delete.bind(this),
          copyClick :this.copy.bind(this)
        },
      },
    ];
  }

  ngOnInit() {
    // this.subscription = this.store
    //   .select("inquiries")
    //   .pipe(map((sentInquiryState) => sentInquiryState.inquiries))
    //   .subscribe((inquiries: Inquiry[]) => {
    //     this.sentInquiries = inquiries;
    //   });
    // console.log(this.sentInquiries);

    this.isLoading = false;
  }
  copy(){
    
  }
  makeInquiry() {
    // TODO: need check type of Inquiry when create new one.
    const modalRef = this.modal.open(MakeInquiryComponent, {
      windowClass: "gr-modal-make-inquiry",
      backdrop: "static",
      keyboard: false,
    });

    modalRef.componentInstance.action = "MAKE_INQUIRY_BY_TYPE";
    // modalRef.componentInstance.data = data

    modalRef.result.then(
      (result) => {
        console.log(result);
      },
      (reason) => {
        console.log("reason dismiss", reason);
      }
    );
  }
  edit(e) {
    console.log(e.params);
    this.openSeaGeneralOrAirGeneral(e.params);
  }
  delete(e) {
    let dialogResult = MessageBox.show(this.modal, 'Do you want to delete!', 'Confirm', MessageBoxButtons.yesNo, MessageBoxIcons.question);
    dialogResult.then(async (result) => {
      if (result === 'YES') { 
        const select =this.gridApi.getSelectedNodes();
        this.store.dispatch(
        new InquiryActions.DeleteInquiry(Number(select[0].id)))
        MessageBox.show(this.modal, 'Successfully Delete!', 'Notification', MessageBoxButtons.ok, MessageBoxIcons.information)  
      }
    
    
    
    })}
      
      
    
    
    

  onGridReadyOfSentInquiry(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    var datasource = {
      getRows: (params: IGetRowsParams) => {
        //  TODO: Call a service that fetches list of inquiries
        console.log(
          "Fetching startRow " + params.startRow + " of " + params.endRow
        );
        console.log(params);
        this.store.dispatch(new InquiryActions.FetchSentInquirys(params));
        this.subscription = this.store
          .select("inquiries")
          .pipe(
            map((inquiriesState) => {
              const results = {
                inquiries: inquiriesState.inquiries,
                totalRows: inquiriesState.totalRows,
              };
              return results;
            })
          )
          .subscribe((results: any) => {
            this.sentInquiries = results.inquiries;
            let totalRows = results.totalRows;
            params.successCallback(results.inquiries, totalRows)
          });
      },
    };

    this.gridApi.setDatasource(datasource);
  }

  onPaginationChanged(event) {}

  searchAdvance() {
    const modalRef = this.modal.open(SearchAdvanceComponent, {
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
  viewInquiry(e){
    if (e.data.inquiryType == "AirFreightQuotation")
    {
      const modalRef = this.modal.open(AirGeneralComponent, {
        size: "xl",
        backdrop: "static",
        keyboard: true,
      });
      modalRef.componentInstance.data = e.data;
      modalRef.componentInstance.index = e.rowIndex;
      modalRef.componentInstance.action = "VIEW"
    }

    if (e.data.inquiryType == "SeaFreightQuotation")
    {
      const modalRef = this.modal.open(SeaGeneralComponent, {
        size: "xl",
        backdrop: "static",
        keyboard: true,
      });
      modalRef.componentInstance.data = e.data;
      modalRef.componentInstance.index = e.rowIndex;
      modalRef.componentInstance.action="VIEW"
    }
    if (
      e.data.inquiryType == "CustomsClearanceAndTruckingQuotation"
    ) {
      const modalRef = this.modal.open(CustomClearanceEditComponent, {
        size: "xl",
        backdrop: "static",
        keyboard: false,
        
      });
      modalRef.componentInstance.action = "VIEW";
      modalRef.componentInstance.data = e.data;
      modalRef.componentInstance.index = e.rowIndex;
      
    }
  }
  openSeaGeneralOrAirGeneral(e) {
    if (e.data.inquiryType == "AirFreightQuotation")
    {
      const modalRef = this.modal.open(AirGeneralComponent, {
        size: "xl",
        backdrop: "static",
        keyboard: true,
      });
      modalRef.componentInstance.data = e.data;
      modalRef.componentInstance.index = e.rowIndex;
      modalRef.componentInstance.action = "EDIT"
    }

    if (e.data.inquiryType == "SeaFreightQuotation")
    {
      const modalRef = this.modal.open(SeaGeneralComponent, {
        size: "xl",
        backdrop: "static",
        keyboard: true,
      });
      modalRef.componentInstance.data = e.data;
      modalRef.componentInstance.index = e.rowIndex;
      modalRef.componentInstance.action="EDIT"
    }
    
    if (
      e.data.inquiryType == "CustomsClearanceAndTruckingQuotation"
    ) {
      const modalRef = this.modal.open(CustomClearanceEditComponent, {
        size: "xl",
        backdrop: "static",
        keyboard: false,
        
      });
      modalRef.componentInstance.action = "EDIT";
      modalRef.componentInstance.data = e.data;
      modalRef.componentInstance.index = e.rowIndex;
      
    }
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

  getListSentInquiries() {
    console.log("Show Params search");
    
    // console.log(this.searchData);
    // console.log(this.selectedCri);
    // console.log(this.criterionValue);

    let filterModel: FilterModel = {
      dateCreate: {
        dateTo: this.toDate ? formatDate(this.toDate, 'dd/MM/yyy', 'en-US') : null,
        dateFrom: this.fromDate ? formatDate(this.fromDate, 'dd/MM/yyy', 'en-US') : null,
        type: "inRange",
        filterType: "date",
      },
    };
    for (var index in this.searchData) {
      if (this.searchData[index].isCheck && this.searchData[index].value) {
        filterModel[this.searchData[index].columnName] = {
          "filterType": "text",
          "type": "contains",
          "filter": this.searchData[index].value
        };
      }
    }
    if(this.selectedCri && this.criterionValue) {
      filterModel[this.selectedCri] = {
        "filterType": "text",
        "type": "contains",
        "filter": this.criterionValue
      };
    }
    console.log(filterModel);
    
    var datasource = {
      getRows: (params: IGetRowsParams) => {
        //  TODO: Call a service that fetches list of users
        console.log(
          "Fetching startRow " + params.startRow + " of " + params.endRow
        );
        console.log(params.filterModel);
        // {inquiryID: {filterType: "text", type: "contains", filter: "A"}}
        params.filterModel = filterModel;
        this.store.dispatch(new InquiryActions.FetchSentInquirys(params));
        this.subscription = this.store
          .select("inquiries")
          .pipe(
            map((inquiriesState) => {
              const results = {
                inquiries: inquiriesState.inquiries,
                totalRows: inquiriesState.totalRows,
              };
              return results;
            })
          )
          .subscribe((results: any) => {
            this.sentInquiries = results.inquiries;
            let totalRows = results.totalRows;
            console.log(results.inquiries);

            params.successCallback(results.inquiries, totalRows);
          });
      },
    };

    this.gridApi.setDatasource(datasource);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
