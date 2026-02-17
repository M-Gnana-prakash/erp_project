import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { McvFieldStyles } from '../form-types';

@Component({
  selector: 'app-mcv-phone-field',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './mcv-phone-field.html',
  styleUrl: './mcv-phone-field.css',
})

export class McvPhoneField implements OnInit, OnChanges {

  @Input() label: string = '';
  @Input() set value(val: string) {
    this.processIncomingValue(val);
  }
  get value(): string {
    return this._value;
  }
  private _value: string = '';
  @Input() countryCode: string = '';
  @Input() showCountryCode: boolean = true;
  @Input() placeholder: string = 'Enter phone number';
  @Input() required: boolean = false;
  @Input() disabled: boolean = false;
  @Input() readonly: boolean = false;

  // Validation message shown by default
  @Input() needValidationStatusMessage: boolean = true;

  // Default country code
  @Input() defaultCountryCode: string = '+91';

  // Whole styles for phone field
  @Input() styles: McvFieldStyles = {};

  public isFocused: boolean = false;
  public isSelectFocused: boolean = false;
  public isTouched: boolean = false;
  public errors: string[] = [];

  private defaultStyles: McvFieldStyles = {
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

  get computedStyles(): McvFieldStyles {
    return { ...this.defaultStyles, ...this.styles };
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

  ngOnInit() {
    this.initCountryCode();
    this.validate();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['countryCode'] || changes['defaultCountryCode'] || changes['value']) {
      this.initCountryCode();
      this.validate();
    }
  }

  private initCountryCode() {
    // Priority: countryCode > defaultCountryCode > fallback +91
    if (!this.countryCode) {
      this.countryCode = this.defaultCountryCode || '+91';
    }
  }

  private processIncomingValue(val: string) {
    if (!val) {
      this._value = '';
      return;
    }

    // Determine the code to strip
    const code = this.countryCode || this.defaultCountryCode || '+91';

    // If val starts with the country code AND we are showing country code separately,
    // then strip it so we only show digits in the input box.
    if (this.showCountryCode && val.startsWith(code)) {
      this._value = val.substring(code.length);
    } else {
      this._value = val;
    }
  }

  @Output() statusChange = new EventEmitter<{
    value: string;
    countryCode: string;
    digits: string;
    valid: boolean;
    errors: string[];
    touched: boolean;
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
    this.isTouched = true;
    this.validate();
  }

  onBlur() {
    this.isFocused = false;
    this.isTouched = true;
    this.validate();
  }

  onCountryCodeChange(event: Event) {
    const target = event.target as HTMLSelectElement;
    this.countryCode = target.value;
    this.validate();
  }


  public validate() {
    const currentErrors: string[] = [];
    const fieldName = this.label || 'Phone Number';

    // Required validation
    if (this.required && !this.value) {
      currentErrors.push(`${fieldName} is required`);
    }

    // Allowed characters validation
    const phoneRegex = /^[0-9\s\+\-\(\)]*$/;
    if (this.value && !phoneRegex.test(this.value)) {
      currentErrors.push(`${fieldName} has an invalid format`);
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
          `${fieldName} should only be ${expectedLength} digits`
        );
      }
    }

    // Update errors
    this.errors = currentErrors;

    let fullValue = '';
    if (this.showCountryCode) {
      fullValue = `${effectiveCountryCode}${digitsOnly}`;
    } else {
      // Free-form mode: just use the raw value
      fullValue = this.value;
    }

    // Emit validation status
    this.statusChange.emit({
      value: fullValue,
      countryCode: this.showCountryCode ? effectiveCountryCode : '',
      digits: digitsOnly,
      valid: this.errors.length === 0,
      errors: this.errors,
      touched: this.isTouched
    });
  }
}