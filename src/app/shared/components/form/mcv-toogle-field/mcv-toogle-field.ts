import { Component, EventEmitter, Input, Output } from '@angular/core';
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

    @Input() onLabel: string = 'On';
    @Input() offLabel: string = 'Off';

    // Validation message shown by default
    @Input() needValidationStatusMessage: boolean = true;

    // Whole styles for toggle field
    @Input() styles: McvToggleFieldStyles = {};

    // Individual style inputs (for backward compatibility)
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

    @Output() statusChange = new EventEmitter<{
        value: boolean;
        valid: boolean;
        errors: string[];
    }>();

    @Output() valueChange = new EventEmitter<any>();

    get computedStyles(): McvToggleFieldStyles {
        const individualStyles: McvToggleFieldStyles = {};
        if (this.activeColor) individualStyles.activeTrackColor = this.activeColor;
        if (this.inactiveColor) individualStyles.trackColor = this.inactiveColor;
        if (this.knobColor) individualStyles.knobColor = this.knobColor;
        if (this.activeColor) individualStyles.activeKnobColor = '#fff';
        if (this.sizeVariant) individualStyles.sizeVariant = this.sizeVariant;

        return { ...this.defaultStyles, ...this.styles, ...individualStyles };
    }

    toggle(event?: Event) {
        if (this.disabled || this.readonly) return;

        this.value = !this.value;

        // Clear focus to remove the blue outline
        if (event && event.currentTarget) {
            (event.currentTarget as HTMLElement).blur();
        }

        this.validate();
    }

    public validate() {
        this.errors = [];
        if (this.required && !this.value) {
            this.errors.push('');
        }

        const status = {
            value: this.value,
            valid: this.errors.length === 0,
            errors: this.errors,
        };

        this.valueChange.emit(status);
        this.statusChange.emit(status);
    }
}