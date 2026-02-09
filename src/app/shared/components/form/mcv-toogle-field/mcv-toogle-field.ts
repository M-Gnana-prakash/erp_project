import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-mcv-toggle-field',
    templateUrl: './mcv-toogle-field.html',
    styleUrls: ['./mcv-toogle-field.css'],
    standalone: true,
    imports: [CommonModule]
})
export class ToggleSwitchComponent {

    /* Inputs */
    @Input() value: boolean = false;
    @Input() disabled: boolean = false;
    @Input() required: boolean = false;

    @Input() onLabel: string = 'On';
    @Input() offLabel: string = 'Off';

    @Input() activeColor: string = '#2563eb';
    @Input() inactiveColor: string = '#d1d5db';
    @Input() knobColor: string = '#ffffff';

    @Input() sizeVariant: 'sm' | 'md' | 'lg' = 'md';

    /* Output */
    @Output() valueChange = new EventEmitter<{
        value: boolean,
        valid: boolean
    }>();

    get isValid(): boolean {
        if (!this.required) return true;
        return this.value === true;
    }

    toggle() {
        if (this.disabled) return;

        this.value = !this.value;

        this.valueChange.emit({
            value: this.value,
            valid: this.isValid
        });
    }
}
