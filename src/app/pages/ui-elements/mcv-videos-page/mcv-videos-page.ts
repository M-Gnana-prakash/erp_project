import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { McvVideo } from '../../../shared/components/ui/mcv-video/mcv-video';

@Component({
    selector: 'app-mcv-videos-page',
    standalone: true,
    imports: [CommonModule, McvVideo],
    templateUrl: './mcv-videos-page.html',
    styleUrl: './mcv-videos-page.css'
})
export class McvVideosPage { }
