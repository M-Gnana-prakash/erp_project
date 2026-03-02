import { Component, Input, Output, EventEmitter, ContentChild, TemplateRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { McvAvatar } from '../mcv-avatar/mcv-avatar';
import { McvBadge } from '../mcv-badge/mcv-badge';
import { McvAlert, McvAlertStatus } from '../mcv-alert/mcv-alert';

@Component({
    selector: 'app-mcv-modal',
    standalone: true,
    imports: [CommonModule, McvAvatar, McvBadge, McvAlert],
    templateUrl: './mcv-modal.html',
    styleUrl: './mcv-modal.css'
})
export class McvModal {
    @Input() isOpen: boolean = false;
    @Input() titleBase: string = ''; // Renamed internally to avoid conflict if necessary, but actually let's just keep 'title'
    @Input() title: string = '';
    @Input() size: 'sm' | 'md' | 'lg' | 'xl' | 'full' = 'md';

    // Avatar Inputs
    @Input() avatarSrc: string = '';
    @Input() avatarInitials: string = '';
    @Input() avatarName: string = '';
    @Input() avatarSize: any = 'sm';

    // Badge Inputs
    @Input() badgeLabel: string = '';
    @Input() badgeVariant: any = 'primary';
    @Input() badgeSoft: boolean = true;

    // Alert Inputs
    @Input() alertMessage: string = '';
    @Input() alertTitle: string = '';
    @Input() alertType: McvAlertStatus = 'info';
    @Input() showAlert: boolean = false;
    @Input() alertDismissible: boolean = true;

    // Title Icon
    @Input() titleIcon: string = '';

    // Direct Content & Buttons Inputs
    @Input() content: string = '';
    @Input() buttons: { label: string, onClick?: () => void, variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger', icon?: string }[] = [];

    @Output() close = new EventEmitter<void>();

    @ContentChild('footerContent') footerContent?: TemplateRef<any>;

    closeModal() {
        this.close.emit();
    }

    getSizeClasses(): string {
        const sizes = {
            sm: 'max-w-md',
            md: 'max-w-lg',
            lg: 'max-w-2xl',
            xl: 'max-w-4xl',
            full: 'max-w-[95vw] h-[95vh]'
        };
        return sizes[this.size] || sizes.md;
    }
}
