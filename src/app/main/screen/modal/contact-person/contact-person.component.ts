import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PartnerDepartmentService } from 'src/app/main/model/partner-department/partner-department.service';
import { isEmail } from 'src/app/main/common/util';
import { MessageBox, MessageBoxButtons, MessageBoxIcons } from 'src/app/form/message/messsage';

@Component({
  selector: 'app-contact-person',
  templateUrl: './contact-person.component.html',
  styleUrls: ['./contact-person.component.css']
})

export class ContactPersonComponent implements OnInit {
  @Input() data
  @Input() action

  isLoading: boolean = true;
  dataClone;
  groups;
  group = null;

  notEmail;

  valid = {
    group: false,
    fullName: false
  }

  constructor(
    private activeModal: NgbActiveModal,
    private modal: NgbModal,
    private partnerdepartmentService: PartnerDepartmentService
  ) { }

  async ngOnInit() {
    this.groups = await this.partnerdepartmentService.getPartnerDepartmentsApi();
    if (this.action == "EDIT") {
      if (this.data.group != null && this.data.group != "") {
        this.group = this.groups.find(
          val => val.partnerDepartmentName.toUpperCase() === this.data.group.toUpperCase()
        );
      }
    }
    this.dataClone = { ...this.data };
    this.isLoading = false;
  }

  save() {
    this.dataClone.group = this.group != null ? this.group.partnerDepartmentName : null;
    var validData = this.validData();
    if (validData.isValid) {
      this.activeModal.close(this.dataClone); console.log(this.dataClone);
    }
    else {
      let dialogResult = MessageBox.show(this.modal, validData.message, 'Alert', MessageBoxButtons.ok, MessageBoxIcons.warning);
      dialogResult.then((result) => { });
    }
  }

  close() {
    this.activeModal.dismiss(this.dataClone);
  }

  validData() {
    var isValid = true;
    var message = '';
    if (this.dataClone.birthday === undefined) {
      isValid = false;
      message = "The field Birthday not correct format DD/MM/YYYY!";
    }
    if (this.dataClone.email === undefined || !isEmail(this.dataClone.email)) {
      isValid = false;
      message = "The field Email not correct format !";
    }
    if (this.dataClone.fullname === null || this.dataClone.fullname === '') {
      isValid = false;
      message = "The field Full Name can't be empty !";
    }
    if (this.dataClone.group === null || this.dataClone.group === '') {
      isValid = false;
      message = "The field Group can't be empty !";
    }

    return { isValid: isValid, message: message };
  }
}

