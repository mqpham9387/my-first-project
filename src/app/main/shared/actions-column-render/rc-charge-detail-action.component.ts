import { Component, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { ICellRendererAngularComp } from 'ag-grid-angular';

@Component({
  template: `
    <div *ngIf="params.data?.status">
      <a type="button"  (click)="insertDetailClick($event)">Insert</a>
    </div>
    <a type="button"  (click)="editClick($event)">Edit</a> | &nbsp;
    <a type="button"  (click)="deleteClick($event)">Delete</a>
    `
})
export class RcChargeDetailActionComponent implements ICellRendererAngularComp {

  params: any;
  isDisabled = false;

  constructor() { }

  agInit(params: any): void {
    this.params = params;
    console.log(params.data.status);
  }

  refresh(params: any): boolean {
    return true;
  }

  insertDetailClick($event: any) {
    if (this.params.insertDetailClick instanceof Function) {

        const params = {
          event: $event,
          params: this.params
        }

        this.params.insertDetailClick(params);
      }
  }

  editClick($event: any) {
    if (this.params.editClick instanceof Function) {

      const params = {
        event: $event,
        params: this.params
        // ...something
      }
      this.params.editClick(params);

    }

  }
  deleteClick($event: any) {
    if (this.params.deleteClick instanceof Function) {
      const params = {
        event: $event,
        params: this.params,
      }
      this.params.deleteClick(params);
    }
  }
}
