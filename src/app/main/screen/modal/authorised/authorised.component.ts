import { Component, OnInit, Input } from "@angular/core";
import { NgbActiveModal, NgbModal } from "@ng-bootstrap/ng-bootstrap";

import { ContactService } from "src/app/main/model/contact/contact.service";
import { CustomHeader } from "src/app/main/common/ag-grid-header-custom";
import {
  MessageBox,
  MessageBoxButtons,
  MessageBoxIcons,
} from "src/app/form/message/messsage";

@Component({
  selector: "app-authorised",
  templateUrl: "./authorised.component.html",
  styleUrls: ["./authorised.component.css"],
})
export class AuthorisedComponent implements OnInit {
  @Input() data;
  @Input() action;
  @Input() rowDataAuthor;

  public isLoading = true;

  columnDefs;
  rowData;
  defaultColDef;
  frameworkComponents;
  gridApi;
  components

  constructor(
    public modal: NgbModal,
    public activeModal: NgbActiveModal,
    public contactService: ContactService
  ) {
    this.columnDefs = [
      {
        headerName: "ID",
        field: "contactID",
        width: 130,
        sortable: true,
        filter: true,
      },
      {
        headerName: "Name",
        field: "contactName",
        width: 400,
        sortable: true,
        filter: true,
      },
    ];
    this.defaultColDef = {
      width: 120,
      headerComponentParams: { menuIcon: "fas fa-filter" },
      sortable: true,
      resizable: true,
      filter: true,
      filterParams: {
        debounceMs: 800,
        suppressAndOrCondition: true,
      },
      cellStyle: {
        "text-align": "center",
        "border-left": "1px dotted skyblue",
      },
    };
    this.frameworkComponents = { agColumnHeader: CustomHeader };
    this.components = {
      loadingRenderer: function (params) {
        if (params.value !== undefined) {
          return params.value;
        } else {
          return `<div class="spinner-border spinner-border-sm"  role="status">
          <span class="sr-only">Loading...</span>
        </div>`;
        }
      },
    };
  }

  async ngOnInit() {
    // this.rowData = await this.contactService.getContactsApi();

    this.isLoading = false;
  }

  valided(event) {
    let index = this.rowDataAuthor.findIndex(
      (value) => value.contactID === event.data.contactID
    );
    if (index > -1) {
      let dialogResult = MessageBox.show(
        this.modal,
        "Already have this Contact Name",
        "Alert",
        MessageBoxButtons.ok,
        MessageBoxIcons.warning
      );
      dialogResult.then((result) => {});
    } else {
      this.data.contactName = event.data.contactName;
      this.data.contactID = event.data.contactID;
      this.activeModal.close(this.data);
    }
  }

  addNew() {}

  edit() {}
  onGridReady(params) {
    this.gridApi = params.api;
    {
      let dataSource = {
        getRows: (params) => {
          {
            if (params.sortModel[0]) {
              params.sortModel[0].sort = params.sortModel[0].sort.toUpperCase();
            }
            this.contactService
              .getContacts(params)
              .subscribe((results: any) => {
                let totalRows = results.totalRows;
                params.successCallback(results.results, totalRows);
              });
          }
        },
      };
      this.gridApi.setDatasource(dataSource);
    }
  }
}
