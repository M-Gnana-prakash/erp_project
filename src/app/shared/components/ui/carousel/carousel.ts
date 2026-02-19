import { Component, Input, OnInit, OnDestroy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-carousel',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './carousel.html',
    styleUrl: './carousel.css'
})
export class CarouselComponent implements OnInit, OnDestroy {
    @Input() items: { image: string, title?: string, description?: string }[] = [];
    @Input() disablePrev: boolean = false;
    @Input() disableNext: boolean = false;
    @Input() mode: 'manual' | 'auto' = 'manual';
    @Input() interval: number = 3000;
    @Input() fullScreen: boolean = false;

    currentIndex = signal(0);
    private timer: any;

    ngOnInit() {
        if (this.mode === 'auto') {
            this.startTimer();
        }
    }

    ngOnDestroy() {
        this.stopTimer();
    }

    next() {
        if (this.disableNext) return;
        if (this.currentIndex() < this.items.length - 1) {
            this.currentIndex.update(i => i + 1);
        } else {
            this.currentIndex.set(0);
        }
    }

    prev() {
        if (this.disablePrev) return;
        if (this.currentIndex() > 0) {
            this.currentIndex.update(i => i - 1);
        } else {
            this.currentIndex.set(this.items.length - 1);
        }
    }

    goTo(index: number) {
        this.currentIndex.set(index);
        if (this.mode === 'auto') {
            this.stopTimer();
            this.startTimer();
        }
    }

    private startTimer() {
        this.stopTimer();
        this.timer = setInterval(() => {
            this.next();
        }, this.interval);
    }

    private stopTimer() {
        if (this.timer) {
            clearInterval(this.timer);
        }
    }
}
