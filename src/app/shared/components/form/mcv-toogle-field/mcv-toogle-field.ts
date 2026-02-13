import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface McvToggleFieldStyles {
  trackColor?: string;
  knobColor?: string;
  activeTrackColor?: string;
  activeKnobColor?: string;
  labelColor?: string;
  sizeVariant?: 'sm' | 'md' | 'lg';
}

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
  @Input() styles: McvToggleFieldStyles = {};
  @Input() activeColor: string = '';
  @Input() inactiveColor: string = '';
  @Input() knobColor: string = '';
  @Input() sizeVariant: 'sm' | 'md' | 'lg' = 'md';

  public errors: string[] = [];

  private defaultStyles: McvToggleFieldStyles = {
    trackColor: '#ccc',
    knobColor: '#fff',
    activeTrackColor: '#3b82f6',
    activeKnobColor: '#fff',
    labelColor: '#333',
    sizeVariant: 'md',
  };

  @Output() valueChange = new EventEmitter<boolean>(); // emits boolean only
  @Output() statusChange = new EventEmitter<{
    value: boolean;
    valid: boolean;
    errors: string[];
  }>();

  get computedStyles(): McvToggleFieldStyles {
    const individual: McvToggleFieldStyles = {};

    if (this.activeColor) individual.activeTrackColor = this.activeColor;
    if (this.inactiveColor) individual.trackColor = this.inactiveColor;
    if (this.knobColor) individual.knobColor = this.knobColor;
    if (this.sizeVariant) individual.sizeVariant = this.sizeVariant;

    return { ...this.defaultStyles, ...this.styles, ...individual };
  }

  toggle(event?: Event) {
    if (this.disabled || this.readonly) return;

    this.value = !this.value;

    if (event?.currentTarget) {
      (event.currentTarget as HTMLElement).blur();
    }

    this.validate();

    // Emit boolean only
    this.valueChange.emit(this.value);
  }

  validate() {
    this.errors = [];

    if (this.required && !this.value) {
      this.errors.push('This field is required');
    }

    this.statusChange.emit({
      value: this.value,
      valid: this.errors.length === 0,
      errors: this.errors
    });
  }
}
