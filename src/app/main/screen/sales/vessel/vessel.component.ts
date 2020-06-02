import { Component, OnInit, OnDestroy, ViewChild} from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription, Observable } from 'rxjs';
import * as fromMain from '../../../store/main.reducer';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { CustomHeader } from 'src/app/main/common/ag-grid-header-custom';
import { formatDate } from '@angular/common';
import { Vessel, VesselView } from "../../../model/vessel/vessel.model";
import * as VesselActions from './store/vessel.actions';
import { PartnerView } from 'src/app/main/model/partner/partner';
import { VesselAddComponent } from './vessel-add/vessel-add.component';
import { map } from 'rxjs/operators';
import { GridOptions, IGetRowsParams } from 'ag-grid-community';
import { AgGridAngular } from 'ag-grid-angular';
import { MessageBox, MessageBoxButtons, MessageBoxIcons } from 'src/app/form/message/messsage';

@Component({
  selector: 'app-vessel',
  templateUrl: './vessel.component.html',
  styleUrls: ['./vessel.component.css']
})
export class VesselComponent implements OnInit, OnDestroy {

  @ViewChild('vesselGrid') vesselGrid: AgGridAngular;
  vessels: Vessel[];
  subscription: Subscription;
  columnDefs: any;
  rowData: any;
  rowClassRules: any;
  defaultColDef: any;
  frameworkComponents: any;
  localeText: any;
  public gridOptions: Partial<GridOptions>;
  gridApi: any;
  public cacheOverflowSize;
  public maxConcurrentDatasourceRequests;
  public infiniteInitialRowCount;
  public gridColumnApi;

  isLoading = true;
  
  constructor(
    private modal: NgbModal,
    private store: Store<fromMain.MainState>
  ) {
    this.columnDefs = [
      { headerName: 'Line', field: 'partnerID', width: 150, sortable: true, filter: true },
      { headerName: 'POL', field: 'portofLoading', width: 150, sortable: true, filter: true },
      {
        headerName: 'ETD', field: 'etd', width: 150, cellRenderer: (data) => {
          return data.value != null ? data.value : '';
        }
      },
      { headerName: 'POD', field: 'portofDischarge', width: 150, sortable: true, filter: true },
      {
        headerName: 'ETA', field: 'eta', width: 150, cellRenderer: (data) => {
          return data.value != null ? data.value : '';
        }
      },
      {
        headerName: 'ETD', field: 'etd', width: 150, sortable: true, filter: true, cellRenderer: (data) => {
          return data.value != null ? data.value : '';
        }
      },
      {
        headerName: 'Dest', field: 'routeTransit', width: 150, sortable: true, filter: true, cellRenderer: (data) => {
          return !!data.value ? data.value[0].portofTransit : '';
        }
      },
      {
        headerName: 'ETA', field: 'routeTransit', width: 150, sortable: true, filter: true, cellRenderer: (data) => {
          return !!data.value ? data.value[0].etaToTransitPort : '';
        }
      },
      {
        headerName: 'Vessel Name', field: 'routeTransit', width: 150, sortable: true, filter: true, cellRenderer: (data) => {
          return !!data.value ? data.value[0].vessel : '';
        }
      },
      {
        headerName: 'Voyage No', field: 'routeTransit', width: 150, sortable: true, filter: true, cellRenderer: (data) => {
          return !!data.value ? data.value[0].voyage : '';
        }
      },
      { headerName: 'Notes', field: 'notes', width: 200, filter: true },
      { headerName: 'Activate', field: 'active', width: 100, cellRenderer: (data) => {
          return !!data.value ? 'Yes' : 'No';
        }
      },
      {
        headerName: 'Created Date', field: 'dateCreate', width: 150, cellRenderer: (data) => {
          return data.value != null ? data.value : '';
        }
      },
      {
        headerName: 'Date Modify', field: 'dateModify', width: 150, cellRenderer: (data) => {
          return data.value != null ? data.value : '';
        }
      }
    ];

    this.rowClassRules = {
      'status-lock': function (params) { return params.data.lock === true; },
      'status-warning': function (params) { return params.data.warning === true; }
    };
    this.defaultColDef = {
      width: 120,
      headerComponentParams: { menuIcon: 'fas fa-filter' },
      sortable: true,
      resizable: true,
      filter: true
    };
    this.frameworkComponents = { agColumnHeader: CustomHeader };
  }

  ngOnInit() {
    // this.vessels = this.store.select('vessels');
    // this.subscription = this.store.select('vessels')
    //   .pipe(map(vesselState => vesselState.vessels))
    //   .subscribe(
    //     (vessels : Vessel[]) => {
    //       this.rowData = vessels;
    //     }
    //   );
    this.store.dispatch(new VesselActions.FetchVessels());
      console.log(this.rowData);

      this.isLoading = false;
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    var datasource = {
      getRows: (params: IGetRowsParams) => {
        //  TODO: Call a service that fetches list of users
        console.log("Fetching startRow " + params.startRow + " of " + params.endRow);
        console.log(params);
        // this.test.getUsers(params)
        //   .subscribe(data => { 
        //     console.log(data);
        //     params.successCallback(data['users'], data['totalRecords']) 
        //   });
          this.subscription = this.store
            .select('vessels')
            .pipe(map(vesselsState => vesselsState.vessels))
            .subscribe((vessels: Vessel[]) => {
              this.vessels = vessels;
              console.log(vessels);
              
              params.successCallback(vessels, vessels.length)
            });
      }
    }

    this.gridApi.setDatasource(datasource);
  }

  edit(vessel) {
    let vesselEdit = <VesselView>vessel.data;
    let vesselPass = Object.assign({action: 'EDIT'}, vesselEdit);
    this.openPopup(vesselPass);
  }

  addNew() {
    let addNew = new PartnerView();
    addNew.action = "ADD"
    this.openPopup(addNew);
  }

  openPopup(data) {
    const modalRef = this.modal.open(VesselAddComponent, { windowClass: 'gr-modal-haft', backdrop: 'static', keyboard: false });
    modalRef.componentInstance.partner = data;
    modalRef.result.then((result) => {
      if (result.partnerID != null && result.partnerID !== '') {
        if (result.action === 'DELETE') {
          var res = this.gridApi.updateRowData({ remove: [result] });
        }
        else if (result.action === 'ADD') {
          console.log(result);
          let dataSource = {
            getRows: (params: IGetRowsParams) => {
                this.subscription = this.store
                  .select('vessels')
                  .pipe(map(vesselsState => vesselsState.vessels))
                  .subscribe((vessels: Vessel[]) => {
                    this.vessels = vessels;
                    params.successCallback(vessels, vessels.length)
                  });
            }
          }
          this.gridApi.setDatasource(dataSource);
        }
        else if (result.action === 'EDIT') {
          let dataSource = {
            getRows: (params: IGetRowsParams) => {
                this.subscription = this.store
                  .select('vessels')
                  .pipe(map(vesselsState => vesselsState.vessels))
                  .subscribe((vessels: Vessel[]) => {
                    this.vessels = vessels;
                    params.successCallback(vessels, vessels.length)
                  });
            }
          }
          this.gridApi.setDatasource(dataSource);
        }
      }
    }, (reason) => {
      console.log('reason dismiss', reason);
    });
  }

  onPaginationChanged(event) {
    // console.log(event);
  }

  delete() {
    let selectedRow = this.gridApi.getSelectedRows();
    let rowNodes = this.gridApi.getSelectedNodes();
    // console.log(selectedNodeIndex);
    console.log(rowNodes.length);
    if (rowNodes === undefined || rowNodes.length == 0) {

    } else {
      let selectedNodeIndex = +rowNodes[0].id;
      let dialogResult = MessageBox.show(this.modal, 'Are you sure to delete!', 'Confirm', MessageBoxButtons.yesNo, MessageBoxIcons.question);
      dialogResult.then(async (result) => {
        if (result === 'YES') {
          // delete
          console.log('Delete...');
          console.log(selectedNodeIndex);
          // TODO: send server to delete, the response will check if delete complete.
          this.store.dispatch(new VesselActions.DeleteVessel(selectedNodeIndex))
          // update list
          let dataSource = {
            getRows: (params: IGetRowsParams) => {
                this.subscription = this.store
                  .select('vessels')
                  .pipe(map(vesselsState => vesselsState.vessels))
                  .subscribe((vessels: Vessel[]) => {
                    this.vessels = vessels;                    
                    params.successCallback(vessels, vessels.length)
                  });
            }
          }
          this.gridApi.setDatasource(dataSource);
        } else {

        }
      });
    }
    
  }
  
  
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
