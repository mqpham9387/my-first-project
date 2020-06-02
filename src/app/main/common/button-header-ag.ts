import { Component } from '@angular/core';
import { IHeaderAngularComp} from 'ag-grid-angular';

//------------------------------------------------------------------------------
@Component({
  template: `<div style="font-size:18px;margin-left:-11px">
    <button (click)='onClick($event)'><i style="color:#4C4CFF" class="fas fa-plus"></i></button>
    <button (click)='onClick1($event)' ><i style="color:#008000" class="fas fa-save"></i></button>
    <button (click)='onClick2($event)' ><i class="fas fa-times"></i></button>
    </div>
    `
})
export class GridHeaderActionsComponent implements IHeaderAngularComp {
//------------------------------------------------------------------------------
params
agInit(params): void {
    this.params = params;
}
//------------------------------------------------------------------------------
onClick($event) {

    if (this.params.onClick instanceof Function) {

      const params = {
        event: $event,
        params: this.params,

      }

      this.params.onClick(params);

    }

  }
  onClick1($event) {

    if (this.params.onClick1 instanceof Function) {

      const params = {
        event: $event,
        params: this.params,

      }

      this.params.onClick1(params);

    }

  }
  onClick2($event) {

    if (this.params.onClick2 instanceof Function) {

      const params = {
        event: $event,
        params: this.params,

      }

      this.params.onClick2(params);

    }

  }
//------------------------------------------------------------------------------
}


//------------------------------------------------------------------------------
@Component({
  template: `<div style="font-size:18px;margin-left:20px">
    <button style="width:100%" (click)='onClick($event)'><i style="color:#4C4CFF; " class="fas fa-plus"></i></button>
    </div>
    `
})
export class GridHeaderActions2Component implements IHeaderAngularComp {
//------------------------------------------------------------------------------
params
agInit(params): void {
    this.params = params;
}
//------------------------------------------------------------------------------
onClick($event) {

    if (this.params.onClick instanceof Function) {

      const params = {
        event: $event,
        params: this.params,

      }

      this.params.onClick(params);

    }

  }

//------------------------------------------------------------------------------
}
