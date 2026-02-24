import { Component, Input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-mcv-image',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './mcv-image.html',
    styleUrl: './mcv-image.css'
})
export class McvImage {
    @Input() src: string = '';
    @Input() alt: string = '';
    @Input() width: string | number = '100%';
    @Input() height: string | number = 'auto';
    @Input() rounded: 'none' | 'sm' | 'md' | 'lg' | 'full' = 'md';
    @Input() objectFit: 'cover' | 'contain' | 'fill' | 'none' = 'cover';
    @Input() showCaption: boolean = false;
    @Input() caption: string = '';
    @Input() zoomable: boolean = false;
    @Input() loading: 'lazy' | 'eager' = 'lazy';
    @Input() customClass: string = '';

    isLoaded = signal(false);
    hasError = signal(false);
    isZoomed = signal(false);

    handleLoad() {
        this.isLoaded.set(true);
    }

    handleError() {
        this.hasError.set(true);
    }

    toggleZoom() {
        if (this.zoomable) {
            this.isZoomed.update(v => !v);
        }
    }

    getRoundedClass(): string {
        const classes = {
            none: 'rounded-none',
            sm: 'rounded-sm',
            md: 'rounded-lg',
            lg: 'rounded-2xl',
            full: 'rounded-full'
        };
        return classes[this.rounded] || classes.md;
    }
}
