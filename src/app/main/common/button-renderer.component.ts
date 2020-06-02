import { Component } from "@angular/core";
import { ICellRendererAngularComp } from "ag-grid-angular";

@Component({
  selector: "app-button-renderer",
  template: `
    <div *ngIf="params.data?.rowStatus != 'ADD'">
      <a
        type="button"
        style="width:50%;text-decoration: underline"
        (click)="onClick($event)"
        >Edit</a
      >
      <a
        type="button"
        style="width:50%;text-decoration: underline"
        (click)="onClick1($event)"
        >Delete</a
      >
      <div></div>
    </div>
    <div *ngIf="params.data?.rowStatus == 'ADD'">
      <a
        type="button"
        style="width:50%;text-decoration: underline"
        (click)="onClick3($event)"
        >Add</a
      >
      <a
        type="button"
        style="width:50%;text-decoration: underline"
        (click)="onClick4($event)"
        >Cancel</a
      >
      <div></div>
    </div>
  `,
})
export class ButtonRendererComponent implements ICellRendererAngularComp {
  params;
  label: string;

  agInit(params): void {
    this.params = params;
    this.label = this.params.label || null;
    if (this.params.data.rowStatus == "ADD") {
      console.log("aa");
    }
  }

  refresh(params?: any): boolean {
    return true;
  }

  onClick($event) {
    if (this.params.onClick instanceof Function) {
      const params = {
        event: $event,
        params: this.params,
      };

      this.params.onClick(params);
    }
  }
  onClick1($event) {
    if (this.params.onClick1 instanceof Function) {
      const params = {
        event: $event,
        params: this.params,
        // ...something
      };
      this.params.onClick1(params);
    }
  }
  onClick3($event) {
    if (this.params.onClick3 instanceof Function) {
      const params = {
        event: $event,
        params: this.params,
        // ...something
      };
      this.params.onClick3(params);
    }
  }
  onClick4($event) {
    if (this.params.onClick4 instanceof Function) {
      const params = {
        event: $event,
        params: this.params,
        // ...something
      };
      this.params.onClick4(params);
    }
  }
}
