import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface RadioOption {
    label: string;
    value: any;
    disabled?: boolean;
}

@Component({
    selector: 'app-mcv-radio-field',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './mcv-radio-field.html',
    styleUrl: './mcv-radio-field.css',
})
export class McvRadioField {
    @Input() label: string = '';
    @Input() options: RadioOption[] = [];
    @Input() name: string = `radio-group-${Math.random().toString(36).substr(2, 9)}`;
    @Input() value: any = null;
    @Input() required: boolean = false;
    @Input() disabled: boolean = false;
    @Input() layout: 'vertical' | 'horizontal' = 'vertical';
    @Input() sizeVariant: 'sm' | 'md' | 'lg' = 'md';
    @Input() needValidationStatusMessage: boolean = false;

    @Output() statusChange = new EventEmitter<{
        value: any;
        valid: boolean;
        errors: string[];
    }>();

    @Output() valueChange = new EventEmitter<any>();

    public errors: string[] = [];

    onOptionChange(selectedValue: any) {
        if (this.disabled) return;
        this.value = selectedValue;
        this.valueChange.emit(this.value);
        this.validate();
    }

    public validate() {
        this.errors = [];
        if (this.required && (this.value === null || this.value === undefined || this.value === '')) {
            this.errors.push('This field is required');
        }

        this.statusChange.emit({
            value: this.value,
            valid: this.errors.length === 0,
            errors: this.errors,
        });
    }
}
