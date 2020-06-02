import { Component, ViewChild, ElementRef } from "@angular/core";

@Component({
  selector: "app-loading-overlay",
  template: `
    <div class="customHeaderLabel">
      <span
        *ngIf="params.enableMenu"
        #menuButton
        class="customHeaderMenuButton"
        (click)="onMenuClicked($event)"
        ><i *ngIf="!filter" class="fa {{ params.menuIcon }}"></i
        ><i
          *ngIf="filter"
          style="color:skyblue"
          class="fa {{ params.menuIcon }}"
        ></i
      ></span>
      <span (click)="onSortRequested($event)" style="margin: 0 auto">{{
        params.displayName
      }}</span>
      <span
        *ngIf="ascSort == 'active'"
        [ngClass]="ascSort"
        class="customSortUpLabel"
        ><i class="fa fa-long-arrow-alt-up"></i
      ></span>
      <span
        *ngIf="descSort == 'active'"
        [ngClass]="descSort"
        class="customSortDownLabel"
        ><i class="fa fa-long-arrow-alt-down"></i
      ></span>
    </div>
  `,
  styles: [
    `
      ::ng-deep app-loading-overlay {
        display: flex;
        justify-content: space-between;
        flex-direction: row-reverse;
        align-items: center;
        width: 100%;
      }
      .customSortDownLabel,
      .customSortUpLabel {
        position: absolution;
        z-index: 10;
        margin: 0 0 0 3px;
      }
      .customHeaderMenuButton {
        float: left;
        margin: 0 6px 0 0;
      }
      .customHeaderLabel {
        display: flex;
        flex: 1 1 auto;
        overflow: hidden;
        align-items: center;
        text-overflow: ellipsis;
        align-self: stretch;
      }
    `,
  ],
})
export class CustomHeader {
  public params: any;
  public ascSort: string;
  public descSort: string;
  public noSort: string;

  filter=false;
  @ViewChild("menuButton", { read: ElementRef, static: false })
  public menuButton;

  agInit(params): void {
    this.params = params;
    params.column.addEventListener(
      "sortChanged",
      this.onSortChanged.bind(this)
    );
    this.onSortChanged();
    params.column.addEventListener(
      "filterChanged",
      this.onFilterChange.bind(this)
    );
    params.column.addEventListener(
      "filterModified",
      this.enterKey.bind(this)
    );
   
  }
  enterKey(e) {
    console.log(e)
    debugger
 }
  onMenuClicked(e) {
    this.params.showColumnMenu(this.menuButton.nativeElement);
 
   }

  onSortChanged() {
    this.ascSort = this.descSort = this.noSort = "inactive";
    if (this.params.column.isSortAscending()) {
      this.ascSort = "active";
    } else if (this.params.column.isSortDescending()) {
      this.descSort = "active";
    } else {
      this.noSort = "active";
    }
  }
  onFilterChange(e) {
    console.log(e);
    if(e.column.filterActive){
      this.filter = true;
    }
    else{this.filter=false}
  }
  onSortRequested(event) {
    // if (event.toElement != this.menuButton.nativeElement.firstElementChild) 
    {
      if (this.noSort == "active") {
        this.params.setSort("asc", event.shiftKey);
      } else if (this.ascSort == "active") {
        this.params.setSort("desc", event.shiftKey);
      } else if (this.descSort == "active") {
        this.params.setSort("", event.shiftKey);
      }
    }
  }
  ngOnDestroy() {
    
}
}
