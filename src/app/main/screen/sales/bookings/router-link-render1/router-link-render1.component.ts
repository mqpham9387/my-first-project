import { Component, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { ICellRendererAngularComp } from 'ag-grid-angular';

@Component({
    template: `
    <a type="button"  (click)="copyClick($event)">Copy</a>  |
    <a type="button"  (click)="editClick($event)">Edit</a>  |
    <a type="button"  (click)="cancelClick($event)">Cancel</a>
    `
})
export class RouterLinkRenderer1Component implements ICellRendererAngularComp {
    params: any;

    constructor() { }

    agInit(params: any): void {
        this.params = params;
    }

    refresh(params: any): boolean {
        return true;
    }


    copyClick($event) {

        if (this.params.copyClick instanceof Function) {

          const params = {
            event: $event,
            params: this.params,

          }

          this.params.copyClick(params);

        }

      }
      editClick($event){
        if (this.params.editClick instanceof Function) {


          const params = {
            event: $event,
            params: this.params
            // ...something
          }
          this.params.editClick(params);

         }
      }
      cancelClick($event){
        if (this.params.editClick instanceof Function) {


          const params = {
            event: $event,
            params: this.params
            // ...something
          }
          this.params.cancelClick(params);

         }
      }

}
