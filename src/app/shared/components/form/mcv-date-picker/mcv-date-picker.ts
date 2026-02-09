import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-mcv-date-picker',
  imports: [CommonModule],
  templateUrl: './mcv-date-picker.html',
  styleUrl: './mcv-date-picker.css',
})
export class McvDatePicker {
  // Inputs
  @Input() value: string = '';
  @Input() placeholder: string = '';
  @Input() minDate: string = '';
  @Input() maxDate: string = '';
  @Input() required: boolean = false;
  @Input() disabled: boolean = false;
  @Input() readonly: boolean = false;
  @Input() needValidationStatusMessage: boolean = false;

  // CSS Inputs
  @Input() borderStyle: string = '1px solid #ccc';
  @Input() outline: string = 'none';
  @Input() textColor: string = '#333';
  @Input() backgroundColor: string = '#fff';
  @Input() activeBorderStyle: string = '1px solid #007bff';
  @Input() activeOutline: string = 'none';
  @Input() activeTextColor: string = '#333';
  @Input() activeBackgroundColor: string = '#fff';
  @Input() sizeVariant: 'sm' | 'md' | 'lg' = 'md';

  public isFocused: boolean = false;

  // Output
  @Output() statusChange = new EventEmitter<{
    value: string;
    valid: boolean;
    errors: string[];
  }>();

  public errors: string[] = [];

  onInputChange(event: Event) {
    const target = event.target as HTMLInputElement;
    this.value = target.value;
    this.validate();
  }

  public validate() {
    const currentErrors: string[] = [];

    // Required check
    if (this.required && !this.value) {
      currentErrors.push('This field is required');
    }

    // Date range check
    if (this.value) {
      if (this.minDate && this.value < this.minDate) {
        currentErrors.push(`Date must be on or after ${this.minDate}`);
      }
      if (this.maxDate && this.value > this.maxDate) {
        currentErrors.push(`Date must be on or before ${this.maxDate}`);
      }
    }

    this.errors = currentErrors;
    this.statusChange.emit({
      value: this.value,
      valid: this.errors.length === 0,
      errors: this.errors,
    });
  }
}

