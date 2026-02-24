import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

import { McvList } from '../../../shared/components/ui/mcv-list/mcv-list';

@Component({
    selector: 'app-mcv-lists-page',
    standalone: true,
    imports: [CommonModule, McvList],
    templateUrl: './mcv-lists-page.html',
    styleUrl: './mcv-lists-page.css'
})
export class McvListsPage {
    simpleItems = [
        { label: 'Dashboard Overview', badge: 'New', badgeClass: 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300' },
        { label: 'User Management', badge: '12', badgeClass: 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300' },
        { label: 'Analytics Reports', badge: 'Pro', badgeClass: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300' },
        { label: 'Billing & Invoices', badge: '3', badgeClass: 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-300' },
        { label: 'System Settings', badge: '', badgeClass: '' },
    ];

    selectionItems = [
        { id: 1, name: 'Alice Reynolds', role: 'Frontend Developer', initials: 'AR', color: '#6366f1' },
        { id: 2, name: 'Mark Johnson', role: 'Product Manager', initials: 'MJ', color: '#10b981' },
        { id: 3, name: 'Sara Patel', role: 'UX Designer', initials: 'SP', color: '#f59e0b' },
        { id: 4, name: 'David Kim', role: 'Backend Engineer', initials: 'DK', color: '#ef4444' },
    ];
    selectedItem = signal<number | null>(null);
    selectItem(item: any) { this.selectedItem.set(item.id); }
    getSelectedName() {
        const found = this.selectionItems.find(i => i.id === this.selectedItem());
        return found ? found.name : 'None';
    }

    checkItems = [
        { label: 'Email Notifications', desc: 'Receive alerts via email', count: '5 active', checked: true },
        { label: 'Push Notifications', desc: 'Browser push messages', count: '2 active', checked: false },
        { label: 'SMS Alerts', desc: 'Texts for critical events', count: 'Off', checked: false },
        { label: 'Weekly Digest', desc: 'Summary every Monday', count: '1 active', checked: true },
    ];
    toggleCheck(item: any) { item.checked = !item.checked; }
    checkedCount() { return this.checkItems.filter(i => i.checked).length; }

    richItems = [
        { icon: '📦', title: 'New Order #4821', desc: 'MacBook Pro 14" — 2 units placed by John Doe', time: '2m ago', color: '#6366f1' },
        { icon: '👤', title: 'New User Registered', desc: 'sara.p@example.com joined the platform', time: '15m ago', color: '#10b981' },
        { icon: '⚠️', title: 'Server Warning', desc: 'CPU usage exceeded 85% on prod-server-02', time: '1h ago', color: '#f59e0b' },
        { icon: '✅', title: 'Deployment Successful', desc: 'v2.4.1 deployed to production successfully', time: '3h ago', color: '#0ea5e9' },
    ];
}
