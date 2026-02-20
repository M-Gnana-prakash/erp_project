import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Toast {
  id: number;
  type: 'success' | 'warning' | 'danger' | 'info';
  title: string;
  message: string;
  visible: boolean;
}

@Component({
  selector: 'app-toasts',
  standalone: true,
  imports: [CommonModule],
  styles: [`
        .toast-enter {
            animation: slideInRight 0.3s ease forwards;
        }
        @keyframes slideInRight {
            from { opacity: 0; transform: translateX(100%); }
            to   { opacity: 1; transform: translateX(0); }
        }
    `],
  template: `
    <!-- Toast Container (fixed) -->
    <div class="fixed top-6 right-6 z-50 flex flex-col gap-3 max-w-sm w-full pointer-events-none">
      <div *ngFor="let toast of activeToasts()" class="toast-enter pointer-events-auto">
        <div class="flex items-start gap-3 p-4 rounded-xl shadow-lg border"
             [ngClass]="{
               'bg-white dark:bg-boxdark border-green-200 dark:border-green-800': toast.type === 'success',
               'bg-white dark:bg-boxdark border-yellow-200 dark:border-yellow-800': toast.type === 'warning',
               'bg-white dark:bg-boxdark border-red-200 dark:border-red-800': toast.type === 'danger',
               'bg-white dark:bg-boxdark border-blue-200 dark:border-blue-800': toast.type === 'info'
             }">
          <!-- Icon -->
          <div class="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center"
               [ngClass]="{
                 'bg-green-100 dark:bg-green-900/30': toast.type === 'success',
                 'bg-yellow-100 dark:bg-yellow-900/30': toast.type === 'warning',
                 'bg-red-100 dark:bg-red-900/30': toast.type === 'danger',
                 'bg-blue-100 dark:bg-blue-900/30': toast.type === 'info'
               }">
            <svg *ngIf="toast.type === 'success'" class="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/></svg>
            <svg *ngIf="toast.type === 'warning'" class="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd"/></svg>
            <svg *ngIf="toast.type === 'danger'" class="w-4 h-4 text-red-500" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"/></svg>
            <svg *ngIf="toast.type === 'info'" class="w-4 h-4 text-blue-500" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"/></svg>
          </div>
          <!-- Content -->
          <div class="flex-1 min-w-0">
            <p class="text-sm font-semibold text-gray-800 dark:text-white">{{ toast.title }}</p>
            <p class="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{{ toast.message }}</p>
          </div>
          <!-- Close -->
          <button (click)="dismissToast(toast.id)" class="flex-shrink-0 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors">
            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"/></svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Demo Page -->
    <div class="p-6 space-y-10">
      <!-- Header -->
      <div>
        <h2 class="text-2xl font-bold text-gray-800 dark:text-white">Toast Notifications</h2>
        <p class="text-gray-500 dark:text-gray-400 mt-1">Click the buttons below to trigger live toast notifications at the top-right corner.</p>
      </div>

      <!-- ── Trigger Buttons ── -->
      <section>
        <h3 class="text-sm font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-4">Trigger Toasts</h3>
        <div class="flex flex-wrap gap-3">
          <button (click)="showToast('success', 'Success!', 'Your changes were saved successfully.')"
                  class="px-4 py-2 rounded-lg bg-green-500 hover:bg-green-600 text-white text-sm font-medium transition-colors flex items-center gap-2">
            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/></svg>
            Success Toast
          </button>
          <button (click)="showToast('warning', 'Warning!', 'Your session will expire in 5 minutes.')"
                  class="px-4 py-2 rounded-lg bg-yellow-500 hover:bg-yellow-600 text-white text-sm font-medium transition-colors flex items-center gap-2">
            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd"/></svg>
            Warning Toast
          </button>
          <button (click)="showToast('danger', 'Error!', 'Failed to process your request. Try again.')"
                  class="px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white text-sm font-medium transition-colors flex items-center gap-2">
            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"/></svg>
            Danger Toast
          </button>
          <button (click)="showToast('info', 'Info', 'A new software version (v2.5) is available.')"
                  class="px-4 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium transition-colors flex items-center gap-2">
            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"/></svg>
            Info Toast
          </button>
        </div>
      </section>

      <!-- ── Static Preview ── -->
      <section>
        <h3 class="text-sm font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-4">Static Preview</h3>
        <div class="flex flex-col gap-3 max-w-sm">
          <!-- Success static -->
          <div class="flex items-start gap-3 p-4 rounded-xl shadow border border-green-200 dark:border-green-800 bg-white dark:bg-boxdark">
            <div class="w-8 h-8 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center flex-shrink-0">
              <svg class="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/></svg>
            </div>
            <div class="flex-1"><p class="text-sm font-semibold text-gray-800 dark:text-white">Record saved</p><p class="text-xs text-gray-500 mt-0.5">Customer profile has been updated.</p></div>
            <button class="text-gray-400 hover:text-gray-600 transition-colors"><svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"/></svg></button>
          </div>
          <!-- Warning static -->
          <div class="flex items-start gap-3 p-4 rounded-xl shadow border border-yellow-200 dark:border-yellow-800 bg-white dark:bg-boxdark">
            <div class="w-8 h-8 rounded-full bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center flex-shrink-0">
              <svg class="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd"/></svg>
            </div>
            <div class="flex-1"><p class="text-sm font-semibold text-gray-800 dark:text-white">Storage limit</p><p class="text-xs text-gray-500 mt-0.5">You are using 85% of your storage quota.</p></div>
            <button class="text-gray-400 hover:text-gray-600 transition-colors"><svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"/></svg></button>
          </div>
        </div>
      </section>
    </div>
  `
})
export class ToastsComponent {
  private nextId = 1;
  private toasts = signal<Toast[]>([]);

  activeToasts = this.toasts;

  showToast(type: Toast['type'], title: string, message: string) {
    const id = this.nextId++;
    this.toasts.update(ts => [...ts, { id, type, title, message, visible: true }]);
    setTimeout(() => this.dismissToast(id), 4000);
  }

  dismissToast(id: number) {
    this.toasts.update(ts => ts.filter(t => t.id !== id));
  }
}
