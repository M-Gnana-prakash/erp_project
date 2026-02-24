import { Component, EventEmitter, Input, Output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

export type McvAlertStatus = 'success' | 'warning' | 'danger' | 'info';

@Component({
    selector: 'app-mcv-alert',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './mcv-alert.html',
    styleUrl: './mcv-alert.css'
})
export class McvAlert {
    @Input() message: string = '';
    @Input() title: string = '';
    @Input() type: McvAlertStatus = 'info';
    @Input() dismissible: boolean = false;
    @Input() solid: boolean = false;

    @Output() onDismiss = new EventEmitter<void>();

    visible = signal(true);

    dismiss() {
        this.visible.set(false);
        this.onDismiss.emit();
    }

    getTypeClasses(): string {
        if (this.solid) {
            const solidClasses: Record<McvAlertStatus, string> = {
                success: 'bg-green-500 text-white',
                warning: 'bg-yellow-500 text-white',
                danger: 'bg-red-500 text-white',
                info: 'bg-blue-500 text-white'
            };
            return solidClasses[this.type] || solidClasses.info;
        }

        const softClasses: Record<McvAlertStatus, string> = {
            success: 'border-green-200 bg-green-50 dark:bg-green-900/20 dark:border-green-800 text-green-800 dark:text-green-300',
            warning: 'border-yellow-200 bg-yellow-50 dark:bg-yellow-900/20 dark:border-yellow-800 text-yellow-800 dark:text-yellow-300',
            danger: 'border-red-200 bg-red-50 dark:bg-red-900/20 dark:border-red-800 text-red-800 dark:text-red-300',
            info: 'border-blue-200 bg-blue-50 dark:bg-blue-900/20 dark:border-blue-800 text-blue-800 dark:text-blue-300'
        };
        return softClasses[this.type] || softClasses.info;
    }

    getIconColor(): string {
        if (this.solid) return 'text-white';
        const colors: Record<McvAlertStatus, string> = {
            success: 'text-green-500',
            warning: 'text-yellow-500',
            danger: 'text-red-500',
            info: 'text-blue-500'
        };
        return colors[this.type] || colors.info;
    }
}
