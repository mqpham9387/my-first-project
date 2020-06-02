import { Component, OnInit } from '@angular/core';

import { Menus } from './model/menu/menu';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  menus;
  constructor(
    private router: Router
  ) {
    this.menus = Menus;
  }
  SearchbarShow = false;
  cboSearchs = [
    {
      value: 1,
      text: 'Job ID.'
    },
    {
      value: 2,
      text: 'POL'
    },
    {
      value: 3,
      text: 'POD'
    },
    {
      value: 4,
      text: 'HAWB/H-B/L'
    },
    {
      value: 5,
      text: 'CDS No.'
    },
    {
      value: 6,
      text: 'MAWB/H-B/L'
    },
    {
      value: 7,
      text: 'Booking No.'
    },
    {
      value: 8,
      text: 'Issued Invoice No.'
    },
    {
      value: 9,
      text: 'Vessel/Flight No.'
    },
    {
      value: 10,
      text: 'Container/Seal No.'
    },
    {
      value: 11,
      text: 'Cargo Manifest'
    },
    {
      value: 12,
      text: 'Arrival Notice'
    },
    {
      value: 13,
      text: 'Delivery Order'
    },
    {
      value: 14,
      text: 'Carrier'
    },
    {
      value: 15,
      text: 'Agent'
    },
    {
      value: 16,
      text: 'Shipper'
    },
    {
      value: 17,
      text: 'Consignee'
    },
    {
      value: 18,
      text: 'Creator'
    },
    {
      value: 19,
      text: 'Export (Air)'
    },
    {
      value: 20,
      text: 'Export (Consol)'
    },
    {
      value: 21,
      text: 'Export (Sea FCL)'
    },
    {
      value: 22,
      text: 'Export (Sea LCL)'
    },
    {
      value: 23,
      text: 'Express'
    },
    {
      value: 24,
      text: 'Import (Air)'
    },
    {
      value: 25,
      text: 'Import (Consol)'
    },
    {
      value: 26,
      text: 'Import (Sea FCL)'
    },
    {
      value: 27,
      text: 'Import (Sea LCL)'
    },
    {
      value: 28,
      text: 'Inland Trucking'
    },
    {
      value: 29,
      text: 'Logistics'
    },
    {
      value: 30,
      text: 'Projects'
    },
    {
      value: 31,
      text: 'Warehouse Service'
    }
  ];
  combobox = 1;
  expand = false;

  currentUrl: string;
  ngOnInit() {
  }

  redirectTo(url: string) {
    console.log(url);
    this.router.navigateByUrl("/main/" + url);
    this.currentUrl = this.router.url;
    const currentPath = this.currentUrl.split('/').pop();
    // switch(currentPath) {
    //   case 'air-freight':
    //     window.location.reload();
    //     break;
    //   case 'fcl-tariff':
    //     window.location.reload();
    //     break;
    //   case 'lcl-tariff':
    //     window.location.reload();
    //     break;
    //   case 'trucking-charges':
    //     window.location.reload();
    //     break;
    //   case 'customs-clearance':
    //     window.location.reload();
    //     break;
    //   case 'local-charge-tariff':
    //     window.location.reload();
    //     break;
    //   default:

    //     break;
    // }
  }

  ShowSearchBar() {
    this.SearchbarShow = !this.SearchbarShow;
  }

  ExpandSearch() {
    this.expand = !this.expand;
    document.getElementById("Expand").innerText = this.expand ? 'Collapse......' : 'Expand......';
  };

  SearchSubmit() {
    this.router.navigate(["search"]);
    this.CloseSearch()
  }

  CloseSearch() {
    this.SearchbarShow = false;
  }
}
