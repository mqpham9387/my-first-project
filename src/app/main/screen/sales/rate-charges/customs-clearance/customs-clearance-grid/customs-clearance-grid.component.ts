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

@Component({
  selector: 'app-customs-clearance-grid',
  templateUrl: './customs-clearance-grid.component.html',
  styleUrls: ['./customs-clearance-grid.component.css']
})

export class CustomsClearanceGridComponent implements OnInit, OnDestroy {

  @ViewChild('fclTariffGrid') fclTariffGrid: AgGridAngular;
  @Input() ccType: any;
  @Input() columnDefs: any;
  @Input() onGridReady: any;

  subscription: Subscription;

  // ======== grid configure ==============
  public gridOptions: Partial<GridOptions>;
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

  isLoading = true;

  constructor(
    private modal: NgbModal,
    private store: Store <fromMain.MainState>
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
    this.gridOptions.paginationPageSize = 15;
  }

  ngOnInit() {
    this.isLoading = false;
  }

  onPaginationChanged(event) {}

  ngOnDestroy() {
  }
}
