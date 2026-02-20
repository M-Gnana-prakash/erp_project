import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-badges',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="p-6 space-y-10">
      <!-- Header -->
      <div>
        <h2 class="text-2xl font-bold text-gray-800 dark:text-white">Badges</h2>
        <p class="text-gray-500 dark:text-gray-400 mt-1">Compact labels for status, counts, categories, and more.</p>
      </div>

      <!-- ── Solid Badges ── -->
      <section>
        <h3 class="text-sm font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-4">Solid</h3>
        <div class="flex flex-wrap gap-3">
          <span class="px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500 text-white">Default</span>
          <span class="px-3 py-1 rounded-full text-xs font-semibold bg-green-500 text-white">Success</span>
          <span class="px-3 py-1 rounded-full text-xs font-semibold bg-yellow-400 text-white">Warning</span>
          <span class="px-3 py-1 rounded-full text-xs font-semibold bg-red-500 text-white">Danger</span>
          <span class="px-3 py-1 rounded-full text-xs font-semibold bg-blue-500 text-white">Info</span>
          <span class="px-3 py-1 rounded-full text-xs font-semibold bg-purple-500 text-white">Purple</span>
          <span class="px-3 py-1 rounded-full text-xs font-semibold bg-gray-500 text-white">Neutral</span>
          <span class="px-3 py-1 rounded-full text-xs font-semibold bg-pink-500 text-white">Pink</span>
        </div>
      </section>

      <!-- ── Soft / Outlined Badges ── -->
      <section>
        <h3 class="text-sm font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-4">Soft (Light)</h3>
        <div class="flex flex-wrap gap-3">
          <span class="px-3 py-1 rounded-full text-xs font-semibold bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300">Default</span>
          <span class="px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300">Success</span>
          <span class="px-3 py-1 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300">Warning</span>
          <span class="px-3 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300">Danger</span>
          <span class="px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">Info</span>
          <span class="px-3 py-1 rounded-full text-xs font-semibold bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300">Purple</span>
          <span class="px-3 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-700 dark:bg-gray-700/50 dark:text-gray-300">Neutral</span>
        </div>
      </section>

      <!-- ── Outlined Badges ── -->
      <section>
        <h3 class="text-sm font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-4">Outlined</h3>
        <div class="flex flex-wrap gap-3">
          <span class="px-3 py-1 rounded-full text-xs font-semibold border border-indigo-500 text-indigo-600 dark:text-indigo-400">Default</span>
          <span class="px-3 py-1 rounded-full text-xs font-semibold border border-green-500 text-green-600 dark:text-green-400">Success</span>
          <span class="px-3 py-1 rounded-full text-xs font-semibold border border-yellow-400 text-yellow-600 dark:text-yellow-400">Warning</span>
          <span class="px-3 py-1 rounded-full text-xs font-semibold border border-red-500 text-red-600 dark:text-red-400">Danger</span>
          <span class="px-3 py-1 rounded-full text-xs font-semibold border border-blue-500 text-blue-600 dark:text-blue-400">Info</span>
          <span class="px-3 py-1 rounded-full text-xs font-semibold border border-purple-500 text-purple-600 dark:text-purple-400">Purple</span>
        </div>
      </section>

      <!-- ── Badges with Dot ── -->
      <section>
        <h3 class="text-sm font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-4">With Dot Indicator</h3>
        <div class="flex flex-wrap gap-3">
          <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300">
            <span class="w-1.5 h-1.5 rounded-full bg-green-500"></span> Active
          </span>
          <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300">
            <span class="w-1.5 h-1.5 rounded-full bg-yellow-500"></span> Pending
          </span>
          <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300">
            <span class="w-1.5 h-1.5 rounded-full bg-red-500"></span> Rejected
          </span>
          <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-700 dark:bg-gray-700/50 dark:text-gray-300">
            <span class="w-1.5 h-1.5 rounded-full bg-gray-400"></span> Inactive
          </span>
        </div>
      </section>

      <!-- ── Badges in Context  ── -->
      <section>
        <h3 class="text-sm font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-4">In Context (Button / Avatar)</h3>
        <div class="flex flex-wrap items-center gap-6">
          <!-- Button with badge -->
          <div class="relative inline-flex">
            <button class="px-4 py-2 rounded-lg bg-indigo-500 text-white text-sm font-medium">Notifications</button>
            <span class="absolute -top-2 -right-2 w-5 h-5 bg-red-500 rounded-full text-white text-xs flex items-center justify-center font-bold">5</span>
          </div>
          <!-- Avatar with badge -->
          <div class="relative w-10 h-10">
            <img src="https://randomuser.me/api/portraits/men/45.jpg" class="w-10 h-10 rounded-full object-cover" alt="user"/>
            <span class="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full ring-2 ring-white text-white text-xs flex items-center justify-center font-bold">2</span>
          </div>
          <!-- Icon with badge -->
          <div class="relative inline-flex">
            <button class="p-2 rounded-lg bg-gray-100 dark:bg-white/10 text-gray-600 dark:text-gray-300">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/></svg>
            </button>
            <span class="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full ring-2 ring-white dark:ring-boxdark"></span>
          </div>
        </div>
      </section>

    </div>
  `
})
export class BadgesComponent { }
