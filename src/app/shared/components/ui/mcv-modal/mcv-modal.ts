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
    @Input() title: string = '';
    @Input() size: 'sm' | 'md' | 'lg' | 'xl' | 'full' = 'md';

    // Avatar Inputs
    @Input() avatarSrc: string = '';
    @Input() avatarInitials: string = '';
    @Input() avatarName: string = '';

    // Badge Inputs
    @Input() badgeLabel: string = '';
    @Input() badgeVariant: any = 'primary';

    // Alert Inputs
    @Input() alertMessage: string = '';
    @Input() alertTitle: string = '';
    @Input() alertType: McvAlertStatus = 'info';
    @Input() showAlert: boolean = false;

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
