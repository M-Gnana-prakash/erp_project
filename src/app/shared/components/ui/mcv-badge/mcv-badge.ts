import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

export type McvBadgeVariant = 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info' | 'purple' | 'neutral' | 'pink';

@Component({
    selector: 'app-mcv-badge',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './mcv-badge.html',
    styleUrl: './mcv-badge.css'
})
export class McvBadge {
    @Input() label: string = '';
    @Input() variant: McvBadgeVariant = 'primary';
    @Input() soft: boolean = false;
    @Input() outline: boolean = false;
    @Input() pill: boolean = true;
    @Input() dot: boolean = false;

    getVariantClasses(): string {
        const variants: Record<McvBadgeVariant, { solid: string, soft: string, outline: string, dot: string }> = {
            primary: {
                solid: 'bg-indigo-500 text-white',
                soft: 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300',
                outline: 'border-indigo-500 text-indigo-600 dark:text-indigo-400',
                dot: 'bg-indigo-500'
            },
            secondary: {
                solid: 'bg-gray-500 text-white',
                soft: 'bg-gray-100 text-gray-700 dark:bg-gray-700/50 dark:text-gray-300',
                outline: 'border-gray-500 text-gray-600 dark:text-gray-400',
                dot: 'bg-gray-500'
            },
            success: {
                solid: 'bg-green-500 text-white',
                soft: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300',
                outline: 'border-green-500 text-green-600 dark:text-green-400',
                dot: 'bg-green-500'
            },
            warning: {
                solid: 'bg-yellow-400 text-white',
                soft: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300',
                outline: 'border-yellow-400 text-yellow-600 dark:text-yellow-400',
                dot: 'bg-yellow-500'
            },
            danger: {
                solid: 'bg-red-500 text-white',
                soft: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300',
                outline: 'border-red-500 text-red-600 dark:text-red-400',
                dot: 'bg-red-500'
            },
            info: {
                solid: 'bg-blue-500 text-white',
                soft: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300',
                outline: 'border-blue-500 text-blue-600 dark:text-blue-400',
                dot: 'bg-blue-500'
            },
            purple: {
                solid: 'bg-purple-500 text-white',
                soft: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300',
                outline: 'border-purple-500 text-purple-600 dark:text-purple-400',
                dot: 'bg-purple-500'
            },
            neutral: {
                solid: 'bg-gray-400 text-white',
                soft: 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400',
                outline: 'border-gray-400 text-gray-500 dark:text-gray-400',
                dot: 'bg-gray-400'
            },
            pink: {
                solid: 'bg-pink-500 text-white',
                soft: 'bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-300',
                outline: 'border-pink-500 text-pink-600 dark:text-pink-400',
                dot: 'bg-pink-500'
            }
        };

        const config = variants[this.variant] || variants.primary;

        if (this.outline) return `border ${config.outline} bg-transparent`;
        if (this.soft) return config.soft;
        return config.solid;
    }

    getDotColor(): string {
        const variants: Record<McvBadgeVariant, string> = {
            primary: 'bg-indigo-500',
            secondary: 'bg-gray-500',
            success: 'bg-green-500',
            warning: 'bg-yellow-500',
            danger: 'bg-red-500',
            info: 'bg-blue-500',
            purple: 'bg-purple-500',
            neutral: 'bg-gray-400',
            pink: 'bg-pink-500'
        };
        return variants[this.variant] || variants.primary;
    }
}
