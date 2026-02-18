import { Component } from '@angular/core';

@Component({
    selector: 'app-signup',
    standalone: true,
    template: `
    <div class="p-6 bg-white dark:bg-boxdark rounded-xl shadow-sm border border-gray-200 dark:border-gray-800">
      <h2 class="text-2xl font-bold text-gray-800 dark:text-white mb-4">Sign Up</h2>
      <p class="text-gray-600 dark:text-gray-400">Create a new account.</p>
    </div>
  `
})
export class SignupComponent { }
