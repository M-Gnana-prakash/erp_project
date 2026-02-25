import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { McvModal } from '../../../shared/components/ui/mcv-modal/mcv-modal';

@Component({
    selector: 'app-mcv-modals-page',
    standalone: true,
    imports: [CommonModule, McvModal],
    templateUrl: './mcv-modals-page.html',
    styleUrl: './mcv-modals-page.css'
})
export class McvModalsPage {
    isBasicOpen = signal(false);
    isProfileOpen = signal(false);
    isAlertOpen = signal(false);

    toggleBasic() { this.isBasicOpen.set(!this.isBasicOpen()); }
    toggleProfile() { this.isProfileOpen.set(!this.isProfileOpen()); }
    toggleAlert() { this.isAlertOpen.set(!this.isAlertOpen()); }
}
