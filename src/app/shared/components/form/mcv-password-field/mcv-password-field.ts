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

  public isFocused: boolean = false;
  public isTouched: boolean = false;
  public showPassword: boolean = false;
  protected readonly Infinity = Infinity;

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
    this.isTouched = true;
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

    // Required check
    if (this.required && !this.value) {
      currentErrors.push(`${fieldName} is required`);
    }

    // Min length check
    if (this.value && this.value.length < this.minLength) {
      currentErrors.push(`${fieldName} must be at least ${this.minLength} characters`);
    }

    // Max length check
    if (this.value && this.value.length > this.maxLength) {
      currentErrors.push(`${fieldName} cannot exceed ${this.maxLength} characters`);
    }

    // Regex pattern match
    if (this.regex && this.value && !this.regex.test(this.value)) {
      currentErrors.push(`${fieldName} has an invalid format`);
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

