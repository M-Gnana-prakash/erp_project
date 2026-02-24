import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { McvBadge } from '../../../shared/components/ui/mcv-badge/mcv-badge';

@Component({
    selector: 'app-mcv-badges-page',
    standalone: true,
    imports: [CommonModule, McvBadge],
    templateUrl: './mcv-badges-page.html',
    styleUrl: './mcv-badges-page.css'
})
export class McvBadgesPage { }
