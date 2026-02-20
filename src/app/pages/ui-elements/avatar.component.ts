import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-avatar',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="p-6 space-y-10">
      <!-- Header -->
      <div>
        <h2 class="text-2xl font-bold text-gray-800 dark:text-white">Avatar</h2>
        <p class="text-gray-500 dark:text-gray-400 mt-1">Avatars with status indicators, sizes, groups, and initials fallback.</p>
      </div>

      <!-- ── With Status Indicators ── -->
      <section>
        <h3 class="text-sm font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-4">With Indicators</h3>
        <div class="flex flex-wrap items-end gap-8">
          <!-- Online -->
          <div class="flex flex-col items-center gap-2">
            <div class="relative w-12 h-12">
              <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="User" class="w-12 h-12 rounded-full object-cover ring-2 ring-white dark:ring-boxdark"/>
              <span class="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full ring-2 ring-white dark:ring-boxdark"></span>
            </div>
            <span class="text-xs text-gray-500 dark:text-gray-400">Online</span>
          </div>
          <!-- Away -->
          <div class="flex flex-col items-center gap-2">
            <div class="relative w-12 h-12">
              <img src="https://randomuser.me/api/portraits/women/44.jpg" alt="User" class="w-12 h-12 rounded-full object-cover ring-2 ring-white dark:ring-boxdark"/>
              <span class="absolute bottom-0 right-0 w-3 h-3 bg-yellow-400 rounded-full ring-2 ring-white dark:ring-boxdark"></span>
            </div>
            <span class="text-xs text-gray-500 dark:text-gray-400">Away</span>
          </div>
          <!-- Busy -->
          <div class="flex flex-col items-center gap-2">
            <div class="relative w-12 h-12">
              <img src="https://randomuser.me/api/portraits/men/15.jpg" alt="User" class="w-12 h-12 rounded-full object-cover ring-2 ring-white dark:ring-boxdark"/>
              <span class="absolute bottom-0 right-0 w-3 h-3 bg-red-500 rounded-full ring-2 ring-white dark:ring-boxdark"></span>
            </div>
            <span class="text-xs text-gray-500 dark:text-gray-400">Busy</span>
          </div>
          <!-- Offline -->
          <div class="flex flex-col items-center gap-2">
            <div class="relative w-12 h-12">
              <img src="https://randomuser.me/api/portraits/women/67.jpg" alt="User" class="w-12 h-12 rounded-full object-cover ring-2 ring-white dark:ring-boxdark"/>
              <span class="absolute bottom-0 right-0 w-3 h-3 bg-gray-400 rounded-full ring-2 ring-white dark:ring-boxdark"></span>
            </div>
            <span class="text-xs text-gray-500 dark:text-gray-400">Offline</span>
          </div>
          <!-- Notification badge -->
          <div class="flex flex-col items-center gap-2">
            <div class="relative w-12 h-12">
              <img src="https://randomuser.me/api/portraits/men/77.jpg" alt="User" class="w-12 h-12 rounded-full object-cover ring-2 ring-white dark:ring-boxdark"/>
              <span class="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full ring-2 ring-white dark:ring-boxdark text-white text-xs flex items-center justify-center font-bold">3</span>
            </div>
            <span class="text-xs text-gray-500 dark:text-gray-400">Badge</span>
          </div>
        </div>
      </section>

      <!-- ── Sizes ── -->
      <section>
        <h3 class="text-sm font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-4">Sizes</h3>
        <div class="flex flex-wrap items-end gap-6">
          <div class="flex flex-col items-center gap-2">
            <div class="relative w-8 h-8">
              <img src="https://randomuser.me/api/portraits/women/22.jpg" alt="xs" class="w-8 h-8 rounded-full object-cover"/>
              <span class="absolute bottom-0 right-0 w-2 h-2 bg-green-500 rounded-full ring-1 ring-white"></span>
            </div>
            <span class="text-xs text-gray-400">xs</span>
          </div>
          <div class="flex flex-col items-center gap-2">
            <div class="relative w-10 h-10">
              <img src="https://randomuser.me/api/portraits/men/35.jpg" alt="sm" class="w-10 h-10 rounded-full object-cover"/>
              <span class="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full ring-2 ring-white"></span>
            </div>
            <span class="text-xs text-gray-400">sm</span>
          </div>
          <div class="flex flex-col items-center gap-2">
            <div class="relative w-14 h-14">
              <img src="https://randomuser.me/api/portraits/women/55.jpg" alt="md" class="w-14 h-14 rounded-full object-cover"/>
              <span class="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 rounded-full ring-2 ring-white"></span>
            </div>
            <span class="text-xs text-gray-400">md</span>
          </div>
          <div class="flex flex-col items-center gap-2">
            <div class="relative w-20 h-20">
              <img src="https://randomuser.me/api/portraits/men/60.jpg" alt="lg" class="w-20 h-20 rounded-full object-cover"/>
              <span class="absolute bottom-1 right-1 w-4 h-4 bg-green-500 rounded-full ring-2 ring-white"></span>
            </div>
            <span class="text-xs text-gray-400">lg</span>
          </div>
          <div class="flex flex-col items-center gap-2">
            <div class="relative w-24 h-24">
              <img src="https://randomuser.me/api/portraits/women/80.jpg" alt="xl" class="w-24 h-24 rounded-full object-cover"/>
              <span class="absolute bottom-1 right-1 w-5 h-5 bg-green-500 rounded-full ring-2 ring-white"></span>
            </div>
            <span class="text-xs text-gray-400">xl</span>
          </div>
        </div>
      </section>

      <!-- ── Initials / Placeholder ── -->
      <section>
        <h3 class="text-sm font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-4">Initials</h3>
        <div class="flex flex-wrap items-end gap-6">
          <div *ngFor="let av of initialsAvatars" class="flex flex-col items-center gap-2">
            <div class="relative w-12 h-12">
              <div class="w-12 h-12 rounded-full flex items-center justify-center text-white font-semibold text-sm" [ngStyle]="{'background': av.color}">{{ av.initials }}</div>
              <span *ngIf="av.indicator" class="absolute bottom-0 right-0 w-3 h-3 rounded-full ring-2 ring-white" [ngClass]="av.indicator"></span>
            </div>
            <span class="text-xs text-gray-500 dark:text-gray-400">{{ av.name }}</span>
          </div>
        </div>
      </section>

      <!-- ── Avatar Group ── -->
      <section>
        <h3 class="text-sm font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-4">Avatar Group</h3>
        <div class="flex -space-x-3">
          <img src="https://randomuser.me/api/portraits/men/10.jpg" class="w-10 h-10 rounded-full ring-2 ring-white dark:ring-boxdark object-cover" alt="user"/>
          <img src="https://randomuser.me/api/portraits/women/11.jpg" class="w-10 h-10 rounded-full ring-2 ring-white dark:ring-boxdark object-cover" alt="user"/>
          <img src="https://randomuser.me/api/portraits/men/12.jpg" class="w-10 h-10 rounded-full ring-2 ring-white dark:ring-boxdark object-cover" alt="user"/>
          <img src="https://randomuser.me/api/portraits/women/13.jpg" class="w-10 h-10 rounded-full ring-2 ring-white dark:ring-boxdark object-cover" alt="user"/>
          <div class="w-10 h-10 rounded-full ring-2 ring-white dark:ring-boxdark bg-indigo-500 flex items-center justify-center text-white text-xs font-bold">+4</div>
        </div>
      </section>

    </div>
  `
})
export class AvatarComponent {
  initialsAvatars = [
    { initials: 'JD', name: 'John D.', color: '#6366f1', indicator: 'bg-green-500' },
    { initials: 'AR', name: 'Alice R.', color: '#f59e0b', indicator: 'bg-yellow-400' },
    { initials: 'MK', name: 'Mike K.', color: '#10b981', indicator: 'bg-red-500' },
    { initials: 'SP', name: 'Sara P.', color: '#ef4444', indicator: null },
    { initials: 'BL', name: 'Bob L.', color: '#8b5cf6', indicator: 'bg-gray-400' },
  ];
}
