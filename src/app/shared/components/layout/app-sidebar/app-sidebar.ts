import { Component, inject, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router, NavigationEnd } from "@angular/router";
import { filter } from 'rxjs/operators';
import { SidebarService, NavItem } from '../../../../core/services/sidebar.service';
import { UserService } from '../../../../core/services/user.service';
import { ThemeService } from '../../../../core/services/theme.service';

@Component({
  selector: 'app-app-sidebar',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './app-sidebar.html',
  styleUrl: './app-sidebar.css',
})

export class AppSidebar {
  private router = inject(Router);
  public sidebarService = inject(SidebarService); // Made public for template access
  private userService = inject(UserService);
  public themeService = inject(ThemeService);

  user = this.userService.currentUser;
  isMobileOpen$ = this.sidebarService.isMobileOpen$;
  isSidebarOpen$ = this.sidebarService.isSidebarOpen$;

  navItems: NavItem[] = [];
  otherItems: NavItem[] = [];

  private updateFilteredItems() {
    const role = this.user().role;
    this.navItems = this.sidebarService.filterItemsByRole(this.sidebarService.navItems, role);
    this.otherItems = this.sidebarService.filterItemsByRole(this.sidebarService.otherItems, role);
  }

  closeMobileMenu() {
    this.sidebarService.toggleMobileOpen();
  }

  constructor() {
    // Reactively re-filter whenever the user's role changes
    effect(() => {
      this.updateFilteredItems();
      this.updateActiveState();
    });

    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.updateActiveState();
    });
    this.updateFilteredItems();
    // Initial update
    this.updateActiveState();
  }

  private updateActiveState() {
    const currentUrl = this.router.url;

    const updateItems = (items: NavItem[]) => {
      items.forEach(item => {
        item.isActive = currentUrl.startsWith(item.route);
        if (item.children) {
          item.children.forEach(child => {
            child.isActive = currentUrl === child.route;
          });
          // Automatically expand if a child is active
          if (item.children.some(c => c.isActive)) {
            item.isExpanded = true;
          }
        }
      });
    };

    updateItems(this.navItems);
    updateItems(this.otherItems);
  }

  toggleMenu(item: NavItem) {
    if (item.children) {
      item.isExpanded = !item.isExpanded;
    }
  }
}
