import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PartnerDepartmentService } from 'src/app/main/model/partner-department/partner-department.service';
import { formatDateInput, isObjHasAtLeastValue } from 'src/app/main/common/util';
import { MessageBox, MessageBoxButtons, MessageBoxIcons } from 'src/app/form/message/messsage';
import { CurrencyService } from 'src/app/main/model/currency/currency.service';
import { formatDate } from '@angular/common';
import * as fromMain from 'src/app/main/store/main.reducer';
import * as LocalChargeDetailActions from '../../store/local-charge-detail/local-charge-detail.actions';
import { FeeService } from 'src/app/main/model/fee/fee.service';

@Component({
  selector: 'app-local-charge-detail-add',
  templateUrl: './local-charge-detail-add.component.html',
  styleUrls: ['./local-charge-detail-add.component.css']
})
export class LocalChargeDetailAddComponent implements OnInit {

  @Input() data: any; // for of-input-lookup
  @Input() action;
  @Input() isEdit;
  @Input() selectedIndex: number;
  @Input() editLocalChargeData;

  isLoading = true;
  dataClone;
  seaDataClone;

  dateTimeLimit: string = formatDate(new Date('2050'), 'dd/MM/yyy', 'en-US');

  clients: any;
  vendors: any;
  ports: any;
  currencys: any;
  customsClearance: any;

  dateCreate = formatDate(new Date(), 'yyyy-MM-dd', 'en-US');
  dateModify = formatDate(new Date(), 'yyyy-MM-dd', 'en-US');
  today = formatDate(new Date(), 'dd/MM/yyy', 'en-US');

  localChargeForm: FormGroup;
  fees: any;

  private cloneLocalCharge: any;

  constructor(
    private store: Store<fromMain.MainState>,
    private activeModal: NgbActiveModal,
    private modal: NgbModal,
    private fb: FormBuilder,
    private currencyService: CurrencyService,
    private feeService: FeeService,
  ) {

    this.isLoading = false;

  }

  ngOnInit() {
    this.fees = this.feeService.getFeesApi();
    this.getLookup();
    this.createForm();

    if (this.isEdit) {
      this.initialEdit();
    }
  }

  createForm(): void {
    this.localChargeForm = this.fb.group({
      _id: [''],
      pricingID: [''],
      fee: ['', Validators.required],
      amount: ['', Validators.required],
      chargePer: ['', Validators.required],
      notes: [''],
      currency: ['', Validators.required]
    });
  }

  async getLookup() {
    this.currencys = await this.currencyService.getCurrenciesApi();
  }

  save() {
    const validData = this.validationForm();
    this.setDataBeforeSave();

    const dialogResult = MessageBox.show(
      this.modal, 'Do you want to save data ?',
      'Confirm', MessageBoxButtons.yesNoCancel, MessageBoxIcons.question
    );
    dialogResult.then(async (result) => {
      if (result === 'YES') {
        if (validData.isValid) {
          if (this.action === 'ADD_NEW_LOCAL_CHARGE_DETAIL') {
            this.store.dispatch(new LocalChargeDetailActions.StoreLocalChargeDetail(this.cloneLocalCharge));
            const dialogInfo = MessageBox.show(
              this.modal,
              'Successfully saved!',
              'Notification',
              MessageBoxButtons.ok,
              MessageBoxIcons.information
            );
            dialogInfo.then((result) => {
              this.activeModal.close(this.cloneLocalCharge);
            });
          } else {
            // Edit
            this.store.dispatch(new LocalChargeDetailActions.UpdateLocalChargeDetail({
              index: this.selectedIndex,
              newLocalChargeDetail: this.cloneLocalCharge
            }));
            const dialogInfo = MessageBox.show(
              this.modal,
              'Edit has complete!',
              'Ok',
              MessageBoxButtons.ok,
              MessageBoxIcons.information
            );
            dialogInfo.then((result) => {
              this.activeModal.close(this.cloneLocalCharge);
            });
          }

          this.activeModal.close(this.seaDataClone);
        } else {
          const dialogAlert = MessageBox.show(this.modal, validData.message, 'Alert', MessageBoxButtons.ok, MessageBoxIcons.warning);
          dialogAlert.then((result) => {});
        }
      } else if (result === 'NO') {
        this.activeModal.close(this.cloneLocalCharge);
      } else if (result === 'CANCEL') {}
    });
  }

  close() {
    this.activeModal.dismiss(this.cloneLocalCharge);
  }
  cancel() {
    this.activeModal.dismiss(this.cloneLocalCharge);
  }

  protected validationForm(): { isValid: boolean, message: string } {
    // const gpContainer = this.fclForm.get('gpContainer') as FormGroup;
    if (this.localChargeForm.dirty && this.localChargeForm.valid) {
      return { isValid: true, message: 'OK' };
    } else {
      console.log(this.localChargeForm);
      // TODO: Output error message
    }
  }

  initialEdit() {
    let chargeData: any;
    chargeData = this.getLocalChargeDetailData();
    console.log(chargeData);
    this.localChargeForm.patchValue({
      _id: chargeData._id,
      pricingID: chargeData.pricingID,
      fee: chargeData.fee,
      amount: chargeData.amount,
      chargePer: chargeData.chargePer,
      notes: chargeData.notes,
      currency: chargeData.currency
    });
  }

  private getLocalChargeDetailData() {
    return { ...this.editLocalChargeData }
  }

  private setDataBeforeSave(): void {
    this.cloneLocalCharge = { ...this.localChargeForm.value };
    console.log(this.cloneLocalCharge);
  }
}
