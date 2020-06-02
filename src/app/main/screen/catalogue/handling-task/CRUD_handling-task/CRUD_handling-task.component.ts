import { Component, OnInit,Input } from '@angular/core';
import { CustomHeader } from 'src/app/main/common/ag-grid-header-custom';
import { HandlingTask } from 'src/app/main/model/noneApiHandlingTask/HandlingTask.interface';
import { MessageBox, MessageBoxButtons, MessageBoxIcons } from 'src/app/form/message/messsage';
import { NgbActiveModal,NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
@Component({
    selector: 'aa-name',
    templateUrl: './CRUD_handling-task.component.html',
    styleUrls: ['./CRUD_handling-task.component.css']
})
export class CRUD_handlingTaskComponent implements OnInit {
    @Input() action :string
    @Input() data
    @Input() rowData
    @Input() service
    @Input() office
    columnDefs;
    task =new HandlingTask
    gridApi;
    gridColumnApi;
    defaultColDef;
    frameworkComponents;
    node
    constructor( private modal: NgbModal,public activeModal : NgbActiveModal) {
        this.columnDefs=[
            {headerName : 'Task Code' , field :'taskID',width: 200, sortable: true, filter: true},
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

          };
          this.frameworkComponents = { agColumnHeader: CustomHeader };
     }

   async ngOnInit() {
      if(this.action=='Edit'){
        this.task=this.data

      }
      console.log(this.task)
    }
    edit(e){

      if(this.action=='Edit')
      {const a = this.gridApi.getSelectedRows()
        this.task= a[0]
      }
    }
   focusout() {
    const a = this.gridApi.getSelectedNodes()
 console.log(a)
    this.gridApi.getRowNode(String(a[0].id)).setData(this.task)



    }
    validData(){
        var isValid = true;
        var message = '';
          if (this.task.taskName == null || this.task.taskName == "") {
            isValid = false;
            message = "The field Handling Tasks can't be empty !";
          }

          return {isValid: isValid, message: message}}
    save(){
            var validData = this.validData();
          if(this.action=='Edit'){
            let dialogResult = MessageBox.show(this.modal, 'Successfully saved!', 'Notification', MessageBoxButtons.ok, MessageBoxIcons.information)
                    dialogResult.then((result) => {

                  this.activeModal.close(this.rowData)})
          }
          else { if(validData.isValid){
                if(this.action=="Add New"){
                    let dialogResult = MessageBox.show(this.modal, 'Successfully saved!', 'Notification', MessageBoxButtons.ok, MessageBoxIcons.information)
                    dialogResult.then((result) => {

                      console.log(this.task)
                      this.activeModal.close(this.task)})
                }}
                else if(validData.isValid==false) {
                    let dialogResult = MessageBox.show(this.modal, validData.message, 'Alert', MessageBoxButtons.ok, MessageBoxIcons.warning);
                    dialogResult.then((result) => { });
                  }}}
        close()
        {
          // let dialogResult = MessageBox.show(this.modal, 'Do you want to save data ?', 'Confirm', MessageBoxButtons.yesNoCancel, MessageBoxIcons.question);
          // dialogResult.then(async (result) => {
          //   if (result === 'YES') {
          //     this.save()

          //   }
          //   else if (result === 'NO') {
          //     this.activeModal.dismiss();
          //   }
          //   else if (result === 'CANCEL') {
          //   }
          // })
          this.activeModal.dismiss()
        }
        onGridReady(params) {
          this.gridApi = params.api;

        }


}
