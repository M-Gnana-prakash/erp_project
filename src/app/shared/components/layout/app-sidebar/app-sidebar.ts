import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router, NavigationEnd } from "@angular/router";
import { filter } from 'rxjs/operators';
import { SidebarService } from '../../../../core/services/sidebar.service';
import { UserService } from '../../../../core/services/user.service';
import { ThemeService } from '../../../../core/services/theme.service';

interface NavItem {
  label: string;
  icon: string;
  route: string;
  children?: NavItem[];
  isActive?: boolean;
  isExpanded?: boolean;
};

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

  closeMobileMenu() {
    this.sidebarService.toggleMobileOpen();
  }

  navItems: NavItem[] = [
    {
      label: 'Dashboard',
      icon: '/images/side-bar-logos/dashboard-svgrepo-com.svg',
      route: '/dashboard',
      children: [
        { label: "ecommerce", route: '/dashboard/ecommerce', icon: 'home' }
      ]
    },
    {
      label: 'Calender',
      icon: '/images/side-bar-logos/calender-svgrepo-com.svg',
      route: '/calender'
    },
    {
      label: 'User Profile',
      icon: '/images/side-bar-logos/user-profile-circle-svgrepo-com.svg',
      route: '/user-profile'
    },
    {
      label: 'Forms',
      icon: '/images/side-bar-logos/google-forms-svgrepo-com.svg',
      route: '/forms',
      children: [
        { label: "basic-form", route: '/forms/basic-form', icon: 'home' },
        { label: "advanced-form", route: '/forms/advanced-form', icon: 'home' },
      ]
    },
    {
      label: 'Tables',
      icon: '/images/side-bar-logos/db-table-svgrepo-com.svg',
      route: '/tables',
      children: [
        { label: "basic-table", route: '/tables/basic-table', icon: 'home' },
        { label: "advanced-table", route: '/tables/advanced-table', icon: 'home' },
      ]
    },
    {
      label: 'Pages',
      icon: '/images/side-bar-logos/pages-svgrepo-com.svg',
      route: '/pages',
      children: [
        { label: "basic-page", route: '/pages/basic-page', icon: 'home' },
        { label: "advanced-page", route: '/pages/advanced-page', icon: 'home' },
      ]
    }
  ];

  otherItems: NavItem[] = [
    {
      label: 'Charts',
      icon: '/images/side-bar-logos/graph-svgrepo-com.svg',
      route: '/charts',
      children: [
        { label: "line-chart", route: '/charts/line-chart', icon: 'home' },
        { label: "bar-chart", route: '/charts/bar-chart', icon: 'home' },
        { label: "pie-chart", route: '/charts/pie-chart', icon: 'home' },
      ]
    },
    {
      label: "ui elements",
      icon: "/images/side-bar-logos/box-minimalistic-svgrepo-com.svg",
      route: "/ui-elements",
      children: [
        { label: "Alerts", route: "/ui-elements/alerts", icon: "" },
        { label: "Avatar", route: "/ui-elements/avatar", icon: "" },
        { label: "Badges", route: "/ui-elements/badges", icon: "" },
        { label: "Buttons", route: "/ui-elements/buttons", icon: "" },
        { label: "Images", route: "/ui-elements/images", icon: "" },
        { label: "Videos", route: "/ui-elements/videos", icon: "" },
      ]
    },
    {
      label: "Authentication",
      icon: "/images/side-bar-logos/plug-svgrepo-com.svg",
      route: "/authentication",
      children: [
        { label: "Sign in", route: "/authentication/sign-in", icon: "" },
        { label: "Sign up", route: "/authentication/sign-up", icon: "" },
      ]
    }
  ];

  constructor() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.updateActiveState();
    });
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
