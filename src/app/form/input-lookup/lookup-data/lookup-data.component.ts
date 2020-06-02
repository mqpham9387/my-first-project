import { Component, OnInit, Input } from '@angular/core';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CustomHeader } from 'src/app/main/common/ag-grid-header-custom';

@Component({
  selector: 'app-lookup-data',
  templateUrl: './lookup-data.component.html',
  styleUrls: ['./lookup-data.component.css']
})
export class LookupDataComponent implements OnInit {
  @Input() columnDefs;
  @Input() rowData;
  @Input() class;
  @Input() single;
  defaultColDef;
  frameworkComponents;

  constructor(
    public activeModal: NgbActiveModal
  ) { 
    this.defaultColDef = {
      width: 120,
      headerComponentParams: { menuIcon: "fas fa-filter" },
      sortable: true,
      resizable: true,
      filter: true
    };
    this.frameworkComponents = { agColumnHeader: CustomHeader };
  } 

  ngOnInit() {
  }

  valided(event) {
    console.log(event.data);
    this.activeModal.close(event.data);
  }

}
