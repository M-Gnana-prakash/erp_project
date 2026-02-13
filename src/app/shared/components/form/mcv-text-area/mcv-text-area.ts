import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

//Styles
export interface McvTextAreaStyles {
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
  selector: 'app-mcv-text-area',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './mcv-text-area.html',
  styleUrl: './mcv-text-area.css',
})
export class McvTextArea {

  @Input() label: string = '';
  @Input() value: string = '';
  @Input() placeholder: string = '';
  @Input() required: boolean = false;
  @Input() disabled: boolean = false;
  @Input() readonly: boolean = false;
  @Input() rows: number = 4;
  @Input() minLength: number = 0;
  @Input() maxLength: number = 0;

  // Validation message shown by default
  @Input() needValidationStatusMessage: boolean = true;

  // Whole styles for text area
  @Input() styles: McvTextAreaStyles = {};

  public isFocused: boolean = false;
  public errors: string[] = [];

  private defaultStyles: McvTextAreaStyles = {
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

  get computedStyles(): McvTextAreaStyles {
    const individualStyles: McvTextAreaStyles = {};
    if (this.borderStyle) individualStyles.borderStyle = this.borderStyle;
    if (this.outline) individualStyles.outline = this.outline;
    if (this.textColor) individualStyles.textColor = this.textColor;
    if (this.backgroundColor) individualStyles.backgroundColor = this.backgroundColor;
    if (this.sizeVariant) individualStyles.sizeVariant = this.sizeVariant;

    return { ...this.defaultStyles, ...this.styles, ...individualStyles };
  }

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
    const target = event.target as HTMLTextAreaElement;
    this.value = target.value;
    this.validate();
  }

  public validate() {
    const currentErrors: string[] = [];

    // Required validation
    if (this.required && !this.value) {
      currentErrors.push('Description is required');
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
