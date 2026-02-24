import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

import { McvProgressBar } from '../../../shared/components/ui/mcv-progress-bar/mcv-progress-bar';

@Component({
    selector: 'app-mcv-progress-bars-page',
    standalone: true,
    imports: [CommonModule, McvProgressBar],
    templateUrl: './mcv-progress-bars-page.html',
    styleUrl: './mcv-progress-bars-page.css'
})
export class McvProgressBarsPage {
    basicBars = [
        { label: 'Storage Used', value: 68, color: '#6366f1' },
        { label: 'CPU Utilization', value: 42, color: '#10b981' },
        { label: 'Memory', value: 83, color: '#f59e0b' },
        { label: 'Bandwidth', value: 27, color: '#ef4444' },
    ];

    labeledBars = [
        { label: 'Sales Target', value: 72, color: '#6366f1' },
        { label: 'Support Tickets', value: 55, color: '#10b981' },
        { label: 'Task Completion', value: 88, color: '#f59e0b' },
    ];
}
