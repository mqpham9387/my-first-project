import { CrudSeaQuotationComponent } from './../CRUD_SeaQuotation/CRUD_quotation.component';
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
import {
  MessageBox,
  MessageBoxButtons,
  MessageBoxIcons,
} from 'src/app/form/message/messsage';
import { PartnerService } from 'src/app/main/model/partner/partner.service';
import { Quotation } from 'src/app/main/model/quotation/quotation.model';
import * as QuotationActions from '../store/quotation/quotation.actions';
import {
  FilterModel,
  QuotationFilterModel,
} from 'src/app/main/model/search/filter-model';

import { AdvanceSearchComponent } from 'src/app/main/shared/advance-search/advance-search.component';
import { ActionsColumnRenderComponent } from 'src/app/main/shared/actions-column-render/actions-column-render.component';
import { MakeQuotationComponent } from '../make-quotation/make-quotation.component';
import { CrudAirQuotationComponent } from '../CRUD_AirQuotation/CRUD_quotation.component';
import { CustomClearanceQuoAddComponent } from '../customs-clearance/customs-clearance-add/customs-clearance-add.component';
import { QuotationService } from 'src/app/main/model/quotation/quotation.service';

@Component({
  selector: 'app-sent-quotations',
  templateUrl: './sent-quotations.component.html',
  styleUrls: ['./sent-quotations.component.css'],
})
export class SentQuotationsComponent implements OnInit, OnDestroy {
  @Input() data: any;
  @ViewChild('sentQuotationGrid') sentQuotationGrid: AgGridAngular;

  sentQuotations: Quotation[];
  subscription: Subscription;
  editQuotationSub: Subscription;
  editQuotation: any;

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
    private quotationService: QuotationService,
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

    this.columnDefs = [
      {
        headerName: 'ID',
        field: 'quotationNo',
        width: 120,
        sortable: false,
        filter: false,
      },
      {
        headerName: 'Type',
        field: 'quotationType',
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
        headerName: 'Action',
        width: 240,
        cellRendererFramework: ActionsColumnRenderComponent,
        editable: false,
        sortable: false,
        filter: false,
        resizable: false,
        pinned: 'right',
        cellStyle: { 'text-align': 'left' },
        cellRendererParams: {
          addQuotaionClick: this.addQuotaionClick.bind(this),
          isDelete: true,
          isEdit: true,
          isQuot: false,
          editClick: this.editClick.bind(this),
          label: 'Editt',
          deleteClick: this.deleteClick.bind(this),
          isCopy: true,
          copyClick: this.copyClick.bind(this),
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

        this.store.dispatch(new QuotationActions.FetchSentQuotations(params));
        this.subscription = this.store
          .select('quotations')
          .pipe(
            map((quotationsState) => {
              return {
                sentQuotations: quotationsState.sentQuotations,
                totalSentQuotRows: quotationsState.totalSentQuotRows,
              };
            })
          )
          .subscribe((results: any) => {
            console.log(results);

            this.sentQuotations = results.sentQuotations;
            params.successCallback(
              results.sentQuotations,
              results.totalSentQuotRows
            );
          });
      },
    };

    this.gridApi.setDatasource(datasource);
  }
  edit(e) {
    console.log(e);
    const modalRef = this.modal.open(CustomClearanceQuoAddComponent, {
      windowClass: 'airQuotation',
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
  makeQuotation() {
    const modalRef = this.modal.open(MakeQuotationComponent, {
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
      const modalRef = this.modal.open(CustomClearanceQuoAddComponent, {
        size: 'xl',
        backdrop: 'static',
        keyboard: true,
      });

      modalRef.componentInstance.action = 'EDIT';
      modalRef.componentInstance.editQuotation = selectedRow;
      modalRef.componentInstance.selectedIndex = selectedNodeIndex;
    }
  }

  deleteClick(event?: any) {
    let selectedRow: any;
    let selectedNodeIndex: any;

    if (event.hasOwnProperty('params')) {
      selectedRow = event.params.data;
      selectedNodeIndex = event.params.rowIndex;
    } else {
      const selectedRowSea = this.gridApi.getSelectedRows();
      const rowNodes = this.gridApi.getSelectedNodes();
      selectedRow = selectedRowSea[0];
      selectedNodeIndex = rowNodes[0].id;
    }
    console.log(selectedNodeIndex);
    console.log(selectedRow);

    if (selectedRow !== undefined || selectedRow !== null) {
      const dialogResult = MessageBox.show(
        this.modal,
        'Are you sure to delete!',
        'Confirm',
        MessageBoxButtons.yesNo,
        MessageBoxIcons.question
      );
      dialogResult.then(async (result) => {
        if (result === 'YES') {
          const quotationNo = selectedRow.quotationNo;
          const paramsJson = {
            startRow: 0,
            endRow: 90,
            sortModel: [],
            filterModel: {
              quotationNo: {
                filterType: 'text',
                type: 'equals',
                filter: quotationNo,
              },
            },
          };
          this.store.dispatch(
            new QuotationActions.DeleteQuotation({
              index: selectedNodeIndex,
              selectedQuotaion: selectedRow,
            })
          );
          // delete quotationDetails_TruckingNonContainers
          this.quotationService
            .getQuotDetailsTruckNonCont(paramsJson)
            .subscribe((data) => {
              const oldTruckNonConts = data.results;
              if (oldTruckNonConts && oldTruckNonConts.length) {
                oldTruckNonConts.forEach((truck) => {
                  this.store.dispatch(
                    new QuotationActions.DeleteTruckingNonContainer(truck._id)
                  );
                });
              }
            });
          // delete quotationDetails_TruckingContainers
          this.quotationService
            .getQuotationTruckingContainer(paramsJson)
            .subscribe((data) => {
              const oldTruckConts = data.results;
              if (oldTruckConts && oldTruckConts.length) {
                oldTruckConts.forEach((truck) => {
                  this.store.dispatch(
                    new QuotationActions.DeleteTruckingContainer(truck._id)
                  );
                });
              }
            });
          // delete quotationDetails_CustomsClearance
          this.quotationService
            .getQuotDetailsCustomsClearance(paramsJson)
            .subscribe((data) => {
              const customClearance =
                data.results && data.results.length ? data.results[0] : '';
              if (customClearance.hasOwnProperty('_id')) {
                this.store.dispatch(
                  new QuotationActions.DeleteCustomClearance(
                    customClearance._id
                  )
                );
              }
            });
          // delete quotationDetails_OtherCharges
          this.quotationService
            .getQuotationDetailsOtherCharges(paramsJson)
            .subscribe((data) => {
              const oldOtherCharges = data.results;
              if (oldOtherCharges && oldOtherCharges.length) {
                oldOtherCharges.forEach((otherCharge) => {
                  this.store.dispatch(
                    new QuotationActions.DeleteOtherChargeDetail(
                      otherCharge._id
                    )
                  );
                });
              }
            });
          MessageBox.show(
            this.modal,
            'Delete Successfully!',
            'Notification',
            MessageBoxButtons.ok,
            MessageBoxIcons.information
          );
        }
      });
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
    let filterModel: QuotationFilterModel = {
      dateCreate: {
        dateTo: this.toDate
          ? formatDate(this.toDate, 'dd/MM/yyy', 'en-US')
          : null,
        dateFrom: this.fromDate
          ? formatDate(this.fromDate, 'dd/MM/yyy', 'en-US')
          : null,
        type: 'inRange',
        filterType: 'date',
      },
    };
    for (let index in this.searchData) {
      if (this.searchData[index].isCheck && this.searchData[index].value) {
        filterModel[this.searchData[index].columnName] = {
          filterType: 'text',
          type: 'contains',
          filter:
            this.searchData[index].type === 'datetime'
              ? formatDate(this.searchData[index].value, 'dd/MM/yyy', 'en-US')
              : this.searchData[index].value,
        };
      }
    }
    if (this.selectedCri && this.criterionValue) {
      filterModel[this.selectedCri] = {
        filterType: 'text',
        type: 'contains',
        filter: this.criterionValue,
      };
    }

    const datasource = {
      getRows: (params: IGetRowsParams) => {
        params.filterModel = filterModel;
        this.store.dispatch(new QuotationActions.FetchSentQuotations(params));
        this.subscription = this.store
          .select('quotations')
          .pipe(
            map((sentQuotationsState) => {
              const results = {
                sentQuotations: sentQuotationsState.sentQuotations,
                totalSentQuotRows: sentQuotationsState.totalSentQuotRows,
              };
              return results;
            })
          )
          .subscribe((results: any) => {
            this.sentQuotations = results.airFreights;
            params.successCallback(
              results.sentQuotations,
              results.totalSentQuotRows
            );
          });
      },
    };

    this.gridApi.setDatasource(datasource);
  }

  addQuotaionClick() {
    console.log('add quotation from Air tariff.');
  }

  copyClick() {
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
    if (this.editQuotationSub) {
      this.editQuotationSub.unsubscribe();
    }
  }
}
