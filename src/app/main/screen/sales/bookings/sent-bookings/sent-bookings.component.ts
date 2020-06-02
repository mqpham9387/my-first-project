import { CrudSeaQuotationComponent } from './../../quotation/CRUD_SeaQuotation/CRUD_quotation.component';
import { RouterLinkRenderer1Component } from './../router-link-render1/router-link-render1.component';
import {CustomClearanceComponent } from './../custom-clearance/custom-clearance.component';
import * as BookingActions from '../store/booking.actions';
import { CRUDSeaBookingComponent } from './../crud-sea-booking/crud-sea-booking.component';
import { MakeBookingComponent } from './../make-booking/make-booking.component';
import { Component, OnInit, OnDestroy, ViewChild, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import * as fromMain from '../../../../store/main.reducer';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { formatDate } from '@angular/common';
import { map } from 'rxjs/operators';
import { AgGridAngular } from 'ag-grid-angular';
import { GridOptions, IGetRowsParams } from 'ag-grid-community';
import { AppSettings } from 'src/app/main/shared/app-settings';
import {
  MessageBox,
  MessageBoxButtons,
  MessageBoxIcons,
} from 'src/app/form/message/messsage';
import { PartnerService } from 'src/app/main/model/partner/partner.service';
import { Booking } from 'src/app/main/model/booking/booking.model';
import { FilterModel, BookingFilterModel } from 'src/app/main/model/search/filter-model';
import { AdvanceSearchComponent } from 'src/app/main/shared/advance-search/advance-search.component';
import { ActionsColumnRenderComponent } from 'src/app/main/shared/actions-column-render/actions-column-render.component';
import { BookingService } from 'src/app/main/model/booking/booking.service';


@Component({
  selector: 'app-sent-bookings',
  templateUrl: './sent-bookings.component.html',
  styleUrls: ['./sent-bookings.component.css'],
})
export class SentBookingsComponent implements OnInit, OnDestroy {
  @Input() data: any;
  @ViewChild('sentBookingGrid') sentBookingGrid: AgGridAngular;

  sentBookings: Booking[];
  subscription: Subscription;
  editBookingSub: Subscription;
  editBooking: any;

  // ======== grid configure ==============
  public gridOptions: Partial<GridOptions>;
  public gridApi: any;
  public gridColumnApi: any;
  public columnDefs: any;
  public cacheOverflowSize: any;
  public maxConcurrentDatasourceRequests: any;
  public infiniteInitialRowCount: any;

  rowClassRules: any;
  defaultColDef: any;
  frameworkComponents: any;

  isLoading = true;
  partners: any;

  fromDate = formatDate(new Date(), 'yyyy-MM-dd', 'en-US');
  toDate: string;
  dateTimeLimit: string = formatDate(new Date('2050'), 'dd/MM/yyy', 'en-US');
  criterions = AppSettings.quotationCriterions;
  searchData = AppSettings.quotationSentSearch;
  selectedCri: any;
  criterionValue: any;

  constructor(
    private modal: NgbModal,
    private store: Store<fromMain.MainState>,
    private BookingService: BookingService,
    private partnerService: PartnerService
  ) {
    // =========== Grid config ==============================================
    this.rowClassRules = {
      'status-lock': (params: any) => params.data.lock === true,
      'status-warning': (params: any) => params.data.warning === true,
    };
    this.defaultColDef = AppSettings.defaultColDef;
    this.frameworkComponents = AppSettings.frameworkComponents;
    this.cacheOverflowSize = AppSettings.cacheOverflowSize;
    this.maxConcurrentDatasourceRequests =
      AppSettings.maxConcurrentDatasourceRequests;
    this.infiniteInitialRowCount = AppSettings.infiniteInitialRowCount;
    this.gridOptions = AppSettings.gridOptions;

    // _ Sent Booking Requests Grid: hiển thị các trường
    // ( ID, type, client, commodity, POL, POD, created on, created by, cargo ready date,
    // status (pending/ confirmed/ rejected/ cancelled với pending để màu bình thường, confirmed để màu green, rejected và cancelled để màu đỏ)).
    this.columnDefs = [
      {
        headerName: 'ID',
        field: 'bookingNo',
        width: 120,
        sortable: false,
        filter: false,
      },
      {
        headerName: 'Type',
        field: 'bookingType',
        width: 200,
        sortable: false,
        filter: false,
      },
      {
        headerName: 'Client',
        field: 'client.partnerID',
        width: 150,
        sortable: false,
        filter: false,
      },
      {
        headerName: 'Commodity type',
        field: 'commodityType.shipmentTypeWarningName',
        width: 240,
        sortable: false,
        filter: false,
        cellRenderer: (data: any) => {
          return data.value != null ? data.value : '';
        },
      },
      {
        headerName: 'POL',
        field: 'pickupAt.portName',
        width: 150,
        sortable: false,
        filter: false,
      },
      {
        headerName: 'POD',
        field: 'deliveryTo.portName',
        width: 150,
        sortable: false,
        filter: false,
      },
      {
        headerName: 'Created on',
        field: 'dateCreate',
        width: 180,
        sortable: false,
        filter: false,
      },
      {
        headerName: 'Created by',
        field: 'creator.contactName',
        width: 240,
        sortable: false,
        filter: false,
      },
      {
        headerName: 'Sent to',
        field: 'sentTo',
        width: 240,
        sortable: false,
        filter: false,
        cellRenderer: (data: any) => {
          return data.value != null && data.value ? data.value.email : '';
        },
      },
      {
        headerName: 'Draft',
        field: 'saveDraft',
        width: 150,
        sortable: false,
        filter: false,
        cellRenderer: (data: any) => {
          return data.value != null && data.value ? 'Draft' : 'No';
        },
      },
      {
        headerName: "Action",
        width: 150,
        cellRendererFramework: RouterLinkRenderer1Component,
        editable: false,
        sortable: false,
        filter: false,
        resizable: false,
        pinned: "right",
        cellRendererParams: {
          editClick: this.edit.bind(this),
          copyClick :this.copy.bind(this),

        }
      },
    ];
  }

  ngOnInit() {
    this.isLoading = false;
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    const datasource = {
      // tslint:disable-next-line: no-shadowed-variable
      getRows: (params: IGetRowsParams) => {
        console.log(
          'Fetching startRow ' + params.startRow + ' of ' + params.endRow
        );
        console.log(params);

       this.store.dispatch(new BookingActions.FetchSentBookings(params));
        this.subscription = this.store
          .select('quotations')
          .pipe(
            map((bookingState) => {
              return {
                //sentBookings: bookingState.sentBookings,
                totalSentQuotRows: bookingState.totalSentQuotRows,
              };
            })
          )
          .subscribe((results: any) => {
            console.log(results);

            this.sentBookings = results.sentBookings;
            params.successCallback(
              results.sentBookings,
              results.totalSentQuotRows
            );
          });
      },
    };

    this.gridApi.setDatasource(datasource);
  }
  edit(e) {
    console.log(e);
    const modalRef = this.modal.open(CustomClearanceComponent, {
      windowClass: 'SeaBooking',
      backdrop: 'static',
      keyboard: false,
    });
    modalRef.componentInstance.action = 'EDIT';
    modalRef.componentInstance.data = e.data;
    modalRef.result.then(
      (result) => {
        this.gridApi.purgeInfiniteCache();
      },
      (reason) => {
        console.log('reason dismiss', reason);
      }
    );
  }
  makeBooking() {
    const modalRef = this.modal.open(MakeBookingComponent, {
      size: 'lg',
      backdrop: 'static',
      keyboard: true,
    });
    modalRef.componentInstance.action = '';
    modalRef.result.then(
      (result) => {},
      (reason) => {
        console.log('reason dismiss', reason);
      }
    );
  }

  editClick(event?: any) {
    let selectedRow: any;
    let selectedNodeIndex: any;
    if (event.hasOwnProperty('params')) {
      selectedRow = event.params.data;
      selectedNodeIndex = event.params.rowIndex;
    } else {
      const selectedRowArr = this.gridApi.getSelectedRows();
      const rowNodes = this.gridApi.getSelectedNodes();
      selectedRow = selectedRowArr[0];
      selectedNodeIndex = rowNodes[0].id;
    }
    console.log(selectedRow);
    console.log(selectedNodeIndex);
    if (selectedRow && selectedRow !== 'null' && selectedRow !== 'undefined') {
      const modalRef = this.modal.open(CustomClearanceComponent, {
        size: 'xl',
        backdrop: 'static',
        keyboard: true,
      });

      modalRef.componentInstance.action = 'EDIT';
      modalRef.componentInstance.editBooking = selectedRow;
      modalRef.componentInstance.selectedIndex = selectedNodeIndex;
    }
  }


  onPaginationChanged(event) {}

  searchAdvance() {
    const modalRef = this.modal.open(AdvanceSearchComponent, {
      windowClass: 'gr-modal-advance',
      backdrop: 'static',
      keyboard: false,
    });

    modalRef.componentInstance.action = 'SEARCH_ADVANCE';
    modalRef.componentInstance.searchData = this.searchData;
    modalRef.result.then(
      (result) => {
        console.log(result);
      },
      (reason) => {
        console.log('reason dismiss', reason);
      }
    );
  }

  onRemoveSeachItem(item: any) {
    let key = +item.key;
    let searchItem = item.value;
    if (searchItem.isCheck) {
      this.searchData[key].isCheck = false;
      this.searchData[key].value = null;
    }
  }

  getResultSearchList() {
    // let filterModel: BookingFilterModel = {
    //   dateCreate: {
    //     dateTo: this.toDate
    //       ? formatDate(this.toDate, 'dd/MM/yyy', 'en-US')
    //       : null,
    //     dateFrom: this.fromDate
    //       ? formatDate(this.fromDate, 'dd/MM/yyy', 'en-US')
    //       : null,
    //     type: 'inRange',
    //     filterType: 'date',
    //   },
    // };
    // for (let index in this.searchData) {
    //   if (this.searchData[index].isCheck && this.searchData[index].value) {
    //     filterModel[this.searchData[index].columnName] = {
    //       filterType: 'text',
    //       type: 'contains',
    //       filter:
    //         this.searchData[index].type === 'datetime'
    //           ? formatDate(this.searchData[index].value, 'dd/MM/yyy', 'en-US')
    //           : this.searchData[index].value,
    //     };
    //   }
    // }
    // if (this.selectedCri && this.criterionValue) {
    //   filterModel[this.selectedCri] = {
    //     filterType: 'text',
    //     type: 'contains',
    //     filter: this.criterionValue,
    //   };
    // }

    // const datasource = {
    //   getRows: (params: IGetRowsParams) => {
    //     params.filterModel = filterModel;
    //     this.store.dispatch(new BookingActions.FetchSentBookings(params));
    //     this.subscription = this.store
    //       .select('quotations')
    //       .pipe(
    //         map((sentBookingsState) => {
    //           const results = {
    //             sentBookings: sentBookingsState.sentBookings,
    //             totalSentQuotRows: sentBookingsState.totalSentQuotRows,
    //           };
    //           return results;
    //         })
    //       )
    //       .subscribe((results: any) => {
    //         this.sentBookings = results.airFreights;
    //         params.successCallback(
    //           results.sentBookings,
    //           results.totalSentQuotRows
    //         );
    //       });
    //   },
    // };

    // this.gridApi.setDatasource(datasource);
  }

  addQuotaionClick() {
    console.log('add Booking from Air tariff.');
  }

  copy() {
    MessageBox.show(
      this.modal,
      'Copy function comming soon!',
      'Notification',
      MessageBoxButtons.ok,
      MessageBoxIcons.information
    );
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    if (this.editBookingSub) {
      this.editBookingSub.unsubscribe();
    }
  }
}
