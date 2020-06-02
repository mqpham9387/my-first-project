import { Component, OnInit, OnDestroy, ViewChild, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription, Observable } from 'rxjs';
import * as fromMain from 'src/app/main/store/main.reducer';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { formatDate } from '@angular/common';
import { map } from 'rxjs/operators';
import { AgGridAngular } from 'ag-grid-angular';
import { GridOptions, IGetRowsParams } from 'ag-grid-community';
import { AppSettings } from 'src/app/main/shared/app-settings';
import { MessageBox, MessageBoxButtons, MessageBoxIcons } from 'src/app/form/message/messsage';
import { PartnerService } from 'src/app/main/model/partner/partner.service';
import { FilterModel } from 'src/app/main/model/search/filter-model';
import * as SeaFreightActions from '../store/sea-freight/sea-freight.actions';
import { RateAndChargesSea } from 'src/app/main/model/rate-charges/rate-and-charges-sea.model';
import { SeaFreightAddComponent } from './sea-freight-add/sea-freight-add.component';
import { ActionsColumnRenderComponent } from 'src/app/main/shared/actions-column-render/actions-column-render.component';
import { AdvanceSearchComponent } from 'src/app/main/shared/advance-search/advance-search.component';
import { AirTariffActionRenderComponent } from 'src/app/main/shared/actions-column-render/air-tariff-action-render.component';

@Component({
  selector: 'app-lcl-tariff',
  templateUrl: './lcl-tariff.component.html',
  styleUrls: ['./lcl-tariff.component.css'],
})

export class LclTariffComponent implements OnInit, OnDestroy {
  @Input() data: any;
  @ViewChild('seaFreightGrid') seaFreightGrid: AgGridAngular;

  seaFreights: RateAndChargesSea[];

  seaSubscription: Subscription;

  // ======== grid configure ==============
  public gridOptions: Partial < GridOptions > ;
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

  constructor(
    private modal: NgbModal,
    private store: Store < fromMain.MainState >,
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

    this.columnSeaDefs = [
      { headerName: 'ID', field: 'pricingID', width: 100, sortable: false, filter: false },
      { headerName: 'POL', field: 'portofLoading.portID', width: 100, sortable: false, filter: false },
      { headerName: 'POD', field: 'portofDischarge.portID', width: 100, sortable: false, filter: false },
      { headerName: 'Transit Port', field: 'transitPort.portID', width: 100, sortable: false, filter: false },
      { headerName: 'Freight charge', field: 'freightChargeLCL', width: 150, sortable: false, filter: false, cellStyle: { 'text-align': "right" } },
      { headerName: 'Minimum charge', field: 'freightChargeLCL', width: 150, sortable: false, filter: false, cellStyle: { 'text-align': "right" } },
      { headerName: 'Curr.', field: 'currency.currencyID', width: 150, sortable: false, filter: false },
      { headerName: 'Freq.', field: 'frequency', width: 100, sortable: false, filter: false,
        cellRenderer: (data) => {
          return data.value != null ? data.value : '';
        },
        cellStyle: { 'text-align': "right" }
      },
      { headerName: 'Cut off', field: 'cutOff', width: 150, sortable: false, filter: false, cellStyle: { 'text-align': "right" } },
      { headerName: 'Transit time (days)', field: 'transitTime', width: 150, sortable: false, filter: false, cellStyle: { 'text-align': "right" } },
      { headerName: 'Valid from', field: 'validDateFrom', width: 150, sortable: false, filter: false,
        cellRenderer: (data) => {
          return data.value != null ? data.value : '';
        }
      },
      { headerName: 'Valid To', field: 'validDateTo', width: 150, sortable: false, filter: false,
        cellRenderer: (data) => {
          return data.value != null ? data.value : '';
        }
      },
      { headerName: 'Notes', field: 'notes', width: 200, sortable: false, filter: false },
      { headerName: 'Origin local charge', field: '', width: 200, sortable: false, filter: false, cellRenderer: (data) => {
          return data.value != null ? data.value : 'View';
        }
      },
      { headerName: 'Destination local charge', field: '', width: 200, sortable: false, filter: false, cellRenderer: (data) => {
          return data.value != null ? data.value : 'View';
        }
      },
      {
        headerName: 'Action',
        width: 240,
        cellRendererFramework: AirTariffActionRenderComponent,
        editable: false,
        sortable: false,
        filter: false,
        resizable: false,
        pinned: 'right',
        cellRendererParams: {
          addQuotaionClick: this.addQuotaionClick.bind(this),
          editClick: this.editSea.bind(this),
          label: 'Edit',
          deleteClick: this.deleteSea.bind(this),
        },
      }
    ];
  }

  ngOnInit() {
    this.isLoading = false;
  }

  onGridReadySea(params: any) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    const datasource = {
      getRows: (params: IGetRowsParams) => {
        this.store.dispatch(new SeaFreightActions.FetchSeaFreights(params));
        this.seaSubscription = this.store
          .select('seafreights')
          .pipe(
            map(
              (seafreightsState) => {
                const results = {
                  seaFreights: seafreightsState.seaFreights,
                  totalRows: seafreightsState.totalRows
                };
                return results;
              }
            )
          )
          .subscribe((results: any) => {
            this.seaFreights = results.seaFreights;
            const totalRows = results.totalRows;
            params.successCallback(results.seaFreights, totalRows);
          });
      }
    };

    this.gridApi.setDatasource(datasource);
  }

  addNewSea() {
    const addNew = new RateAndChargesSea();
    const modalRef = this.modal.open(SeaFreightAddComponent, { windowClass: 'gr-modal-sea', backdrop: 'static', keyboard: false });

    modalRef.componentInstance.action = 'ADD';
    modalRef.componentInstance.seaData = addNew;
    modalRef.result.then((result) => {
      const dataSource = {
        getRows: (params: IGetRowsParams) => {
          this.seaSubscription = this.store
            .select('seafreights')
            .pipe(map(seafreightsState => seafreightsState.seaFreights))
            .subscribe((seaFreights: RateAndChargesSea[]) => {
              this.seaFreights = seaFreights;
              params.successCallback(seaFreights, seaFreights.length);
            });
        }
      };
      this.gridApi.setDatasource(dataSource);
    }, (reason) => {
      console.log('reason dismiss', reason);
    });
  }

  editSea(event: any) {
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

    // let rowIndex = event.rowIndex;
    const modalRef = this.modal.open(
      SeaFreightAddComponent,
      { windowClass: 'gr-modal-sea', backdrop: 'static', keyboard: false }
    );

    modalRef.componentInstance.action = 'EDIT';
    modalRef.componentInstance.seaData = selectedRow;
    modalRef.componentInstance.selectedSeaIndex = selectedNodeIndex;

    modalRef.result.then((result) => {
      let dataSource = {
        getRows: (params: IGetRowsParams) => {

          this.store.dispatch(new SeaFreightActions.FetchSeaFreights(params));
          this.seaSubscription = this.store
            .select('seafreights')
            .pipe(map(seafreightsState => seafreightsState.seaFreights))
            .subscribe((seaFreights: RateAndChargesSea[]) => {
              this.seaFreights = seaFreights;
              params.successCallback(seaFreights, seaFreights.length);
            });
        }
      };
      // this.gridApi.setDatasource(dataSource);
    }, (reason) => {
      console.log('reason dismiss', reason);
    });
  }

  deleteSea() {
    let selectedRow: any;
    let selectedNodeIndex: any;
    const selectedRowSea = this.gridApi.getSelectedRows();
    const rowNodes = this.gridApi.getSelectedNodes();
    selectedRow = selectedRowSea[0];
    selectedNodeIndex = rowNodes[0].id;
    console.log(rowNodes.length);
    if (rowNodes === undefined || rowNodes.length === 0) {

    } else {
      const dialogResult = MessageBox.show(
                                          this.modal,
                                          'Are you sure to delete!',
                                          'Confirm', MessageBoxButtons.yesNo, MessageBoxIcons.question);
      dialogResult.then(async (result) => {
        if (result === 'YES') {
          this.store.dispatch(
            new SeaFreightActions.DeleteSeaFreight(
              { index: selectedNodeIndex, selectedSea: selectedRow }
            )
          );
          // update list
          const dataSource = {
            getRows: (params: IGetRowsParams) => {
              this.seaSubscription = this.store
                .select('seafreights')
                .pipe(map(seafreightsState => seafreightsState.seaFreights))
                .subscribe((seaFreights: RateAndChargesSea[]) => {
                  this.seaFreights = seaFreights;
                  params.successCallback(seaFreights, seaFreights.length);
                });
            }
          };
          this.gridApi.setDatasource(dataSource);
        } else {

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
    const key = +item.key;
    const searchItem = item.value;
    if (searchItem.isCheck) {
      this.searchData[key].isCheck = false;
      this.searchData[key].value = null;
    }
  }

  getListSentInquiries() {
    const filterModel: FilterModel = {
      dateCreate: {
        dateTo: this.toDate ? formatDate(this.toDate, 'dd/MM/yyy', 'en-US') : null,
        dateFrom: this.fromDate ? formatDate(this.fromDate, 'dd/MM/yyy', 'en-US') : null,
        type: 'inRange',
        filterType: 'date',
      },
    };

    for (let index in this.searchData) {
      if (this.searchData[index].isCheck && this.searchData[index].value) {
        filterModel[this.searchData[index].columnName] = {
          filterType: 'text',
          type: 'contains',
          filter: this.searchData[index].value
        };
      }
    }
    if (this.selectedCri && this.criterionValue) {
      filterModel[this.selectedCri] = {
        filterType: 'text',
        type: 'contains',
        filter: this.criterionValue
      };
    }

    const datasource = {
      getRows: (params: IGetRowsParams) => {
        // console.log(params.filterModel);
        params.filterModel = filterModel;
        this.store.dispatch(new SeaFreightActions.FetchSeaFreights(params));
        this.seaSubscription = this.store
          .select('seafreights')
          .pipe(
            map((seaFreightState) => {
              const results = {
                seaFreights: seaFreightState.seaFreights,
                totalRows: seaFreightState.totalRows,
              };
              return results;
            })
          )
          .subscribe((results: any) => {
            this.seaFreights = results.seaFreights;
            let totalRows = results.totalRows;

            params.successCallback(results.seaFreights, totalRows);
          });
      },
    };

    this.gridApi.setDatasource(datasource);
  }

  addQuotaionClick() {
    console.log('add a quotation');
  }

  ngOnDestroy() {
    if (this.seaSubscription) {
      this.seaSubscription.unsubscribe();
    }
  }
}
