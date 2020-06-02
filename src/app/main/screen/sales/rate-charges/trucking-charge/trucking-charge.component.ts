import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import * as fromMain from 'src/app/main/store/main.reducer';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { formatDate } from '@angular/common';
import { map } from 'rxjs/operators';
import { AgGridAngular } from 'ag-grid-angular';
import { IGetRowsParams } from 'ag-grid-community';
import { AppSettings } from 'src/app/main/shared/app-settings';
import { MessageBox, MessageBoxButtons, MessageBoxIcons } from 'src/app/form/message/messsage';
import { TruckingChargeFilterModel } from 'src/app/main/model/search/filter-model';
import * as TruckingChargeActions from '../store/trucking-charge/trucking-charge.actions';
import { TruckingCharge } from 'src/app/main/model/rate-charges/trucking-charge/trucking-charge.model';
import { ActionsColumnRenderComponent } from 'src/app/main/shared/actions-column-render/actions-column-render.component';
import { AdvanceSearchComponent } from 'src/app/main/shared/advance-search/advance-search.component';
import { TruckingChargeAddComponent } from './trucking-charge-add/trucking-charge-add.component';
import { AirTariffActionRenderComponent } from 'src/app/main/shared/actions-column-render/air-tariff-action-render.component';

@Component({
  selector: 'app-trucking-charge',
  templateUrl: './trucking-charge.component.html',
  styleUrls: ['./trucking-charge.component.css'],
})

export class TruckingChargeComponent implements OnInit, OnDestroy {

  @ViewChild('truckingGrid') truckingGrid: AgGridAngular;

  truckingCharges: TruckingCharge[];

  subscription: Subscription;

  // ======== grid configure ==============
  public gridApi: any;
  public gridColumnApi: any;

  fromDate = formatDate(new Date(), 'yyyy-MM-dd', 'en-US');
  toDate: string;
  dateTimeLimit: string = formatDate(new Date('2050'), 'dd/MM/yyy', 'en-US');
  criterions = AppSettings.RcTruckingCriterions;
  selectedCri;
  criterionValue;
  searchData = AppSettings.RCTruckingSearch;
  isLoading = true;

  public columnTruckDefs = [
    { headerName: 'ID', field: 'pricingID', width: 100, sortable: false, filter: false },
    {
      headerName: 'Pickup',
      width: 100,
      sortable: false,
      filter: false,
      headerComponentParams: {
        template: '<div class="ag-cell-label-container" role="presentation">' +
          '<span ref="eText" class="ag-header-cell-text" role="columnheader"></span>' +
          '</div>'
      },
      // custom header component
      // headerGroupComponent: MyHeaderGroupComponent,
      children: [{
          headerName: 'City/Province',
          field: 'pickupCity',
          width: 150,
          sortable: false,
          filter: false,
          cellRenderer: (data) => {
            if (typeof(data.value) !== 'string' && data.value !== undefined && data.value != null) {
              return data.value.cityName
            }
            return data.value != null ? data.value : '';
          }
        },
        {
          headerName: 'Area',
          field: 'pickupArea',
          width: 150,
          sortable: false,
          filter: false,
          cellRenderer: (data) => {
            if (typeof(data.value) !== 'string' && data.value !== undefined && data.value != null) {
              return data.value.areaName
            }
            return data.value != null ? data.value : '';
          }
        }
      ]
    },
    {
      headerName: 'Delivery',
      // custom header component
      // headerGroupComponent: MyHeaderGroupComponent,
      children: [{
          headerName: 'City/Province',
          field: 'deliveryCity',
          width: 150,
          sortable: false,
          filter: false,
          cellRenderer: (data) => {
            if (typeof(data.value) !== 'string' && data.value !== undefined && data.value != null) {
              return data.value.cityName
            }
            return data.value != null ? data.value : '';
          }
        },
        {
          headerName: 'Area',
          field: 'deliveryArea',
          width: 150,
          sortable: false,
          filter: false,
          cellRenderer: (data) => {
            if (typeof(data.value) !== 'string' && data.value !== undefined && data.value != null) {
              return data.value.areaName
            }
            return data.value != null ? data.value : '';
          }
        }
      ]
    },
    { headerName: "20' truck", field: 'truck20', width: 100,
      sortable: false, filter: false, cellStyle: { 'text-align': "right" } },
    { headerName: "40' truck", field: 'truck40', width: 100,
      sortable: false, filter: false, cellStyle: { 'text-align': "right" } },
    { headerName: '500kgs Truck', field: 'truck500kgs', width: 100,
      sortable: false, filter: false, cellStyle: { 'text-align': "right" } },
    { headerName: '1-ton truck', field: 'truckTonLevel1', width: 150,
      sortable: false, filter: false, cellStyle: { 'text-align': "right" } },
    { headerName: '1.5-ton truck', field: 'truckTonLevel2', width: 150,
      sortable: false, filter: false, cellStyle: { 'text-align': "right" } },
    { headerName: '2-ton truck', field: 'truckTonLevel3', width: 150,
      sortable: false, filter: false, cellStyle: { 'text-align': "right" } },
    { headerName: '2.5-ton truck', field: 'truckTonLevel4', width: 150,
      sortable: false, filter: false, cellStyle: { 'text-align': "right" } },
    { headerName: '3.5-ton truck', field: 'truckTonLevel5', width: 150,
      sortable: false, filter: false, cellStyle: { 'text-align': "right" } },
    { headerName: '5-ton truck', field: 'truckTonLevel6', width: 150,
      sortable: false, filter: false, cellStyle: { 'text-align': "right" } },
    { headerName: '6.5-ton truck', field: 'truckTonLevel7', width: 150,
      sortable: false, filter: false, cellStyle: { 'text-align': "right" } },
    { headerName: '8-ton truck', field: 'truckTonLevel8', width: 150,
      sortable: false, filter: false, cellStyle: { 'text-align': "right" } },
    { headerName: '9.5-ton truck', field: 'truckTonLevel9', width: 150,
      sortable: false, filter: false, cellStyle: { 'text-align': "right" } },
    { headerName: '11-ton truck', field: 'truckTonLevel10', width: 150,
      sortable: false, filter: false, cellStyle: { 'text-align': "right" } },
    { headerName: '13-ton truck', field: 'truckTonLevel11', width: 150,
      sortable: false, filter: false, cellStyle: { 'text-align': "right" } },
    { headerName: '15-ton truck', field: 'truckTonLevel12', width: 150,
      sortable: false, filter: false, cellStyle: { 'text-align': "right" } },
    { headerName: '16.5-ton truck', field: 'truckTonLevel13', width: 150,
      sortable: false, filter: false, cellStyle: { 'text-align': "right" } },
    { headerName: '18-ton truck', field: 'truckTonLevel14', width: 150,
      sortable: false, filter: false, cellStyle: { 'text-align': "right" } },
    { headerName: '20-ton truck', field: 'truckTonLevel15', width: 150,
      sortable: false, filter: false, cellStyle: { 'text-align': "right" } },
    { headerName: '22-ton truck', field: 'truckTonLevel16', width: 150,
      sortable: false, filter: false, cellStyle: { 'text-align': "right" } },
    { headerName: 'Notes', field: 'notes', width: 200, sortable: false, filter: false },
    { headerName: 'Free detention time (hours)', field: 'freeDetentionTime', width: 200,
      sortable: false, filter: false, cellStyle: { 'text-align': "right" } },
    { headerName: 'Free detention time (hours)', field: 'freeDetentionTime', width: 200,
      sortable: false, filter: false, cellStyle: { 'text-align': "right" } },
    { headerName: 'Detention charge (per truck per day)', field: 'detentionCharge', width: 200,
      sortable: false, filter: false, cellStyle: { 'text-align': "right" } },
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
        editClick: this.editTruck.bind(this),
        label: 'Edit',
        deleteClick: this.deleteTruck.bind(this),
      },
    }
  ];

  constructor(
    private modal: NgbModal,
    private store: Store < fromMain.MainState >
  ) {}

  ngOnInit() {
    this.isLoading = false;
  }

  // General Purpose
  onGridTruckReady = (params: any) => {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    const datasource = {
      // tslint:disable-next-line: no-shadowed-variable
      getRows: (params: IGetRowsParams) => {
        this.store.dispatch(new TruckingChargeActions.FetchTruckingCharges(params));
        this.subscription = this.store
          .select('truckingCharges')
          .pipe(
            map(
              (truckingChargesState) => {
                let results = { truckingCharges: truckingChargesState.truckingCharges, totalRows: truckingChargesState.totalRows };
                return results;
              }
            )
          )
          .subscribe((results: any) => {
            this.truckingCharges = results.truckingCharges;
            const totalRows = results.totalRows;
            params.successCallback(results.truckingCharges, totalRows);
          });
      }
    };

    this.gridApi.setDatasource(datasource);
  }

  addNewTruck() {
    console.log('new truck');
    const addNew = new TruckingCharge();
    const modalRef = this.modal.open(TruckingChargeAddComponent, { size: 'xl', backdrop: 'static', keyboard: true });

    modalRef.componentInstance.action = 'ADD_TRUCK';
    modalRef.componentInstance.isEdit = false;
    modalRef.componentInstance.truckData = addNew;
    modalRef.result.then((result) => {}, (reason) => {
      console.log('reason dismiss', reason);
    });
  }

  editTruck(event: any) {
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
      TruckingChargeAddComponent, { size: 'xl', backdrop: 'static', keyboard: true }
    );

    modalRef.componentInstance.action = 'EDIT_TRUCK';
    modalRef.componentInstance.isEdit = true;
    modalRef.componentInstance.editTruckData = selectedRow;
    modalRef.componentInstance.selectedIndex = selectedNodeIndex;
  }

  deleteTruck(event: any) {
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

    if (selectedRow !== undefined || selectedRow !== null) {
      const dialogResult = MessageBox.show(
        this.modal,
        'Are you sure to delete!',
        'Confirm', MessageBoxButtons.yesNo, MessageBoxIcons.question
      );
      dialogResult.then(async (result) => {
        if (result === 'YES') {
          this.store.dispatch(
            new TruckingChargeActions.DeleteTruckingCharge(
              { index: selectedNodeIndex, selectedTruck: selectedRow }
            )
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

  getListTrucking() {
    const filterParams = this.getParams();
    const dataSource = this.getDataSource(filterParams);
    this.gridApi.setDatasource(dataSource);
  }

  addQuotaionClick() {
    console.log('add a quotation');
  }

  onPaginationChanged(event) {}

  private getParams(): TruckingChargeFilterModel {
    const filterModel: TruckingChargeFilterModel = {
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

    return filterModel;
  }

  protected getDataSource(filterParams: any) {
    const datasource = {
      getRows: (params: IGetRowsParams) => {
        console.log('Fetching startRow ' + params.startRow + ' of ' + params.endRow);
        console.log(params);
        params.filterModel = filterParams;

        this.store.dispatch(new TruckingChargeActions.FetchTruckingCharges(params));
        this.subscription = this.store
          .select('truckingCharges')
          .pipe(
            map((truckingChargesState) => {
              const results = {
                truckingCharges: truckingChargesState.truckingCharges,
                totalRows: truckingChargesState.totalRows,
              };
              return results;
            })
          )
          .subscribe((results: any) => {
            this.truckingCharges = results.truckingCharges;
            params.successCallback(results.truckingCharges, results.totalRows);
          });
      }
    };
    return datasource;
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}