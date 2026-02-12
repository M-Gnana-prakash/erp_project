import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

//Styles
export interface McvCheckboxStyles {
  borderColor?: string;
  checkColor?: string;
  backgroundColor?: string;
  activeBorderColor?: string;
  activeBackgroundColor?: string;
  labelColor?: string;
  sizeVariant?: 'sm' | 'md' | 'lg';
}

@Component({
  selector: 'app-mcv-checkbox',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './mcv-checkbox.html',
  styleUrl: './mcv-checkbox.css',
})
export class McvCheckbox {

  @Input() value: boolean = false;
  @Input() set checked(val: boolean) {
    this.value = val;
  }
  @Input() label: string = '';
  @Input() required: boolean = false;
  @Input() disabled: boolean = false;
  @Input() readonly: boolean = false;

  // Validation message shown by default
  @Input() needValidationStatusMessage: boolean = true;

  // Whole styles for checkbox
  @Input() styles: McvCheckboxStyles = {};

  public isFocused: boolean = false;
  public errors: string[] = [];

  private defaultStyles: McvCheckboxStyles = {
    borderColor: '#ccc',
    checkColor: '#fff',
    backgroundColor: '#fff',
    activeBorderColor: '#007bff',
    activeBackgroundColor: '#007bff',
    labelColor: '#333',
    sizeVariant: 'md',
  };

  get computedStyles(): McvCheckboxStyles {
    return { ...this.defaultStyles, ...this.styles };
  }

  @Output() statusChange = new EventEmitter<{
    value: boolean;
    valid: boolean;
    errors: string[];
  }>();

  onInputChange(event: Event) {
    const target = event.target as HTMLInputElement;
    this.value = target.checked;
    this.validate();
  }

  toggle() {
    if (this.disabled || this.readonly) return;
    this.value = !this.value;
    this.validate();
  }

  public validate() {
    const currentErrors: string[] = [];

    // Required validation (must be checked if required)
    if (this.required && !this.value) {
      currentErrors.push('This field is required');
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
