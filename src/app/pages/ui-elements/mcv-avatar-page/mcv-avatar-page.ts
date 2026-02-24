import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { McvAvatar } from '../../../shared/components/ui/mcv-avatar/mcv-avatar';

@Component({
    selector: 'app-mcv-avatar-page',
    standalone: true,
    imports: [CommonModule, McvAvatar],
    templateUrl: './mcv-avatar-page.html',
    styleUrl: './mcv-avatar-page.css'
})
export class McvAvatarPage {
    initialsAvatars = [
        { initials: 'JD', name: 'John D.', color: '#6366f1', indicator: 'bg-green-500' },
        { initials: 'AR', name: 'Alice R.', color: '#f59e0b', indicator: 'bg-yellow-400' },
        { initials: 'MK', name: 'Mike K.', color: '#10b981', indicator: 'bg-red-500' },
        { initials: 'SP', name: 'Sara P.', color: '#ef4444', indicator: null },
        { initials: 'BL', name: 'Bob L.', color: '#8b5cf6', indicator: 'bg-gray-400' },
    ];
}
