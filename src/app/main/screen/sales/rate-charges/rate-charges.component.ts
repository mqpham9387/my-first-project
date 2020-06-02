import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import * as fromMain from '../../../store/main.reducer';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-rate-charges',
  templateUrl: './rate-charges.component.html',
  styleUrls: ['./rate-charges.component.css']
})
export class RateChargesComponent implements OnInit, OnDestroy {

  activeNav = 1;
  currentUrl: string;
  subscription: Subscription;
  seaSubscription: Subscription;
  addNewAirSubscription: Subscription;

  constructor(
    private store: Store<fromMain.MainState>,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    console.log(this.router.url);
    this.currentUrl = this.router.url;
    const currentPath = this.currentUrl.split('/').pop();
    //  switch(currentPath) {
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
    switch(currentPath) {
      case 'air-freight':
        this.activeNav = 1;
        this.router.navigate(['air-freight'], {relativeTo: this.route});
        break;
      case 'fcl-tariff':
        this.activeNav = 2;
        this.router.navigate(['fcl-tariff'], {relativeTo: this.route});
        break;
      case 'lcl-tariff':
        this.activeNav = 3;
        this.router.navigate(['lcl-tariff'], {relativeTo: this.route});
        break;
      case 'trucking-charges':
        this.activeNav = 4;
        this.router.navigate(['trucking-charges'], {relativeTo: this.route});
        break;
      case 'customs-clearance':
        this.activeNav = 5;
        this.router.navigate(['customs-clearance'], {relativeTo: this.route});
        break;
      case 'local-charge-tariff':
        this.activeNav = 6;
        this.router.navigate(['local-charge-tariff'], {relativeTo: this.route});
        break;
      default:
        this.activeNav = 1;
        break;
    }
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
