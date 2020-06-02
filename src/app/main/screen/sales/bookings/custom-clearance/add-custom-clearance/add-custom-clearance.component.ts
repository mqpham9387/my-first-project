import {
  Component,
  OnInit,
  Input,
  OnDestroy,
  ViewEncapsulation,
  ViewChild,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
  getNumericCellEditor,
  isObjHasAtLeastValue,
  formatDateInput,
  filterDiffArray,
} from 'src/app/main/common/util';
import {
  MessageBox,
  MessageBoxButtons,
  MessageBoxIcons,
} from 'src/app/form/message/messsage';
import { PartnerService } from 'src/app/main/model/partner/partner.service';
import { formatDate } from '@angular/common';
import * as fromMain from 'src/app/main/store/main.reducer';
import { Subscription } from 'rxjs';
import { Booking } from 'src/app/main/model/booking/booking.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BookingService } from 'src/app/main/model/booking/booking.service';
import { AgGridAngular } from 'ag-grid-angular';
import { GridHeaderActions2Component } from 'src/app/main/common/button-header-ag';
import { CustomHeader } from 'src/app/main/common/ag-grid-header-custom';
import { ButtonRendererComponent } from 'src/app/main/common/button-renderer.component';
import { ButtonRenderer2Component } from 'src/app/main/common/button-renderer2.component';
import { ShareDataService } from 'src/app/main/shared/services/share-data.service';
import * as QuotationActions from 'src/app/main/screen/sales/quotation/store/quotation/quotation.actions';
import { CK_EDITOR_CONFIG } from 'src/app/main/shared/app-settings';
@Component({
  selector: 'app-add-custom-clearance',
  templateUrl: './add-custom-clearance.component.html',
  styleUrls: ['./add-custom-clearance.component.css']
})
export class AddCustomClearanceComponent implements OnInit {
  @Input() customClearance: Booking;
  @Input() action: any;
  @Input() selectedIndex: any;


  subscription: Subscription;
  otherChargeData: any;
  selectedCommodity: any;

  bookingFrm: FormGroup;

  truckingNonContainers: FormGroup;
  quotDetailsCC: FormGroup;
  quotDetailsOCArr: any;
  containerArr: any;
  nonContainerArr: any;
  dataClone: any;
  partners: any;
  quotationTypes: any;

  public contGridApi: any;
  public contGridColumnApi: any;

  public nonContGridApi: any;
  public nonContGridColumnApi: any;

  public defaultColDef: any;
  public components: any;
  public editType: any;
  public frameworkComponents1: any;
  public frameworkComponents2: any;

  volumeTypes = [
    { id: 1, typeName: 'CBM', name: 'CBM' },
    { id: 2, typeName: 'CUST', name: 'CUST' },
  ];
  grossWeightUnits = [
    { id: 1, typeName: 'KGs', name: 'Kilogram' },
    { id: 1, typeName: 'TONs', name: 'TON' },
    { id: 2, typeName: 'LBs', name: 'Pound' },
  ];

  constructor(
    private store: Store<fromMain.MainState>,
    private activeModal: NgbActiveModal,
    private modal: NgbModal,
    private fb: FormBuilder,
    private partnerService: PartnerService,
    private bookingService: BookingService,
    private shareDataService: ShareDataService
  ) {
  }

  ngOnInit() {
    this.createForm();
  }
  async getLookUp() {
    this.partners = await this.partnerService.getPartnersApi('CUSTOMERS');
    this.bookingService.getBookingTypes().subscribe((results) => {
      console.log(results);
      this.quotationTypes = results;
    });
  }
  createForm(): void {
    this.bookingFrm = this.fb.group({
      bookingNo: [''],
      creator: [''],
      dateCreate: [''],
      Quotation: [''],
      commodity: ['', Validators.required],
      commodityType: ['', Validators.required],
      client: ['', Validators.required],
      sentTo: ['', Validators.required],
      hsCode: [''],
      servicedate: [''],
      shipperptc: [''],
      phone: [''],
      consigneeptc: [''],
      specialRequirements: [''],
      notes: [''],
      pickupaddress: [''],
      packagecanbetired: [''],
      cargoIsUnstackable: [''],
      delivery: [''],
      volume: [''],
      volumeUnit: [''],
      maxLength: [''],
      maxWidth: [''],
      maxHeight: [''],
      grossWeight: [''],
      grossWeightUnit: [''],
      maxweightperpackage: [''],
      isImport: [''],
      isExport: [''],
      clearanceterminal: [''],
      purposeofimportexport:['']
    });

  }
  cancel() {
    this.activeModal.close(this.customClearance);
  }
  save() {
    let dialogResult = MessageBox.show(
      this.modal,
      "Do you want to save data ?",
      "Confirm",
      MessageBoxButtons.yesNoCancel,
      MessageBoxIcons.question
    );

  }
}
