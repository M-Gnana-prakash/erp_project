import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarService } from '../../../../core/services/sidebar.service';
import { ThemeService } from '../../../../core/services/theme.service';

@Component({
    selector: 'app-settings',
    standalone: true,
    imports: [CommonModule],
    template: `
    <div class="fixed bottom-8 right-8 z-99999">
      <!-- Floating Button -->
      <button 
        (click)="toggleSettings()"
        class="flex items-center justify-center w-12 h-12 text-white rounded-full shadow-lg bg-primary hover:bg-opacity-90 transition-transform hover:scale-105"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 animate-spin-slow" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      </button>

      <!-- Settings Panel -->
      <div *ngIf="isOpen()" class="absolute bottom-16 right-0 w-72 bg-white dark:bg-boxdark rounded-xl shadow-2xl border border-gray-200 dark:border-gray-800 p-6 transform transition-all">
        <h3 class="text-lg font-bold text-gray-800 dark:text-white mb-4">Settings</h3>
        
        <!-- Layout Toggle -->
        <div class="mb-6">
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Layout</label>
          <div class="flex bg-gray-100 dark:bg-meta-4 rounded-lg p-1">
            <button 
              (click)="setLayout('vertical')"
              [class.bg-white]="(sidebarService.layout$ | async) === 'vertical'"
              [class.shadow-sm]="(sidebarService.layout$ | async) === 'vertical'"
              [class.dark:bg-boxdark]="(sidebarService.layout$ | async) === 'vertical'"
              class="flex-1 py-1.5 text-sm font-medium rounded-md transition-all text-gray-700 dark:text-gray-300"
            >
              Vertical
            </button>
            <button 
              (click)="setLayout('horizontal')"
              [class.bg-white]="(sidebarService.layout$ | async) === 'horizontal'"
              [class.shadow-sm]="(sidebarService.layout$ | async) === 'horizontal'"
              [class.dark:bg-boxdark]="(sidebarService.layout$ | async) === 'horizontal'"
              class="flex-1 py-1.5 text-sm font-medium rounded-md transition-all text-gray-700 dark:text-gray-300"
            >
              Horizontal
            </button>
          </div>
        </div>

        <!-- Theme Colors -->
        <div class="mb-6">
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Theme Color</label>
          <div class="grid grid-cols-5 gap-3">
            <button *ngFor="let color of colors" 
              (click)="selectColor(color.value)"
              class="w-9 h-9 rounded-full cursor-pointer border-2 transition-all hover:scale-110 hover:shadow-lg"
              [class.border-gray-400]="primaryColor() !== color.value"
              [class.border-gray-800]="primaryColor() === color.value"
              [class.dark:border-white]="primaryColor() === color.value"
              [class.ring-2]="primaryColor() === color.value"
              [class.ring-offset-2]="primaryColor() === color.value"
              [style.background-color]="color.value"
              [title]="color.name"
            ></button>
          </div>
        </div>
        
        <!-- Theme Toggle (Dark/Light) -->
        <div class="flex items-center justify-between">
            <label class="text-sm font-medium text-gray-700 dark:text-gray-300">Dark Mode</label>
             <div 
               class="relative inline-block w-12 mr-2 align-middle select-none transition duration-200 ease-in"
               (click)="themeService.toggleTheme()"
             >
                 <div class="w-12 h-6 bg-gray-200 rounded-full dark:bg-meta-4 cursor-pointer"></div>
                 <div class="absolute w-6 h-6 bg-white rounded-full shadow-sm inset-y-0 left-0 transition-transform duration-200 cursor-pointer"
                      [class.translate-x-full]="(themeService.theme$ | async) === 'dark'"
                      [class.bg-primary]="(themeService.theme$ | async) === 'dark'">
                </div>
             </div>
        </div>

      </div>
    </div>
  `,
    styles: [`
    .animate-spin-slow {
      animation: spin 3s linear infinite;
    }
    @keyframes spin {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }
  `]
})
export class SettingsComponent {
    sidebarService = inject(SidebarService);
    themeService = inject(ThemeService);

    isOpen = signal(false);
    primaryColor = this.themeService.primaryColor;

    colors = [
        { name: 'Blue', value: '#3C50E0' },
        { name: 'Green', value: '#10B981' },
        { name: 'Red', value: '#EF4444' },
        { name: 'Orange', value: '#F97316' },
        { name: 'Purple', value: '#8B5CF6' },
        { name: 'Pink', value: '#EC4899' },
        { name: 'Indigo', value: '#6366F1' },
        { name: 'Teal', value: '#14B8A6' },
        { name: 'Yellow', value: '#F59E0B' },
        { name: 'Cyan', value: '#06B6D4' },
    ];

    toggleSettings() {
        this.isOpen.update(v => !v);
    }

    setLayout(layout: 'vertical' | 'horizontal') {
        this.sidebarService.setLayout(layout);
    }

    selectColor(color: string) {
        this.themeService.setPrimaryColor(color);
    }
}
