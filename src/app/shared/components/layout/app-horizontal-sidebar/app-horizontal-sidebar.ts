import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router, NavigationEnd } from "@angular/router";
import { filter } from 'rxjs/operators';
import { SidebarService, NavItem } from '../../../../core/services/sidebar.service';
import { ThemeService } from '../../../../core/services/theme.service';

@Component({
    selector: 'app-horizontal-sidebar',
    standalone: true,
    imports: [CommonModule, RouterLink],
    template: `
    <div class="w-full bg-white dark:bg-boxdark border-b border-gray-200 dark:border-gray-800 px-6 py-2 shadow-sm z-40 hidden lg:block">
      <nav class="flex items-center gap-4">
        <!-- Main items -->
        <ng-container *ngFor="let item of navItems">
           <div class="relative group">
              <a [routerLink]="item.children ? null : item.route" 
                 class="flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors cursor-pointer"
                 [class.text-primary]="item.isActive"
                 [class.bg-gray-100]="item.isActive"
                 [class.dark:bg-meta-4]="item.isActive"
                 [class.text-gray-700]="!item.isActive"
                 [class.dark:text-gray-300]="!item.isActive"
                 [class.hover:text-primary]="!item.isActive"
                 [class.hover:bg-gray-50]="!item.isActive"
                 [class.dark:hover:bg-meta-4]="!item.isActive"
              >
                  <img [src]="item.icon" class="w-5 h-5 transition-all" 
                       [ngClass]="{'brightness-0 invert': !item.isActive && ((themeService.theme$ | async) === 'dark')}" />
                  <span>{{ item.label }}</span>
                  <svg *ngIf="item.children" class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
              </a>
              
              <!-- Dropdown -->
              <div *ngIf="item.children" class="absolute left-0 top-full mt-1 w-48 bg-white dark:bg-boxdark border border-gray-200 dark:border-gray-700 rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                  <div class="py-1">
                      <a *ngFor="let child of item.children" 
                         [routerLink]="child.route"
                         class="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-meta-4 hover:text-primary"
                         [class.text-primary]="child.isActive"
                         [class.font-medium]="child.isActive"
                      >
                         {{ child.label }}
                      </a>
                  </div>
              </div>
           </div>
        </ng-container>

        <div class="w-px h-6 bg-gray-300 dark:bg-gray-700 mx-2"></div>

        <!-- Other Items -->
        <ng-container *ngFor="let item of otherItems">
            <div class="relative group">
              <a [routerLink]="item.children ? null : item.route" 
                 class="flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors cursor-pointer"
                 [class.text-primary]="item.isActive"
                 [class.bg-gray-100]="item.isActive"
                 [class.dark:bg-meta-4]="item.isActive"
                 [class.text-gray-700]="!item.isActive"
                 [class.dark:text-gray-300]="!item.isActive"
                 [class.hover:text-primary]="!item.isActive"
                 [class.hover:bg-gray-50]="!item.isActive"
                 [class.dark:hover:bg-meta-4]="!item.isActive"
              >
                  <img [src]="item.icon" class="w-5 h-5 transition-all" 
                       [ngClass]="{'brightness-0 invert': !item.isActive && ((themeService.theme$ | async) === 'dark')}" />
                  <span>{{ item.label }}</span>
                  <svg *ngIf="item.children" class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
              </a>
              
              <!-- Dropdown -->
              <div *ngIf="item.children" class="absolute left-0 top-full mt-1 w-48 bg-white dark:bg-boxdark border border-gray-200 dark:border-gray-700 rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                  <div class="py-1">
                      <a *ngFor="let child of item.children" 
                         [routerLink]="child.route"
                         class="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-meta-4 hover:text-primary"
                         [class.text-primary]="child.isActive"
                         [class.font-medium]="child.isActive"
                      >
                         {{ child.label }}
                      </a>
                  </div>
              </div>
           </div>
        </ng-container>

      </nav>
    </div>
  `
})
export class AppHorizontalSidebarComponent {
    sidebarService = inject(SidebarService);
    themeService = inject(ThemeService);
    router = inject(Router);

    navItems: NavItem[] = this.sidebarService.navItems;
    otherItems: NavItem[] = this.sidebarService.otherItems;

    constructor() {
        this.router.events.pipe(
            filter(event => event instanceof NavigationEnd)
        ).subscribe(() => {
            this.updateActiveState();
        });
        this.updateActiveState();
    }

    private updateActiveState() {
        const currentUrl = this.router.url;
        const update = (items: any[]) => {
            items.forEach(item => {
                item.isActive = currentUrl.startsWith(item.route);
                if (item.children) {
                    item.children.forEach((child: any) => {
                        child.isActive = currentUrl === child.route;
                    });
                }
            });
        };
        update(this.navItems);
        update(this.otherItems);
    }
}
