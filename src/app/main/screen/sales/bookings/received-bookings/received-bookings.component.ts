import { Component, OnInit, OnDestroy, ViewChild, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription, Observable } from 'rxjs';
import * as fromMain from '../../../../store/main.reducer';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { formatDate } from '@angular/common';
import { map } from 'rxjs/operators';
import { AgGridAngular } from 'ag-grid-angular';
import { GridOptions, IGetRowsParams } from 'ag-grid-community';
import { AppSettings } from 'src/app/main/shared/app-settings';
import { MessageBox, MessageBoxButtons, MessageBoxIcons } from 'src/app/form/message/messsage';
import { PartnerService } from 'src/app/main/model/partner/partner.service';
import { Booking } from 'src/app/main/model/booking/booking.model';
import { BookingFilterModel } from 'src/app/main/model/search/filter-model';
import { AdvanceSearchComponent } from 'src/app/main/shared/advance-search/advance-search.component';
import { LinkColumnRenderComponent } from 'src/app/main/shared/actions-column-render/link-column-render.component';
import { RouterLinkRenderer1Component } from './../router-link-render1/router-link-render1.component';

@Component({
  selector: 'app-received-bookings',
  templateUrl: './received-bookings.component.html',
  styleUrls: ['./received-bookings.component.css'],
})

export class ReceivedBookingsComponent implements OnInit, OnDestroy {
  @Input() data: any;
  @ViewChild('receivedBookingGrid') receivedBookingGrid: AgGridAngular;

  receivedBookings: Booking[];
  subscription: Subscription;

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
    private partnerService: PartnerService
  ) {
    // =========== Grid config ==============================================
    this.rowClassRules = {
      'status-lock': (params: any) => params.data.lock === true,
      'status-warning': (params: any) => params.data.warning === true
    };
    this.defaultColDef = AppSettings.defaultColDef;
    this.frameworkComponents = AppSettings.frameworkComponents;
    this.cacheOverflowSize = AppSettings.cacheOverflowSize;
    this.maxConcurrentDatasourceRequests = AppSettings.maxConcurrentDatasourceRequests;
    this.infiniteInitialRowCount = AppSettings.infiniteInitialRowCount;
    this.gridOptions = AppSettings.gridOptions;

    this.columnDefs = [
      { headerName: 'ID', field: 'quotationNo', width: 120, sortable: false, filter: false },
      { headerName: 'Type', field: 'quotationType', width: 200, sortable: false, filter: false },
      { headerName: 'Client', field: 'client.partnerID', width: 150, sortable: false, filter: false },
      {
        headerName: 'Commodity', field: 'commodity.commodityName', width: 150, sortable: false, filter: false,
        cellRenderer: (data) => {
          return data.value != null ? data.value : '';
        }
      },
      { headerName: 'POL', field: 'pickupAt.portName', width: 150, sortable: false, filter: false },
      { headerName: 'POD', field: 'deliveryTo.portName', width: 150, sortable: false, filter: false },
      { headerName: 'Created on', field: 'dateCreate', width: 180, sortable: false, filter: false },
      { headerName: 'Created by', field: 'creator.contactName', width: 240, sortable: false, filter: false },
      { headerName: 'Sent to', field: 'sentTo.contactName', width: 240, sortable: false, filter: false },
      {
        headerName: 'Draft', field: 'saveDraft', width: 150, sortable: false, filter: false, cellRenderer: (data) => {
          return (data.value != null && data.value) ? 'Draft' : 'No';
        }
      },
      {
        headerName: 'Action',
        width: 100,
        cellRendererFramework: LinkColumnRenderComponent,
        editable: false,
        sortable: false,
        filter: false,
        resizable: false,
        pinned: 'right',
        cellRendererParams: {
          isDelete: false,
          isEdit: false,
          label: 'Edit',
          editClick: this.editClick.bind(this)
        },
      }
    ];
  }

  ngOnInit() {
    this.isLoading = false;
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    // const datasource = {
    //   getRows: (params: IGetRowsParams) => {
    //     console.log('Fetching startRow ' + params.startRow + ' of ' + params.endRow);
    //     console.log(params);

    //     this.store.dispatch(new BookingActions.FetchReceivedBookings(params));
    //     this.subscription = this.store
    //       .select('bookings')
    //       .pipe(
    //         map(
    //           (bookingsState) => {
    //             return {
    //               receivedBookings: bookingsState.receivedBookings,
    //               totalReceivedQuotRows: bookingsState.totalReceivedQuotRows
    //             };
    //           }
    //         )
    //       )
    //       .subscribe((results: any) => {
    //         this.receivedBookings = results.receivedBookings;
    //         console.log(results);
    //         params.successCallback(results.receivedBookings, results.totalReceivedQuotRows);
    //       });
    //   }
    // }

    // this.gridApi.setDatasource(datasource);
  }

  addNewAir() {
    // let addNew = new Booking();
    // const modalRef = this.modal.open(AirFreightAddComponent, { windowClass: 'gr-modal-air', backdrop: 'static', keyboard: false })
    // modalRef.componentInstance.action = 'ADD';
    // modalRef.componentInstance.data = addNew
    // modalRef.result.then((result) => {
    //   console.log(result);
    // }, (reason) => {
    //   console.log('reason dismiss', reason);
    // })
  }

  editClick(event?: any) {
    // let selectedRow: any;
    // let selectedNodeIndex: any;
    // if (event.hasOwnProperty('params')) {
    //   selectedRow = event.params.data;
    //   selectedNodeIndex = event.params.rowIndex;
    // } else {
    //   const selectedRowArr = this.gridApi.getSelectedRows();
    //   const rowNodes = this.gridApi.getSelectedNodes();
    //   selectedRow = selectedRowArr[0];
    //   selectedNodeIndex = rowNodes[0].id;
    // }

    // console.log(selectedRow);
    // console.log(selectedNodeIndex);
    // const general = {...selectedRow};

    // const modalRef = this.modal.open(
    //   AirFreightAddComponent, { windowClass: 'gr-modal-air', backdrop: 'static', keyboard: false }
    // );

    // modalRef.componentInstance.action = 'EDIT';
    // modalRef.componentInstance.data = selectedRow;
    // modalRef.componentInstance.selectedAirIndex = selectedNodeIndex;

    // modalRef.result.then((result) => {
    //   // this.rowDataCont.push(result);
    //   // let row = this.rowDataCont;
    //   let dataSource = {
    //     getRows: (params: IGetRowsParams) => {
    //       console.log('Fetching startRow ' + params.startRow + ' of ' + params.endRow);
    //       console.log(params);
    //       this.subscription = this.store
    //         .select('airfreights')
    //         .pipe(map(airfreightsState => airfreightsState.airFreights))
    //         .subscribe((airFreights: Booking[]) => {
    //           this.airFreights = airFreights;
    //           params.successCallback(airFreights, airFreights.length);
    //         });
    //     }
    //   };
    //   this.gridApi.setDatasource(dataSource);
    // }, (reason) => {
    //   console.log('reason dismiss', reason);
    // });
  }

  deleteAir(event?: any) {
    // let selectedRow: any;
    // let selectedNodeIndex: any;

    // if (event.hasOwnProperty('params')) {
    //   selectedRow = event.params.data;
    //   selectedNodeIndex = event.params.rowIndex;
    // } else {
    //   const selectedRowSea = this.gridApi.getSelectedRows();
    //   const rowNodes = this.gridApi.getSelectedNodes();
    //   selectedRow = selectedRowSea[0];
    //   selectedNodeIndex = rowNodes[0].id;
    // }
    // console.log(selectedNodeIndex);
    // console.log(selectedRow);

    // if (selectedRow !== undefined || selectedRow !== null) {
    //   const dialogResult = MessageBox.show(
    //     this.modal,
    //     'Are you sure to delete!',
    //     'Confirm', MessageBoxButtons.yesNo, MessageBoxIcons.question
    //   );
    //   dialogResult.then(async (result) => {
    //     if (result === 'YES') {
    //       this.store.dispatch(new AirFreightActions.DeleteAirFreight({ index: selectedNodeIndex, selectedAir: selectedRow }));
    //       MessageBox.show(
    //         this.modal,
    //         'Delete Successfully!',
    //         'Notification',
    //         MessageBoxButtons.ok,
    //         MessageBoxIcons.information
    //       );
    //     }
    //   });
    // }
  }
  onPaginationChanged(event) { }

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
    //     dateTo: this.toDate ? formatDate(this.toDate, 'dd/MM/yyy', 'en-US') : null,
    //     dateFrom: this.fromDate ? formatDate(this.fromDate, 'dd/MM/yyy', 'en-US') : null,
    //     type: 'inRange',
    //     filterType: 'date',
    //   },
    // };
    // for (let index in this.searchData) {
    //   if (this.searchData[index].isCheck && this.searchData[index].value) {
    //     filterModel[this.searchData[index].columnName] = {
    //       filterType: 'text',
    //       type: 'contains',
    //       filter: this.searchData[index].type === 'datetime' ?
    //         formatDate(this.searchData[index].value, 'dd/MM/yyy', 'en-US') :
    //         this.searchData[index].value
    //     };
    //   }
    // }
    // if (this.selectedCri && this.criterionValue) {
    //   filterModel[this.selectedCri] = {
    //     filterType: 'text',
    //     type: 'contains',
    //     filter: this.criterionValue
    //   };
    // }

    // const datasource = {
    //   getRows: (params: IGetRowsParams) => {
    //     params.filterModel = filterModel;
    //     this.store.dispatch(new BookingActions.FetchReceivedBookings(params));
    //     this.subscription = this.store
    //       .select('bookings')
    //       .pipe(
    //         map((receivedBookingsState) => {
    //           const results = {
    //             receivedBookings: receivedBookingsState.receivedBookings,
    //             totalReceivedQuotRows: receivedBookingsState.totalReceivedQuotRows,
    //           };
    //           return results;
    //         })
    //       )
    //       .subscribe((results: any) => {
    //         this.receivedBookings = results.receivedBookings;
    //         params.successCallback(results.receivedBookings, results.totalReceivedQuotRows);
    //       });
    //   },
    // };

    // this.gridApi.setDatasource(datasource);
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
