import { Component, EventEmitter, input, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

//Styles
export interface McvInputFieldStyles {
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
  selector: 'app-mcv-input-field',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './mcv-input-field.html',
  styleUrl: './mcv-input-field.css',
})
export class McvInputField {
  @Input() label: string = '';
  @Input() value: string = '';
  @Input() type: string = 'text'; // Allow text, number, etc.
  @Input() placeholder: string = '';
  @Input() required: boolean = false;
  @Input() disabled: boolean = false;
  @Input() readonly: boolean = false;
  @Input() minLength: number = 0;
  @Input() maxLength: number = 0;

  // Validation message shown by default
  @Input() needValidationStatusMessage: boolean = true;

  // Whole styles for input field
  @Input() styles: McvInputFieldStyles = {};

  public isFocused: boolean = false;
  public errors: string[] = [];

  private defaultStyles: McvInputFieldStyles = {
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

  get computedStyles(): McvInputFieldStyles {
    const individualStyles: McvInputFieldStyles = {};
    if (this.borderStyle) individualStyles.borderStyle = this.borderStyle;
    if (this.outline) individualStyles.outline = this.outline;
    if (this.textColor) individualStyles.textColor = this.textColor;
    if (this.backgroundColor) individualStyles.backgroundColor = this.backgroundColor;
    if (this.sizeVariant) individualStyles.sizeVariant = this.sizeVariant;

    return { ...this.defaultStyles, ...this.styles, ...individualStyles };
  }

  @Input() regex: string | RegExp = '';

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
      currentErrors.push('User Name is required');
    }

    // Length validation
    if (this.value) {
      if (this.minLength > 0 && this.value.length < this.minLength) {
        currentErrors.push(`Minimum length is ${this.minLength} characters`);
      }
      if (this.maxLength > 0 && this.value.length > this.maxLength) {
        currentErrors.push(`Maximum length is ${this.maxLength} characters`);
      }
    }

    // Regex validation
    if (this.value && this.regex) {
      const regexPattern = typeof this.regex === 'string' ? new RegExp(this.regex) : this.regex;
      if (!regexPattern.test(this.value)) {
        currentErrors.push('Invalid format');
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
