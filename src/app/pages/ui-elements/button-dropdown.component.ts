import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-button-dropdown',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="p-6 space-y-10">
      <!-- Header -->
      <div>
        <h2 class="text-2xl font-bold text-gray-800 dark:text-white">Button Dropdown</h2>
        <p class="text-gray-500 dark:text-gray-400 mt-1">Dropdown menus triggered from buttons — with icons, dividers, and multiple variants.</p>
      </div>

      <!-- ── Default Dropdown ── -->
      <section>
        <h3 class="text-sm font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-4">Default</h3>
        <div class="flex flex-wrap gap-4">
          <!-- Primary Dropdown -->
          <div class="relative">
            <button (click)="toggle('primary')"
                    class="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-500 hover:bg-indigo-600 text-white text-sm font-medium transition-colors">
              Actions
              <svg class="w-4 h-4 transition-transform duration-200" [class.rotate-180]="open() === 'primary'" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>
            </button>
            <div *ngIf="open() === 'primary'"
                 class="absolute left-0 top-full mt-2 w-52 bg-white dark:bg-boxdark border border-gray-200 dark:border-white/10 rounded-xl shadow-xl z-50 py-1 animate-fade-in">
              <button *ngFor="let item of primaryItems" (click)="toggle(null)"
                      class="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-indigo-50 dark:hover:bg-indigo-500/10 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors text-left">
                <span class="text-base">{{ item.icon }}</span>
                {{ item.label }}
              </button>
            </div>
          </div>

          <!-- Outlined Dropdown -->
          <div class="relative">
            <button (click)="toggle('outlined')"
                    class="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-300 dark:border-white/20 text-gray-700 dark:text-gray-300 text-sm font-medium hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
              Options
              <svg class="w-4 h-4 transition-transform duration-200" [class.rotate-180]="open() === 'outlined'" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>
            </button>
            <div *ngIf="open() === 'outlined'"
                 class="absolute left-0 top-full mt-2 w-52 bg-white dark:bg-boxdark border border-gray-200 dark:border-white/10 rounded-xl shadow-xl z-50 py-1">
              <button *ngFor="let item of primaryItems" (click)="toggle(null)"
                      class="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors text-left">
                <span class="text-base">{{ item.icon }}</span>
                {{ item.label }}
              </button>
            </div>
          </div>
        </div>
      </section>

      <!-- ── With Dividers & Sections ── -->
      <section>
        <h3 class="text-sm font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-4">With Dividers</h3>
        <div class="relative inline-block">
          <button (click)="toggle('dividers')"
                  class="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-800 hover:bg-gray-900 dark:bg-white/10 dark:hover:bg-white/20 text-white text-sm font-medium transition-colors">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"/></svg>
            More
            <svg class="w-4 h-4 transition-transform duration-200" [class.rotate-180]="open() === 'dividers'" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>
          </button>
          <div *ngIf="open() === 'dividers'"
               class="absolute left-0 top-full mt-2 w-56 bg-white dark:bg-boxdark border border-gray-200 dark:border-white/10 rounded-xl shadow-xl z-50 py-1">
            <div class="px-3 py-1.5">
              <p class="text-xs font-semibold text-gray-400 uppercase tracking-widest">Account</p>
            </div>
            <button class="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors text-left">
              <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>
              View Profile
            </button>
            <button class="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors text-left">
              <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
              Settings
            </button>
            <div class="my-1 border-t border-gray-100 dark:border-white/10"></div>
            <div class="px-3 py-1.5">
              <p class="text-xs font-semibold text-gray-400 uppercase tracking-widest">Data</p>
            </div>
            <button class="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors text-left">
              <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/></svg>
              Export Data
            </button>
            <div class="my-1 border-t border-gray-100 dark:border-white/10"></div>
            <button class="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors text-left">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/></svg>
              Sign Out
            </button>
          </div>
        </div>
      </section>

      <!-- ── Split Button ── -->
      <section>
        <h3 class="text-sm font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-4">Split Button</h3>
        <div class="flex">
          <button class="px-4 py-2 rounded-l-lg bg-indigo-500 hover:bg-indigo-600 text-white text-sm font-medium transition-colors border-r border-indigo-400">
            Save Changes
          </button>
          <div class="relative">
            <button (click)="toggle('split')"
                    class="px-3 py-2 rounded-r-lg bg-indigo-500 hover:bg-indigo-600 text-white transition-colors">
              <svg class="w-4 h-4 transition-transform duration-200" [class.rotate-180]="open() === 'split'" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>
            </button>
            <div *ngIf="open() === 'split'"
                 class="absolute right-0 top-full mt-2 w-48 bg-white dark:bg-boxdark border border-gray-200 dark:border-white/10 rounded-xl shadow-xl z-50 py-1">
              <button class="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">💾 Save & Continue</button>
              <button class="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">📋 Save as Draft</button>
              <button class="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">📤 Save & Publish</button>
            </div>
          </div>
        </div>
      </section>
    </div>
  `
})
export class ButtonDropdownComponent {
  open = signal<string | null>(null);

  toggle(key: string | null) {
    this.open.set(this.open() === key ? null : key);
  }

  primaryItems = [
    { icon: '✏️', label: 'Edit Item' },
    { icon: '📋', label: 'Duplicate' },
    { icon: '📤', label: 'Export' },
    { icon: '🗑️', label: 'Delete' },
  ];
}
