import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

export type McvToastType = 'success' | 'warning' | 'danger' | 'info';

@Component({
    selector: 'app-mcv-toast',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './mcv-toast.html',
    styleUrl: './mcv-toast.css'
})
export class McvToast {
    @Input() type: McvToastType = 'info';
    @Input() title: string = '';
    @Input() message: string = '';
    @Input() duration: number = 4000;

    @Output() onDismiss = new EventEmitter<void>();

    dismiss() {
        this.onDismiss.emit();
    }

    getIconColor(): string {
        const colors = {
            success: 'text-green-500',
            warning: 'text-yellow-500',
            danger: 'text-red-500',
            info: 'text-blue-500'
        };
        return colors[this.type] || colors.info;
    }
}
