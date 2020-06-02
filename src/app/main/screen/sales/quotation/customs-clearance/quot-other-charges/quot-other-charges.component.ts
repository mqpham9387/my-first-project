import { Component, OnInit, Input, OnDestroy, ViewEncapsulation } from '@angular/core';
import { Store } from '@ngrx/store';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { isEmail, formatDateInput, isObjHasAtLeastValue, getNumericCellEditor } from 'src/app/main/common/util';
import { MessageBox, MessageBoxButtons, MessageBoxIcons } from 'src/app/form/message/messsage';
import { formatDate } from '@angular/common';
import * as fromMain from 'src/app/main/store/main.reducer';
import { Subscription } from 'rxjs';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AgGridAngular } from 'ag-grid-angular';
import { GridHeaderActions2Component } from 'src/app/main/common/button-header-ag';
import { CustomHeader } from 'src/app/main/common/ag-grid-header-custom';
import { ButtonRendererComponent } from 'src/app/main/common/button-renderer.component';
import { ButtonRenderer2Component } from 'src/app/main/common/button-renderer2.component';
import { ShareDataService } from 'src/app/main/shared/services/share-data.service';

@Component({
  selector: 'app-quot-other-charges',
  templateUrl: './quot-other-charges.component.html',
  styleUrls: ['./quot-other-charges.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class QuotOtherChargesComponent implements OnInit, OnDestroy {
  @Input() action: any;
  @Input() data: any;

  subscription: Subscription;
  customsClearanceFrm: FormGroup;
  public gridApi: any;
  public gridColumnApi: any;
  public defaultColDef: any;
  public components: any;
  public editType: any;
  public frameworkComponents: any;
  today = formatDate(new Date(), 'dd/MM/yyy', 'en-US');
  isLoading = true;
  testNull = false;
  rowData = [];
  columnDefs = [
    {
      headerName: 'ID',
      field: '_id',
      width: 100,
      sortable: false,
      filter: false,
      hide: true
    },
    {
      headerName: 'Charge name',
      field: 'fee',
      width: 250,
      sortable: false,
      filter: false,
      cellEditor: 'Editor',
      cellEditorParams: {
        class: 'fee',
      },
      cellRenderer: (data) => {
        if (data.value) {
          return data.value.feeNameLocal;
        }
      }
    },
    {
      headerName: 'Displayed charge name',
      field: 'displayedChargeName',
      width: 250,
      sortable: false,
      filter: false,
    },
    {
      headerName: 'Unit price',
      field: 'unitPrice',
      width: 100,
      sortable: false,
      filter: false
    },
    {
      headerName: 'Unit',
      field: 'unit',
      width: 100,
      sortable: false,
      filter: false
    },
    {
      headerName: 'Tax(%)',
      field: 'tax',
      width: 100,
      sortable: false,
      filter: false
    },
    {
      headerName: 'Currency',
      field: 'currency',
      width: 100,
      sortable: false,
      filter: false,
      cellEditor: 'Editor',
      cellEditorParams: {
        class: 'currency',
      },
      cellRenderer: (data) => {
        if (data.value) {
          return data.value.currencyName;
        }
      },
    },
    {
      headerName: 'Notes',
      field: 'notes',
      width: 350,
      sortable: false,
      filter: false
    },
    {
      headerName: '',
      width: 150,
      cellRenderer: 'buttonRenderer',
      editable: false,
      sortable: false,
      filter: true,
      resizable: false,
      pinned: 'right',
      headerComponentFramework: GridHeaderActions2Component,
      headerComponentParams: {
        onClick: this.addNew.bind(this),
      },
      cellRendererParams: {
        onClick: this.editTable.bind(this),
        onClick1: this.cancelAction.bind(this),
        onClick3: this.addAction.bind(this),
        onClick4: this.cancelAction.bind(this)
      },
    }
  ];

  constructor(
    private store: Store<fromMain.MainState>,
    private activeModal: NgbActiveModal,
    private modal: NgbModal,
    private fb: FormBuilder,
    private shareDataService: ShareDataService
  ) {

    this.defaultColDef = {
      width: 120,
      headerComponentParams: { menuIcon: 'fas fa-filter' },
      sortable: true,
      resizable: true,
      filter: true,
      editable: true
    };
    this.frameworkComponents = {
      agColumnHeader: CustomHeader,
      buttonRenderer: ButtonRendererComponent,
      Editor: ButtonRenderer2Component,
    };
    this.components = { numericCellEditor: getNumericCellEditor() };
    this.editType = 'fullRow';
    this.isLoading = false;
  }

  ngOnInit() {
    this.shareDataService.currentMessage.subscribe(message => this.rowData = message)
    this.isLoading = false;
  }

  getRowData() {
    const rowData = [];
    this.gridApi.forEachNode((node) => {
      rowData.push(node.data);
    });
    console.log('Row Data:');
    console.log(rowData);
    this.shareDataService.changeMessage(rowData);
    return rowData;
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
  }

  addNew() {
    console.log(this.action);
    if (!this.testNull) {
      if (this.action === 'EDIT_CUSTOMS_CLEARANCE') {
        const newRows = { rowStatus: 'ADD' };
        this.rowData.splice(0, 0, newRows);
        this.gridApi.updateRowData({ add: [newRows], addIndex: 0 });
        this.gridApi.startEditingCell({ rowIndex: 0, colKey: 'fee' });
      } else {
        const newRows = { rowStatus: 'ADD' };
        this.rowData.splice(0, 0, newRows);
        this.gridApi.updateRowData({ add: [newRows], addIndex: 0 });
        this.gridApi.startEditingCell({ rowIndex: 0, colKey: 'fee' });
      }
    }
    this.testNull = true;
  }

  rowEditingStopped(e) {
    console.log(e);
    if (!e.data?.fee) {
      const dialogResult = MessageBox.show(
        this.modal,
        'Null Error !',
        'Alert ! ',
        MessageBoxButtons.ok,
        MessageBoxIcons.warning
      );
      dialogResult.then((result) => { });

      {
        this.gridApi.startEditingCell({
          rowIndex: e.rowIndex,
          colKey: 'fee',
        });
        this.testNull = true;
      }
    } else {
      e.data.rowStatus = '';
      this.rowData = this.getRowData();
      this.testNull = false;
    }
  }

  editTable(e) {
    console.log('start edit...');
    console.log(e);
    this.gridApi.startEditingCell({
      rowIndex: e.params.rowIndex,
      colKey: 'fee',
    });
  }

  addAction(e) {
    console.log('addAction');
    console.log(e);
    e.params.data.rowStatus = '';
    this.testNull = false;
    // TODO Validation after stop edit
    this.gridApi.stopEditing();
  }

  cancelAction(e) {
    console.log(e);
    this.gridApi.updateRowData({ remove: [e.params.data] });
    this.testNull = false;
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  protected validData() {
    return { isValid: true, message: 'Ok' };
  }

}
