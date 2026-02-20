import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-spinners',
  standalone: true,
  imports: [CommonModule],
  styles: [`
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes bounce3 {
            0%, 80%, 100% { transform: scale(0); opacity: 0.3; }
            40% { transform: scale(1); opacity: 1; }
        }
        @keyframes pulse-ring {
            0% { transform: scale(0.8); opacity: 1; }
            100% { transform: scale(2); opacity: 0; }
        }
        @keyframes dot-flashing {
            0% { background-color: currentColor; }
            50%, 100% { background-color: transparent; border-color: currentColor; }
        }
        .spin { animation: spin 0.8s linear infinite; }
        .spin-slow { animation: spin 1.5s linear infinite; }
        .dot-bounce { animation: bounce3 1.4s ease-in-out infinite; }
        .dot-bounce-d1 { animation-delay: 0s; }
        .dot-bounce-d2 { animation-delay: 0.16s; }
        .dot-bounce-d3 { animation-delay: 0.32s; }
        .pulse-ring { animation: pulse-ring 1.2s ease-out infinite; }
        /* Bar spinner */
        @keyframes bar-grow {
            0%, 100% { transform: scaleY(0.4); }
            50% { transform: scaleY(1); }
        }
        .bar-grow { animation: bar-grow 1s ease-in-out infinite; }
    `],
  template: `
    <div class="p-6 space-y-10">
      <!-- Header -->
      <div>
        <h2 class="text-2xl font-bold text-gray-800 dark:text-white">Spinners</h2>
        <p class="text-gray-500 dark:text-gray-400 mt-1">Loading indicators in various styles, sizes, and colors.</p>
      </div>

      <!-- ── Border Spinners ── -->
      <section>
        <h3 class="text-sm font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-4">Border Spinners</h3>
        <div class="flex flex-wrap items-center gap-8">
          <div class="flex flex-col items-center gap-2">
            <div class="spin w-8 h-8 rounded-full border-4 border-indigo-200 border-t-indigo-500"></div>
            <span class="text-xs text-gray-400">Indigo</span>
          </div>
          <div class="flex flex-col items-center gap-2">
            <div class="spin w-8 h-8 rounded-full border-4 border-green-200 border-t-green-500"></div>
            <span class="text-xs text-gray-400">Green</span>
          </div>
          <div class="flex flex-col items-center gap-2">
            <div class="spin w-8 h-8 rounded-full border-4 border-yellow-200 border-t-yellow-500"></div>
            <span class="text-xs text-gray-400">Yellow</span>
          </div>
          <div class="flex flex-col items-center gap-2">
            <div class="spin w-8 h-8 rounded-full border-4 border-red-200 border-t-red-500"></div>
            <span class="text-xs text-gray-400">Red</span>
          </div>
          <div class="flex flex-col items-center gap-2">
            <div class="spin w-8 h-8 rounded-full border-4 border-gray-200 border-t-gray-500"></div>
            <span class="text-xs text-gray-400">Gray</span>
          </div>
        </div>
      </section>

      <!-- ── Sizes ── -->
      <section>
        <h3 class="text-sm font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-4">Sizes</h3>
        <div class="flex flex-wrap items-center gap-8">
          <div class="flex flex-col items-center gap-2">
            <div class="spin w-4 h-4 rounded-full border-2 border-indigo-200 border-t-indigo-500"></div>
            <span class="text-xs text-gray-400">xs</span>
          </div>
          <div class="flex flex-col items-center gap-2">
            <div class="spin w-6 h-6 rounded-full border-2 border-indigo-200 border-t-indigo-500"></div>
            <span class="text-xs text-gray-400">sm</span>
          </div>
          <div class="flex flex-col items-center gap-2">
            <div class="spin w-8 h-8 rounded-full border-4 border-indigo-200 border-t-indigo-500"></div>
            <span class="text-xs text-gray-400">md</span>
          </div>
          <div class="flex flex-col items-center gap-2">
            <div class="spin w-12 h-12 rounded-full border-4 border-indigo-200 border-t-indigo-500"></div>
            <span class="text-xs text-gray-400">lg</span>
          </div>
          <div class="flex flex-col items-center gap-2">
            <div class="spin w-16 h-16 rounded-full border-[6px] border-indigo-200 border-t-indigo-500"></div>
            <span class="text-xs text-gray-400">xl</span>
          </div>
        </div>
      </section>

      <!-- ── Dot Bounce Spinner ── -->
      <section>
        <h3 class="text-sm font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-4">Dot Bounce</h3>
        <div class="flex flex-wrap items-center gap-10">
          <div class="flex flex-col items-center gap-3">
            <div class="flex items-center gap-1.5">
              <div class="dot-bounce dot-bounce-d1 w-3 h-3 rounded-full bg-indigo-500"></div>
              <div class="dot-bounce dot-bounce-d2 w-3 h-3 rounded-full bg-indigo-500"></div>
              <div class="dot-bounce dot-bounce-d3 w-3 h-3 rounded-full bg-indigo-500"></div>
            </div>
            <span class="text-xs text-gray-400">Bounce</span>
          </div>
          <div class="flex flex-col items-center gap-3">
            <div class="flex items-center gap-1.5">
              <div class="dot-bounce dot-bounce-d1 w-3 h-3 rounded-full bg-green-500"></div>
              <div class="dot-bounce dot-bounce-d2 w-3 h-3 rounded-full bg-green-500"></div>
              <div class="dot-bounce dot-bounce-d3 w-3 h-3 rounded-full bg-green-500"></div>
            </div>
            <span class="text-xs text-gray-400">Green</span>
          </div>
        </div>
      </section>

      

      <!-- ── Spinner in Buttons ── -->
      <section>
        <h3 class="text-sm font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-4">In Buttons</h3>
        <div class="flex flex-wrap gap-4">
          <button class="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-indigo-500 text-white text-sm font-medium cursor-not-allowed opacity-80">
            <div class="spin w-4 h-4 rounded-full border-2 border-white/30 border-t-white"></div>
            Saving...
          </button>
          <button class="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-gray-300 dark:border-white/20 text-gray-700 dark:text-gray-300 text-sm font-medium cursor-not-allowed opacity-80">
            <div class="spin w-4 h-4 rounded-full border-2 border-gray-300 border-t-gray-600"></div>
            Loading
          </button>
          <button class="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-green-500 text-white text-sm font-medium cursor-not-allowed opacity-80">
            <div class="spin w-4 h-4 rounded-full border-2 border-white/30 border-t-white"></div>
            Processing
          </button>
        </div>
      </section>
    </div>
  `
})
export class SpinnersComponent { }
