import { Component, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { ICellRendererAngularComp } from 'ag-grid-angular';

@Component({
  template: `
    <div class="row pl-4">
        <a type="button" (click)="copyClick($event)">Copy</a>
    </div>
    `
})
export class LinkColumnRenderComponent implements ICellRendererAngularComp {
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
