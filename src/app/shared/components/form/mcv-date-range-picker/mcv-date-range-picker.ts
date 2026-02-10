import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

@Component({
  selector: 'app-mcv-date-range-picker',
  imports: [CommonModule],
  templateUrl: './mcv-date-range-picker.html',
  styleUrls: ['./mcv-date-range-picker.css']
})
export class McvDateRangePicker implements OnInit {

  // Input properties
  @Input() startDate: Date | null = null;
  @Input() endDate: Date | null = null;
  @Input() minDate: Date | null = null;
  @Input() maxDate: Date | null = null;
  @Input() required = false;
  @Input() disabled = false;

  // Output event
  @Output() statusChange = new EventEmitter<{
    startDate: Date | null;
    endDate: Date | null;
    valid: boolean;
    errors: string[];
  }>();

  // Validation state
  errors: string[] = [];
  valid = false;

  // Lifecycle hook
  ngOnInit(): void {
    this.validateAndEmit();
  }

  // Methods to handle date changes
  onStartDateChange(value: string): void {
    this.startDate = value ? new Date(value) : null;
    this.validateAndEmit();
  }

  // Methods to handle date changes
  onEndDateChange(value: string): void {
    this.endDate = value ? new Date(value) : null;
    this.validateAndEmit();
  }

  // Method to validate the date range and emit status
  private validateAndEmit(): void {
    this.validate();
    this.statusChange.emit({
      startDate: this.startDate,
      endDate: this.endDate,
      valid: this.valid,
      errors: this.errors
    });
  }

  // Method to validate the date range
  private validate(): void {
    this.errors = [];

    // Check required fields
    if (this.required && (!this.startDate || !this.endDate)) {
      this.errors.push('Date range is required');
    }

    // Check date order
    if (this.startDate && this.endDate && this.startDate > this.endDate) {
      this.errors.push('Start date must be before end date');
    }

    // Check min date constraints
    if (this.minDate && this.startDate && this.startDate < this.minDate) {
      this.errors.push('Start date is before minimum allowed');
    }

    // Check max date constraints
    if (this.maxDate && this.endDate && this.endDate > this.maxDate) {
      this.errors.push('End date is after maximum allowed');
    }

    this.valid = this.errors.length === 0;
  }
}
