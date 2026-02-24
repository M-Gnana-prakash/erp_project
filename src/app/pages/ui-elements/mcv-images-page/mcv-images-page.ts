import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { McvImage } from '../../../shared/components/ui/mcv-image/mcv-image';

@Component({
    selector: 'app-mcv-images-page',
    standalone: true,
    imports: [CommonModule, McvImage],
    templateUrl: './mcv-images-page.html',
    styleUrl: './mcv-images-page.css'
})
export class McvImagesPage { }
