import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { formatDate } from '@angular/common';
import { MessageBox, MessageBoxButtons, MessageBoxIcons } from 'src/app/form/message/messsage';
import { PartnerTransactionService } from 'src/app/main/model/partnerTransaction/partnerTransaction.service';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css']
})
export class TransactionComponent implements OnInit {
  @Input() data;
  public action;

  isLoading: boolean = true;
  dataClone;

  constructor(
    public activeModal: NgbActiveModal,
    public modal: NgbModal,
    public partnertransactionService: PartnerTransactionService
  ) { }

  ngOnInit() {
    this.dataClone = { ...this.data };
    this.dataClone.username = 'ADMIN';
    this.dataClone.dateCreate = formatDate(new Date(), 'yyyy-MM-dd', 'en-US');
    this.isLoading = false;
    this.action = this.dataClone.action;
  }

  async save() {
    var validData = this.validData();
    if (validData.isValid) {
      console.log(this.dataClone);
      if (this.action === 'ADD') {
        let data = await this.partnertransactionService.insPartnerTransactionsApi(this.dataClone);
        this.dataClone._id = data._id;
        let dialogResult = MessageBox.show(this.modal, 'Successfully saved!', 'Notification', MessageBoxButtons.ok, MessageBoxIcons.information);
        dialogResult.then((result) => {
          this.activeModal.close(this.dataClone);
        });
      }
      else if (this.action === 'EDIT') {
        let data = await this.partnertransactionService.updPartnerTransactionsApi(this.dataClone);
        let dialogResult = MessageBox.show(this.modal, 'Successfully saved!', 'Notification', MessageBoxButtons.ok, MessageBoxIcons.information);
        dialogResult.then((result) => {
          this.activeModal.close(this.dataClone);
        });
      }
    }
    else {
      let dialogResult = MessageBox.show(this.modal, validData.message, 'Alert', MessageBoxButtons.ok, MessageBoxIcons.warning);
      dialogResult.then((result) => { });
    }
  }

  validData() {
    var isValid = true;
    var message = '';
    if (this.dataClone.description == null || this.dataClone.description === '') {
      isValid = false;
      message = "The field Content can't be empty !"
    }

    return { isValid: isValid, message: message };
  }
}
