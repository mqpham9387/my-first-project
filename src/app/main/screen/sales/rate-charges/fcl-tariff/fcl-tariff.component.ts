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
import { MessageBox, MessageBoxButtons, MessageBoxIcons } from 'src/app/form/message/messsage';
import { RcFclFilterModel } from 'src/app/main/model/search/filter-model';
import * as SeaFreightActions from '../store/sea-freight/sea-freight.actions';
import { RateAndChargesSea } from 'src/app/main/model/rate-charges/rate-and-charges-sea.model';

import { ActionsColumnRenderComponent } from 'src/app/main/shared/actions-column-render/actions-column-render.component';
import { AdvanceSearchComponent } from 'src/app/main/shared/advance-search/advance-search.component';
import { FclAddComponent } from './fcl-add/fcl-add.component';
import { FclEditComponent } from './fcl-edit/fcl-edit.component';
import { AirTariffActionRenderComponent } from 'src/app/main/shared/actions-column-render/air-tariff-action-render.component';

@Component({
  selector: 'app-fcl-tariff',
  templateUrl: './fcl-tariff.component.html',
  styleUrls: ['./fcl-tariff.component.css'],
})

export class FclTariffComponent implements OnInit, OnDestroy {
  @Input() data: any;
  @ViewChild('seaFreightGrid') seaFreightGrid: AgGridAngular;

  seaFreights: RateAndChargesSea[];

  gpSubscription: Subscription;
  otSubscription: Subscription;
  rcSubscription: Subscription;
  isoSubscription: Subscription;
  frSubscription: Subscription;

  // ======== grid configure ==============
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
  columnSeaDefs: any;

  isLoading = true;
  partners: any;

  fromDate = formatDate(new Date(), 'yyyy-MM-dd', 'en-US');
  toDate: string;
  dateTimeLimit: string = formatDate(new Date('2050'), 'dd/MM/yyy', 'en-US');
  criterions = AppSettings.RcSeaCriterions;
  selectedCri;
  criterionValue;
  searchData = AppSettings.RCSeaSearch;

  columnGPDefs = [
    { headerName: 'ID', field: 'pricingID', width: 100, sortable: false, filter: false },
    { headerName: 'POL', field: 'portofLoading.portID', width: 100, sortable: false, filter: false },
    { headerName: 'POD', field: 'portofDischarge.portID', width: 100, sortable: false, filter: false },
    { headerName: 'Transit Port', field: 'transitPort.portID', width: 100, sortable: false, filter: false },
    {
      headerName: 'Carrier',
      field: 'carrierID',
      width: 280,
      sortable: false,
      filter: false,
      cellRenderer: (data: any) => {
        if (data.value !== null && data.value !== undefined) {
          return data.value.partnerID + ' - ' + data.value.partnerNameFullEN;
        }
        return '';
      }
    },
    {
      headerName: 'Freight charge',
      field: 'freightChargeLCL',
      width: 150,
      sortable: false,
      filter: false,
      cellStyle: { 'text-align': "right" }
    },
    {
      headerName: 'Minimum charge',
      field: 'freightChargeLCL',
      width: 150,
      sortable: false,
      filter: false,
      cellStyle: { 'text-align': "right" }
    },
    { headerName: 'Curr.', field: 'currency.currencyID', width: 150, sortable: false, filter: false },
    {
      headerName: 'Freq.',
      field: 'frequency',
      width: 100,
      sortable: false,
      filter: false,
      cellRenderer: (data: any) => {
        return data.value != null ? data.value : '';
      },
      cellStyle: { 'text-align': "right" }
    },
    {
      headerName: 'Cut off',
      field: 'cutOff',
      width: 150,
      sortable: false,
      filter: false,
      cellRenderer: (data: any) => {
        return data.value != null ? data.value : '';
      },
      cellStyle: { 'text-align': "right" }
    },
    {
      headerName: 'Transit time (days)',
      field: 'transitTime',
      width: 150,
      sortable: false,
      filter: false,
      cellStyle: { 'text-align': "right" }
    },
    {
      headerName: 'Valid from',
      field: 'validDateFrom',
      width: 150,
      sortable: false,
      filter: false,
      cellRenderer: (data: any) => {
        return data.value != null ? data.value : '';
      }
    },
    {
      headerName: 'Valid To',
      field: 'validDateTo',
      width: 150,
      sortable: false,
      filter: false,
      cellRenderer: (data: any) => {
        return data.value != null ? data.value : '';
      }
    },
    { headerName: 'Notes', field: 'notes', width: 200, sortable: false, filter: false },
    {
      headerName: 'Origin local charge',
      field: '',
      width: 200,
      sortable: false,
      filter: false,
      cellRenderer: (data: any) => {
        return data.value != null ? data.value : 'View';
      }
    },
    {
      headerName: 'Destination local charge',
      field: '',
      width: 200,
      sortable: false,
      filter: false,
      cellRenderer: (data: any) => {
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
        editClick: this.editRcSea.bind(this),
        label: 'Edit',
        deleteClick: this.deleteSea.bind(this),
      },
    }
  ];
  columnRCDefs = [
    { headerName: 'ID', field: 'pricingID', width: 100, sortable: false, filter: false },
    { headerName: 'POL', field: 'portofLoading.portID', width: 100, sortable: false, filter: false },
    { headerName: 'POD', field: 'portofDischarge.portID', width: 100, sortable: false, filter: false },
    { headerName: 'Transit Port', field: 'transitPort.portID', width: 100, sortable: false, filter: false },
    {
      headerName: 'Carrier', field: 'carrierID', width: 280, sortable: false, filter: false, cellRenderer: (data) => {
        if (data.value !== null && data.value !== undefined) {
          return data.value.partnerID + ' - ' + data.value.partnerNameFullEN;
        }
        return '';
      }
    },
    { headerName: 'Freight charge', field: 'freightChargeLCL', width: 150, sortable: false, filter: false, cellStyle: { 'text-align': "right" } },
    { headerName: 'Minimum charge', field: 'freightChargeLCL', width: 150, sortable: false, filter: false, cellStyle: { 'text-align': "right" } },
    { headerName: 'Curr.', field: 'currency.currencyID', width: 150, sortable: false, filter: false },
    {
      headerName: 'Freq.',
      field: 'frequency',
      width: 100,
      sortable: false,
      filter: false,
      cellRenderer: (data) => {
        return data.value != null ? data.value : '';
      },
      cellStyle: { 'text-align': "right" }
    },
    { headerName: 'Cut off', field: 'cutOff', width: 150, sortable: false, filter: false, cellStyle: { 'text-align': "right" } },
    { headerName: 'Transit time (days)', field: 'transitTime', width: 150, sortable: false, filter: false, cellStyle: { 'text-align': "right" } },
    {
      headerName: 'Valid from',
      field: 'validDateFrom',
      width: 150,
      sortable: false,
      filter: false,
      cellRenderer: (data) => {
        return data.value != null ? data.value : '';
      }
    },
    {
      headerName: 'Valid To',
      field: 'validDateTo',
      width: 150,
      sortable: false,
      filter: false,
      cellRenderer: (data) => {
        return data.value != null ? data.value : '';
      }
    },
    { headerName: 'Notes', field: 'notes', width: 200, sortable: false, filter: false },
    {
      headerName: 'Origin local charge',
      field: '',
      width: 200,
      sortable: false,
      filter: false,
      cellRenderer: (data) => {
        return data.value != null ? data.value : 'View';
      }
    },
    {
      headerName: 'Destination local charge',
      field: '',
      width: 200,
      sortable: false,
      filter: false,
      cellRenderer: (data) => {
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
        editClick: this.editRcSea.bind(this),
        label: 'Edit',
        deleteClick: this.deleteSea.bind(this),
      },
    }
  ];

  columnOTDefs = [
    { headerName: 'ID', field: 'pricingID', width: 100, sortable: false, filter: false },
    { headerName: 'POL', field: 'portofLoading.portID', width: 100, sortable: false, filter: false },
    { headerName: 'POD', field: 'portofDischarge.portID', width: 100, sortable: false, filter: false },
    { headerName: 'Transit Port', field: 'transitPort.portID', width: 100, sortable: false, filter: false },
    {
      headerName: 'Carrier', field: 'carrierID', width: 280, sortable: false, filter: false, cellRenderer: (data) => {
        if (data.value !== null && data.value !== undefined) {
          return data.value.partnerID + ' - ' + data.value.partnerNameFullEN;
        }
        return '';
      }
    },
    { headerName: 'Freight charge', field: 'freightChargeLCL', width: 150, sortable: false, filter: false, cellStyle: { 'text-align': "right" } },
    { headerName: 'Minimum charge', field: 'freightChargeLCL', width: 150, sortable: false, filter: false, cellStyle: { 'text-align': "right" } },
    { headerName: 'Curr.', field: 'currency.currencyID', width: 150, sortable: false, filter: false },
    {
      headerName: 'Freq.',
      field: 'frequency',
      width: 100,
      sortable: false,
      filter: false,
      cellRenderer: (data) => {
        return data.value != null ? data.value : '';
      },
      cellStyle: { 'text-align': "right" }
    },
    { headerName: 'Cut off', field: 'cutOff', width: 150, sortable: false, filter: false, cellStyle: { 'text-align': "right" } },
    { headerName: 'Transit time (days)', field: 'transitTime', width: 150, sortable: false, filter: false , cellStyle: { 'text-align': "right" }},
    {
      headerName: 'Valid from',
      field: 'validDateFrom',
      width: 150,
      sortable: false,
      filter: false,
      cellRenderer: (data) => {
        return data.value != null ? data.value : '';
      }
    },
    {
      headerName: 'Valid To',
      field: 'validDateTo',
      width: 150,
      sortable: false,
      filter: false,
      cellRenderer: (data) => {
        return data.value != null ? data.value : '';
      }
    },
    { headerName: 'Notes', field: 'notes', width: 200, sortable: false, filter: false },
    {
      headerName: 'Origin local charge',
      field: '',
      width: 200,
      sortable: false,
      filter: false,
      cellRenderer: (data) => {
        return data.value != null ? data.value : 'View';
      }
    },
    {
      headerName: 'Destination local charge',
      field: '',
      width: 200,
      sortable: false,
      filter: false,
      cellRenderer: (data) => {
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
        editClick: this.editRcSea.bind(this),
        label: 'Edit',
        deleteClick: this.deleteSea.bind(this),
      },
    }
  ];
  columnFRDefs = [
    { headerName: 'ID', field: 'pricingID', width: 100, sortable: false, filter: false },
    { headerName: 'POL', field: 'portofLoading.portID', width: 100, sortable: false, filter: false },
    { headerName: 'POD', field: 'portofDischarge.portID', width: 100, sortable: false, filter: false },
    { headerName: 'Transit Port', field: 'transitPort.portID', width: 100, sortable: false, filter: false },
    {
      headerName: 'Carrier', field: 'carrierID', width: 280, sortable: false, filter: false, cellRenderer: (data) => {
        if (data.value !== null && data.value !== undefined) {
          return data.value.partnerID + ' - ' + data.value.partnerNameFullEN;
        }
        return '';
      }
    },
    { headerName: 'Freight charge', field: 'freightChargeLCL', width: 150, sortable: false, filter: false, cellStyle: { 'text-align': "right" } },
    { headerName: 'Minimum charge', field: 'freightChargeLCL', width: 150, sortable: false, filter: false, cellStyle: { 'text-align': "right" } },
    { headerName: 'Curr.', field: 'currency.currencyID', width: 150, sortable: false, filter: false },
    {
      headerName: 'Freq.',
      field: 'frequency',
      width: 100,
      sortable: false,
      filter: false,
      cellRenderer: (data) => {
        return data.value != null ? data.value : '';
      },
      cellStyle: { 'text-align': "right" }
    },
    { headerName: 'Cut off', field: 'cutOff', width: 150, sortable: false, filter: false, cellStyle: { 'text-align': "right" } },
    { headerName: 'Transit time (days)', field: 'transitTime', width: 150, sortable: false, filter: false, cellStyle: { 'text-align': "right" } },
    {
      headerName: 'Valid from',
      field: 'validDateFrom',
      width: 150,
      sortable: false,
      filter: false,
      cellRenderer: (data) => {
        return data.value != null ? data.value : '';
      }
    },
    {
      headerName: 'Valid To',
      field: 'validDateTo',
      width: 150,
      sortable: false,
      filter: false,
      cellRenderer: (data) => {
        return data.value != null ? data.value : '';
      }
    },
    { headerName: 'Notes', field: 'notes', width: 200, sortable: false, filter: false },
    {
      headerName: 'Origin local charge',
      field: '',
      width: 200,
      sortable: false,
      filter: false,
      cellRenderer: (data) => {
        return data.value != null ? data.value : 'View';
      }
    },
    {
      headerName: 'Destination local charge',
      field: '',
      width: 200,
      sortable: false,
      filter: false,
      cellRenderer: (data) => {
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
        editClick: this.editRcSea.bind(this),
        label: 'Edit',
        deleteClick: this.deleteSea.bind(this),
      },
    }
  ];
  columnISODefs = [
    { headerName: 'ID', field: 'pricingID', width: 100, sortable: false, filter: false },
    { headerName: 'POL', field: 'portofLoading.portID', width: 100, sortable: false, filter: false },
    { headerName: 'POD', field: 'portofDischarge.portID', width: 100, sortable: false, filter: false },
    { headerName: 'Transit Port', field: 'transitPort.portID', width: 100, sortable: false, filter: false },
    {
      headerName: 'Carrier', field: 'carrierID', width: 280, sortable: false, filter: false, cellRenderer: (data) => {
        if (data.value !== null && data.value !== undefined) {
          return data.value.partnerID + ' - ' + data.value.partnerNameFullEN;
        }
        return '';
      }
    },
    { headerName: 'Freight charge', field: 'freightChargeLCL', width: 150, sortable: false, filter: false, cellStyle: { 'text-align': "right" } },
    { headerName: 'Minimum charge', field: 'freightChargeLCL', width: 150, sortable: false, filter: false, cellStyle: { 'text-align': "right" } },
    { headerName: 'Curr.', field: 'currency.currencyID', width: 150, sortable: false, filter: false },
    {
      headerName: 'Freq.',
      field: 'frequency',
      width: 100,
      sortable: false,
      filter: false,
      cellRenderer: (data) => {
        return data.value != null ? data.value : '';
      },
      cellStyle: { 'text-align': "right" }
    },
    { headerName: 'Cut off', field: 'cutOff', width: 150, sortable: false, filter: false, cellStyle: { 'text-align': "right" } },
    { headerName: 'Transit time (days)', field: 'transitTime', width: 150, sortable: false, filter: false, cellStyle: { 'text-align': "right" } },
    {
      headerName: 'Valid from',
      field: 'validDateFrom',
      width: 150,
      sortable: false,
      filter: false,
      cellRenderer: (data) => {
        return data.value != null ? data.value : '';
      }
    },
    {
      headerName: 'Valid To',
      field: 'validDateTo',
      width: 150,
      sortable: false,
      filter: false,
      cellRenderer: (data) => {
        return data.value != null ? data.value : '';
      }
    },
    { headerName: 'Notes', field: 'notes', width: 200, sortable: false, filter: false },
    {
      headerName: 'Origin local charge',
      field: '',
      width: 200,
      sortable: false,
      filter: false,
      cellRenderer: (data) => {
        return data.value != null ? data.value : 'View';
      }
    },
    {
      headerName: 'Destination local charge',
      field: '',
      width: 200,
      sortable: false,
      filter: false,
      cellRenderer: (data) => {
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
        editClick: this.editRcSea.bind(this),
        label: 'Edit',
        deleteClick: this.deleteSea.bind(this),
      },
    }
  ];
  gpGridApi: any;
  gpGridColumnApi: any;
  gpSeaFreights: RateAndChargesSea[];
  OTGridApi: any;
  OTgridColumnApi: any;
  OTSeaFreights: RateAndChargesSea[];

  // RC
  rcGridApi: any;
  rcGridColumnApi: any;
  rcSeaFreights: RateAndChargesSea[];

  // OT
  otGridApi: any;
  otGridColumnApi: any;
  otSeaFreights: RateAndChargesSea[];
  // FR
  frGridApi: any;
  frGridColumnApi: any;
  frSeaFreights: RateAndChargesSea[];
  // ISO
  isoGridApi: any;
  isoGridColumnApi: any;
  isoSeaFreights: RateAndChargesSea[];

  constructor(
    private modal: NgbModal,
    private store: Store<fromMain.MainState>
  ) { }

  ngOnInit() {
    this.isLoading = false;
  }

  // General Purpose
  onGridGPReady = (params: any) => {
    this.gpGridApi = params.api;
    this.gpGridColumnApi = params.columnApi;

    const datasource = {
      getRows: (params: IGetRowsParams) => {
        params.filterModel = { containerType: { filterType: 'text', type: 'equals', filter: 'GP' } };
        this.store.dispatch(new SeaFreightActions.FetchGpSeaFreights(params));
        this.gpSubscription = this.store
          .select('seafreights')
          .pipe(
            map(
              (seafreightsState) => {
                let results = {
                  gpSeaFreights: seafreightsState.gpSeaFreights,
                  totalRows: seafreightsState.totalGPRows
                };

                return results;
              }
            )
          )
          .subscribe((results: any) => {
            this.gpSeaFreights = results.gpSeaFreights;
            let totalRows = results.totalRows;
            params.successCallback(results.gpSeaFreights, totalRows);
          });
      }
    };

    this.gpGridApi.setDatasource(datasource);
  }

  // Refridgerated Container
  onGridRCReady = (params: any) => {
    this.rcGridApi = params.api;
    this.rcGridColumnApi = params.columnApi;
    const datasource = {
      getRows: (params: IGetRowsParams) => {
        params.filterModel = { containerType: { filterType: 'text', type: 'equals', filter: 'RF' } };
        this.store.dispatch(new SeaFreightActions.FetchRcSeaFreights(params));
        this.rcSubscription = this.store
          .select('seafreights')
          .pipe(
            map(
              (seafreightsState) => {
                const results = {
                  rcSeaFreights: seafreightsState.rcSeaFreights,
                  totalRows: seafreightsState.totalRCRows
                };
                return results;
              }
            )
          )
          .subscribe((results: any) => {
            this.rcSeaFreights = results.rcSeaFreights;
            const totalRows = results.totalRows;

            params.successCallback(results.rcSeaFreights, totalRows);
          });
      }
    };

    this.rcGridApi.setDatasource(datasource);
  }

  // Open Top Container
  onGridOTReady = (params: any) => {
    this.otGridApi = params.api;
    this.otGridColumnApi = params.columnApi;
    const datasource = {
      getRows: (params: IGetRowsParams) => {
        params.filterModel = {
          containerType: { filterType: 'text', type: 'equals', filter: 'OT' }
        };
        this.store.dispatch(new SeaFreightActions.FetchOtSeaFreights(params));
        this.otSubscription = this.store
          .select('seafreights')
          .pipe(
            map(
              (seafreightsState) => {
                const results = {
                  otSeaFreights: seafreightsState.otSeaFreights,
                  totalRows: seafreightsState.totalOTRows
                };
                return results;
              }
            )
          )
          .subscribe((results: any) => {
            this.otSeaFreights = results.otSeaFreights;
            const totalRows = results.totalRows;
            params.successCallback(results.otSeaFreights, totalRows);
          });
      }
    };

    this.otGridApi.setDatasource(datasource);
  }

  // Flat Rack
  onGridFRReady = (params: any) => {
    this.frGridApi = params.api;
    this.frGridColumnApi = params.columnApi;
    const datasource = {
      getRows: (params: IGetRowsParams) => {
        params.filterModel = { containerType: { filterType: 'text', type: 'equals', filter: 'FR' } };
        this.store.dispatch(new SeaFreightActions.FetchFrSeaFreights(params));
        this.frSubscription = this.store
          .select('seafreights')
          .pipe(
            map(
              (seafreightsState) => {
                const results = {
                  frSeaFreights: seafreightsState.frSeaFreights,
                  totalRows: seafreightsState.totalFRRows
                };
                return results;
              }
            )
          )
          .subscribe((results: any) => {
            this.frSeaFreights = results.frSeaFreights;
            const totalRows = results.totalRows;
            params.successCallback(results.frSeaFreights, totalRows);
          });
      }
    };

    this.frGridApi.setDatasource(datasource);
  }

  // ISO TANK
  onGridISOReady = (params: any) => {
    this.isoGridApi = params.api;
    this.isoGridColumnApi = params.columnApi;
    const datasource = {
      getRows: (params: IGetRowsParams) => {
        params.filterModel = { containerType: { filterType: 'text', type: 'equals', filter: 'ISOT' } };
        this.store.dispatch(new SeaFreightActions.FetchIsoSeaFreights(params));
        this.isoSubscription = this.store
          .select('seafreights')
          .pipe(
            map(
              (seafreightsState) => {
                const results = {
                  isoSeaFreights: seafreightsState.isoSeaFreights,
                  totalRows: seafreightsState.totalISORows
                };
                return results;
              }
            )
          )
          .subscribe((results: any) => {
            this.isoSeaFreights = results.isoSeaFreights;
            const totalRows = results.totalRows;

            params.successCallback(results.isoSeaFreights, totalRows);
          });
      }
    };

    this.isoGridApi.setDatasource(datasource);
  }
  addNewFcl() {
    const addNew = new RateAndChargesSea();
    const modalRef = this.modal.open(
      FclAddComponent,
      { size: 'xl', backdrop: 'static', keyboard: true }
    );

    modalRef.componentInstance.action = 'ADD';
    modalRef.componentInstance.seaData = addNew;
    modalRef.result.then((result) => { }, (reason) => {
      console.log('reason dismiss', reason);
    });
  }

  editRcSea(event: any) {
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

    const modalRef = this.modal.open(
      FclEditComponent,
      { size: 'xl', backdrop: 'static', keyboard: true }
    );

    modalRef.componentInstance.action = 'EDIT';
    modalRef.componentInstance.seaData = selectedRow;
    modalRef.componentInstance.selectedIndex = selectedNodeIndex;
  }

  deleteSea(event: any) {
    let selectedRow: any;
    let selectedNodeIndex: any;
    let contType: string;
    if (event.hasOwnProperty('params')) {
      selectedRow = event.params.data;
      selectedNodeIndex = event.params.rowIndex;
    } else {
      const selectedRowSea = this.gridApi.getSelectedRows();
      const rowNodes = this.gridApi.getSelectedNodes();
      selectedRow = selectedRowSea[0];
      selectedNodeIndex = rowNodes[0].id;
    }

    contType = selectedRow.containerType.unitID;
    if (selectedRow !== undefined || selectedRow !== null) {
      const dialogResult = MessageBox.show(
        this.modal,
        'Are you sure to delete!',
        'Confirm', MessageBoxButtons.yesNo, MessageBoxIcons.question
      );
      dialogResult.then(async (result) => {
        if (result === 'YES') {
          this.store.dispatch(
            new SeaFreightActions.DeleteSeaFreight(
              { index: selectedNodeIndex, selectedSea: selectedRow }
            )
          );
          MessageBox.show(
            this.modal,
            'Successfully saved!',
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
        // console.log(result);
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

  getListFCL() {

    const gpFilterParams = this.getParamsByType('GP');
    const gpDataSource = this.getDataSource(gpFilterParams, 'GP');
    const rcFilterParams = this.getParamsByType('RF');
    const rcDataSource = this.getDataSource(rcFilterParams, 'RF');
    const otFilterParams = this.getParamsByType('OT');
    const otDataSource = this.getDataSource(otFilterParams, 'OT');
    const frFilterParams = this.getParamsByType('FR');
    const frDataSource = this.getDataSource(frFilterParams, 'FR');
    const isoFilterParams = this.getParamsByType('ISOT');
    const isoDataSource = this.getDataSource(isoFilterParams, 'ISOT');


    this.gpGridApi.setDatasource(gpDataSource);
    this.rcGridApi.setDatasource(rcDataSource);
    this.otGridApi.setDatasource(otDataSource);
    this.frGridApi.setDatasource(frDataSource);
    this.isoGridApi.setDatasource(isoDataSource);
  }

  addQuotaionClick() {
    console.log('add a quotation');
  }

  onPaginationChanged(event) { }

  private getParamsByType(type: string): RcFclFilterModel {
    const filterModel: RcFclFilterModel = {
      dateCreate: {
        dateTo: this.toDate ? formatDate(this.toDate, 'dd/MM/yyy', 'en-US') : null,
        dateFrom: this.fromDate ? formatDate(this.fromDate, 'dd/MM/yyy', 'en-US') : null,
        type: 'inRange',
        filterType: 'date',
      }
    };

    for (const index in this.searchData) {
      if (this.searchData[index].isCheck && this.searchData[index].value) {
        if (this.searchData[index].type === 'datetime' && this.searchData[index].columnName === 'validDateFrom') {
          filterModel[this.searchData[index].columnName] = {
            filterType: 'date',
            type: 'inRange',
            dateTo: this.searchData[index].value ? formatDate(this.searchData[index].value, 'dd/MM/yyy', 'en-US') : null,
            dateFrom: this.searchData[index].value ? formatDate(this.searchData[index].value, 'dd/MM/yyy', 'en-US') : null
          };
        }
        if (this.searchData[index].type === 'datetime' && this.searchData[index].columnName === 'validDateTo') {
          filterModel[this.searchData[index].columnName] = {
            filterType: 'date',
            type: 'inRange',
            dateTo: this.searchData[index].value ? formatDate(this.searchData[index].value, 'dd/MM/yyy', 'en-US') : null,
            dateFrom: this.searchData[index].value ? formatDate(this.searchData[index].value, 'dd/MM/yyy', 'en-US') : null
          };
        }
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

    switch (type) {
      case 'GP':
        filterModel.containerType = { filterType: 'text', type: 'equals', filter: 'GP' };
        break;
      case 'RF':
        filterModel.containerType = { filterType: 'text', type: 'equals', filter: 'RF' };
        break;
      case 'OT':
        filterModel.containerType = { filterType: 'text', type: 'equals', filter: 'OT' };
        break;
      case 'FR':
        filterModel.containerType = { filterType: 'text', type: 'equals', filter: 'FR' };
        break;
      case 'ISOT':
        filterModel.containerType = { filterType: 'text', type: 'equals', filter: 'ISOT' };
        break;
    }
    return filterModel;
  }

  protected getDataSource(filterParams: any, contType: string) {
    const datasource = {
      getRows: (params: IGetRowsParams) => {
        console.log('Fetching startRow ' + params.startRow + ' of ' + params.endRow);
        console.log(params);
        params.filterModel = filterParams;

        switch (contType) {
          case 'GP':
            // OP
            this.store.dispatch(new SeaFreightActions.FetchGpSeaFreights(params));
            this.gpSubscription = this.store
              .select('seafreights')
              .pipe(
                map((seafreightsState) => {
                  const results = {
                    gpSeaFreights: seafreightsState.gpSeaFreights,
                    totalRows: seafreightsState.totalGPRows,
                  };
                  return results;
                })
              )
              .subscribe((results: any) => {
                this.gpSeaFreights = results.gpSeaFreights;
                const totalRows = results.totalRows;

                params.successCallback(results.gpSeaFreights, totalRows);
              });
            break;
          case 'RF':
            // Refridgerated Container
            this.store.dispatch(new SeaFreightActions.FetchRcSeaFreights(params));
            this.rcSubscription = this.store
              .select('seafreights')
              .pipe(
                map(
                  (seafreightsState) => {
                    const results = {
                      rcSeaFreights: seafreightsState.rcSeaFreights,
                      totalRows: seafreightsState.totalRCRows
                    };
                    return results;
                  }
                )
              )
              .subscribe((results: any) => {
                this.rcSeaFreights = results.rcSeaFreights;
                const totalRows = results.totalRows;

                params.successCallback(results.rcSeaFreights, totalRows);
              });
            break;
          case 'OT':
            // Open Top Container
            this.store.dispatch(new SeaFreightActions.FetchOtSeaFreights(params));
            this.otSubscription = this.store
              .select('seafreights')
              .pipe(
                map(
                  (seafreightsState) => {
                    const results = {
                      otSeaFreights: seafreightsState.otSeaFreights,
                      totalRows: seafreightsState.totalOTRows
                    };
                    return results;
                  }
                )
              )
              .subscribe((results: any) => {
                this.otSeaFreights = results.otSeaFreights;
                const totalRows = results.totalRows;

                params.successCallback(results.otSeaFreights, totalRows);
              });
            break;
          case 'FR':
            // Flat Rack
            this.store.dispatch(new SeaFreightActions.FetchFrSeaFreights(params));
            this.frSubscription = this.store
              .select('seafreights')
              .pipe(
                map(
                  (seafreightsState) => {
                    const results = {
                      frSeaFreights: seafreightsState.frSeaFreights,
                      totalRows: seafreightsState.totalFRRows
                    };
                    return results;
                  }
                )
              )
              .subscribe((results: any) => {
                this.frSeaFreights = results.frSeaFreights;
                const totalRows = results.totalRows;
                params.successCallback(results.frSeaFreights, totalRows);
              });
            break;
          case 'ISOT':
            // ISO TANK
            this.store.dispatch(new SeaFreightActions.FetchIsoSeaFreights(params));
            this.isoSubscription = this.store
              .select('seafreights')
              .pipe(
                map(
                  (seafreightsState) => {
                    const results = {
                      isoSeaFreights: seafreightsState.isoSeaFreights,
                      totalRows: seafreightsState.totalISORows
                    };
                    return results;
                  }
                )
              )
              .subscribe((results: any) => {
                this.isoSeaFreights = results.isoSeaFreights;
                const totalRows = results.totalRows;

                params.successCallback(results.isoSeaFreights, totalRows);
              });
            break;
        }
      }
    };
    return datasource;
  }

  ngOnDestroy() {
    if (this.gpSubscription) {
      this.gpSubscription.unsubscribe();
    }
    if (this.otSubscription) {
      this.otSubscription.unsubscribe();
    }
    if (this.rcSubscription) {
      this.rcSubscription.unsubscribe();
    }
    if (this.frSubscription) {
      this.frSubscription.unsubscribe();
    }
    if (this.isoSubscription) {
      this.isoSubscription.unsubscribe();
    }
  }
}