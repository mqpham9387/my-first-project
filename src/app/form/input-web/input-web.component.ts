import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'of1-input-web',
  templateUrl: './input-web.component.html',
  styleUrls: ['./input-web.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputWebComponent),
      multi: true
    }
  ]
})
export class InputWebComponent implements ControlValueAccessor {
  @Input() placement = 'right';

  inputWeb: string;
  onChange: any = () => { };

  public isWeb: boolean = true;

  constructor() { }

  get value() {
    return this.inputWeb;
  }

  set value(value) {
    if (value !== undefined) {
      this.inputWeb = value;     
    }
  }

  registerOnChange(fn) {
    this.onChange = fn;
  }

  registerOnTouched() {
  }

  writeValue(value) {
    if (value !== undefined) {
      this.inputWeb = value
    }
  }

  onWebBlur(event) {
    var newValue = event.target.value.trim();
    if (newValue !== '') {
      var res = newValue.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);;
      if (res === null) {
        this.isWeb = false;       
      }
      else {
        this.isWeb = true;
        this.inputWeb = res[0];
      }
    }
    this.onChange(this.isWeb ? this.inputWeb : undefined );
  }
}
