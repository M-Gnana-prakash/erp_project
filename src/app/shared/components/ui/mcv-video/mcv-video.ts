import { Component, Input, ViewChild, ElementRef, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-mcv-video',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './mcv-video.html',
    styleUrl: './mcv-video.css'
})
export class McvVideo {
    @Input() src: string = '';
    @Input() poster: string = '';
    @Input() controls: boolean = true;
    @Input() autoplay: boolean = false;
    @Input() loop: boolean = false;
    @Input() muted: boolean = false;
    @Input() width: string | number = '100%';
    @Input() height: string | number = 'auto';
    @Input() rounded: 'none' | 'sm' | 'md' | 'lg' = 'md';
    @Input() customClass: string = '';

    @ViewChild('videoPlayer') videoPlayer!: ElementRef<HTMLVideoElement>;

    isPlaying = signal(false);
    isMuted = signal(false);
    progress = signal(0);

    ngOnInit() {
        this.isMuted.set(this.muted);
    }

    togglePlay() {
        const video = this.videoPlayer.nativeElement;
        if (video.paused) {
            video.play();
            this.isPlaying.set(true);
        } else {
            video.pause();
            this.isPlaying.set(false);
        }
    }

    toggleMute() {
        const video = this.videoPlayer.nativeElement;
        video.muted = !video.muted;
        this.isMuted.set(video.muted);
    }

    handleTimeUpdate() {
        const video = this.videoPlayer.nativeElement;
        const currentProgress = (video.currentTime / video.duration) * 100;
        this.progress.set(currentProgress);
    }

    getRoundedClass(): string {
        const classes = {
            none: 'rounded-none',
            sm: 'rounded-sm',
            md: 'rounded-lg',
            lg: 'rounded-2xl'
        };
        return classes[this.rounded] || classes.md;
    }
}
