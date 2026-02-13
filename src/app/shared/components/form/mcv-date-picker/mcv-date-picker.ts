import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

// Styles interface
export interface McvDatePickerStyles {
  borderStyle?: string;
  outline?: string;
  textColor?: string;
  backgroundColor?: string;
  activeBorderStyle?: string;
  activeOutline?: string;
  activeTextColor?: string;
  activeBackgroundColor?: string;
  sizeVariant?: 'sm' | 'md' | 'lg';
}

@Component({
  selector: 'app-mcv-date-picker',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './mcv-date-picker.html',
  styleUrl: './mcv-date-picker.css',
})
export class McvDatePicker {
  // Value & config
  @Input() value: string = '';          // yyyy-MM-dd
  @Input() label: string = '';
  @Input() placeholder: string = '';
  @Input() required: boolean = false;
  @Input() disabled: boolean = false;
  @Input() readonly: boolean = false;
  @Input() min: string = '';            // yyyy-MM-dd
  @Input() max: string = '';            // yyyy-MM-dd

  // Validation message
  @Input() needValidationStatusMessage: boolean = true;

  // Styles
  @Input() styles: McvDatePickerStyles = {};

  // Individual style inputs
  @Input() borderStyle: string = '';
  @Input() outline: string = '';
  @Input() textColor: string = '';
  @Input() backgroundColor: string = '';
  @Input() sizeVariant: 'sm' | 'md' | 'lg' = 'md';

  public isFocused = false;
  public errors: string[] = [];

  private defaultStyles: McvDatePickerStyles = {
    borderStyle: '1px solid #ccc',
    outline: 'none',
    textColor: '#333',
    backgroundColor: '#fff',
    activeBorderStyle: '1px solid #007bff',
    activeOutline: 'none',
    activeTextColor: '#333',
    activeBackgroundColor: '#fff',
    sizeVariant: 'md',
  };

  get computedStyles(): McvDatePickerStyles {
    const individualStyles: McvDatePickerStyles = {};
    if (this.borderStyle) individualStyles.borderStyle = this.borderStyle;
    if (this.outline) individualStyles.outline = this.outline;
    if (this.textColor) individualStyles.textColor = this.textColor;
    if (this.backgroundColor) individualStyles.backgroundColor = this.backgroundColor;
    if (this.sizeVariant) individualStyles.sizeVariant = this.sizeVariant;

    return { ...this.defaultStyles, ...this.styles, ...individualStyles };
  }

  @Output() statusChange = new EventEmitter<{
    value: string;
    valid: boolean;
    errors: string[];
  }>();

  onInputChange(event: Event) {
    const target = event.target as HTMLInputElement;
    this.value = target.value;
    this.validate();
  }

  private parseDate(dateStr: string): Date {
    // Prevent timezone issues
    return new Date(dateStr + 'T00:00:00');
  }

  public validate() {
    const currentErrors: string[] = [];

    // Required
    if (this.required && !this.value) {
      currentErrors.push('Date is required');
    }

    // Format validation
    // if (this.value && isNaN(Date.parse(this.value))) {
    //   currentErrors.push('Invalid date format');
    // }

    // Strict format validation (yyyy-MM-dd)
  if (this.value) {
  const regex = /^\d{4}-\d{2}-\d{2}$/;

  if (!regex.test(this.value)) {
    currentErrors.push('Invalid date format (yyyy-MM-dd required)');
  } else {
    const year = +this.value.split('-')[0];
    if (year < 1000 || year > 9999) {
      currentErrors.push('Year must be 4 digits');
    }
  }
}


    const selectedDate = this.value ? this.parseDate(this.value) : null;

    // Min date
    if (this.min && selectedDate) {
      const minDate = this.parseDate(this.min);
      if (selectedDate < minDate) {
        currentErrors.push(`Date should be on or after ${this.min}`);
      }
    }

    // Max date
    if (this.max && selectedDate) {
      const maxDate = this.parseDate(this.max);
      if (selectedDate > maxDate) {
        currentErrors.push(`Date should be on or before ${this.max}`);
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
