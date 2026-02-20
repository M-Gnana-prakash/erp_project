import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-breadcrumbs',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="p-6 space-y-10">
      <!-- Header -->
      <div>
        <h2 class="text-2xl font-bold text-gray-800 dark:text-white">Breadcrumbs</h2>
        <p class="text-gray-500 dark:text-gray-400 mt-1">Navigation breadcrumbs in Default, Dotted, and Arrow configurations.</p>
      </div>

      <!-- ── Default (Slash) ── -->
      <section>
        <h3 class="text-sm font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-4">Default (Slash)</h3>
        <nav class="flex" aria-label="Breadcrumb">
          <ol class="inline-flex items-center gap-1">
            <li class="inline-flex items-center">
              <a href="#" class="inline-flex items-center gap-1.5 text-sm font-medium text-gray-500 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400 transition-colors">
                <svg class="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20"><path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"/></svg>
                Home
              </a>
            </li>
            <li><span class="mx-1 text-gray-400">/</span></li>
            <li>
              <a href="#" class="text-sm font-medium text-gray-500 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400 transition-colors">UI Elements</a>
            </li>
            <li><span class="mx-1 text-gray-400">/</span></li>
            <li>
              <span class="text-sm font-semibold text-gray-800 dark:text-white">Breadcrumbs</span>
            </li>
          </ol>
        </nav>
      </section>

      <!-- ── Dotted ── -->
      <section>
        <h3 class="text-sm font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-4">Dotted</h3>
        <nav class="flex" aria-label="Breadcrumb dotted">
          <ol class="inline-flex items-center gap-1">
            <li class="inline-flex items-center">
              <a href="#" class="inline-flex items-center gap-1.5 text-sm font-medium text-gray-500 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400 transition-colors">
                <svg class="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20"><path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"/></svg>
                Home
              </a>
            </li>
            <li><span class="mx-2 w-1 h-1 rounded-full bg-gray-400 inline-block"></span></li>
            <li>
              <a href="#" class="text-sm font-medium text-gray-500 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400 transition-colors">Settings</a>
            </li>
            <li><span class="mx-2 w-1 h-1 rounded-full bg-gray-400 inline-block"></span></li>
            <li>
              <a href="#" class="text-sm font-medium text-gray-500 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400 transition-colors">Account</a>
            </li>
            <li><span class="mx-2 w-1 h-1 rounded-full bg-gray-400 inline-block"></span></li>
            <li>
              <span class="text-sm font-semibold text-gray-800 dark:text-white">Profile</span>
            </li>
          </ol>
        </nav>
      </section>

      <!-- ── Arrow ── -->
      <section>
        <h3 class="text-sm font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-4">Arrow</h3>
        <nav class="flex" aria-label="Breadcrumb arrow">
          <ol class="inline-flex items-center gap-1">
            <li class="inline-flex items-center">
              <a href="#" class="inline-flex items-center gap-1.5 text-sm font-medium text-gray-500 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400 transition-colors">
                <svg class="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20"><path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"/></svg>
                Home
              </a>
            </li>
            <li>
              <svg class="w-4 h-4 text-gray-400 mx-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
            </li>
            <li>
              <a href="#" class="text-sm font-medium text-gray-500 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400 transition-colors">Products</a>
            </li>
            <li>
              <svg class="w-4 h-4 text-gray-400 mx-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
            </li>
            <li>
              <a href="#" class="text-sm font-medium text-gray-500 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400 transition-colors">Electronics</a>
            </li>
            <li>
              <svg class="w-4 h-4 text-gray-400 mx-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
            </li>
            <li>
              <span class="text-sm font-semibold text-gray-800 dark:text-white">Laptops</span>
            </li>
          </ol>
        </nav>
      </section>

      <!-- ── Pill / Contained ── -->
      <section>
        <h3 class="text-sm font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-4">Pill / Contained</h3>
        <nav>
          <ol class="inline-flex items-center gap-2 bg-gray-100 dark:bg-white/10 rounded-xl px-4 py-2">
            <li>
              <a href="#" class="text-sm font-medium text-gray-500 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400 transition-colors flex items-center gap-1">
                <svg class="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20"><path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"/></svg>
                Home
              </a>
            </li>
            <li><svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg></li>
            <li><a href="#" class="text-sm font-medium text-gray-500 hover:text-indigo-600 dark:text-gray-400 transition-colors">Reports</a></li>
            <li><svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg></li>
            <li><span class="text-sm font-semibold text-indigo-600 dark:text-indigo-400">Q4 2025</span></li>
          </ol>
        </nav>
      </section>

    </div>
  `
})
export class BreadcrumbsDemoComponent { }
