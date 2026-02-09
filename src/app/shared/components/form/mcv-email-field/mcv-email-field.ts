import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-mcv-email-field',
  imports: [CommonModule],
  templateUrl: './mcv-email-field.html',
  styleUrl: './mcv-email-field.css',
})
export class McvEmailField {
  // Inputs
  @Input() value: string = '';
  @Input() placeholder: string = '';
  @Input() required: boolean = false;
  @Input() allowMultiple: boolean = false;
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
  public isTouched: boolean = false;

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

  public validate() {
    const currentErrors: string[] = [];

    //Required check
    if (this.required && !this.value) {
      currentErrors.push('This Field is required')
    }

    //Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (this.value && !this.allowMultiple && !emailRegex.test(this.value)) {
      currentErrors.push('Invalid email format')
    }

    //Multiple email validation
    if (this.allowMultiple && this.value) {
      const emails = this.value.split(',');
      const invalidEmails = emails.filter(email => !emailRegex.test(email.trim()));

      if (invalidEmails.length > 0) {
        currentErrors.push('One or more email addresses are invalid')
      }
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
