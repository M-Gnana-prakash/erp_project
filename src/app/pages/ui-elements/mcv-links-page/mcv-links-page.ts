import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { McvLink } from '../../../shared/components/ui/mcv-link/mcv-link';

@Component({
    selector: 'app-mcv-links-page',
    standalone: true,
    imports: [CommonModule, McvLink],
    templateUrl: './mcv-links-page.html',
    styleUrl: './mcv-links-page.css'
})
export class McvLinksPage { }
