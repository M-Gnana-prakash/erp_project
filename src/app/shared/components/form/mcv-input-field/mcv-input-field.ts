import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-mcv-input-field',
  imports: [CommonModule],
  templateUrl: './mcv-input-field.html',
  styleUrl: './mcv-input-field.css',
})
export class McvInputField {
  // Inputs
  @Input() value: string = '';
  @Input() placeholder: string = '';
  @Input() minLength: number = 0;
  @Input() maxLength: number = Infinity;
  @Input() required: boolean = false;
  @Input() regex: RegExp | null = null;
  @Input() disabled: boolean = false;
  @Input() readonly: boolean = false;
  @Input() needValidationStatusMessage: boolean = false;

  // CSS Inputs
  @Input() borderStyle: string = '1px solid #ccc';
  @Input() outline: string = 'none';
  @Input() textColor: string = '#333';
  @Input() backgroundColor: string = '#fff';
  @Input() activeBorderStyle: string = '2px solid #007bff';
  @Input() activeOutline: string = '2px solid #007bff';
  @Input() activeTextColor: string = '#333';
  @Input() activeBackgroundColor: string = '#fff';
  @Input() sizeVariant: 'sm' | 'md' | 'lg' = 'md';

  public isFocused: boolean = false;

  // Output
  @Output() statusChange = new EventEmitter<{
    value: string;
    valid: boolean;
    errors: string[];
  }>();

  public errors: string[] = [];

  onInputChange(event: Event) {
    const target = event.target as HTMLInputElement;
    this.value = target.value;
    this.validate();
  }

  public validate() {
    const currentErrors: string[] = [];

    // Required check
    if (this.required && !this.value) {
      currentErrors.push('This field is required');
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
    });
  }
}
