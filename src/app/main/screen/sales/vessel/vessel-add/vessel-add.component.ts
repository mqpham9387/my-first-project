import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { formatDate } from '@angular/common';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import * as fromMain from '../../../../store/main.reducer';
import { PartnerService } from 'src/app/main/model/partner/partner.service';
import { isEqual, transportValue } from 'src/app/main/common/util';
import { MessageBox, MessageBoxButtons, MessageBoxIcons } from 'src/app/form/message/messsage';
import { PortService } from 'src/app/main/model/port/port.service';

import { RouteTransit, Vessel, VesselView } from 'src/app/main/model/vessel/vessel.model';
import { Store } from '@ngrx/store';
import * as VesselActions from '../store/vessel.actions';

@Component({
  selector: 'app-vessel-add',
  templateUrl: './vessel-add.component.html',
  styleUrls: ['./vessel-add.component.css']
})
export class VesselAddComponent implements OnInit, OnDestroy {
  @Input() data;
  @Input() partner;
  @Input() port;
  public supCrib: Subscription;

  private isLoading = true;
  public action = "";
  dateTimeLimit: string = formatDate(new Date('2050'), 'dd/MM/yyyy', 'en-US');
  partners;
  ports;
  currentLine;
  vesselPol;
  vesselEtd :string = formatDate(new Date(), 'yyyy-MM-dd', 'en-US');
  vesselPod;
  vesselEta :string = formatDate(new Date(), 'yyyy-MM-dd', 'en-US');
  vesselPortofDischarge;
  routeTransitEtaToTransitPort :string = formatDate(new Date(), 'yyyy-MM-dd', 'en-US');


  vessel: Vessel = {
    _id: '',
    partnerID: '',
    creator: '',
    dateCreate: formatDate(new Date(), 'dd/MM/yyyy', 'en-US'),
    dateModify: formatDate(new Date(), 'dd/MM/yyyy', 'en-US'),
    portofLoading: '',
    portofDischarge: '',
    etd: formatDate(new Date(), 'dd/MM/yyyy', 'en-US'),
    eta: formatDate(new Date(), 'dd/MM/yyyy', 'en-US'),
    routeTransit: [],
    notes: '',
    active: false
  };
  routeTransit: RouteTransit = {
    index: 0,
    portofTransit: '',
    portofDischarge: '',
    etaToTransitPort: formatDate(new Date(), 'dd/MM/yyyy', 'en-US'),
    vessel: '',
    voyage: '',
  };

  constructor(
    public activeModal: NgbActiveModal,
    private modal: NgbModal,
    private partnerService: PartnerService,
    private portService: PortService,
    private store: Store<fromMain.MainState>
  ) {

  }

  async ngOnInit() {
    this.partners = await this.partnerService.getPartnersApi('COLOADERS');
    
    this.portService.getPortsApi().subscribe(
      (ports) => {
        this.ports = ports;
      }
    )
    const ports$ = this.portService.getPortsApi();
    this.action = this.partner.action ? this.partner.action : 'ADD';
    // initial for edit
    if(this.action === 'EDIT') {
      this.currentLine = this.partners.find(
        value => value.partnerID === this.partner.partnerID
      );
      console.log(this.ports);
      
      ports$.subscribe(
        (ports) => {
          this.vesselPol = ports.find(
            value => value.portID === this.partner.portofLoading
          );
        }
      )
      // console.log(this.partner.etd);
      let etdFormat = this.partner.etd.split("/").reverse().join("-")
      this.vesselEtd  = formatDate(etdFormat, 'yyyy-MM-dd', 'en-US');
      ports$.subscribe(
        (ports) => {
          this.vesselPod = ports.find(
            value => value.portID === this.partner.portofDischarge
          )
        }
      )
      let etaFormat = this.partner.eta.split("/").reverse().join("-")
      this.vesselEta = formatDate(etaFormat, 'yyyy-MM-dd', 'en-US');
      let routeTransitEDit = this.partner.routeTransit;
      ports$.subscribe(
        (ports) => {
          this.vesselPortofDischarge = ports.find(
            value => value.portID === routeTransitEDit[0].portofTransit
          );
        }
      )
      let etaToTransitPortFormat = routeTransitEDit[0].etaToTransitPort ? routeTransitEDit[0].etaToTransitPort.split("/").reverse().join("-") : '';
      this.routeTransitEtaToTransitPort = etaToTransitPortFormat;
      this.routeTransit.vessel = routeTransitEDit[0].vessel;
      this.routeTransit.voyage = routeTransitEDit[0].voyage;
      this.vessel.active = this.partner.active;
      this.vessel.notes = this.partner.notes;
      this.routeTransit.index = routeTransitEDit[0].index;
    }
  }

  async setValue() {
    // this.partner.partnerNameAbbr = this.partnerNameAbbr != null ? this.partnerNameAbbr.partnerID : '';
  }
  

  save() {
    if(this.action === 'ADD') {
      var uuid = require("uuid");
      var _id = uuid.v4();
      this.vessel._id = _id;
      let index =  1;
      let portofTransit =  this.vesselPortofDischarge ? this.vesselPortofDischarge.portID : null;
      let etaToTransitPort = this.routeTransitEtaToTransitPort ? formatDate(this.routeTransitEtaToTransitPort, 'dd/MM/yyyy', 'en-US') : formatDate(new Date(), 'dd/MM/yyyy', 'en-US');
      let vessel =  this.routeTransit.vessel ? this.routeTransit.vessel : '';
      let voyage =  this.routeTransit.voyage ? this.routeTransit.voyage : '';
      let portofDischarge = this.vesselPortofDischarge ? this.vesselPortofDischarge.portID : null;
      let aRouteTransit = new RouteTransit(index, portofTransit, portofDischarge, etaToTransitPort, vessel, voyage);
      this.vessel.partnerID = this.currentLine ? this.currentLine.partnerID : null;
      this.vessel.creator = 'ADMIN';
      this.vessel.portofLoading = this.vesselPol ? this.vesselPol.portID : null;
      this.vessel.portofDischarge = this.vesselPod ? this.vesselPod.portID : null;
      this.vessel.etd = this.vesselEtd ? formatDate(this.vesselEtd, 'dd/MM/yyyy', 'en-US') : this.vessel.etd;
      this.vessel.eta = this.vesselEta ? formatDate(this.vesselEta, 'dd/MM/yyyy', 'en-US') : this.vessel.eta;
      this.vessel.routeTransit = [ aRouteTransit ];
      this.vessel.notes = this.vessel.notes;
      this.vessel.active = this.vessel.active;

      let dialogResult = MessageBox.show(this.modal, 'Do you want to save data ?', 'Confirm', MessageBoxButtons.yesNoCancel, MessageBoxIcons.question);
      dialogResult.then(async (result) => {
        if (result === 'YES') {
          this.store.dispatch(new VesselActions.StoreVessels(this.vessel));
          // this.store.dispatch(new VesselActions.AddVessel(this.vessel));
          let vesselView = <VesselView>Object.assign({action: 'ADD'}, this.vessel);
          
          this.activeModal.close(vesselView);
        }
        else if (result === 'NO') {
          this.activeModal.close(this.vessel);
        }
        else if (result === 'CANCEL') {
        }
      })

    } else {
      this.vessel._id = this.partner._id;
      let routeTransitEDit = this.partner.routeTransit;
      let index =  routeTransitEDit[0].index;
      let portofTransit =  this.vesselPortofDischarge ? this.vesselPortofDischarge.partnerID : routeTransitEDit[0].portofTransit;
      let etaToTransitPort = this.routeTransitEtaToTransitPort ? 
                              formatDate(this.routeTransitEtaToTransitPort, 'dd/MM/yyyy', 'en-US') : 
                              formatDate(routeTransitEDit[0].etaToTransitPort, 'dd/MM/yyyy', 'en-US');
      let vessel =  this.routeTransit.vessel ? this.routeTransit.vessel : routeTransitEDit[0].vessel;
      let voyage =  this.routeTransit.voyage ? this.routeTransit.voyage : routeTransitEDit[0].voyage;
      let portofDischarge = this.vesselPortofDischarge ? this.vesselPortofDischarge.partnerID : null;
      let aRouteTransit = new RouteTransit(index, portofTransit, portofDischarge, etaToTransitPort, vessel, voyage);
      this.vessel.partnerID = this.currentLine ? this.currentLine.partnerID : this.partner.partnerID;
      this.vessel.creator = 'ADMIN';
      this.vessel.portofLoading = this.vesselPol ? this.vesselPol.portID : this.partner.portofLoading;
      this.vessel.portofDischarge = this.vesselPod ? this.vesselPod.portID : this.partner.portofDischarge;
      this.vessel.etd = this.vesselEtd ? formatDate(this.vesselEtd, 'dd/MM/yyyy', 'en-US') : formatDate(this.partner.etd, 'dd/MM/yyyy', 'en-US');
      
      this.vessel.eta = this.vesselEta ? formatDate(this.vesselEta, 'dd/MM/yyyy', 'en-US') : formatDate(this.partner.eta, 'dd/MM/yyyy', 'en-US');
      this.vessel.routeTransit = [ aRouteTransit ];
      this.vessel.notes = this.vessel.notes ? this.vessel.notes : this.partner.notes;
      this.vessel.active = this.vessel.active ? this.vessel.active : this.partner.active;

      let dialogResult = MessageBox.show(this.modal, 'Do you want to save data ?', 'Confirm', MessageBoxButtons.yesNoCancel, MessageBoxIcons.question);
      dialogResult.then(async (result) => {
        if (result === 'YES') {
          this.store.dispatch(new VesselActions.UpdateVessel(this.vessel));
          let vesselView = <VesselView>Object.assign({action: 'EDIT'}, this.vessel);
          
          this.activeModal.close(vesselView);
          
        }
        else if (result === 'NO') {
          this.activeModal.close(this.vessel);
        }
        else if (result === 'CANCEL') {
        }
      })
    }
  }
  onSubmit() {

  }

//   onCancel() {
//     // this.router.navigate(['../'], { relativeTo: this.route });
//   }

  ngOnDestroy() {
  }

  async close() {
    // await this.setValue();
    let dialogResult = MessageBox.show(this.modal, 'Do you want to save data ?', 'Confirm', MessageBoxButtons.yesNoCancel, MessageBoxIcons.question);
      dialogResult.then(async (result) => {
        if (result === 'YES') {
          // await this.saveData();
          // this.activeModal.close(this.carrier);
        }
        else if (result === 'NO') {
          this.activeModal.close(this.partner);
        }
        else if (result === 'CANCEL') {
        }
      })
  }

  validData() {
    var isValid = true;
    var message = '';
    // if (this.partner.website === undefined || !isWebsite(this.partner.website)) {
    //   isValid = false;
    //   message = "The field Website not correct format !";
    // }
    // if (this.partner.email === undefined || !isEmail(this.partner.email)) {
    //   isValid = false;
    //   message = "The field Email not correct format !";
    // }
    if (this.partner.email === null || this.partner.email === '') {
      isValid = false;
      message = "The field Email can't be empty !";
    }
    if (this.partner.homePhone == null || this.partner.homePhone === '') {
      isValid = false;
      message = "The field Phone 1 can't be empty !";
    }
    if (this.partner.city == null || this.partner.city === '') {
      isValid = false;
      message = "The field City can't be empty !";
    }
    if (this.partner.country == null || this.partner.country === '') {
      isValid = false;
      message = "The field Country can't be empty !";
    }
    // if (this.addressEN == null || this.addressEN === '') {
    //   isValid = false;
    //   message = "The field Main Addr (EN) can't be empty !";
    // }
    if (this.partner.partnerNameFullEN == null || this.partner.partnerNameFullEN === '') {
      isValid = false;
      message = "The field Name (Full-EN) can't be empty !";
    }
    if (this.partner.partnerNameAbbr == null || this.partner.partnerNameAbbr === '') {
      isValid = false;
      message = "The field Name (Abbr) can't be empty !";
    }

    return { isValid: isValid, message: message };
  }
  
}
