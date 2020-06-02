import { Component, OnInit,ViewEncapsulation  } from '@angular/core';
import {NgbActiveModal , NgbAccordion} from '@ng-bootstrap/ng-bootstrap';

    import { from } from 'rxjs';
@Component({
    selector: 'updateRates',
    templateUrl: './updateRates.component.html',
    styleUrls: ['./updateRates.component.css']
})
export class updateRatesComponent implements OnInit {
    updateFrom;
    constructor(public activeModal: NgbActiveModal,) { }

    ngOnInit(): void { }
}
