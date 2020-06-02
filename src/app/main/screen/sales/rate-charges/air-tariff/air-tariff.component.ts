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
import { RateAndChargesAir } from 'src/app/main/model/rate-charges/rate-and-charges-air.model';
import * as AirFreightActions from '../store/air-freight/air-freight.actions';
import { FilterModel } from 'src/app/main/model/search/filter-model';
import { AirFreightAddComponent } from '../air-freight-add/air-freight-add.component';
import { AdvanceSearchComponent } from 'src/app/main/shared/advance-search/advance-search.component';
import { ActionsColumnRenderComponent } from 'src/app/main/shared/actions-column-render/actions-column-render.component';
import { AirTariffActionRenderComponent } from 'src/app/main/shared/actions-column-render/air-tariff-action-render.component';

@Component({
  selector: 'app-air-tariff',
  templateUrl: './air-tariff.component.html',
  styleUrls: ['./air-tariff.component.css'],
})

export class AirTariffComponent implements OnInit, OnDestroy {
  @Input() data: any;
  @ViewChild('airFreightGrid') airFreightGrid: AgGridAngular;

  airFreights: RateAndChargesAir[];
  subscription: Subscription;

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

  isLoading = true;
  partners: any;

  fromDate = formatDate(new Date(), 'yyyy-MM-dd', 'en-US');
  toDate: string;
  dateTimeLimit: string = formatDate(new Date('2050'), 'dd/MM/yyy', 'en-US');
  criterions = AppSettings.RcAirCriterions;
  searchData = AppSettings.RCAirSearch;
  selectedCri: any;
  criterionValue: any;

  constructor(
    private modal: NgbModal,
    private store: Store < fromMain.MainState > ,
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
      { headerName: 'ID', field: 'pricingID', width: 120, sortable: false, filter: false },
      { headerName: 'Origin', field: 'origin', width: 120, sortable: false, filter: false },
      { headerName: 'Destination', field: 'destination', width: 150, sortable: false, filter: false },
      { headerName: 'Carrier', field: 'carrierID.partnerNameAbbr', width: 220, sortable: false, filter: false,
        cellRenderer: (data) => {
          return data.value != null ? data.value : '';
        }
      },
      { headerName: 'Curr.', field: 'currency.currencyID', width: 100, sortable: false, filter: false },
      { headerName: 'Min (Qty)', field: 'min', width: 100, sortable: false, filter: false, cellStyle: { 'text-align': "right" } },
      { headerName: '-45(KG)', field: 'level1', width: 100, sortable: false, filter: false, cellStyle: { 'text-align': "right" } },
      { headerName: '+45(KG)', field: 'level2', width: 100, sortable: false, filter: false, cellStyle: { 'text-align': "right" } },
      { headerName: '+100(KG)', field: 'level3', width: 100, sortable: false, filter: false, cellStyle: { 'text-align': "right" } },
      { headerName: '+300(KG)', field: 'level4', width: 100, sortable: false, filter: false, cellStyle: { 'text-align': "right" } },
      { headerName: '+500(KG)', field: 'level5', width: 100, sortable: false, filter: false, cellStyle: { 'text-align': "right" } },
      { headerName: '+1000(KG)', field: 'level6', width: 100, sortable: false, filter: false, cellStyle: { 'text-align': "right" } },
      { headerName: 'FSC', field: 'fsc', width: 100, sortable: false, filter: false, cellStyle: { 'text-align': "right" } },
      { headerName: 'SSC', field: 'ssc', width: 100, sortable: false, filter: false, cellStyle: { 'text-align': "right" } },
      { headerName: 'AWB fee', field: 'awbSET', width: 100, sortable: false, filter: false, cellStyle: { 'text-align': "right" } },
      { headerName: 'AMS', field: 'amsHBL', width: 100, sortable: false, filter: false, cellStyle: { 'text-align': "right" } },
      { headerName: 'Other charges', field: 'otherCharges', width: 100, sortable: false, filter: false,
        cellRenderer: (data) => {
          return data.value != null ? data.value : '';
        }
      },
      {
        headerName: 'T/T (Transit Time)',
        field: 'transitTime',
        width: 100,
        sortable: false,
        filter: false,
        cellRenderer: (data) => {
          return data.value != null ? data.value : '';
        },
        cellStyle: { 'text-align': "right" }
      },
      { headerName: 'Freq.', field: 'frequency', width: 100, sortable: false, filter: false,
        cellRenderer: (data) => {
          return data.value != null ? data.value : '';
        },
        cellStyle: { 'text-align': "right" }
      },
      { headerName: 'Cut off', field: 'cutOff', width: 150, sortable: false, filter: false },
      { headerName: 'Routing', field: 'routing', width: 100, sortable: false, filter: false,
        cellRenderer: (data) => {
          return data.value != null ? data.value : '';
        }
      },
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
      { headerName: 'Updated by', field: 'updatedBy', width: 150, sortable: false, filter: false }, // creator
      { headerName: 'Notes', field: 'notes', width: 300, filter: false },
      {
        headerName: 'Action',
        width: 240,
        cellRendererFramework: AirTariffActionRenderComponent,
        editable: false,
        sortable: false,
        filter: false,
        resizable: false,
        pinned: 'right',
        isQuot: false,
        isCopy: false,
        cellRendererParams: {
          addQuotaionClick: this.addQuotaionClick.bind(this),
          isDelete: true,
          isEdit: true,
          editClick: this.editAir.bind(this),
          label: 'Edit',
          deleteClick: this.deleteAir.bind(this),
          bookClick: this.bookClick.bind(this),
        },
      }
    ];
  }

  ngOnInit() {
    this.isLoading = false;
  }

  onGridReadyAir(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    const datasource = {
      getRows: (params: IGetRowsParams) => {
        //  TODO: Call a service that fetches list of users
        console.log('Fetching startRow ' + params.startRow + ' of ' + params.endRow);
        console.log(params);

        this.store.dispatch(new AirFreightActions.FetchAirFreights(params));
        this.subscription = this.store
          .select('airfreights')
          .pipe(
            map(
              (airfreightsState) => {
                const results = { airFreights: airfreightsState.airFreights, totalRows: airfreightsState.totalRows };
                return results;
              }
            )
          )
          .subscribe((results: any) => {
            this.airFreights = results.airFreights;
            const totalRows = results.totalRows;
            console.log(results.airFreights);

            params.successCallback(results.airFreights, totalRows);
          });
      }
    }

    this.gridApi.setDatasource(datasource);
  }

  addNewAir() {
    let addNew = new RateAndChargesAir();
    const modalRef = this.modal.open(AirFreightAddComponent, { windowClass: 'gr-modal-air', backdrop: 'static', keyboard: false })
    modalRef.componentInstance.action = 'ADD';
    modalRef.componentInstance.data = addNew
    modalRef.result.then((result) => {
      console.log(result);
    }, (reason) => {
      console.log('reason dismiss', reason);
    })
  }

  editAir(event ?: any) {
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

    // let rowIndex = event.rowIndex;
    const modalRef = this.modal.open(
      AirFreightAddComponent, { windowClass: 'gr-modal-air', backdrop: 'static', keyboard: false }
    );

    modalRef.componentInstance.action = 'EDIT';
    modalRef.componentInstance.data = selectedRow;
    modalRef.componentInstance.selectedAirIndex = selectedNodeIndex;

    modalRef.result.then((result) => {
      // this.rowDataCont.push(result);
      // let row = this.rowDataCont;
      let dataSource = {
        getRows: (params: IGetRowsParams) => {
          console.log('Fetching startRow ' + params.startRow + ' of ' + params.endRow);
          console.log(params);
          this.subscription = this.store
            .select('airfreights')
            .pipe(map(airfreightsState => airfreightsState.airFreights))
            .subscribe((airFreights: RateAndChargesAir[]) => {
              this.airFreights = airFreights;
              params.successCallback(airFreights, airFreights.length);
            });
        }
      };
      this.gridApi.setDatasource(dataSource);
    }, (reason) => {
      console.log('reason dismiss', reason);
    });
  }

  deleteAir(event ?: any) {
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
        'Confirm', MessageBoxButtons.yesNo, MessageBoxIcons.question
      );
      dialogResult.then(async (result) => {
        if (result === 'YES') {
          this.store.dispatch(new AirFreightActions.DeleteAirFreight({ index: selectedNodeIndex, selectedAir: selectedRow }));
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
    let filterModel: FilterModel = {
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
          filter: this.searchData[index].type === 'datetime' ?
                      formatDate(this.searchData[index].value, 'dd/MM/yyy', 'en-US') :
                      this.searchData[index].value
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
        params.filterModel = filterModel;
        this.store.dispatch(new AirFreightActions.FetchAirFreights(params));
        this.subscription = this.store
          .select('airfreights')
          .pipe(
            map((airFreightState) => {
              const results = {
                airFreights: airFreightState.airFreights,
                totalRows: airFreightState.totalRows,
              };
              return results;
            })
          )
          .subscribe((results: any) => {
            this.airFreights = results.airFreights;
            const totalRows = results.totalRows;
            console.log(results.airFreights);

            params.successCallback(results.airFreights, totalRows);
          });
      },
    };

    this.gridApi.setDatasource(datasource);
  }

  addQuotaionClick() {
    console.log('add quotation from Air tariff.');
  }

  bookClick()  {

  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
