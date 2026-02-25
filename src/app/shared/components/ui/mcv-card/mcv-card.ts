import { Component, Input, ContentChild, TemplateRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { McvAvatar } from '../mcv-avatar/mcv-avatar';
import { McvBadge } from '../mcv-badge/mcv-badge';
import { McvAlert, McvAlertStatus } from '../mcv-alert/mcv-alert';

@Component({
    selector: 'app-mcv-card',
    standalone: true,
    imports: [CommonModule, McvAvatar, McvBadge, McvAlert],
    templateUrl: './mcv-card.html',
    styleUrl: './mcv-card.css'
})
export class McvCard {
    @Input() title: string = '';
    @Input() subtitle: string = '';

    // Avatar Inputs
    @Input() avatarSrc: string = '';
    @Input() avatarInitials: string = '';
    @Input() avatarName: string = '';
    @Input() avatarSize: any = 'sm';

    // Badge Inputs
    @Input() badgeLabel: string = '';
    @Input() badgeVariant: any = 'primary';
    @Input() badgeSoft: boolean = false;

    // Alert Inputs
    @Input() alertMessage: string = '';
    @Input() alertTitle: string = '';
    @Input() alertType: McvAlertStatus = 'info';
    @Input() showAlert: boolean = false;

    @Input() footer: boolean = false;
    @Input() hoverable: boolean = false;
    @Input() padding: string = 'p-5';

    @ContentChild('headerActions') headerActions?: TemplateRef<any>;
    @ContentChild('footerContent') footerContent?: TemplateRef<any>;
}
