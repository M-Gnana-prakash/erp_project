import { Component } from '@angular/core';

@Component({
    selector: 'app-badges',
    standalone: true,
    template: `
    <div class="p-6 bg-white dark:bg-boxdark rounded-xl shadow-sm border border-gray-200 dark:border-gray-800">
      <h2 class="text-2xl font-bold text-gray-800 dark:text-white mb-4">Badges</h2>
      <p class="text-gray-600 dark:text-gray-400">Indicators and pill labels.</p>
    </div>
  `
})
export class BadgesComponent { }
