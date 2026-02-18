import { Component } from '@angular/core';

@Component({
    selector: 'app-dashboard',
    standalone: true,
    template: `
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <div class="p-6 bg-white dark:bg-boxdark rounded-xl shadow-sm border border-gray-200 dark:border-gray-800">
        <h3 class="text-sm font-medium text-gray-500 uppercase tracking-widest mb-1">Total Views</h3>
        <p class="text-3xl font-bold text-gray-800 dark:text-white">$3.456K</p>
      </div>
      <div class="p-6 bg-white dark:bg-boxdark rounded-xl shadow-sm border border-gray-200 dark:border-gray-800">
        <h3 class="text-sm font-medium text-gray-500 uppercase tracking-widest mb-1">Total Profit</h3>
        <p class="text-3xl font-bold text-gray-800 dark:text-white">$45.2K</p>
      </div>
      <div class="p-6 bg-white dark:bg-boxdark rounded-xl shadow-sm border border-gray-200 dark:border-gray-800">
        <h3 class="text-sm font-medium text-gray-500 uppercase tracking-widest mb-1">Total Product</h3>
        <p class="text-3xl font-bold text-gray-800 dark:text-white">2.450</p>
      </div>
      <div class="p-6 bg-white dark:bg-boxdark rounded-xl shadow-sm border border-gray-200 dark:border-gray-800">
        <h3 class="text-sm font-medium text-gray-500 uppercase tracking-widest mb-1">Total Users</h3>
        <p class="text-3xl font-bold text-gray-800 dark:text-white">3.456</p>
      </div>
    </div>
  `
})
export class DashboardComponent { }
