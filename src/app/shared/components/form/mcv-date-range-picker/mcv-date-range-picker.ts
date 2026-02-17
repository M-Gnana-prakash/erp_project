import { CommonModule } from '@angular/common';
import {
  Component,
  HostListener,
  Input,
  Output,
  EventEmitter
} from '@angular/core';
import { McvFieldStyles } from '../form-types';

@Component({
  selector: 'app-mcv-date-range-picker',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './mcv-date-range-picker.html'
})
export class McvDateRangePicker {

  //Input
  @Input() label: string = '';
  @Input() required: boolean = false;
  @Input() disabled: boolean = false;
  @Input() needValidationStatusMessage: boolean = true;
  @Input() styles: McvFieldStyles = {};

  @Input() set value(val: { start: Date | null; end: Date | null } | null) {
    if (val) {
      this.start = val.start;
      this.end = val.end;
    }
  }

  @Output() statusChange = new EventEmitter<{
    value: { start: Date | null; end: Date | null };
    valid: boolean;
    errors: string[];
    touched: boolean;
  }>();

  show = false;
  current = new Date();
  days: Date[] = [];
  isTouched = false;
  errors: string[] = [];

  start: Date | null = null;
  end: Date | null = null;

  months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  private defaultStyles: McvFieldStyles = {
    borderStyle: '1px solid #ccc',
    selectedColor: '#3b82f6',
    backgroundColor: '#fff',
    labelColor: '#333',
    sizeVariant: 'md',
  };

  get computedStyles(): McvFieldStyles {
    return { ...this.defaultStyles, ...this.styles };
  }

  constructor() {
    this.buildCalendar();
  }

  toggle() {
    if (this.disabled) return;
    this.show = !this.show;
    if (!this.show) {
      this.isTouched = true;
      this.validate();
    }
  }

  buildCalendar() {
    const y = this.current.getFullYear();
    const m = this.current.getMonth();
    const total = new Date(y, m + 1, 0).getDate();

    this.days = Array.from({ length: total }, (_, i) =>
      new Date(y, m, i + 1)
    );
  }

  change(step: number) {
    this.current = new Date(
      this.current.getFullYear(),
      this.current.getMonth() + step,
      1
    );
    this.buildCalendar();
  }

  setMonth(monthIndex: number) {
    this.current = new Date(
      this.current.getFullYear(),
      Number(monthIndex),
      1
    );
    this.buildCalendar();
  }

  select(d: Date) {

    if (!this.start || this.end) {
      this.start = d;
      this.end = null;
    } else {
      if (d < this.start) {
        this.end = this.start;
        this.start = d;
      } else {
        this.end = d;
      }
    }

    this.isTouched = true;
    this.validate();
  }

  validate() {
    this.errors = [];
    const fieldName = this.label || 'Date Range';

    if (this.required && (!this.start || !this.end)) {
      this.errors.push(`${fieldName} is required`);
    }

    // Emit validation status
    this.statusChange.emit({
      value: { start: this.start, end: this.end },
      valid: this.errors.length === 0,
      errors: this.errors,
      touched: this.isTouched
    });
  }

  isEdge(d: Date) {
    return (
      this.start?.toDateString() === d.toDateString() ||
      this.end?.toDateString() === d.toDateString()
    );
  }

  inRange(d: Date) {
    return this.start && this.end && d > this.start && d < this.end;
  }

  format(d: Date | null) {
    return d ? d.toLocaleDateString() : '';
  }

  @HostListener('document:click', ['$event'])
  close(e: any) {
    if (!e.target.closest('.calendar-wrapper')) {
      this.show = false;
    }
  }
}
