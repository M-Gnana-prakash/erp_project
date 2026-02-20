import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-progress-bars',
  standalone: true,
  imports: [CommonModule],
  styles: [`
        .bar-fill {
            transition: width 1s cubic-bezier(0.4, 0, 0.2, 1);
        }
        @keyframes shimmer {
            0% { background-position: -200% 0; }
            100% { background-position: 200% 0; }
        }
        .shimmer {
            background: linear-gradient(90deg, transparent 25%, rgba(255,255,255,0.4) 50%, transparent 75%);
            background-size: 200% 100%;
            animation: shimmer 1.5s infinite;
        }
        @keyframes stripes {
            0% { background-position: 0 0; }
            100% { background-position: 40px 0; }
        }
        .striped {
            background-image: linear-gradient(
                45deg,
                rgba(255,255,255,.15) 25%,
                transparent 25%,
                transparent 50%,
                rgba(255,255,255,.15) 50%,
                rgba(255,255,255,.15) 75%,
                transparent 75%,
                transparent
            );
            background-size: 20px 20px;
            animation: stripes 1s linear infinite;
        }
    `],
  template: `
    <div class="p-6 space-y-10">
      <!-- Header -->
      <div>
        <h2 class="text-2xl font-bold text-gray-800 dark:text-white">Progress Bars</h2>
        <p class="text-gray-500 dark:text-gray-400 mt-1">Visual indicators for task completion, loading states, and metrics.</p>
      </div>

      <!-- ── Basic Progress Bars ── -->
      <section>
        <h3 class="text-sm font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-4">Basic</h3>
        <div class="space-y-5">
          <div *ngFor="let bar of basicBars">
            <div class="flex justify-between text-sm mb-1.5">
              <span class="font-medium text-gray-700 dark:text-gray-300">{{ bar.label }}</span>
              <span class="text-gray-500 dark:text-gray-400">{{ bar.value }}%</span>
            </div>
            <div class="w-full bg-gray-200 dark:bg-white/10 rounded-full h-2.5 overflow-hidden">
              <div class="bar-fill h-full rounded-full" [ngStyle]="{'width': bar.value + '%', 'background': bar.color}"></div>
            </div>
          </div>
        </div>
      </section>

      <!-- ── Sizes ── -->
      <section>
        <h3 class="text-sm font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-4">Sizes</h3>
        <div class="space-y-4">
          <div>
            <p class="text-xs text-gray-400 mb-1">Extra Small (1px)</p>
            <div class="w-full bg-gray-200 dark:bg-white/10 rounded-full h-1 overflow-hidden">
              <div class="bar-fill h-full rounded-full bg-indigo-500" style="width: 60%"></div>
            </div>
          </div>
          <div>
            <p class="text-xs text-gray-400 mb-1">Small (2px)</p>
            <div class="w-full bg-gray-200 dark:bg-white/10 rounded-full h-2 overflow-hidden">
              <div class="bar-fill h-full rounded-full bg-indigo-500" style="width: 70%"></div>
            </div>
          </div>
          <div>
            <p class="text-xs text-gray-400 mb-1">Medium (4px)</p>
            <div class="w-full bg-gray-200 dark:bg-white/10 rounded-full h-4 overflow-hidden">
              <div class="bar-fill h-full rounded-full bg-indigo-500" style="width: 75%"></div>
            </div>
          </div>
          <div>
            <p class="text-xs text-gray-400 mb-1">Large (6px)</p>
            <div class="w-full bg-gray-200 dark:bg-white/10 rounded-full h-6 flex items-center overflow-hidden">
              <div class="bar-fill h-full rounded-full bg-indigo-500 flex items-center justify-end pr-2" style="width: 80%">
                <span class="text-white text-xs font-semibold">80%</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- ── Animated / Striped ── -->
      <section>
        <h3 class="text-sm font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-4">Animated Variants</h3>
        <div class="space-y-4">
          <!-- Shimmer -->
          <div>
            <p class="text-xs text-gray-400 mb-1.5">Shimmer (Loading)</p>
            <div class="w-full bg-gray-200 dark:bg-white/10 rounded-full h-3 overflow-hidden">
              <div class="h-full rounded-full bg-indigo-400 shimmer" style="width: 65%"></div>
            </div>
          </div>
          <!-- Striped animated -->
          <div>
            <p class="text-xs text-gray-400 mb-1.5">Striped Animated</p>
            <div class="w-full bg-gray-200 dark:bg-white/10 rounded-full h-3 overflow-hidden">
              <div class="h-full rounded-full bg-green-500 striped" style="width: 78%"></div>
            </div>
          </div>
        </div>
      </section>

      <!-- ── Labeled Inside ── -->
      <section>
        <h3 class="text-sm font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-4">Label Inside Bar</h3>
        <div class="space-y-3">
          <div *ngFor="let bar of labeledBars">
            <div class="w-full bg-gray-200 dark:bg-white/10 rounded-lg h-7 overflow-hidden">
              <div class="bar-fill h-full rounded-lg flex items-center px-3" [ngStyle]="{'width': bar.value + '%', 'background': bar.color}">
                <span class="text-white text-xs font-semibold whitespace-nowrap">{{ bar.label }} — {{ bar.value }}%</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- ── Multi-segment ── -->
      <section>
        <h3 class="text-sm font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-4">Multi-Segment</h3>
        <div>
          <div class="flex w-full h-5 rounded-xl overflow-hidden">
            <div class="h-full bg-indigo-500 flex items-center justify-center text-white text-xs font-semibold" style="width: 45%">45%</div>
            <div class="h-full bg-green-500 flex items-center justify-center text-white text-xs font-semibold" style="width: 30%">30%</div>
            <div class="h-full bg-yellow-400 flex items-center justify-center text-white text-xs font-semibold" style="width: 15%">15%</div>
            <div class="h-full bg-red-400 flex items-center justify-center text-white text-xs font-semibold" style="width: 10%">10%</div>
          </div>
          <div class="flex gap-4 mt-2 flex-wrap">
            <div class="flex items-center gap-1.5 text-xs text-gray-500"><span class="w-3 h-3 rounded-sm bg-indigo-500"></span>Mobile (45%)</div>
            <div class="flex items-center gap-1.5 text-xs text-gray-500"><span class="w-3 h-3 rounded-sm bg-green-500"></span>Desktop (30%)</div>
            <div class="flex items-center gap-1.5 text-xs text-gray-500"><span class="w-3 h-3 rounded-sm bg-yellow-400"></span>Tablet (15%)</div>
            <div class="flex items-center gap-1.5 text-xs text-gray-500"><span class="w-3 h-3 rounded-sm bg-red-400"></span>Other (10%)</div>
          </div>
        </div>
      </section>
    </div>
  `
})
export class ProgressBarsComponent {
  basicBars = [
    { label: 'Storage Used', value: 68, color: '#6366f1' },
    { label: 'CPU Utilization', value: 42, color: '#10b981' },
    { label: 'Memory', value: 83, color: '#f59e0b' },
    { label: 'Bandwidth', value: 27, color: '#ef4444' },
  ];

  labeledBars = [
    { label: 'Sales Target', value: 72, color: '#6366f1' },
    { label: 'Support Tickets', value: 55, color: '#10b981' },
    { label: 'Task Completion', value: 88, color: '#f59e0b' },
  ];
}
