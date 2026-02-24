import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

import { McvDropdown, McvDropdownItem } from '../../../shared/components/ui/mcv-dropdown/mcv-dropdown';

@Component({
    selector: 'app-mcv-dropdown-page',
    standalone: true,
    imports: [CommonModule, McvDropdown],
    templateUrl: './mcv-dropdown-page.html',
    styleUrl: './mcv-dropdown-page.css'
})
export class McvDropdownPage {
    dropdownItems: McvDropdownItem[] = [
        { section: 'Account' },
        { icon: '👤', label: 'My Profile' },
        { icon: '⚙️', label: 'Settings' },
        { divider: true },
        { section: 'Actions' },
        { icon: '📤', label: 'Share' },
        { icon: '🗑️', label: 'Delete User', danger: true },
    ];

    handleDropClick(item: McvDropdownItem) {
        console.log('Clicked:', item.label);
    }
}
