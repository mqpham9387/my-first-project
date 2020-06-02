import { Component, ViewChild, ViewContainerRef, AfterViewInit } from "@angular/core";
import { ICellRendererAngularComp, ICellEditorAngularComp } from "ag-grid-angular";

@Component({
  selector: "app-button-renderer",
  template: `

    <div  style="margin-top:-1px">

      <of1-input-lookup2  [class]="class" [(ngModel)]="params.value">
      </of1-input-lookup2>
    </div>
  `,
})
export class ButtonRenderer2Component implements ICellEditorAngularComp, AfterViewInit {
  params;
  disable;
  class;
  @ViewChild('container', { read: ViewContainerRef }) public container;


  // dont use afterGuiAttached for post gui events - hook into ngAfterViewInit instead for this
  ngAfterViewInit() {
    // window.setTimeout(() => {
    //   this.container.element.nativeElement.focus();
    // });
  }
  agInit(params): void {
    this.params = params;
    this.disable = this.params.label || null;
    this.class = this.params.class || null
    console.log(params);

  }

  refresh(params?: any): boolean {
    return true;
  }
  getValue(): any {


 return this.params.value

  }

}
