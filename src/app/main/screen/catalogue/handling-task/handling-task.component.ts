import { Component, OnInit } from '@angular/core';
import { CustomHeader } from 'src/app/main/common/ag-grid-header-custom';
import { TransactionTypeService } from 'src/app/main/model/transaction-type/transaction-type.service';
import { CompanyService } from 'src/app/main/model/company/company.service';
import { HandlingTask } from 'src/app/main/model/noneApiHandlingTask/HandlingTask.interface';
import { CRUD_handlingTaskComponent } from './CRUD_handling-task/CRUD_handling-task.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MessageBox, MessageBoxButtons, MessageBoxIcons } from 'src/app/form/message/messsage';
@Component({
    selector: 'handlingtask',
    templateUrl: './handling-task.component.html',
    styleUrls: ['./handling-task.component.css']
})
export class HandlingTaskComponent implements OnInit {
    columnDefs;
    rowData;
    gridApi;
    gridColumnApi;
    defaultColDef;
    frameworkComponents;
    tras;
    company;
    transacationType:any="all";
    companyValue:any="all"
    handlingTask= new HandlingTask
    rowData1
    a
   
    constructor(public transactionTypeService:TransactionTypeService,
        public companyService:CompanyService,private modal: NgbModal,) {
        this.columnDefs=[
            {headerName : 'Task Code' , field :'taskID',width: 200, sortable: true, filter: true,editable:false},
            {headerName : 'Handling tasks' , field :'taskName',width: 400, sortable: true, filter: true},
            {headerName : 'Notes' , field :'notes',width: 400, sortable: true, filter: true},
            {headerName : 'Senquential order' , field :'priority',width: 150, sortable: true, filter: true},
            {headerName : 'Creater by' , field :'creator',width: 200, sortable: true, filter: true},
            {headerName : 'Creater Date' , field :'dateCreate',width: 200, sortable: true, filter: true},
        ]
        this.defaultColDef = {
            width: 120,
            headerComponentParams: { menuIcon: 'fas fa-filter' },
            sortable: true,
            resizable: true,
            filter: true,
            editable:true,
            
          };
          this.frameworkComponents = { agColumnHeader: CustomHeader };
          this.rowData =[/* 1 */
            {
                "_id" : ("5e0d4605528b433d505463e3"),
                "taskID" : "",
                "taskName" : "aaaaaaaaaaaaa",
                "serviceType" : "Mã TransactionType",
                "companyID" : "BEECRX",
                "priority" : 1,
                "notes" : "",
                "creator" : "",
                "dateCreate" : ("2020-01-02T21:22:20.202Z"),
                "dateModify" : ("2020-01-02T21:22:20.202Z"),
                "logInfo" : ""
            },
            
            /* 2 */
            {
                "_id" : ("5e0da41a799b65487005c486"),
                "taskID" : "Task123",
                "taskName" : "aaaaaaaaaaa",
                "serviceType" : "Mã TransactionType",
                "companyID" : "BEEHCM",
                "priority" : 2,
                "notes" : "",
                "creator" : "",
                "dateCreate" : ("2020-01-02T21:22:20.202Z"),
                "dateModify" : ("2020-01-02T21:22:20.202Z"),
                "logInfo" : ""
            },
            
            /* 3 */
            {
                "_id" : ("5e0da834799b65487005c491"),
                "taskID" : "Task1234",
                "taskName" : "aaaaaaa",
                "serviceType" : "Mã TransactionType",
                "companyID" : "BEECRX",
                "priority" : 2,
                "notes" : "",
                "creator" : "",
                "dateCreate" : ("2020-01-02T21:22:20.202Z"),
                "dateModify" : ("2020-01-02T21:22:20.202Z"),
                "logInfo" : ""
            }
            ,
            /* 4 */
            {
                "_id" : ("5e0ef04d799b65460cbafbfa"),
                "taskID" : "Task1236",
                "taskName" : "",
                "serviceType" : "AirExpTransactions",
                "companyID" : "BEECRX",
                "priority" : 1,
                "notes" : "",
                "creator" : "",
                "dateCreate" : ("2020-01-02T21:22:20.202Z"),
                "dateModify" : ("2020-01-02T21:22:20.202Z"),
                "logInfo" : ""
            },
            {
                "_id" : ("5e0d4605528b433d505463e3"),
                "taskID" : "",
                "taskName" : "",
                "serviceType" : "AirExpTransactions",
                "companyID" : "BEECRX",
                "priority" : 1,
                "notes" : "",
                "creator" : "",
                "dateCreate" : ("2020-01-02T21:22:20.202Z"),
                "dateModify" : ("2020-01-02T21:22:20.202Z"),
                "logInfo" : ""
            },
        ]
     }

  async  ngOnInit() { 
    this.tras =await this.transactionTypeService.getTransactionTypesApi()
    this.company =await this.companyService.getCompaniesApi()
    console.log(this.tras,this.company)
    this.rowData1=this.rowData
    }
    onGridReady(params) {
        this.gridApi = params.api;
       
      }
    filterTable(){
        const b = this.transacationType.transactionTypeID 
        const a = this.companyValue.companyID
        console.log(this.transacationType.transactionTypeID,this.companyValue.companyID)
        if(this.companyValue.companyID==="all") { if(this.transacationType.transactionTypeID=="all"){this.rowData1=this.rowData}
        else this.rowData1=this.rowData.filter(function(i) {return i.serviceType==b})
        }     
        else{const filCompany=this.rowData.filter(function(i) {return i.companyID==a})
        this.rowData1= filCompany.filter(function(i) {return i.serviceType==b})}
    }
    filterTable1(){
        const a = this.transacationType.transactionTypeID 
        const b= this.companyValue.companyID    
        console.log(this.transacationType.transactionTypeID,this.companyValue.companyID)
        if(this.transacationType.transactionTypeID==="all"){ if(this.companyValue.companyID=="all"){this.rowData1=this.rowData}
           else this.rowData1=this.rowData.filter(function(i) {return i.companyID==b})
        }
        else { const filCompany=this.rowData.filter(function(i) {return i.companyID==b})
        this.rowData1= filCompany.filter(function(i) {return i.serviceType==a})}
        
    }
    add(){
 this.openPopup('',"Add New",'')

    }
    
    edit(){
        this.openPopup('','Edit','')
    }
    openPopup(data,action,node){
        
        const modalRef = this.modal.open(CRUD_handlingTaskComponent, {size:'xl' , backdrop: false, keyboard: true ,scrollable:true,centered:true})
        modalRef.componentInstance.action= action;
        modalRef.componentInstance.data=data;
        modalRef.componentInstance.rowData=this.rowData1;
        modalRef.componentInstance.service=this.transacationType.transactionTypeName;
        modalRef.componentInstance.office=this.companyValue.companyName;
        modalRef.result.then((result)=>{ {
            console.log(result)
             if (action === 'Add New') {
              var res = this.gridApi.updateRowData({ add: [result] });
              
            }
            else if (action === 'Edit') {
                this.gridApi.refreshCells();
              if (result.taskID=='Delete'){
                this.gridApi.updateRowData({ remove: [result] });
              }
              
            }
            
          }})
      }
     
      test(e){
console.log(e)
      }
}
