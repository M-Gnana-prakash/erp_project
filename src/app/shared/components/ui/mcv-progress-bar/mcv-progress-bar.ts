import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-mcv-progress-bar',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './mcv-progress-bar.html',
    styleUrl: './mcv-progress-bar.css'
})
export class McvProgressBar {
    @Input() value: number = 0;
    @Input() max: number = 100;
    @Input() label: string = '';
    @Input() color: string = '#6366f1';
    @Input() size: 'xs' | 'sm' | 'md' | 'lg' = 'md';
    @Input() showValue: boolean = false;
    @Input() variant: 'default' | 'shimmer' | 'striped' = 'default';
    @Input() labelInside: boolean = false;

    get percentage(): number {
        return (this.value / this.max) * 100;
    }

    getSizeClasses(): string {
        const sizes = {
            xs: 'h-1',
            sm: 'h-2',
            md: 'h-4',
            lg: 'h-6'
        };
        return sizes[this.size] || sizes.md;
    }
}
