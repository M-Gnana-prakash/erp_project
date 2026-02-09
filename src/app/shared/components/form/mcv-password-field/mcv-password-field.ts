import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-mcv-password-field',
  imports: [CommonModule],
  templateUrl: './mcv-password-field.html',
  styleUrl: './mcv-password-field.css',
})
export class McvPasswordField {
  // Inputs
  @Input() value: string = '';
  @Input() placeholder: string = 'Password';
  @Input() minLength: number = 8;
  @Input() maxLength: number = Infinity;
  @Input() regex: RegExp | null = null;
  @Input() required: boolean = false;
  @Input() disabled: boolean = false;
  @Input() readonly: boolean = false;
  @Input() canDisplayEye: boolean = true;
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
  public isTouched: boolean = false;
  public showPassword: boolean = false;

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

    // Required check
    if (this.required && !this.value) {
      currentErrors.push('Password is required');
    }

    // Min length check
    if (this.value && this.value.length < this.minLength) {
      currentErrors.push(`Minimum length is ${this.minLength}`);
    }

    // Max length check
    if (this.value && this.value.length > this.maxLength) {
      currentErrors.push(`Maximum length is ${this.maxLength}`);
    }

    // Regex pattern match
    if (this.regex && this.value && !this.regex.test(this.value)) {
      currentErrors.push('Invalid format');
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

