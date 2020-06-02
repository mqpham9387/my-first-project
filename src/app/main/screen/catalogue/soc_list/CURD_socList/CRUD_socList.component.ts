import { Component, OnInit,Input } from '@angular/core';
import { soclist } from 'src/app/main/model/noneApisocList/SocList.interface';
import { MessageBox, MessageBoxButtons, MessageBoxIcons } from 'src/app/form/message/messsage';
import { NgbActiveModal,NgbModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
    selector: 'app-name',
    templateUrl: './CRUD_socList.component.html',
    styleUrls: ['./CRUD_socList.component.css']
})
export class CURD_socListComponent implements OnInit {
    @Input() action :string
    @Input() data
    cont=new soclist
    constructor(private modal: NgbModal,public activeModal : NgbActiveModal) {
        
     }
    validData(){
        var isValid = true;
        var message = '';
          if (this.cont.ISO == null || this.cont.ISO == "") {
            isValid = false;
            message = "The field ISO can't be empty !";
          }
          if (this.cont.contType == null || this.cont.contType == "") {
            isValid = false;
            message = "The field Cont Type can't be empty !";
          }
          if (this.cont.weight == null || this.cont.weight == "") {
            isValid = false;
            message = "The field Weight can't be empty !";
          }
          if (this.cont.contNo == null || this.cont.contNo == "") {
            isValid = false;
            message = "The field Cont No can't be empty !";
          }

          
          return {isValid: isValid, message: message}}

    ngOnInit(): void {
        console.log(this.data)
        if(this.action=="Edit"){
            console.log(this.data)
            this.cont=this.data
        }
     }
    save(){
        var validData = this.validData();
        if(validData.isValid){
            if(this.action=="Add New"){
                let dialogResult = MessageBox.show(this.modal, 'Successfully saved!', 'Notification', MessageBoxButtons.ok, MessageBoxIcons.information)
                dialogResult.then((result) => {
                  
                  console.log(this.cont)
                  this.activeModal.close(this.cont)})
            }}
            
            else if(validData.isValid==false) {
                let dialogResult = MessageBox.show(this.modal, validData.message, 'Alert', MessageBoxButtons.ok, MessageBoxIcons.warning);
                dialogResult.then((result) => { });
              }}
    close()
    {
      let dialogResult = MessageBox.show(this.modal, 'Do you want to save data ?', 'Confirm', MessageBoxButtons.yesNoCancel, MessageBoxIcons.question);
      dialogResult.then(async (result) => {
        if (result === 'YES') {
          this.save()
          
        }
        else if (result === 'NO') {
          this.activeModal.dismiss();
        }
        else if (result === 'CANCEL') {
        }
      })
    }


}
