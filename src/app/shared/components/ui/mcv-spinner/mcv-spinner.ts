import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-mcv-spinner',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './mcv-spinner.html',
    styleUrl: './mcv-spinner.css'
})
export class McvSpinner {
    @Input() variant: 'circle' | 'dots' | 'pulse' | 'bars' = 'circle';
    @Input() size: 'xs' | 'sm' | 'md' | 'lg' | 'xl' = 'md';
    @Input() color: string = 'text-indigo-600';
    @Input() label: string = '';

    getSizeClasses(): string {
        const sizes = {
            xs: 'w-4 h-4',
            sm: 'w-6 h-6',
            md: 'w-8 h-8',
            lg: 'w-12 h-12',
            xl: 'w-16 h-16'
        };
        return sizes[this.size] || sizes.md;
    }
}
