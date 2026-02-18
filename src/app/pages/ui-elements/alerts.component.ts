import { Component } from '@angular/core';

@Component({
    selector: 'app-alerts',
    standalone: true,
    template: `
    <div class="p-6 bg-white dark:bg-boxdark rounded-xl shadow-sm border border-gray-200 dark:border-gray-800">
      <h2 class="text-2xl font-bold text-gray-800 dark:text-white mb-4">Alerts</h2>
      <p class="text-gray-600 dark:text-gray-400">Various alert styles and interactions.</p>
    </div>
  `
})
export class AlertsComponent { }
