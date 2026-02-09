import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-mcv-phone-field',
  imports: [CommonModule],
  templateUrl: './mcv-phone-field.html',
  styleUrl: './mcv-phone-field.css',
})
export class McvPhoneField {
  // Inputs
  @Input() value: string = '';
  @Input() countryCode: string = '+91';
  @Input() showCountryCode: boolean = true;
  @Input() placeholder: string = '';
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
  public isSelectFocused: boolean = false;

  public countryCodes = [
    { code: '+91', name: 'India' },
    { code: '+1', name: 'USA' },
    { code: '+44', name: 'UK' },
    { code: '+61', name: 'Australia' },
    { code: '+81', name: 'Japan' },
    { code: '+86', name: 'China' },
    { code: '+971', name: 'UAE' },
    { code: '+92', name: 'Pakistan' },
    { code: '+880', name: 'Bangladesh' },
    { code: '+94', name: 'Sri Lanka' },
  ];

  // Output
  @Output() statusChange = new EventEmitter<{
    value: string;
    countryCode: string;
    fullValue: string;
    valid: boolean;
    errors: string[];
  }>();

  public errors: string[] = [];

  onInputChange(event: Event) {
    const target = event.target as HTMLInputElement;
    this.value = target.value;
    this.validate();
  }

  onCountryCodeChange(event: Event) {
    const target = event.target as HTMLSelectElement;
    this.countryCode = target.value;
    this.validate();
  }

  public validate() {
    const currentErrors: string[] = [];

    // Required check
    if (this.required && !this.value) {
      currentErrors.push('This field is required');
    }

    // Phone number validation (basic regex for numeric input)
    const phoneRegex = /^[0-9\s\+\-\(\)]*$/;
    if (this.value && !phoneRegex.test(this.value)) {
      currentErrors.push('Invalid phone number format');
    }

    // Length check (strip non-digits for length validation)
    const digitsOnly = this.value.replace(/\D/g, '');
    if (this.value && (digitsOnly.length < 10 && digitsOnly.length > 0)) {
      currentErrors.push('Phone number should be at least 10 digits');
    }

    this.errors = currentErrors;
    this.statusChange.emit({
      value: this.value,
      countryCode: this.countryCode,
      fullValue: `${this.countryCode}${this.value}`,
      valid: this.errors.length === 0,
      errors: this.errors,
    });
  }
}

