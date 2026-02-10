import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-mcv-time-picker',
  imports: [CommonModule],
  templateUrl: './mcv-time-picker.html',
  styleUrls: ['./mcv-time-picker.css']
})
export class McvTimePicker implements OnInit {

  // Input properties
  @Input() value: string = '';
  @Input() minTime: string | null = null;
  @Input() maxTime: string | null = null;
  @Input() step = 1; // minutes
  @Input() required = false;
  @Input() disabled = false;

  // Output event
  @Output() statusChange = new EventEmitter<{
    value: string;
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

  // Method to handle time changes
  onStatusChange(value: string): void {
    this.value = value;
    this.validateAndEmit();
  }

  // Method to validate the time and emit status
  private validateAndEmit(): void {
    this.validate();
    this.statusChange.emit({
      value: this.value,
      valid: this.valid,
      errors: this.errors
    });
  }

  // Method to validate the time input
  private validate(): void {
    this.errors = [];

    // Check required field
    if (this.required && !this.value) {
      this.errors.push('Time is required');
    }

    // Check time format (HH:mm)
    const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;
    if (this.value && !timeRegex.test(this.value)) {
      this.errors.push('Invalid time format');
    }

    // Check min time constraints
    if (this.minTime && this.value && this.value < this.minTime) {
      this.errors.push(`Time must be after ${this.minTime}`);
    }

    // Check max time constraints
    if (this.maxTime && this.value && this.value > this.maxTime) {
      this.errors.push(`Time must be before ${this.maxTime}`);
    }

    this.valid = this.errors.length === 0;
  }
}
