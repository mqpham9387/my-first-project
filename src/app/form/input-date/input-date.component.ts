import { Component, forwardRef, Input,Output,EventEmitter } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { NgbDateStruct, NgbDateParserFormatter, NgbDatepickerConfig } from '@ng-bootstrap/ng-bootstrap';
import { padNumber, isNumber, toInteger } from './util';
import { formatDate } from '@angular/common';

@Component({
  selector: 'of1-input-date',
  templateUrl: './input-date.component.html',
  styleUrls: ['./input-date.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputDateComponent),
      multi: true
    }
  ]
})
export class InputDateComponent implements ControlValueAccessor {
  @Input() public disabled = false;
  @Input() public yearAgo: number = 0;
  @Input() public fromDate: string
  @Output() public onComplete: EventEmitter<any> = new EventEmitter();
  @Input() public toDate: string
  @Input() placementErr = 'right';
  @Input() placement = 'bottom';

  inputDate: NgbDateStruct;
  onChange: any = () => { };
  minDate
  maxDate
  public isDate: boolean = true;
  runOnComplete(): void {
    this.onComplete.emit();
  }
  constructor(
    private dateformatter: NgbDateParserFormatter,
    // public config: NgbDatepickerConfig (old code)
  ) { }

  ngOnInit() {
    if (this.yearAgo === 0) {
      // this.config.minDate = this.dateformatter.parse(this.fromDate);
      this.minDate = this.dateformatter.parse(this.fromDate);
      // this.config.maxDate = this.dateformatter.parse(this.toDate);
      this.maxDate = this.dateformatter.parse(this.toDate);
      // this.config.outsideDays = 'hidden'; console.log(this.config.minDate)
         }
    else {
      let today = new Date();
      let dayago = new Date(today.getFullYear() - this.yearAgo, 1, 1)
      // this.config.minDate = this.dateformatter.parse(formatDate(dayago, 'dd/MM/yyyy', 'en-US'));
      // this.config.maxDate = this.dateformatter.parse(formatDate(today, 'dd/MM/yyyy', 'en-US'));
      // this.config.outsideDays = 'hidden';
    }
  }

  get value() {
    return this.inputDate;
  }

  set value(value) {
    if (value !== undefined) {
      this.inputDate = value;
      this.onChange(this.formatSet(this.inputDate));
    }
  }

  registerOnChange(fn) {
    this.onChange = fn;
  }

  registerOnTouched() {
  }

  writeValue(value) {
    if (value !== undefined) {
      this.inputDate = this.formatGet(value)
    }
  }

  onDateBlur(event) {
    var newValue = event.target.value.trim();
    if (newValue !== '') {
      var res = this.dateformatter.parse(newValue);
      if (res === null) {
        this.isDate = false;
      }
      else {
        this.isDate = true;
        this.inputDate = res;
      }
    }
    else {
      this.isDate = true;
      this.inputDate = newValue;
    }
    this.onChange(this.isDate ? this.formatSet(this.inputDate) : undefined);
  }

  formatGet(value: string): NgbDateStruct {
    if (value) {
      const dateParts = value.trim().split('-');
      if (dateParts.length === 1 && isNumber(dateParts[0])) {
        return { year: toInteger(dateParts[0]), month: null, day: null };
      } else if (dateParts.length === 2 && isNumber(dateParts[0]) && isNumber(dateParts[1])) {
        return { year: toInteger(dateParts[0]), month: toInteger(dateParts[1]), day: null };
      } else if (dateParts.length === 3 && isNumber(dateParts[0]) && isNumber(dateParts[1]) && isNumber(dateParts[2])) {
        return { year: toInteger(dateParts[0]), month: toInteger(dateParts[1]), day: toInteger(dateParts[2]) };
      }
      return null
    }
    return null;
  }

  formatSet(date: NgbDateStruct): string {
    return date ?
      `${isNumber(date.year) ? date.year + '-' : ''}${isNumber(date.month) ? padNumber(date.month) + '-' : ''}${isNumber(date.day) ? padNumber(date.day) : ''}` :
      '';
  }
}
