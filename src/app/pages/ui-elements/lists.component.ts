import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-lists',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="p-6 space-y-10">
      <!-- Header -->
      <div>
        <h2 class="text-2xl font-bold text-gray-800 dark:text-white">Lists</h2>
        <p class="text-gray-500 dark:text-gray-400 mt-1">List variants with borders, selection states, rich content, and radio/checkbox options.</p>
      </div>

      <!-- ── Simple List with Borders ── -->
      <section>
        <h3 class="text-sm font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-4">Simple with Borders</h3>
        <ul class="divide-y divide-gray-200 dark:divide-white/10 border border-gray-200 dark:border-white/10 rounded-xl overflow-hidden">
          <li *ngFor="let item of simpleItems" class="flex items-center justify-between px-4 py-3 bg-white dark:bg-boxdark hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
            <span class="text-sm text-gray-700 dark:text-gray-300">{{ item.label }}</span>
            <span class="text-xs font-medium px-2 py-0.5 rounded-full" [ngClass]="item.badgeClass">{{ item.badge }}</span>
          </li>
        </ul>
      </section>

      <!-- ── Selectable List (Single) ── -->
      <section>
        <h3 class="text-sm font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-4">Single Selection</h3>
        <ul class="divide-y divide-gray-200 dark:divide-white/10 border border-gray-200 dark:border-white/10 rounded-xl overflow-hidden">
          <li *ngFor="let item of selectionItems" (click)="selectItem(item)"
              class="flex items-center gap-3 px-4 py-3 cursor-pointer transition-colors"
              [ngClass]="selectedItem() === item.id ? 'bg-indigo-50 dark:bg-indigo-500/10 border-l-4 border-indigo-500' : 'bg-white dark:bg-boxdark hover:bg-gray-50 dark:hover:bg-white/5'">
            <div class="w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold text-white flex-shrink-0" [ngStyle]="{'background': item.color}">{{ item.initials }}</div>
            <div class="flex-1 min-w-0">
              <p class="text-sm font-medium text-gray-800 dark:text-white truncate">{{ item.name }}</p>
              <p class="text-xs text-gray-500 dark:text-gray-400 truncate">{{ item.role }}</p>
            </div>
            <svg *ngIf="selectedItem() === item.id" class="w-5 h-5 text-indigo-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/></svg>
          </li>
        </ul>
        <p class="mt-2 text-xs text-gray-400 dark:text-gray-500">Selected: <span class="font-medium text-indigo-600 dark:text-indigo-400">{{ getSelectedName() }}</span></p>
      </section>

      <!-- ── Checkbox Multi-Select ── -->
      <section>
        <h3 class="text-sm font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-4">Multi-Select (Checkbox)</h3>
        <ul class="divide-y divide-gray-200 dark:divide-white/10 border border-gray-200 dark:border-white/10 rounded-xl overflow-hidden">
          <li *ngFor="let item of checkItems" (click)="toggleCheck(item)"
              class="flex items-center gap-3 px-4 py-3 cursor-pointer transition-colors"
              [ngClass]="item.checked ? 'bg-indigo-50 dark:bg-indigo-500/10' : 'bg-white dark:bg-boxdark hover:bg-gray-50 dark:hover:bg-white/5'">
            <div class="w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 transition-colors"
                 [ngClass]="item.checked ? 'bg-indigo-500 border-indigo-500' : 'border-gray-300 dark:border-gray-600'">
              <svg *ngIf="item.checked" class="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"/></svg>
            </div>
            <div class="flex-1">
              <p class="text-sm font-medium text-gray-800 dark:text-white">{{ item.label }}</p>
              <p class="text-xs text-gray-500 dark:text-gray-400">{{ item.desc }}</p>
            </div>
            <span class="text-xs text-gray-400">{{ item.count }}</span>
          </li>
        </ul>
        <p class="mt-2 text-xs text-gray-400">{{ checkedCount() }} of {{ checkItems.length }} selected</p>
      </section>

      <!-- ── Rich List ── -->
      <section>
        <h3 class="text-sm font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-4">Rich List</h3>
        <ul class="divide-y divide-gray-200 dark:divide-white/10 border border-gray-200 dark:border-white/10 rounded-xl overflow-hidden">
          <li *ngFor="let item of richItems" class="flex items-start gap-4 px-4 py-4 bg-white dark:bg-boxdark hover:bg-gray-50 dark:hover:bg-white/5 transition-colors group">
            <div class="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 text-white text-lg" [ngStyle]="{'background': item.color}">{{ item.icon }}</div>
            <div class="flex-1 min-w-0">
              <div class="flex items-center justify-between gap-2">
                <p class="text-sm font-semibold text-gray-800 dark:text-white">{{ item.title }}</p>
                <span class="text-xs text-gray-400 whitespace-nowrap">{{ item.time }}</span>
              </div>
              <p class="text-xs text-gray-500 dark:text-gray-400 mt-0.5 line-clamp-1">{{ item.desc }}</p>
            </div>
          </li>
        </ul>
      </section>

    </div>
  `
})
export class ListsDemoComponent {
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
