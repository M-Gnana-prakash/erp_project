import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

//Styles
export interface McvEmailFieldStyles {
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
  selector: 'app-mcv-email-field',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './mcv-email-field.html',
  styleUrl: './mcv-email-field.css',
})
export class McvEmailField {

  @Input() label: string = '';
  @Input() value: string = '';
  @Input() placeholder: string = 'example@domain.com';
  @Input() required: boolean = false;
  @Input() disabled: boolean = false;
  @Input() readonly: boolean = false;

  // Validation message shown by default
  @Input() needValidationStatusMessage: boolean = true;

  // Whole styles for email field
  @Input() styles: McvEmailFieldStyles = {};

  public isFocused: boolean = false;
  public errors: string[] = [];

  private defaultStyles: McvEmailFieldStyles = {
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

  get computedStyles(): McvEmailFieldStyles {
    const individualStyles: McvEmailFieldStyles = {};
    if (this.borderStyle) individualStyles.borderStyle = this.borderStyle;
    if (this.outline) individualStyles.outline = this.outline;
    if (this.textColor) individualStyles.textColor = this.textColor;
    if (this.backgroundColor) individualStyles.backgroundColor = this.backgroundColor;
    if (this.sizeVariant) individualStyles.sizeVariant = this.sizeVariant;

    return { ...this.defaultStyles, ...this.styles, ...individualStyles };
  }

  @Input() allowMultiple: boolean = false;

  // Individual style inputs
  @Input() borderStyle: string = '';
  @Input() outline: string = '';
  @Input() textColor: string = '';
  @Input() backgroundColor: string = '';
  @Input() sizeVariant: 'sm' | 'md' | 'lg' = 'md';

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

  public validate() {
    const currentErrors: string[] = [];

    // Required validation
    if (this.required && !this.value) {
      currentErrors.push('Email is required');
    }

    // Email format validation
    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (this.value) {
      if (this.allowMultiple) {
        const emails = this.value.split(',').map(e => e.trim());
        const invalidEmails = emails.filter(e => e && !emailRegex.test(e));
        if (invalidEmails.length > 0) {
          currentErrors.push(`Invalid email format: ${invalidEmails.join(', ')}`);
        }
      } else {
        if (!emailRegex.test(this.value)) {
          currentErrors.push('Invalid email format');
        }
      }
    }

    // Update errors
    this.errors = currentErrors;

    // Emit validation status
    this.statusChange.emit({
      value: this.value,
      valid: this.errors.length === 0,
      errors: this.errors,
    });
  }
}
