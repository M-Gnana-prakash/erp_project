import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

//Styles
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
    standalone: true,
    imports: [CommonModule],
    templateUrl: './mcv-toogle-field.html',
    styleUrl: './mcv-toogle-field.css',
})
export class McvToggleField {

    @Input() value: boolean = false;
    @Input() label: string = '';
    @Input() required: boolean = false;
    @Input() disabled: boolean = false;
    @Input() readonly: boolean = false;

    @Input() onLabel: string = 'On';
    @Input() offLabel: string = 'Off';

    // Validation message shown by default
    @Input() needValidationStatusMessage: boolean = true;

    // Whole styles for toggle field
    @Input() styles: McvToggleFieldStyles = {};

    // Individual style inputs
    @Input() activeColor: string = '';
    @Input() inactiveColor: string = '';
    @Input() knobColor: string = '';
    @Input() sizeVariant: 'sm' | 'md' | 'lg' = 'md';

    public isFocused: boolean = false;
    public errors: string[] = [];

    private defaultStyles: McvToggleFieldStyles = {
        trackColor: '#ccc',
        knobColor: '#fff',
        activeTrackColor: '#007bff',
        activeKnobColor: '#fff',
        labelColor: '#333',
        sizeVariant: 'md',
    };

    get computedStyles(): McvToggleFieldStyles {
        const individualStyles: McvToggleFieldStyles = {};
        if (this.activeColor) individualStyles.activeTrackColor = this.activeColor;
        if (this.inactiveColor) individualStyles.trackColor = this.inactiveColor;
        if (this.knobColor) individualStyles.knobColor = this.knobColor;
        if (this.activeColor) individualStyles.activeKnobColor = '#fff'; // Default or calculated?
        if (this.sizeVariant) individualStyles.sizeVariant = this.sizeVariant;

        return { ...this.defaultStyles, ...this.styles, ...individualStyles };
    }

    @Output() statusChange = new EventEmitter<{
        value: boolean;
        valid: boolean;
        errors: string[];
    }>();

    @Output() valueChange = new EventEmitter<boolean>();

    toggle() {
        if (this.disabled || this.readonly) return;
        this.value = !this.value;
        this.valueChange.emit(this.value);
        this.validate();
    }

    onInputChange(event: Event) {
        const target = event.target as HTMLInputElement;
        this.value = target.checked;
        this.validate();
    }

    public validate() {
        const currentErrors: string[] = [];

        // Required validation (must be true)
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
