import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import * as fromMain from 'src/app/main/store/main.reducer';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { formatDate } from '@angular/common';
import { map } from 'rxjs/operators';
import { GridOptions, IGetRowsParams } from 'ag-grid-community';
import { AppSettings } from 'src/app/main/shared/app-settings';
import { MessageBox, MessageBoxButtons, MessageBoxIcons } from 'src/app/form/message/messsage';
import { PartnerService } from 'src/app/main/model/partner/partner.service';
import { RcFclFilterModel, RcCustomsClearanceFilterModel } from 'src/app/main/model/search/filter-model';
import { ActionsColumnRenderComponent } from 'src/app/main/shared/actions-column-render/actions-column-render.component';
import { AdvanceSearchComponent } from 'src/app/main/shared/advance-search/advance-search.component';
import { RateAndChargesCustomsCleanrance } from 'src/app/main/model/rate-charges/customs-cleanrance/customs-cleanrance.model';
import * as CustomsCleanranceActions from '../store/customs-clearance/customs-clearance.actions';
import { CustomsClearanceAddComponent } from './add/customs-clearance-add.component';
import { CustomsClearanceEditComponent } from './edit/customs-clearance-edit.component';
import { AirTariffActionRenderComponent } from 'src/app/main/shared/actions-column-render/air-tariff-action-render.component';

@Component({
  selector: 'app-customs-clearance',
  templateUrl: './customs-clearance.component.html',
  styleUrls: ['./customs-clearance.component.css']
})

export class CustomsClearanceComponent implements OnInit, OnDestroy {
  @Input() data: any;

  exportClearanceSubs: Subscription;
  importClearanceSubs: Subscription;
  auxiliarySubs: Subscription;

  isLoading = true;
  partners: any;

  fromDate = formatDate(new Date(), 'yyyy-MM-dd', 'en-US');
  toDate: string;
  dateTimeLimit: string = formatDate(new Date('2050'), 'dd/MM/yyy', 'en-US');

  // define search
  criterions = AppSettings.RcCustomsClearanceCriterions;
  selectedCri: any;
  criterionValue: any;
  searchData = AppSettings.RcCustomsClearance;

  // Export and import Customs Clearance
  columnExImDefs = [
    { headerName: 'ID', field: 'pricingID', width: 100, sortable: false, filter: false },
    { headerName: 'Terminal', field: 'terminal', width: 100, sortable: false, filter: false },
    { headerName: 'Carrier', field: 'carrier.partnerID', width: 220, sortable: false, filter: false },
    { headerName: 'Purpose of export', field: 'purposeOfImEx', width: 200, sortable: false, filter: false },
    { headerName: 'Channel', field: 'channel', width: 100, sortable: false, filter: false },
    { headerName: 'Curr.', field: 'currency.currencyID', width: 150, sortable: false, filter: false },
    {
      headerName: '20\'', field: 'container20', width: 150, sortable: false, filter: false,
      cellStyle: { 'text-align': "right" }
    },
    { headerName: '40\'', field: 'container40', width: 150, sortable: false, filter: false,
      cellStyle: { 'text-align': "right" }
    },
    { headerName: 'LCL', field: 'lcl', width: 150, sortable: false, filter: false },
    { headerName: 'Air', field: 'air', width: 150, sortable: false, filter: false },
    { headerName: 'Notes', field: 'notes', width: 200, sortable: false, filter: false },
    { headerName: 'Excluded commodity', field: 'excludedCommodity', width: 150, sortable: false, filter: false },
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
    { headerName: 'Updated By', field: 'updatedBy', width: 150, sortable: false, filter: false },
    {
      headerName: 'Action',
      width: 250,
      cellRendererFramework: AirTariffActionRenderComponent,
      editable: false,
      sortable: false,
      filter: false,
      resizable: false,
      pinned: 'right',
      cellRendererParams: {
        addQuotaionClick: this.addQuotaionClick.bind(this),
        editClick: this.editCustomsClearance.bind(this),
        label: 'Edit',
        deleteClick: this.deleteCc.bind(this),
        isBook: true,
        bookClick: this.bookClick.bind(this)
      },
    }
  ];

  // Auxiliary Services
  columnAuxDefs = [
    { headerName: 'ID', field: 'pricingID', width: 100, sortable: false, filter: false },
    { headerName: 'Office', field: 'companyID.companyName', width: 300, sortable: false, filter: false },
    { headerName: 'Service', field: 'service', width: 100, sortable: false, filter: false },
    { headerName: 'Curr.', field: 'currency.currencyID', width: 150, sortable: false, filter: false },
    { headerName: 'Fee', field: 'fee.feeNameEnglish', width: 100, sortable: false, filter: false },
    { headerName: 'Unit', field: 'unit.unitID', width: 150, sortable: false, filter: false },
    { headerName: 'Notes', field: 'notes', width: 200, sortable: false, filter: false },
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
    { headerName: 'Updated By', field: 'updatedBy', width: 150, sortable: false, filter: false },
    {
      headerName: 'Action',
      width: 250,
      cellRendererFramework: AirTariffActionRenderComponent,
      editable: false,
      sortable: false,
      filter: false,
      resizable: false,
      pinned: 'right',
      cellRendererParams: {
        addQuotaionClick: this.addQuotaionClick.bind(this),
        editClick: this.editCustomsClearance.bind(this),
        label: 'Edit',
        deleteClick: this.deleteCc.bind(this),
        isBook: true,
        bookClick: this.bookClick.bind(this)
      },
    }
  ];

  // Export custom Clearance
  ecGridApi: any;
  ecGridColumnApi: any;
  exportClearances: RateAndChargesCustomsCleanrance[];

  // Import custom Clearance
  icGridApi: any;
  icGridColumnApi: any;
  importClearances: RateAndChargesCustomsCleanrance[];

  // Auxiliary
  auxGridApi: any;
  auxGridColumnApi: any;
  auxiliaries: RateAndChargesCustomsCleanrance[];

  constructor(
    private modal: NgbModal,
    private store: Store<fromMain.MainState>
  ) { }

  ngOnInit() {
    this.isLoading = false;
  }

  // list export custom clearance
  onGridEcReady = (params: any) => {
    this.ecGridApi = params.api;
    this.ecGridColumnApi = params.columnApi;

    const datasource = {
      getRows: (params: IGetRowsParams) => {
        params.filterModel = { type: { filterType: 'text', type: 'equals', filter: 'Export' } };
        this.store.dispatch(new CustomsCleanranceActions.FetchExportCleanrances(params));
        this.exportClearanceSubs = this.store
          .select('cCleanrances')
          .pipe(
            map(
              (cleanranceState) => {
                const results = { exportClearances: cleanranceState.exportClearances, totalEcRows: cleanranceState.totalEcRows };
                console.log(results);

                return results;
              }
            )
          )
          .subscribe((results: any) => {
            this.exportClearances = results.exportClearances;
            params.successCallback(results.exportClearances, results.totalEcRows);
          });
      }
    };

    this.ecGridApi.setDatasource(datasource);
  }

  // Import custom cleanrance
  onGridIcReady = (params: any) => {
    this.icGridApi = params.api;
    this.icGridColumnApi = params.columnApi;
    const datasource = {
      getRows: (params: IGetRowsParams) => {
        params.filterModel = { type: { filterType: 'text', type: 'equals', filter: 'Import' } };
        this.store.dispatch(new CustomsCleanranceActions.FetchImportCleanrances(params));
        this.importClearanceSubs = this.store
          .select('cCleanrances')
          .pipe(
            map(
              (cleanranceState) => {
                const results = { importClearances: cleanranceState.importClearances, totalIcRows: cleanranceState.totalIcRows };
                return results;
              }
            )
          )
          .subscribe((results: any) => {
            this.importClearances = results.importClearances;
            console.log(results.rcSeaFreights);

            params.successCallback(results.importClearances, results.totalIcRows);
          });
      }
    };

    this.icGridApi.setDatasource(datasource);
  }

  // Aux
  onGridAuxReady = (params: any) => {
    this.auxGridApi = params.api;
    this.auxGridColumnApi = params.columnApi;
    const datasource = {
      getRows: (params: IGetRowsParams) => {
        console.log('Fetching startRow ' + params.startRow + ' of ' + params.endRow);
        params.filterModel = { type: { filterType: 'text', type: 'equals', filter: 'Auxiliary Services' } };
        console.log(params);
        // params.filterModel = { containerType: { filterType: 'text', type: 'equals', filter: 'OT' } };
        this.store.dispatch(new CustomsCleanranceActions.FetchAuxCleanrances(params));
        this.auxiliarySubs = this.store
          .select('cCleanrances')
          .pipe(
            map(
              (cleanranceState) => {
                return { auxiliaries: cleanranceState.auxiliaries, totalAuxRows: cleanranceState.totalAuxRows };
              }
            )
          )
          .subscribe((results: { auxiliaries: any, totalAuxRows: number}) => {
            this.auxiliaries = results.auxiliaries;
            console.log(results.auxiliaries);
            params.successCallback(results.auxiliaries, results.totalAuxRows);
          });
      }
    };

    this.auxGridApi.setDatasource(datasource);
  }

  addNewFcl() {
    const modalRef = this.modal.open(CustomsClearanceAddComponent, { size: 'xl', backdrop: 'static', keyboard: true });

    modalRef.componentInstance.action = 'ADD_NEW_CUSTOMS_CLEANRANCE';
    modalRef.result.then((result) => {}, (reason) => {
      console.log('reason dismiss', reason);
    });
  }

  editCustomsClearance(event: any) {
    let selectedRow: any;
    let selectedNodeIndex: any;
    if (event.hasOwnProperty('params')) {
      selectedRow = event.params.data;
      selectedNodeIndex = event.params.rowIndex;
    }
    console.log(selectedNodeIndex);
    console.log(selectedRow);
    const modalRef = this.modal.open(
      CustomsClearanceEditComponent, { size: 'xl', backdrop: 'static', keyboard: true }
    );

    modalRef.componentInstance.action = 'EDIT';
    modalRef.componentInstance.customsClearanceData = selectedRow;
    modalRef.componentInstance.selectedIndex = selectedNodeIndex;
  }

  deleteCc(event: any) {
    let selectedRow: any;
    let selectedNodeIndex: any;

    if (event.hasOwnProperty('params')) {
      selectedRow = event.params.data;
      selectedNodeIndex = event.params.rowIndex;
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
            new CustomsCleanranceActions.DeleteCustomsCleanrance({
              index: selectedNodeIndex, selectedCleanrance: selectedRow
            })
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

  bookClick() {
    MessageBox.show(
      this.modal,
      'Comming soon!',
      'Notification',
      MessageBoxButtons.ok,
      MessageBoxIcons.information
    );
  }


  searchAdvance() {
    const modalRef = this.modal.open(AdvanceSearchComponent, {
      windowClass: 'gr-modal-advance',
      backdrop: 'static',
      keyboard: false,
    });
    console.log(this.searchData);

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
    console.log(item);
    const key = +item.key;
    const searchItem = item.value;
    if (searchItem.isCheck) {
      this.searchData[key].isCheck = false;
      this.searchData[key].value = null;
    }
  }

  getListCustomsClearances() {

    const importFilterParams = this.getParamsByType('Import');
    const importDataSource = this.getDataSource(importFilterParams, 'Import');
    const exportFilterParams = this.getParamsByType('Export');
    const exportDataSource = this.getDataSource(exportFilterParams, 'Export');
    const auxFilterParams = this.getParamsByType('Auxiliary Services');
    const auxDataSource = this.getDataSource(auxFilterParams, 'Auxiliary Services');

    this.icGridApi.setDatasource(importDataSource);
    this.ecGridApi.setDatasource(exportDataSource);
    this.auxGridApi.setDatasource(auxDataSource);
  }

  addQuotaionClick() {
    MessageBox.show(
      this.modal,
      'Comming soon!',
      'Notification',
      MessageBoxButtons.ok,
      MessageBoxIcons.information
    );
  }

  private getParamsByType(type: string): RcCustomsClearanceFilterModel {
    const filterModel: RcCustomsClearanceFilterModel = {
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
        if (this.searchData[index].type === 'datetime' && this.searchData[index].columnName === 'dateCreate') {
          filterModel[this.searchData[index].columnName] = {
            filterType: 'date',
            type: 'inRange',
            dateTo: this.searchData[index].value ? formatDate(this.searchData[index].value, 'dd/MM/yyy', 'en-US') : null,
            dateFrom: this.searchData[index].value ? formatDate(this.searchData[index].value, 'dd/MM/yyy', 'en-US') : null
          };
        }
        if (this.searchData[index].type === 'datetime' && this.searchData[index].columnName === 'dateModify') {
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
      case 'Import':
        filterModel.type = { filterType: 'text', type: 'equals', filter: 'Import' };
        break;
      case 'Export':
        filterModel.type = { filterType: 'text', type: 'equals', filter: 'Export' };
        break;
      case 'Auxiliary Services':
        filterModel.type = { filterType: 'text', type: 'equals', filter: 'Auxiliary Services' };
        break;
    }
    return filterModel;
  }

  protected getDataSource(filterParams: any, type: string) {
    const datasource = {
      getRows: (params: IGetRowsParams) => {
        console.log('Fetching startRow ' + params.startRow + ' of ' + params.endRow);
        console.log(params);
        params.filterModel = filterParams;

        switch (type) {
          case 'Import':
            this.store.dispatch(new CustomsCleanranceActions.FetchImportCleanrances(params));
            this.importClearanceSubs = this.store
              .select('cCleanrances')
              .pipe(
                map((cleanranceState) => {
                  const results = {
                    importClearances: cleanranceState.importClearances,
                    totalIcRows: cleanranceState.totalIcRows,
                  };
                  return results;
                })
              )
              .subscribe((results: any) => {
                this.importClearances = results.importClearances;
                const totalRows = results.totalIcRows;
                console.log(results.importClearances);

                params.successCallback(results.importClearances, totalRows);
              });
            break;
          case 'Export':
            // Refridgerated Container
            this.store.dispatch(new CustomsCleanranceActions.FetchExportCleanrances(params));
            this.exportClearanceSubs = this.store
              .select('cCleanrances')
              .pipe(
                map(
                  (cleanranceState) => {
                    const results = { exportClearances: cleanranceState.exportClearances, totalEcRows: cleanranceState.totalEcRows };
                    return results;
                  }
                )
              )
              .subscribe((results: any) => {
                this.exportClearances = results.exportClearances;
                const totalRows = results.totalEcRows;
                console.log(results.exportClearances);

                params.successCallback(results.exportClearances, totalRows);
              });
            break;
          case 'Auxiliary Services':
            // Open Top Container
            this.store.dispatch(new CustomsCleanranceActions.FetchAuxCleanrances(params));
            this.auxiliarySubs = this.store
              .select('cCleanrances')
              .pipe(
                map(
                  (cleanranceState) => {
                    const results = { auxiliaries: cleanranceState.auxiliaries, totalAuxRows: cleanranceState.totalAuxRows };
                    return results;
                  }
                )
              )
              .subscribe((results: any) => {
                this.auxiliaries = results.auxiliaries;
                const totalRows = results.totalAuxRows;
                console.log(results.auxiliaries);
                params.successCallback(results.auxiliaries, totalRows);
              });
            break;
        }
      }
    };
    return datasource;
  }

  onPaginationChanged(event) {}

  ngOnDestroy() {
    if (this.exportClearanceSubs) {
      this.exportClearanceSubs.unsubscribe();
    }

    if (this.importClearanceSubs) {
      this.importClearanceSubs.unsubscribe();
    }

    if (this.auxiliarySubs) {
      this.auxiliarySubs.unsubscribe();
    }
  }
}
