import { Component, inject, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router, NavigationEnd } from "@angular/router";
import { filter } from 'rxjs/operators';
import { SidebarService, NavItem } from '../../../../core/services/sidebar.service';
import { ThemeService } from '../../../../core/services/theme.service';
import { UserService } from '../../../../core/services/user.service';

@Component({
    selector: 'app-horizontal-sidebar',
    standalone: true,
    imports: [CommonModule, RouterLink],
    templateUrl: './app-horizontal-sidebar.html',
})
export class AppHorizontalSidebarComponent {
    sidebarService = inject(SidebarService);
    themeService = inject(ThemeService);
    router = inject(Router);
    private userService = inject(UserService);

    navItems: NavItem[] = [];
    otherItems: NavItem[] = [];

    private updateFilteredItems() {
        const role = this.userService.currentUser().role;
        this.navItems = this.sidebarService.filterItemsByRole(this.sidebarService.navItems, role);
        this.otherItems = this.sidebarService.filterItemsByRole(this.sidebarService.otherItems, role);
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
