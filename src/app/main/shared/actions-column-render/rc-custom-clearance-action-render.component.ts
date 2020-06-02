import { Component, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { ICellRendererAngularComp } from 'ag-grid-angular';

@Component({
  template: `
    <div class="row pl-4">
        <div ngIf="params.isEdit">
            <a type="button" (click)="editClick($event)">Edit</a>  | &nbsp;
        </div>
        <div ngIf="params.isDelete">
            <a type="button" (click)="deleteClick($event)">Delete</a>  | &nbsp;
        </div>
        <div tooltip="tootip on top" placement="top" delay="500">
          <a type="button" (click)="copyClick($event)">Copy</a>
        </div>
    </div>
    `
})
export class RcCustomClearanceActionRenderComponent implements ICellRendererAngularComp {
  params: any;

  constructor() {}

  agInit(params: any): void {
    this.params = params;
  }

  refresh(params: any): boolean {
    return true;
  }


  addQuotaionClick($event) {

    if (this.params.addQuotaionClick instanceof Function) {

      const params = {
        event: $event,
        params: this.params,

      };

      this.params.addQuotaionClick(params);

    }

  }
  editClick($event) {
    if (this.params.editClick instanceof Function) {

      const params = {
        event: $event,
        params: this.params
        // ...something
      }
      this.params.editClick(params);

    }

  }
  deleteClick($event) {

    if (this.params.deleteClick instanceof Function) {

      const params = {
        event: $event,
        params: this.params,

      }

      this.params.deleteClick(params);

    }

  }
  bookClick($event) {

    if (this.params.bookClick instanceof Function) {

      const params = {
        event: $event,
        params: this.params,

      }

      this.params.bookClick(params);

    }
  }

  copyClick($event) {
    if (this.params.copylick instanceof Function) {
      const params = {
        event: $event,
        params: this.params,
      }
      this.params.deleteClick(params);
    }
  }
}
