import { CommonModule } from '@angular/common';
import {
  Component,
  HostListener,
  Input,
  Output,
  EventEmitter
} from '@angular/core';

@Component({
  selector: 'app-mcv-date-range-picker',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './mcv-date-range-picker.html'
})
export class McvDateRangePicker {

  // ✅ INPUT
  @Input() disabled = false;

  @Input() set value(val: { start: Date | null; end: Date | null } | null) {
    if (val) {
      this.start = val.start;
      this.end = val.end;
    }
  }

  // ✅ OUTPUT
  @Output() statusChange = new EventEmitter<{
    start: Date | null;
    end: Date | null;
  }>();

  show = false;
  current = new Date();
  days: Date[] = [];

  start: Date | null = null;
  end: Date | null = null;

  months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  constructor() {
    this.buildCalendar();
  }

  toggle() {
    if (this.disabled) return;
    this.show = !this.show;
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

    // Emit selected range
    this.statusChange.emit({
      start: this.start,
      end: this.end
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
