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
import { RateAndChargesSea } from 'src/app/main/model/rate-charges/rate-and-charges-sea.model';
import * as SeaFreightActions from '../../store/sea-freight/sea-freight.actions';
import { ActionsColumnRenderComponent } from 'src/app/main/shared/actions-column-render/actions-column-render.component';

@Component({
  selector: 'app-trucking-charge-grid',
  templateUrl: './trucking-charge-grid.component.html',
  styleUrls: ['./trucking-charge-grid.component.css'],
})

export class TruckingChargeGridComponent implements OnInit, OnDestroy {

  @ViewChild('truckingChargeGrid') truckingChargeGrid: AgGridAngular;
  @Input() columnDefs: any;
  @Input() onGridReady: any;

  // ======== grid configure ==============
  public gridOptions: Partial <GridOptions>;
  public gridApi: any;
  public gridColumnApi: any;
  // public columnDefs: any;
  public cacheOverflowSize: any;
  public maxConcurrentDatasourceRequests: any;
  public infiniteInitialRowCount: any;
  rowData: any;
  rowClassRules: any;
  defaultColDef: any;
  frameworkComponents: any;
  columnSeaDefs: any;

  isLoading = true;

  constructor() {
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
    this.gridOptions.paginationPageSize = 15;
    // this.columnDefs = this.fclColumns;

  }

  ngOnInit() {
    this.isLoading = false;
  }

  onPaginationChanged(event) {}

  ngOnDestroy() {
  }
}
