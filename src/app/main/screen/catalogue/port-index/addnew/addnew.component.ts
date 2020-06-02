import { Component, OnInit, Input, ViewEncapsulation } from "@angular/core";
import { NgbActiveModal, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { CityService } from "src/app/main/model/city/city.service";
import { CountryService } from "src/app/main/model/country/country.service";
import { serviceService } from "src/app/main/model/service/service.service";
import { Port } from "src/app/main/model/port/port";
import {
  MessageBox,
  MessageBoxButtons,
  MessageBoxIcons,
} from "src/app/form/message/messsage";
import { PortService } from "src/app/main/model/port/port.service";
import { ZoneService } from "src/app/main/model/zone/zone.service";
@Component({
  selector: "addnewport",
  templateUrl: "./addnew.component.html",
  styleUrls: ["./addnew.component.css"],
  encapsulation: ViewEncapsulation.None,
})
export class AddNewPortComponent implements OnInit {
  @Input() action: string;
  @Input() data;
  cityapi;
  disable;
  countryapi;
  zoneApi;
  serviceapi;
  isLoading = true;
  city;
  country;
  zone;
  port ;
  valid = {
    portID: false,
    portName: false,
    city: false,
    country: false,
  };
  constructor(
    public activeModal: NgbActiveModal,
    public cityService: CityService,
    public countryService: CountryService,
    public serviceService: serviceService,
    private modal: NgbModal,
    public portService: PortService,
    public zoneService: ZoneService
  ) {
    // this.serviceService.getService().subscribe((res) => {
    //   this.serviceapi = res;
    // });
    // this.zoneService.getAllZone().subscribe((res) => (this.zoneApi = res));
  }

  async ngOnInit() {
    
    // this.cityapi= await this.cityService.getCitiesApi()
    // this.countryapi = await this.countryService.getCountriesApi()
    if (this.data) {
      this.port = Object.assign({}, this.data);
      // this.portService.getPortApi(this.data).subscribe(res=>{this.port=res;
      //   console.log(this.port)
      //   // this.country = this.countryapi.find(
      //   //   value => value.countryID === this.port.country
      //   // );
      //   // this.city = this.cityapi.find(
      //   //   value => value.cityID === this.port.city
      //   // );
      // })
    }
    if (this.action == "View") {
      this.disable = true;
      this.port = Object.assign({}, this.data);
    }
    this.isLoading = false;
  }

  validData() {
    var isValid = true;
    var message = "";
    if (this.port.country == null || this.port.country == "") {
      isValid = false;
      message = "The field Country can't be empty !";
    }
    if (this.port.city == null || this.port.city == "") {
      isValid = false;
      message = "The field City can't be empty !";
    }
    if (this.port.portName == null || this.port.portName == "") {
      isValid = false;
      message = "The field Port Name can't be empty !";
    }
    if (this.port.portID == null || this.port.portID == "") {
      isValid = false;
      message = "The field Port Code can't be empty !";
    }

    return { isValid: isValid, message: message };
  }
  setValue4Save() {
    this.port.city = this.port.city.cityID;
    this.port.country = this.port.country.countryID;
    // this.zoneService.getAllZone().subscribe((res) => {
    //   const a = res.find((value) => value.zoneID === this.port.zone);
    //   this.port.zoneName = a.zoneName;
    // });
  }
  setValue4View() {
    // this.port.cityName=this.city.cityName
    // this.port.countryName=this.country.countryName
  }
  cancel() {
    this.activeModal.dismiss();
  }
  save() {
    var validData = this.validData();
    if (validData.isValid) {
      if (this.action == "Add New") {
        this.setValue4Save();
        this.portService.addPortsApi(this.port).subscribe((res) => {
          if (res.value == false) {
            let dialogResult = MessageBox.show(
              this.modal,
              res.message,
              "Alert",
              MessageBoxButtons.ok,
              MessageBoxIcons.warning
            );
            dialogResult.then((result) => {});
          } else {
            let dialogResult = MessageBox.show(
              this.modal,
              "Successfully saved!",
              "Notification",
              MessageBoxButtons.ok,
              MessageBoxIcons.information
            );
            dialogResult.then((result) => {
              this.setValue4View();
              console.log(this.port);
              this.activeModal.close(this.port);
            });
          }
        });
      } else if (this.action == "Edit") {
        this.setValue4Save();
        console.log(this.port);
        this.portService.upPortApi(this.port).subscribe((res) => {
          if (res.value == false) {
            let dialogResult = MessageBox.show(
              this.modal,
              res.message,
              "Alert",
              MessageBoxButtons.ok,
              MessageBoxIcons.warning
            );
            dialogResult.then((result) => {});
          } else {
            let dialogResult = MessageBox.show(
              this.modal,
              "Successfully saved!",
              "Notification",
              MessageBoxButtons.ok,
              MessageBoxIcons.information
            );
            dialogResult.then((result) => {
              this.setValue4View();

              this.activeModal.close(this.port);
            });
          }
        });
      }
    } else {
      let dialogResult = MessageBox.show(
        this.modal,
        validData.message,
        "Alert",
        MessageBoxButtons.ok,
        MessageBoxIcons.warning
      );
      dialogResult.then((result) => {});
    }
  }
  delete() {
    let dialogResult = MessageBox.show(
      this.modal,
      "Do you want to delete!",
      "Confirm",
      MessageBoxButtons.yesNo,
      MessageBoxIcons.question
    );
    dialogResult.then(async (result) => {
      if (result === "YES") {
        this.portService.delPortApi(this.port).subscribe((resApi) => {
          if (resApi.value == true) {
            MessageBox.show(
              this.modal,
              "Successfully Delete!",
              "Notification",
              MessageBoxButtons.ok,
              MessageBoxIcons.information
            );
            this.port.portID = "Delete";
            this.activeModal.close(this.port);
          } else {
            let dialogResult = MessageBox.show(
              this.modal,
              resApi.message,
              "Alert",
              MessageBoxButtons.ok,
              MessageBoxIcons.warning
            );
            dialogResult.then((result) => {});
          }
        });
      }
    });
  }
  close() {
    let dialogResult = MessageBox.show(
      this.modal,
      "Do you want to save data ?",
      "Confirm",
      MessageBoxButtons.yesNoCancel,
      MessageBoxIcons.question
    );
    dialogResult.then(async (result) => {
      if (result === "YES") {
        this.save();
      } else if (result === "NO") {
        this.activeModal.dismiss();
      } else if (result === "CANCEL") {
      }
    });
  }
}
