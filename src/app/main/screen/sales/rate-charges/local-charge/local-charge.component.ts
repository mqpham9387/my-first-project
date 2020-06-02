import { Component, OnInit, OnDestroy, ViewChild, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import * as fromMain from 'src/app/main/store/main.reducer';
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

import { LocalChargeFilterModel } from 'src/app/main/model/search/filter-model';
import * as LocalChargeActions from '../store/local-charge/local-charge.actions';
import * as LocalChargeDetailActions from '../store/local-charge-detail/local-charge-detail.actions';
import { AdvanceSearchComponent } from 'src/app/main/shared/advance-search/advance-search.component';
import { LocalCharge } from 'src/app/main/model/rate-charges/local-charges/local-charge.model';
import { LocalChargeDetail } from 'src/app/main/model/rate-charges/local-charges/local-charge-detail.model';
import { LocalChargeAddComponent } from './local-charge-add/local-charge-add.component';
import { LocalChargeDetailAddComponent } from './local-charge-detail-add/local-charge-detail-add.component';
import { formatNumCommas } from 'src/app/main/common/util';
import { RcCustomClearanceActionRenderComponent } from 'src/app/main/shared/actions-column-render/rc-custom-clearance-action-render.component';

@Component({
  selector: 'app-local-charge',
  templateUrl: './local-charge.component.html',
  styleUrls: ['./local-charge.component.css'],
})
export class LocalChargeComponent implements OnInit, OnDestroy {
  @Input() data: any;
  @ViewChild('localChargeGrid') localChargeGrid: AgGridAngular;

  localChargeSub: Subscription;
  localChargeDetailSub: Subscription;

  // ======== grid configure ==============
  public gridOptions: Partial<GridOptions>;

  public columnDefs: any;
  public cacheOverflowSize: any;
  public maxConcurrentDatasourceRequests: any;
  public infiniteInitialRowCount: any;
  rowData: any;
  rowClassRules: any;
  defaultColDef: any;
  frameworkComponents: any;
  columnSeaDefs: any;

  isLoading = true;
  partners: any;

  fromDate = formatDate(new Date(), 'yyyy-MM-dd', 'en-US');
  toDate: string;
  dateTimeLimit: string = formatDate(new Date('2050'), 'dd/MM/yyy', 'en-US');
  criterions = AppSettings.RcSeaCriterions;
  selectedCri: any;
  criterionValue: any;
  searchData = AppSettings.RCSeaSearch;

  columnLcDefs = [
    {
      headerName: 'ID',
      field: 'pricingID',
      width: 100,
      sortable: false,
      filter: false,
    },
    {
      headerName: 'Tariff Name',
      field: 'localChargeName',
      width: 150,
      sortable: false,
      filter: false,
    },
    {
      headerName: 'Valid from',
      field: 'validDateFrom',
      width: 150,
      sortable: false,
      filter: false,
      cellRenderer: (data) => {
        return data.value != null ? data.value : '';
      },
    },
    {
      headerName: 'Valid To',
      field: 'validDateTo',
      width: 150,
      sortable: false,
      filter: false,
      cellRenderer: (data) => {
        return data.value != null ? data.value : '';
      },
    },
    {
      headerName: 'Service',
      field: 'service.serviceName',
      width: 150,
      sortable: false,
      filter: false,
    },
    {
      headerName: 'POL',
      field: 'portofLoading.portID',
      width: 150,
      sortable: false,
      filter: false,
    },
    {
      headerName: 'POD',
      field: 'portofDischarge.portID',
      width: 150,
      sortable: false,
      filter: false,
    },
    {
      headerName: 'Transit Port',
      field: 'transitPort.portID',
      width: 150,
      sortable: false,
      filter: false,
    },
    {
      headerName: 'Creator',
      field: 'creator',
      width: 150,
      sortable: false,
      filter: false,
    },
    {
      headerName: 'POL Country',
      field: 'polCountry.countryName',
      width: 150,
      sortable: false,
      filter: false,
      cellRenderer: (data: any) => {
        return data.value != null ? data.value : '';
      },
    },
    {
      headerName: 'POD Country',
      field: 'podCountry.countryName',
      width: 150,
      sortable: false,
      filter: false,
      cellRenderer: (data: any) => {
        return data.value != null ? data.value : '';
      },
    },
    {
      headerName: 'Action',
      width: 300,
      cellRendererFramework: RcCustomClearanceActionRenderComponent,
      editable: false,
      sortable: false,
      filter: false,
      resizable: false,
      pinned: 'right',
      cellRendererParams: {
        isCopy: true,
        isBook: false,
        isQuot: false,
        // addQuotaionClick: this.addQuotaionClick.bind(this),
        editClick: this.editLocalCharge.bind(this),
        label: 'Edit',
        deleteClick: this.deleteLocalCharge.bind(this),
        copyClick: this.copyClick.bind(this),
      },
    },
  ];

  columnLcdDefs = [
    {
      headerName: 'ID',
      field: 'pricingID',
      width: 100,
      sortable: false,
      filter: false,
    },
    {
      headerName: 'Charge name',
      field: 'fee.feeNameEnglish',
      width: 200,
      sortable: false,
      filter: false,
    },
    {
      headerName: 'Amount',
      field: 'amount',
      width: 150,
      sortable: false,
      filter: false,
      cellStyle: { 'text-align': 'right' },
      cellRenderer: (data) => {
        return data.value ? formatNumCommas(data.value) : '';
      },
    },
    {
      headerName: 'Charge per',
      field: 'chargePer',
      width: 100,
      sortable: false,
      filter: false,
      cellStyle: { 'text-align': 'right' },
    },
    {
      headerName: 'Curr.',
      field: 'currency.currencyID',
      width: 150,
      sortable: false,
      filter: false,
      cellStyle: { 'text-align': 'center' },
    },
    {
      headerName: 'Notes',
      field: 'notes',
      width: 800,
      sortable: false,
      filter: false,
    },
  ];

  // Local Charges
  lcGridApi: any;
  lcGridColumnApi: any;
  localCharges: LocalCharge[];

  // Local charge Detail
  lcdGridApi: any;
  lcdGridColumnApi: any;
  localChargeDetails: LocalChargeDetail[];

  constructor(
    private modal: NgbModal,
    private store: Store<fromMain.MainState>
  ) {}

  ngOnInit() {
    this.isLoading = false;
  }

  // Local charge
  onGridLCReady = (params: any) => {
    this.lcGridApi = params.api;
    this.lcGridColumnApi = params.columnApi;

    const datasource = {
      getRows: (params: IGetRowsParams) => {
        this.store.dispatch(new LocalChargeActions.FetchLocalCharges(params));
        this.localChargeSub = this.store
          .select('localCharges')
          .pipe(
            map((localChargesState) => {
              const results = {
                localCharges: localChargesState.localCharges,
                totalRows: localChargesState.totalRows,
              };
              console.log(results);

              return results;
            })
          )
          .subscribe((results: any) => {
            this.localCharges = results.localCharges;
            params.successCallback(results.localCharges, results.totalRows);
          });
      },
    };

    this.lcGridApi.setDatasource(datasource);
  };

  // localCharge detail
  onGridLCDReady = (params: any) => {
    this.lcdGridApi = params.api;
    this.lcGridColumnApi = params.columnApi;
    console.log(params);

    const datasource = {
      getRows: (params: IGetRowsParams) => {
        this.store.dispatch(
          new LocalChargeDetailActions.FetchLocalChargeDetails(params)
        );
        this.localChargeDetailSub = this.store
          .select('localChargeDetails')
          .pipe(
            map((localChargeDetailState) => {
              console.log(localChargeDetailState);
              const results = {
                localChargeDetails: localChargeDetailState.localChargeDetails,
                totalRows: localChargeDetailState.totalRows,
              };
              return results;
            })
          )
          .subscribe((results: any) => {
            this.localChargeDetails = results.localChargeDetails;

            params.successCallback(
              results.localChargeDetails,
              results.totalRows
            );
          });
      },
    };

    this.lcdGridApi.setDatasource(datasource);
  };

  addLocalCharge() {
    const modalRef = this.modal.open(LocalChargeAddComponent, {
      size: 'xl',
      backdrop: 'static',
      keyboard: true,
    });

    modalRef.componentInstance.action = 'ADD_NEW_LOCAL_CHARGE';
    modalRef.componentInstance.isEdit = false;
    modalRef.result.then(
      (result) => {},
      (reason) => {
        console.log('reason dismiss', reason);
      }
    );
  }

  addNewChargeDetail() {
    const modalRef = this.modal.open(LocalChargeDetailAddComponent, {
      size: 'lg',
      backdrop: 'static',
      keyboard: true,
    });

    modalRef.componentInstance.action = 'ADD_NEW_LOCAL_CHARGE_DETAIL';
    modalRef.componentInstance.isEdit = false;
    modalRef.result.then(
      (result) => {},
      (reason) => {
        console.log('reason dismiss', reason);
      }
    );
  }

  editLocalCharge(event: any) {
    let selectedRow: any;
    let selectedNodeIndex: any;
    if (event.hasOwnProperty('params')) {
      selectedRow = event.params.data;
      selectedNodeIndex = event.params.rowIndex;
    } else {
      const selectedRowSea = this.lcGridApi.getSelectedRows();
      const rowNodes = this.lcGridApi.getSelectedNodes();
      selectedRow = selectedRowSea[0];
      selectedNodeIndex = rowNodes[0].id;
    }

    selectedRow = Object.assign({}, selectedRow);

    const modalRef = this.modal.open(LocalChargeAddComponent, {
      size: 'xl',
      backdrop: 'static',
      keyboard: true,
    });

    modalRef.componentInstance.action = 'EDIT_LOCAL_CHARGE';
    modalRef.componentInstance.isEdit = true;
    modalRef.componentInstance.editLocalChargeData = { ...selectedRow };
    modalRef.componentInstance.selectedIndex = selectedNodeIndex;
  }

  editChargeDetail(event: any) {}

  deleteChargeDetail(event: any) {}

  deleteLocalCharge(event: any) {
    let selectedRow: any;
    let selectedNodeIndex: any;

    if (event.hasOwnProperty('params')) {
      selectedRow = event.params.data;
      selectedNodeIndex = event.params.rowIndex;
    } else {
      const selectedRowSea = this.lcGridApi.getSelectedRows();
      const rowNodes = this.lcGridApi.getSelectedNodes();
      selectedRow = selectedRowSea[0];
      selectedNodeIndex = rowNodes[0].id;
    }

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
          this.store.dispatch(
            new LocalChargeActions.DeleteLocalCharge({
              index: selectedNodeIndex,
              selectedLocalCharge: selectedRow,
            })
          );
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
    const key = +item.key;
    const searchItem = item.value;
    if (searchItem.isCheck) {
      this.searchData[key].isCheck = false;
      this.searchData[key].value = null;
    }
  }

  getListLocalCharges() {
    const filterParams = this.getParams();
    const dataSource = this.getDataSource(filterParams);
    this.lcGridApi.setDatasource(dataSource);
  }

  private getParams(): LocalChargeFilterModel {
    const filterModel: LocalChargeFilterModel = {
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

    for (const index in this.searchData) {
      if (this.searchData[index].isCheck && this.searchData[index].value) {
        if (
          this.searchData[index].type === 'datetime' &&
          this.searchData[index].columnName === 'validDateFrom'
        ) {
          filterModel[this.searchData[index].columnName] = {
            filterType: 'date',
            type: 'inRange',
            dateTo: this.searchData[index].value
              ? formatDate(this.searchData[index].value, 'dd/MM/yyy', 'en-US')
              : null,
            dateFrom: this.searchData[index].value
              ? formatDate(this.searchData[index].value, 'dd/MM/yyy', 'en-US')
              : null,
          };
        }
        if (
          this.searchData[index].type === 'datetime' &&
          this.searchData[index].columnName === 'validDateTo'
        ) {
          filterModel[this.searchData[index].columnName] = {
            filterType: 'date',
            type: 'inRange',
            dateTo: this.searchData[index].value
              ? formatDate(this.searchData[index].value, 'dd/MM/yyy', 'en-US')
              : null,
            dateFrom: this.searchData[index].value
              ? formatDate(this.searchData[index].value, 'dd/MM/yyy', 'en-US')
              : null,
          };
        }
        filterModel[this.searchData[index].columnName] = {
          filterType: 'text',
          type: 'contains',
          filter: this.searchData[index].value,
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

    return filterModel;
  }

  protected getDataSource(filterParams: any) {
    const datasource = {
      getRows: (params: IGetRowsParams) => {
        console.log(
          'Fetching startRow ' + params.startRow + ' of ' + params.endRow
        );
        console.log(params);
        params.filterModel = filterParams;

        this.store.dispatch(new LocalChargeActions.FetchLocalCharges(params));
        this.localChargeSub = this.store
          .select('localCharges')
          .pipe(
            map((localChargesState) => {
              const results = {
                truckingCharges: localChargesState.localCharges,
                totalRows: localChargesState.totalRows,
              };
              return results;
            })
          )
          .subscribe((results: any) => {
            this.localCharges = results.localCharges;
            params.successCallback(results.localCharges, results.totalRows);
          });
      },
    };
    return datasource;
  }

  addQuotaionClick() {
    console.log('add a quotation');
  }

  copyClick() {
    console.log('copy work');
  }

  onPaginationChanged(event) {}

  ngOnDestroy() {
    if (this.localChargeSub) {
      this.localChargeSub.unsubscribe();
    }
  }
}
