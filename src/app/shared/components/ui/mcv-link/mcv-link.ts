import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

export type McvLinkVariant = 'primary' | 'secondary' | 'danger' | 'success' | 'warning' | 'info' | 'white' | 'dark';
export type McvLinkUnderline = 'none' | 'hover' | 'always' | 'expanded';

@Component({
    selector: 'app-mcv-link',
    standalone: true,
    imports: [CommonModule, RouterModule],
    templateUrl: './mcv-link.html',
    styleUrl: './mcv-link.css'
})
export class McvLink {
    @Input() href: string = '';
    @Input() route: string = '';
    @Input() label: string = '';
    @Input() variant: McvLinkVariant = 'primary';
    @Input() underline: McvLinkUnderline = 'hover';
    @Input() size: 'sm' | 'md' | 'lg' = 'md';
    @Input() icon: string = '';
    @Input() iconPosition: 'left' | 'right' = 'left';
    @Input() download: string | boolean = false;
    @Input() external: boolean = false;
    @Input() customClass: string = '';

    getVariantClasses(): string {
        const variants: Record<McvLinkVariant, string> = {
            primary: 'text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300',
            secondary: 'text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200',
            danger: 'text-red-500 hover:text-red-600',
            success: 'text-green-500 hover:text-green-600',
            warning: 'text-yellow-500 hover:text-yellow-600',
            info: 'text-blue-500 hover:text-blue-600',
            white: 'text-white hover:text-gray-200',
            dark: 'text-gray-900 hover:text-black dark:text-white'
        };
        return variants[this.variant] || variants.primary;
    }

    getUnderlineClasses(): string {
        const underlines = {
            none: 'no-underline',
            hover: 'no-underline hover:underline',
            always: 'underline',
            expanded: 'relative group'
        };
        return underlines[this.underline] || underlines.hover;
    }
}
