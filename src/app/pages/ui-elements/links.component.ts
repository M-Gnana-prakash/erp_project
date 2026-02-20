import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-links',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="p-6 space-y-10">
      <!-- Header -->
      <div>
        <h2 class="text-2xl font-bold text-gray-800 dark:text-white">Links</h2>
        <p class="text-gray-500 dark:text-gray-400 mt-1">Link styles, decorations, colors, sizes, and interactive states.</p>
      </div>

      <!-- ── Basic Colors ── -->
      <section>
        <h3 class="text-sm font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-4">Color Variants</h3>
        <div class="flex flex-wrap gap-6 text-sm font-medium">
          <a href="#" class="text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300 transition-colors">Indigo (Default)</a>
          <a href="#" class="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors">Blue</a>
          <a href="#" class="text-green-600 hover:text-green-800 dark:text-green-400 dark:hover:text-green-300 transition-colors">Green</a>
          <a href="#" class="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 transition-colors">Red</a>
          <a href="#" class="text-yellow-600 hover:text-yellow-800 dark:text-yellow-400 dark:hover:text-yellow-300 transition-colors">Yellow</a>
          <a href="#" class="text-purple-600 hover:text-purple-800 dark:text-purple-400 dark:hover:text-purple-300 transition-colors">Purple</a>
          <a href="#" class="text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200 transition-colors">Gray</a>
        </div>
      </section>

      <!-- ── Underline Styles ── -->
      <section>
        <h3 class="text-sm font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-4">Underline Styles</h3>
        <div class="flex flex-wrap gap-8 text-sm">
          <a href="#" class="text-indigo-600 dark:text-indigo-400 underline">Always Underlined</a>
          <a href="#" class="text-indigo-600 dark:text-indigo-400 no-underline hover:underline">Hover to Underline</a>
          <a href="#" class="text-indigo-600 dark:text-indigo-400 decoration-dotted underline">Dotted Underline</a>
          <a href="#" class="text-indigo-600 dark:text-indigo-400 decoration-dashed underline">Dashed Underline</a>
          <a href="#" class="text-indigo-600 dark:text-indigo-400 decoration-wavy underline">Wavy Underline</a>
          <a href="#" class="text-indigo-600 dark:text-indigo-400 no-underline">No Underline</a>
        </div>
      </section>

      <!-- ── With Icons ── -->
      <section>
        <h3 class="text-sm font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-4">With Icons</h3>
        <div class="flex flex-col gap-3 text-sm">
          <!-- External link -->
          <a href="#" class="inline-flex items-center gap-1.5 text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300 transition-colors w-fit">
            Visit Documentation
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/></svg>
          </a>
          <!-- Download link -->
          <a href="#" class="inline-flex items-center gap-1.5 text-green-600 hover:text-green-800 dark:text-green-400 dark:hover:text-green-300 transition-colors w-fit">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/></svg>
            Download Report
          </a>
          <!-- Arrow link -->
          <a href="#" class="inline-flex items-center gap-1 text-indigo-600 hover:gap-2 dark:text-indigo-400 transition-all font-medium w-fit">
            Learn more
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
          </a>
        </div>
      </section>

      <!-- ── Sizes ── -->
      <section>
        <h3 class="text-sm font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-4">Sizes</h3>
        <div class="flex flex-wrap items-baseline gap-6">
          <a href="#" class="text-xs text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 underline">Extra Small</a>
          <a href="#" class="text-sm text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 underline">Small</a>
          <a href="#" class="text-base text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 underline">Base</a>
          <a href="#" class="text-lg text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 underline">Large</a>
          <a href="#" class="text-xl text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 underline">XL</a>
        </div>
      </section>

      <!-- ── Button-style Links ── -->
      <section>
        <h3 class="text-sm font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-4">Button-Style Links</h3>
        <div class="flex flex-wrap gap-3">
          <a href="#" class="px-4 py-2 rounded-lg text-sm font-medium bg-indigo-100 text-indigo-700 hover:bg-indigo-200 dark:bg-indigo-900/30 dark:text-indigo-300 dark:hover:bg-indigo-900/50 transition-colors">Get Started</a>
          <a href="#" class="px-4 py-2 rounded-lg text-sm font-medium bg-green-100 text-green-700 hover:bg-green-200 dark:bg-green-900/30 dark:text-green-300 transition-colors">View Demo</a>
          <a href="#" class="px-4 py-2 rounded-lg text-sm font-medium border border-indigo-300 text-indigo-600 hover:bg-indigo-50 dark:border-indigo-700 dark:text-indigo-400 dark:hover:bg-indigo-950 transition-colors">Documentation</a>
          <a href="#" class="text-sm text-gray-400 line-through cursor-not-allowed">Disabled Link</a>
        </div>
      </section>

      <!-- ── Inline in paragraph ── -->
      <section>
        <h3 class="text-sm font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-4">Inline in Paragraphs</h3>
        <p class="text-sm text-gray-600 dark:text-gray-400 leading-relaxed max-w-xl">
          You can learn more about our <a href="#" class="text-indigo-600 dark:text-indigo-400 underline hover:no-underline font-medium">privacy policy</a> and how we handle your data. For any questions, feel free to <a href="#" class="text-indigo-600 dark:text-indigo-400 underline hover:no-underline font-medium">contact our support team</a>.
        </p>
      </section>
    </div>
  `
})
export class LinksDemoComponent { }
