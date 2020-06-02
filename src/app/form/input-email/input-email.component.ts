import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'of1-input-email',
  templateUrl: './input-email.component.html',
  styleUrls: ['./input-email.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputEmailComponent),
      multi: true
    }
  ]
})
export class InputEmailComponent implements ControlValueAccessor {
  @Input() placement = 'right';

  inputEmail: string;
  onChange: any = () => { };

  public isEmail: boolean = true;

  constructor() { }

  get value() {
    return this.inputEmail;
  }

  set value(value) {
    if (value !== undefined) {
      this.inputEmail = value;     
    }
  }

  registerOnChange(fn) {
    this.onChange = fn;
  }

  registerOnTouched() {
  }

  writeValue(value) {
    if (value !== undefined) {
      this.inputEmail = value
    }
  }

  onEmailBlur(event) {
    var newValue = event.target.value.trim();
    if (newValue !== '') {
      var res = newValue.match(/^(?:[a-z][a-z0-9_\.]{5,32}@[a-z0-9]{2,}(\.[a-z0-9]{2,4}){1,2}|)$/g);
      if (res === null) {
        this.isEmail = false;       
      }
      else {
        this.isEmail = true;
        this.inputEmail = res[0];
      }
    }
    else {
      this.isEmail = true;
      this.inputEmail = newValue;
    }
    this.onChange(this.isEmail ? this.inputEmail : undefined );
  }
  
}
