import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { McvFieldStyles } from '../form-types';

@Component({
  selector: 'app-mcv-password-field',
  imports: [CommonModule],
  templateUrl: './mcv-password-field.html',
  styleUrl: './mcv-password-field.css',
})
export class McvPasswordField {
  // Inputs
  @Input() label: string = '';
  @Input() value: string = '';
  @Input() placeholder: string = 'Password';
  @Input() minLength: number = 8;
  @Input() maxLength: number = Infinity;
  @Input() set regex(value: string | RegExp | null) {
    if (typeof value === 'string') {
      try {
        const match = value.match(/^\/(.*)\/([gimsuy]*)$/);
        if (match) {
          this._regex = new RegExp(match[1], match[2]);
        } else {
          this._regex = new RegExp(value);
        }
      } catch (e) {
        this._regex = null;
      }
    } else {
      this._regex = value;
    }
  }
  get regex(): RegExp | null {
    return this._regex;
  }
  private _regex: RegExp | null = null;
  @Input() required: boolean = false;
  @Input() disabled: boolean = false;
  @Input() readonly: boolean = false;
  @Input() canDisplayEye: boolean = true;
  @Input() needValidationStatusMessage: boolean = true;

  // CSS Inputs
  @Input() styles: McvFieldStyles = {};

  private defaultStyles: McvFieldStyles = {
    borderStyle: '1px solid var(--form-border, #ccc)',
    outline: 'none',
    textColor: 'var(--form-text, #333)',
    backgroundColor: 'var(--form-bg, #fff)',
    activeBorderStyle: '1px solid var(--color-primary, #007bff)',
    activeOutline: 'none',
    activeTextColor: 'var(--form-text, #333)',
    activeBackgroundColor: 'var(--form-bg, #fff)',
    sizeVariant: 'md',
  };

  get computedStyles(): McvFieldStyles {
    return { ...this.defaultStyles, ...this.styles };
  }

  public isFocused: boolean = false;
  public isTouched: boolean = false;
  public isDirty: boolean = false;
  public showPassword: boolean = false;
  protected readonly Infinity = Infinity;

  public validationRules = {
    minLength: true,
    uppercase: false,
    lowercase: false,
    number: false,
    specialChar: false
  };

  public isValid: boolean = false;

  // Output
  @Output() statusChange = new EventEmitter<{
    value: string;
    valid: boolean;
    errors: string[];
    touched: boolean;
  }>();

  public errors: string[] = [];

  onInputChange(event: Event) {
    const target = event.target as HTMLInputElement;
    this.value = target.value;
    this.isDirty = true;

    this.validate();
  }

  onBlur() {
    this.isFocused = false;
    this.isTouched = true;
    this.validate();
  }

  toggleVisibility() {
    this.showPassword = !this.showPassword;
  }

  public validate() {
    const currentErrors: string[] = [];
    const fieldName = this.label || 'Password';

    // Rule Tracking
    this.validationRules = {
      minLength: this.value.length >= 8,
      uppercase: /[A-Z]/.test(this.value),
      lowercase: /[a-z]/.test(this.value),
      number: /\d/.test(this.value),
      specialChar: /[@$!%*?&]/.test(this.value)
    };

    // Overall Validity (based on the requested regex)
    // Regex: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/
    this.isValid = Object.values(this.validationRules).every(rule => rule);

    // Required check
    if (this.required && !this.value) {
      currentErrors.push(`${fieldName} is required`);
    }

    // Generic error for compatibility with statusChange emit
    if (!this.isValid && this.value) {
      currentErrors.push(`Invalid password format`);
    }

    this.errors = currentErrors;
    this.statusChange.emit({
      value: this.value,
      valid: this.errors.length === 0,
      errors: this.errors,
      touched: this.isTouched
    });
  }
}

