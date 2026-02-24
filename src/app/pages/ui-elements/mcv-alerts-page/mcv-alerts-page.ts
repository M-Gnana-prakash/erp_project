import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

import { McvAlert } from '../../../shared/components/ui/mcv-alert/mcv-alert';

@Component({
    selector: 'app-mcv-alerts-page',
    standalone: true,
    imports: [CommonModule, McvAlert],
    templateUrl: './mcv-alerts-page.html',
    styleUrl: './mcv-alerts-page.css'
})
export class McvAlertsPage {
    showSuccess = signal(true);
    showWarning = signal(true);
    showDanger = signal(true);

    resetAlerts() {
        this.showSuccess.set(true);
        this.showWarning.set(true);
        this.showDanger.set(true);
    }
}
