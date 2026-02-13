import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

//Styles
export interface McvRadioFieldStyles {
    borderColor?: string;
    selectedColor?: string;
    backgroundColor?: string;
    labelColor?: string;
    sizeVariant?: 'sm' | 'md' | 'lg';
}

export interface RadioOption {
    label: string;
    value: string;
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

    @Input() value: string = '';
    @Input() options: RadioOption[] = [];
    @Input() name: string = 'radio-group-' + Math.random().toString(36).substr(2, 9); // Unique name if not provided
    @Input() required: boolean = false;
    @Input() disabled: boolean = false;
    @Input() readonly: boolean = false;
    @Input() label: string = ''; // Group label
    @Input() layout: 'horizontal' | 'vertical' = 'vertical';

    // Validation message shown by default
    @Input() needValidationStatusMessage: boolean = true;

    // Whole styles for radio field
    @Input() styles: McvRadioFieldStyles = {};

    public errors: string[] = [];

    private defaultStyles: McvRadioFieldStyles = {
        borderColor: '#ccc',
        selectedColor: '#007bff',
        backgroundColor: '#fff',
        labelColor: '#333',
        sizeVariant: 'md',
    };

    get computedStyles(): McvRadioFieldStyles {
        return { ...this.defaultStyles, ...this.styles };
    }

    @Output() statusChange = new EventEmitter<{
        value: string;
        valid: boolean;
        errors: string[];
    }>();

    @Output() valueChange = new EventEmitter<string>();

    onOptionChange(selectedValue: string) {
        if (this.disabled || this.readonly) return;

        // If the same value is clicked, deselect it (optional, but requested earlier)
        if (this.value === selectedValue) {
            this.value = '';
        } else {
            this.value = selectedValue;
        }

        this.valueChange.emit(this.value);
        this.validate();
    }

    public validate() {
        this.errors = [];
        if (this.required && !this.value) {
            this.errors.push('Click any option');
        }

        // Emit validation status
        this.statusChange.emit({
            value: this.value,
            valid: this.errors.length === 0,
            errors: this.errors,
        });
    }
}