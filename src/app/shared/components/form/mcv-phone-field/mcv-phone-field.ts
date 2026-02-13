import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

//Styles
export interface McvPhoneFieldStyles {
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
  selector: 'app-mcv-phone-field',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './mcv-phone-field.html',
  styleUrl: './mcv-phone-field.css',
})

export class McvPhoneField {

  @Input() label: string = '';
  @Input() value: string = '';
  @Input() countryCode: string = '+91';
  @Input() showCountryCode: boolean = true;
  @Input() placeholder: string = '';
  @Input() required: boolean = false;
  @Input() disabled: boolean = false;
  @Input() readonly: boolean = false;

  // Validation message shown by default
  @Input() needValidationStatusMessage: boolean = true;

  // Default country code
  @Input() defaultCountryCode: string = '+91';

  // Whole styles for phone field
  @Input() styles: McvPhoneFieldStyles = {};

  // 
  public isFocused: boolean = false;
  public isSelectFocused: boolean = false;
  public errors: string[] = [];

  private defaultStyles: McvPhoneFieldStyles = {
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

  get computedStyles(): McvPhoneFieldStyles {
    const individualStyles: McvPhoneFieldStyles = {};
    if (this.borderStyle) individualStyles.borderStyle = this.borderStyle;
    if (this.outline) individualStyles.outline = this.outline;
    if (this.textColor) individualStyles.textColor = this.textColor;
    if (this.backgroundColor) individualStyles.backgroundColor = this.backgroundColor;
    if (this.sizeVariant) individualStyles.sizeVariant = this.sizeVariant;

    return { ...this.defaultStyles, ...this.styles, ...individualStyles };
  }
  //country codes list
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

  // Individual style inputs
  @Input() borderStyle: string = '';
  @Input() outline: string = '';
  @Input() textColor: string = '';
  @Input() backgroundColor: string = '';
  @Input() sizeVariant: 'sm' | 'md' | 'lg' = 'md';

  @Output() statusChange = new EventEmitter<{
    value: string;
    countryCode: string;
    fullValue: string;
    valid: boolean;
    errors: string[];
  }>();

  private phoneLengthByCountryCode: { [key: string]: number } = {
    '+91': 10,
    '+1': 10,
    '+44': 10,
    '+61': 9,
    '+81': 10,
    '+86': 11,
    '+971': 9,
    '+92': 10,
    '+880': 11,
    '+94': 9,
  };

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

    // Required validation
    if (this.required && !this.value) {
      currentErrors.push('Phone Number is required');
    }

    // Allowed characters validation
    const phoneRegex = /^[0-9\s\+\-\(\)]*$/;
    if (this.value && !phoneRegex.test(this.value)) {
      currentErrors.push('Invalid phone number format');
    }

    // Remove non-digits
    const digitsOnly = this.value.replace(/\D/g, '');

    // Decide effective country code
    const effectiveCountryCode = this.showCountryCode
      ? this.countryCode
      : this.defaultCountryCode;

    const expectedLength =
      this.phoneLengthByCountryCode[effectiveCountryCode];

    // Length validation (minimum)
    if (this.value && digitsOnly.length > 0 && expectedLength) {
      if (digitsOnly.length !== expectedLength) {
        currentErrors.push(
          `Phone number should be at least ${expectedLength} digits`
        );
      }
    }

    // Update errors
    this.errors = currentErrors;

    // Emit validation status
    this.statusChange.emit({
      value: this.value,
      countryCode: effectiveCountryCode,
      fullValue: `${effectiveCountryCode}${this.value}`,
      valid: this.errors.length === 0,
      errors: this.errors,
    });
  }
}