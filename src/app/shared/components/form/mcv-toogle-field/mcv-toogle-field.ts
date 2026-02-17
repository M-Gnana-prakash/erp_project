import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { McvFieldStyles } from '../form-types';

@Component({
  selector: 'app-mcv-toggle-field',
  templateUrl: './mcv-toogle-field.html',
  styleUrls: ['./mcv-toogle-field.css'],
  standalone: true,
  imports: [CommonModule],
})
export class McvToggleField {

  @Input() value: boolean = false;
  @Input() label: string = '';
  @Input() required: boolean = false;
  @Input() disabled: boolean = false;
  @Input() readonly: boolean = false;

  @Input() onLabel: string = 'Yes';
  @Input() offLabel: string = 'No';

  @Input() needValidationStatusMessage: boolean = true;
  @Input() styles: McvFieldStyles = {};

  public errors: string[] = [];
  public isTouched: boolean = false;

  private defaultStyles: McvFieldStyles = {
    trackColor: '#ccc',
    thumbColor: '#fff',
    selectedColor: '#3b82f6',
    labelColor: '#333',
    sizeVariant: 'md',
  };

  @Output() valueChange = new EventEmitter<boolean>();
  @Output() statusChange = new EventEmitter<{
    value: boolean;
    valid: boolean;
    errors: string[];
    touched: boolean;
  }>();

  get computedStyles(): McvFieldStyles {
    return { ...this.defaultStyles, ...this.styles };
  }

  toggle(event?: Event) {
    if (this.disabled || this.readonly) return;

    this.value = !this.value;
    this.isTouched = true;

    if (event?.currentTarget) {
      (event.currentTarget as HTMLElement).blur();
    }

    this.validate();

    // Emit boolean only
    this.valueChange.emit(this.value);
  }

  validate() {
    this.errors = [];
    const fieldName = this.label || 'Toggle';

    if (this.required && !this.value) {
      this.errors.push(`${fieldName} is required`);
    }

    this.statusChange.emit({
      value: this.value,
      valid: this.errors.length === 0,
      errors: this.errors,
      touched: this.isTouched
    });
  }
}
