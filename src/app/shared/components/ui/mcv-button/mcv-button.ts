import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

export type McvButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'success' | 'warning' | 'info';
export type McvButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

@Component({
    selector: 'app-mcv-button',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './mcv-button.html',
    styleUrl: './mcv-button.css'
})
export class McvButton {
    @Input() label: string = '';
    @Input() type: 'button' | 'submit' | 'reset' = 'button';
    @Input() variant: McvButtonVariant = 'primary';
    @Input() size: McvButtonSize = 'md';
    @Input() loading: boolean = false;
    @Input() disabled: boolean = false;
    @Input() icon: string = '';
    @Input() iconPosition: 'left' | 'right' = 'left';
    @Input() fullWidth: boolean = false;
    @Input() customClass: string = '';

    @Output() onClick = new EventEmitter<MouseEvent>();

    handleButtonClick(event: MouseEvent) {
        if (!this.loading && !this.disabled) {
            this.onClick.emit(event);
        }
    }

    getVariantClasses(): string {
        const variants: Record<McvButtonVariant, string> = {
            primary: 'bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-500',
            secondary: 'bg-gray-800 text-white hover:bg-gray-900 focus:ring-gray-700 dark:bg-white/10 dark:hover:bg-white/20',
            outline: 'border border-gray-300 bg-transparent text-gray-700 hover:bg-gray-50 focus:ring-gray-200 dark:border-white/20 dark:text-gray-300 dark:hover:bg-white/5',
            ghost: 'bg-transparent text-gray-700 hover:bg-gray-100 focus:ring-gray-100 dark:text-gray-300 dark:hover:bg-white/5',
            danger: 'bg-red-500 text-white hover:bg-red-600 focus:ring-red-400',
            success: 'bg-green-500 text-white hover:bg-green-600 focus:ring-green-400',
            warning: 'bg-yellow-400 text-white hover:bg-yellow-500 focus:ring-yellow-300',
            info: 'bg-blue-500 text-white hover:bg-blue-600 focus:ring-blue-400'
        };
        return variants[this.variant] || variants.primary;
    }

    getSizeClasses(): string {
        const sizes: Record<McvButtonSize, string> = {
            xs: 'px-2 py-1 text-xs',
            sm: 'px-3 py-1.5 text-sm',
            md: 'px-4 py-2 text-sm',
            lg: 'px-5 py-2.5 text-base',
            xl: 'px-6 py-3 text-lg'
        };
        return sizes[this.size] || sizes.md;
    }
}
