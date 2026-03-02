import { Component, signal, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { McvModal } from '../../../shared/components/ui/mcv-modal/mcv-modal';

interface ModalConfig {
    id: string;
    isOpen: WritableSignal<boolean>;
    title: string;
    content?: string;
    buttons?: any[];
    avatarSrc?: string;
    avatarInitials?: string;
    avatarName?: string;
    avatarSize?: any;
    badgeLabel?: string;
    badgeVariant?: string;
    badgeSoft?: boolean;
    titleIcon?: string;
    showAlert?: boolean;
    alertTitle?: string;
    alertMessage?: string;
    alertType?: any;
    alertDismissible?: boolean;
}

@Component({
    selector: 'app-mcv-modals-page',
    standalone: true,
    imports: [CommonModule, McvModal],
    templateUrl: './mcv-modals-page.html',
    styleUrl: './mcv-modals-page.css'
})
export class McvModalsPage {
    modalConfigs: ModalConfig[] = [
        {
            id: 'basic',
            isOpen: signal(false),
            title: 'Settings',
            content: '<p class="text-gray-600 dark:text-gray-400">Configure your application preferences here. These changes will be applied instantly to your workspace.</p>',
            buttons: [
                { label: 'Close', variant: 'outline' as const, onClick: () => this.toggleModal('basic') }
            ]
        },
        {
            id: 'profile',
            isOpen: signal(false),
            title: 'Account Details',
            avatarSrc: 'https://i.pravatar.cc/150?u=account',
            badgeLabel: 'Verified',
            badgeVariant: 'success',
            content: `
                <div class="space-y-4">
                    <div class="grid grid-cols-2 gap-4">
                        <div class="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                            <p class="text-xs text-gray-500 uppercase">Username</p>
                            <p class="font-medium text-gray-900 dark:text-white">johndoe_dev</p>
                        </div>
                        <div class="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                            <p class="text-xs text-gray-500 uppercase">Role</p>
                            <p class="font-medium text-gray-900 dark:text-white">Administrator</p>
                        </div>
                    </div>
                    <p class="text-sm text-gray-600 dark:text-gray-400">
                        Member since January 2024. Last login was 2 hours ago from New York, USA.
                    </p>
                </div>
            `,
            buttons: [
                { label: 'Cancel', variant: 'outline' as const, onClick: () => this.toggleModal('profile') },
                { label: 'Save Changes', variant: 'primary' as const, onClick: () => this.toggleModal('profile') }
            ]
        },
        {
            id: 'alert',
            isOpen: signal(false),
            title: 'Security Breach',
            showAlert: true,
            badgeLabel: 'Critical',
            badgeVariant: 'danger',
            alertTitle: 'Suspicious Login',
            alertMessage: 'An unusual login attempt was detected from Moscow, Russia.',
            alertType: 'danger' as const,
            content: `
                <div class="p-4 border-l-4 border-yellow-400 bg-yellow-50 dark:bg-yellow-900/10 mb-4">
                    <p class="text-sm text-yellow-800 dark:text-yellow-200">
                        For your security, your account has been temporarily locked. Please verify your identity.
                    </p>
                </div>
                <p class="text-gray-600 dark:text-gray-400 text-sm">
                    Contact support immediately if this wasn't you. You will need to reset your password and enable 2FA after verification.
                </p>
            `,
            buttons: [
                { label: 'Remind Me Later', variant: 'secondary' as const, onClick: () => this.toggleModal('alert') },
                { label: 'Update Now', variant: 'danger' as const, onClick: () => this.toggleModal('alert') }
            ]
        },
        {
            id: 'dynamic',
            isOpen: signal(false),
            title: 'Dynamic Configuration',
            titleIcon: 'fas fa-cog',
            avatarInitials: 'DC',
            avatarSize: 'md',
            badgeLabel: 'New Feature',
            badgeVariant: 'success',
            badgeSoft: false,
            showAlert: true,
            alertTitle: 'Toolkit Update',
            alertMessage: 'A new version of the UI toolkit is available with @if and @for support.',
            alertType: 'info' as const,
            alertDismissible: false,
            content: 'This modal is configured entirely via <b>inputs</b>. No need for complex templates in the parent component anymore!',
            buttons: [
                { label: 'Cancel', variant: 'outline' as const, onClick: () => this.toggleModal('dynamic') },
                { label: 'Confirm Action', variant: 'primary' as const, onClick: () => { alert('Confirmed!'); this.toggleModal('dynamic'); } }
            ]
        }
    ];

    toggleModal(id: string) {
        const modal = this.modalConfigs.find(m => m.id === id);
        if (modal) {
            modal.isOpen.set(!modal.isOpen());
        }
    }
}
