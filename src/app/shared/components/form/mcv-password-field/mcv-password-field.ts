import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

//Styles
export interface McvPasswordFieldStyles {
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
  selector: 'app-mcv-password-field',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './mcv-password-field.html',
  styleUrl: './mcv-password-field.css',
})
export class McvPasswordField {

  @Input() label: string = '';
  @Input() value: string = '';
  @Input() placeholder: string = '';
  @Input() required: boolean = false;
  @Input() disabled: boolean = false;
  @Input() readonly: boolean = false;
  @Input() minLength: number = 0;

  // Validation message shown by default
  @Input() needValidationStatusMessage: boolean = true;

  // Whole styles for password field
  @Input() styles: McvPasswordFieldStyles = {};

  public isFocused: boolean = false;
  public showPassword: boolean = false;
  public errors: string[] = [];

  private defaultStyles: McvPasswordFieldStyles = {
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

  get computedStyles(): McvPasswordFieldStyles {
    const individualStyles: McvPasswordFieldStyles = {};
    if (this.borderStyle) individualStyles.borderStyle = this.borderStyle;
    if (this.outline) individualStyles.outline = this.outline;
    if (this.sizeVariant) individualStyles.sizeVariant = this.sizeVariant;

    return { ...this.defaultStyles, ...this.styles, ...individualStyles };
  }

  @Input() canDisplayEye: boolean = true;
  @Input() regex: string | RegExp = '';

  // Individual style inputs
  @Input() borderStyle: string = '';
  @Input() outline: string = '';
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

  toggleVisibility() {
    if (this.disabled) return;
    this.showPassword = !this.showPassword;
  }

  public validate() {
    const currentErrors: string[] = [];

    // Required validation
    if (this.required && !this.value) {
      currentErrors.push('Password is required');
    }

    // Min Length validation
    if (this.value && this.minLength > 0 && this.value.length < this.minLength) {
      currentErrors.push(`Password must be at least ${this.minLength} characters`);
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
