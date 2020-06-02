import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MessageBox, MessageBoxButtons, MessageBoxIcons } from 'src/app/form/message/messsage';
import { CustomHeader } from 'src/app/main/common/ag-grid-header-custom';
import { CURD_socListComponent } from './CURD_socList/CRUD_socList.component';
@Component({
    selector: 'app-name',
    templateUrl: './soc-list.component.html',
    styleUrls: ['./soc-list.component.css']
})
export class Soc_listComponent implements OnInit {
    columnDefs;
    rowData:[];
    gridApi;
    gridColumnApi;
    defaultColDef;
    frameworkComponents;
    constructor(private modal: NgbModal) {   this.columnDefs=[
        {headerName : 'Container No.' , field :'contNo',width: 150, sortable: true, filter: true},
        {headerName : 'ISO' , field :'ISO',width: 200, sortable: true, filter: true},
        {headerName : 'Type' , field :'contType',width: 600, sortable: true, filter: true},
        {headerName : 'Description' , field :'description',width: 600, sortable: true, filter: true},
        {headerName : 'Weight' , field :'weight',width: 600, sortable: true, filter: true},
        {headerName : 'Vender' , field :'vender',width: 600, sortable: true, filter: true},
        
    ]
    this.defaultColDef = {
        width: 120,
        headerComponentParams: { menuIcon: 'fas fa-filter' },
        sortable: true,
        resizable: true,
        filter: true,
        
      };
      this.frameworkComponents = { agColumnHeader: CustomHeader };
 }
 onGridReady(params) {
    this.gridApi = params.api;
   
  }
    ngOnInit(): void { }

    openPopup(data,action,node){
        const modalRef = this.modal.open(CURD_socListComponent, {size: 'lg' , backdrop: false, keyboard: true })
        modalRef.componentInstance.action= action;
        modalRef.componentInstance.data=data;
        modalRef.result.then((result)=>{ {
            console.log(result)
             if (action === 'Add New') {
              var res = this.gridApi.updateRowData({ add: [result] });
              
            }
            else if (action === 'Edit') {
              this.gridApi.getRowNode(String(node)).setData(result) 
              if (result.commodityID=='Delete'){
                this.gridApi.updateRowData({ remove: [result] });
              }
              
            }
            
          }})
      }
      add(){
        this.openPopup('','Add New','')}
        edit(e){
            console.log(e)
 this.openPopup(e.data,'Edit','')
        }

}
