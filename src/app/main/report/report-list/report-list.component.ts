import { Component, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { AppSettings } from '../../shared/app-settings';
import { GridOptions, IGetRowsParams } from 'ag-grid-community';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { formatDate } from '@angular/common';
import * as fromMain from 'src/app/main/store/main.reducer';
import { AgGridAngular } from 'ag-grid-angular';
import * as ReportActions from '../store/report.actions';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { MessageBox, MessageBoxButtons, MessageBoxIcons } from 'src/app/form/message/messsage';
import { CustomHeader } from '../../common/ag-grid-header-custom';

@Component({
  selector: 'app-report-list',
  templateUrl: './report-list.component.html',
  styleUrls: ['./report-list.component.css']
})
export class ReportListComponent implements OnInit {
  @ViewChild('userInfoGrid') userInfoGrid: AgGridAngular;
  subscription: Subscription;
  angForm: FormGroup;
  reports;
  usersInfo = [
    { id: 1, userName: 'Phạm Đức Anh', teamName: 'Frontend' },
    { id: 2, userName: 'Đỗ Việt Hưng', teamName: 'Frontend' },
    { id: 3, userName: 'Lê Anh Đức', teamName: 'BA' },
    { id: 4, userName: 'Dương Đình Quốc Duy', teamName: 'Backend' },
    { id: 5, userName: 'Trần Đình Đạt', teamName: 'Backend' },
  ];
  selectedUser: any;
  config: any = {
    allowedContent: true,
    toolbar: [['Bold', 'Italic', 'Underline', '-', 'NumberedList', 'BulletedList', 'Link', '-', 'CreatePlaceholder']],
    removePlugins: 'elementspath',
    resize_enabled: false,
    extraPlugins: 'font',
    contentsCss: ["body {font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;}"],
    autoParagraph: false,
    enterMode: 2,
    editorConfig: ( config ) => { config.extraPlugins = 'divarea'; }
  };

  // ======== grid configure ==============
  columnDefs = [
    { headerName: 'HỌ TÊN', field: 'devFullName', width: 240, sortable: false, filter: false },
      { headerName: 'NÔI DUNG CÔNG VIỆC', field: 'content', width: 500, sortable: false, filter: false,
        autoHeight: true, cellStyle: { "white-space": "normal" },
        cellRenderer: (data) => {
        return data.value != null ? data.value : '';
      }
    },
    { headerName: 'TEAM', field: 'position', width: 90, sortable: false, filter: false },
    { headerName: 'CÔNG TÁC NGÀY', field: 'dateCreate', width: 150, sortable: false, filter: false },
    { headerName: 'NGÀY SỬA', field: 'dateModify', width: 150, sortable: false, filter: false }
  ];

  public gridOptions;
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
  toDay = formatDate(new Date(), 'dd/MM/yyy', 'en-US');

  isEdit = false;
  dataClone: any;
  dataEditClone: any;
  rowIndex: number;

  constructor(
    private fb: FormBuilder,
    private modal: NgbModal,
    private store: Store <fromMain.MainState>,

  ) {
    // =========== Grid config ==============================================
  
  this.frameworkComponents = { agColumnHeader: CustomHeader };
   this.cacheOverflowSize = 1;
   this.maxConcurrentDatasourceRequests = 1000;
   this.infiniteInitialRowCount = 90;
   this.gridOptions = {
    cacheBlockSize: 90,
    paginationPageSize: 90,
    // rowModelType: 'infinite',
    pagination: true,
    maxBlocksInCache: 1,
    rowModelType: 'serverSide',
    enableSorting: true,
    enableServerSideSorting: true,
    enableServerSideFilter: true,
    serverSideSortingAlwaysResets: true
  };
 }

  ngOnInit(): void {
    this.createForm();

    this.isLoading = false;
  }

  onGridReady(params: any) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    const datasource = {
      getRows: (params: IGetRowsParams) => {

        this.store.dispatch(new ReportActions.FetchReports(params));
        this.subscription = this.store
          .select('reports')
          .pipe(
            map(
              (reportState) => {
                const results = { reports: reportState.reports, totalRows: reportState.totalReportRows };
                console.log(results);

                return results;
              }
            )
          )
          .subscribe((results: any) => {
            this.reports = results.reports;
            let totalRows = results.totalRows;
            params.successCallback(results.reports, totalRows);
          });
      }
    };

    this.gridApi.setDatasource(datasource);
  }

  createForm() {
    this.angForm = this.fb.group({
      _id: [''],
      devFullName: ['', Validators.required],
      position: ['', Validators.required],
      content: ['', Validators.required],
      progress: [''],
      dateCreate: [''],
      dateModify: [''],
    });
  }

  save() {
    this.setValueBeforeSave();
    console.log('saved.');
    console.log(this.angForm.value);

    if (!this.isEdit) {
      this.dataClone = { ...this.angForm.value };
      const dialogResult = MessageBox.show(
        this.modal, 'Do you want to save data ?',
        'Confirm', MessageBoxButtons.yesNoCancel, MessageBoxIcons.question
      );
      dialogResult.then(async (result) => {
        if (result === 'YES') {
          if (this.angForm.status === 'VALID') {
            this.store.dispatch(new ReportActions.StoreReport(this.dataClone));
            this.angForm.setValue({
              _id: '',
              devFullName: '',
              position: '',
              content: '',
              progress: '',
              dateCreate: '',
              dateModify: ''
            })
          }

        } else if (result === 'NO') {

        } else if (result === 'CANCEL') {}
      });
    } else {
      // edit
      this.dataEditClone = { ...this.angForm.value};
      const dialogResult = MessageBox.show(
        this.modal, 'Do you want to save data ?',
        'Confirm', MessageBoxButtons.yesNoCancel, MessageBoxIcons.question
      );
      dialogResult.then(async (result) => {
        if (result === 'YES') {
          if (this.angForm.status === 'VALID') {
            this.store.dispatch(new ReportActions.UpdateReport({ index: this.rowIndex, newReport: this.dataEditClone}));
            this.angForm.setValue({
              _id: '',
              devFullName: '',
              position: '',
              content: '',
              progress: '',
              dateCreate: '',
              dateModify: ''
            })
          }
          this.isEdit = false;
        } else if (result === 'NO') {

        } else if (result === 'CANCEL') {}
      });
    }

  }

  edit(event) {
    console.log('edit...');
    console.log(event);
    this.isEdit = true;
    const dataEdit = event.data;
    this.rowIndex = event.rowIndex;
    this.angForm.patchValue(dataEdit);
  }

  private setValueBeforeSave(): void {
    if (!this.isEdit) {
      this.angForm.patchValue({
        dateCreate : this.toDay
      });
      this.angForm.patchValue({
        dateModify : this.toDay
      });
    } else {
      this.angForm.patchValue({
        dateModify : this.toDay
      });
    }
  }

  onPaginationChanged(event) {}
}
