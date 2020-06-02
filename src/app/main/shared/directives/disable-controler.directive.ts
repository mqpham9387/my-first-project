import { NgControl } from '@angular/forms';
import { Input, Directive } from '@angular/core';

@Directive({
    selector: '[disableControl]'
})
export class DisableControlDirective {

    @Input() set disableControl(condition: boolean) {
        const action = condition ? 'disable' : 'enable';
        if(this.ngControl.control !== undefined) {
            this.ngControl.control[action]();
        }
    }

    constructor(private ngControl: NgControl) {
    }

}