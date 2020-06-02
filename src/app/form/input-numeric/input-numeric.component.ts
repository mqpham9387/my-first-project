import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'of1-input-numeric',
  templateUrl: './input-numeric.component.html',
  styleUrls: ['./input-numeric.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputNumericComponent),
      multi: true
    }
  ]
})
export class InputNumericComponent implements ControlValueAccessor {
  @Input() minValue: number = 0;
  @Input() maxValue: number = 999999999999999;

  private decimalSeparator: string = '.';
  private thoundsandSeparator: string = ',';
  private inputNumeric: string;
  private isDecimal: boolean = false;
  onChange: any = () => { };

  constructor() { }

  ngOnInit() {
  }

  get value() {
    return this.inputNumeric;
  }

  set value(value) {
    if (value !== undefined) {
      this.inputNumeric = value;
    }
  }

  registerOnChange(fn) {
    this.onChange = fn;
  }

  registerOnTouched() {
  }

  writeValue(value) {
    if (value !== undefined) {
      this.inputNumeric = this.formatGet(value)
    }
  }

  onBlur(event) {
    let newValue = event.target.value;
    if (+newValue < this.minValue) {
      newValue = this.minValue.toString();
    }
    else if (+newValue > this.maxValue) {
      newValue = this.maxValue.toString();
    };
    console.log(newValue, this.minValue, this.maxValue);
    let decimal = this.isDecimal ? this.decimalSeparator + newValue.split(this.decimalSeparator)[1] : '';
    let number = newValue.split(this.decimalSeparator)[0];
    let numberFormat = '';
    if (number.length > 3) {
      let reverseNumber = this.reverse(number);
      for (let i = 0; i < reverseNumber.length; i++) {
        numberFormat = (((i + 1) % 3 === 0 && i < reverseNumber.length - 1) ? this.thoundsandSeparator + reverseNumber[i] : reverseNumber[i]) + numberFormat;
      }
    }
    else {
      numberFormat = number;
    }
    this.inputNumeric = numberFormat + decimal;
    this.onChange(this.formatReturn(newValue));
  }

  onKeyDown(event) {
    let e = <KeyboardEvent>event;
    if ([46, 8, 9, 27, 13, 110].indexOf(e.keyCode) !== -1 ||
      // Allow: Ctrl+A
      (e.keyCode == 65 && e.ctrlKey === true) ||
      // Allow: Ctrl+C
      (e.keyCode == 67 && e.ctrlKey === true) ||
      // Allow: Ctrl+X
      (e.keyCode == 88 && e.ctrlKey === true) ||
      // Allow: home, end, left, right
      (e.keyCode >= 35 && e.keyCode <= 39)) {
      // let it happen, don't do anything
      return;
    }
    // Allow: Decimal separator
    if (e.key === this.decimalSeparator && this.isDecimal === false) {
      this.isDecimal = true;
      return;
    }
    if (e.key === this.decimalSeparator && this.isDecimal === true) {
      e.preventDefault();
    }
    // Ensure that it is a number and stop the keypress
    if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
      e.preventDefault();
    }
  }

  formatReturn(value: string): number {
    if (value !== null && value !== '') {
      let number = +value;
      return number;
    }
    return null;
  }

  formatGet(value: number): string {
    if (value !== null) {
      let newValue = value.toString();
      let decimal = this.isDecimal ? this.decimalSeparator + newValue.split(this.decimalSeparator)[1] : '';
      let number = newValue.split(this.decimalSeparator)[0];
      let numberFormat = '';
      if (number.length > 3) {
        let reverseNumber = this.reverse(number);
        for (let i = 0; i < reverseNumber.length; i++) {
          numberFormat = (((i + 1) % 3 === 0 && i < reverseNumber.length - 1) ? this.thoundsandSeparator + reverseNumber[i] : reverseNumber[i]) + numberFormat;
        }
      }
      else {
        numberFormat = number;
      }
      return numberFormat + decimal;
    }
    return '';
  }

  reverse(s) {
    return s.split("").reverse().join("");
  }
}
