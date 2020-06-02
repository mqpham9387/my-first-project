import { Component, OnInit ,Input} from '@angular/core';
import { shipmentType } from 'src/app/main/model/shipment-type/shipment-type.interface';
import { MessageBox, MessageBoxButtons, MessageBoxIcons } from 'src/app/form/message/messsage';
import { NgbActiveModal,NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ShipmentTypeService } from 'src/app/main/model/shipment-type/shipment-type.service';
@Component({
    selector: 'CRUD_shipmenttype',
    templateUrl: './CRUD_shipmentType.component.html',
    styleUrls: ['./CRUD_shipmentType.component.css']
})
export class CRUDshipmentTypeComponent implements OnInit {
    @Input() action :string
    @Input() data
    shipmentType=new shipmentType
    constructor( private modal: NgbModal,
        public activeModal : NgbActiveModal,
        public shipmentTypeService : ShipmentTypeService) { }

    ngOnInit(): void { 
        if(this.action=="Edit"){
        this.shipmentType=this.data}
    }
    validData(){
        var isValid = true;
        var message = '';
          if (this.shipmentType.shipmentTypeWarningName == null || this.shipmentType.shipmentTypeWarningName == "") {
            isValid = false;
            message = "The field Shipment Type Name can't be empty !";
          }
         
          
        return {isValid: isValid, message: message}
    }
    add(){ 
        // chưa bắt các trường hợp error khi post object lên api
        var validData = this.validData();
        if(validData.isValid)
       if(this.action=="Add New") {
        this.shipmentTypeService.createShipmentTypeWarnings(this.shipmentType).subscribe(res=>
        {
        console.log(res)
       if(res) {

            let dialogResult = MessageBox.show(this.modal, 'Successfully saved!', 'Notification', MessageBoxButtons.ok, MessageBoxIcons.information)
            dialogResult.then((result) => {this.activeModal.close(this.shipmentType)})
        }
        else {
            let dialogResult = MessageBox.show(this.modal, validData.message, 'Alert', MessageBoxButtons.ok, MessageBoxIcons.warning);
            dialogResult.then((result) => { });
          }})}
    }
    close()
    {
      let dialogResult = MessageBox.show(this.modal, 'Do you want to save data ?', 'Confirm', MessageBoxButtons.yesNoCancel, MessageBoxIcons.question);
      dialogResult.then(async (result) => {
        if (result === 'YES') {
          this.add()
          
        }
        else if (result === 'NO') {
          this.activeModal.dismiss();
        }
        else if (result === 'CANCEL') {
        }
      })
    }
}
