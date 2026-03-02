import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { McvCard } from '../../../shared/components/ui/mcv-card/mcv-card';
import { McvDropdownItem } from '../../../shared/components/ui/mcv-dropdown/mcv-dropdown';

interface CardConfig {
    title: string;
    subtitle?: string;
    content?: string;
    padding?: string;
    avatarInitials?: string;
    avatarSrc?: string;
    avatarName?: string;
    avatarSize?: any;
    badgeLabel?: string;
    badgeVariant?: string;
    badgeSoft?: boolean;
    hoverable?: boolean;
    footer?: boolean;
    showPrice?: boolean;
    price?: string;
    showAlert?: boolean;
    alertTitle?: string;
    alertMessage?: string;
    alertType?: any;
    alertDismissible?: boolean;
    showProgress?: boolean;
    progress?: number;
    progressColor?: string;
    dropdownOptions?: McvDropdownItem[];
}

@Component({
    selector: 'app-mcv-cards-page',
    standalone: true,
    imports: [CommonModule, McvCard],
    templateUrl: './mcv-cards-page.html',
    styleUrl: './mcv-cards-page.css'
})
export class McvCardsPage {
    cardData: CardConfig[] = [
        {
            title: 'Standard Card',
            subtitle: 'A simple card with some text content.',
            content: 'This is a basic card showing how the vertical flow works. It handles both light and dark modes seamlessly.',
            padding: 'p-5'
        },
        {
            title: 'Premium Plan',
            subtitle: 'Business Suite',
            avatarInitials: 'P',
            avatarName: 'Premium',
            badgeLabel: 'Bestseller',
            badgeVariant: 'success',
            hoverable: true,
            showPrice: true,
            price: '$49/mo'
        },
        {
            title: 'Johnathan Doe',
            subtitle: 'Software Architect',
            avatarSrc: 'https://i.pravatar.cc/150?u=john',
            badgeLabel: 'Expert',
            badgeVariant: 'purple',
            hoverable: true,
            footer: true,
            content: 'Passionate about building scalable web applications and exploring new technologies in the cloud ecosystem.'
        },
        {
            title: 'Project Alpha',
            subtitle: 'Q1 Deliverables',
            avatarInitials: 'A',
            avatarName: 'Alpha',
            badgeLabel: 'In Progress',
            badgeVariant: 'info',
            dropdownOptions: [
                { label: 'Edit', icon: 'fas fa-edit' },
                { label: 'Share', icon: 'fas fa-share-alt' },
                { divider: true },
                { label: 'Delete', icon: 'fas fa-trash', danger: true }
            ],
            content: 'This card demonstrates the new <b>automated dropdown</b> feature. Just pass the options as an input!'
        },
        {
            title: 'Server Node 01',
            subtitle: 'Identity Service',
            showAlert: true,
            alertTitle: 'Connection Lost',
            alertMessage: 'Heartbeat failed 5 minutes ago.',
            alertType: 'danger' as const,
            alertDismissible: false,
            badgeLabel: 'Down',
            badgeVariant: 'danger',
            showProgress: true,
            progress: 66,
            progressColor: 'bg-red-500'
        }
    ];

    handleDropdownClick(item: McvDropdownItem) {
        alert(`Clicked: ${item.label}`);
    }
}
