import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { McvButton } from '../../../shared/components/ui/mcv-button/mcv-button';

@Component({
    selector: 'app-mcv-buttons-page',
    standalone: true,
    imports: [CommonModule, McvButton],
    templateUrl: './mcv-buttons-page.html',
    styleUrl: './mcv-buttons-page.css'
})
export class McvButtonsPage { }
