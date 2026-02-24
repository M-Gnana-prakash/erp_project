import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { McvSpinner } from '../../../shared/components/ui/mcv-spinner/mcv-spinner';

@Component({
    selector: 'app-mcv-spinners-page',
    standalone: true,
    imports: [CommonModule, McvSpinner],
    templateUrl: './mcv-spinners-page.html',
    styleUrl: './mcv-spinners-page.css'
})
export class McvSpinnersPage { }
