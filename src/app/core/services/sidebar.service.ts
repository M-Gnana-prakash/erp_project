import { Injectable, signal } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';

export interface NavItem {
    label: string;
    icon: string;
    route: string;
    children?: NavItem[];
    isActive?: boolean;
    isExpanded?: boolean;
}

@Injectable({
    providedIn: 'root'

})
export class SidebarService {
    isSidebarOpen = signal(true);
    isMobileOpen = signal(false);
    layout = signal<'vertical' | 'horizontal'>(
        (localStorage.getItem('layout') as 'vertical' | 'horizontal') || 'vertical'
    );

    readonly isMobileOpen$ = toObservable(this.isMobileOpen);
    readonly isSidebarOpen$ = toObservable(this.isSidebarOpen);
    readonly layout$ = toObservable(this.layout);

    setLayout(newLayout: 'vertical' | 'horizontal') {
        this.layout.set(newLayout);
        localStorage.setItem('layout', newLayout);
    }

    toggleSidebar() {
        this.isSidebarOpen.update((val) => !val);
    }

    toggleMobileOpen() {
        this.isMobileOpen.update((val) => !val);
    }

    toggleExpanded() {
        this.isSidebarOpen.update((val) => !val);
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

    otherItems = [
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
                { label: "Breadcrumbs", route: "/ui-elements/breadcrumbs", icon: "" },
                { label: "Lists", route: "/ui-elements/lists", icon: "" },
                { label: "Links", route: "/ui-elements/links", icon: "" },
                { label: "Toasts", route: "/ui-elements/toasts", icon: "" },
                { label: "Accordion", route: "/ui-elements/accordion", icon: "" },
                { label: "Button Dropdown", route: "/ui-elements/button-dropdown", icon: "" },
                { label: "Progress Bars", route: "/ui-elements/progress-bars", icon: "" },
                { label: "Spinners", route: "/ui-elements/spinners", icon: "" },
                { label: "Buttons", route: "/ui-elements/buttons", icon: "" },
                { label: "Images", route: "/ui-elements/images", icon: "" },
                { label: "Videos", route: "/ui-elements/videos", icon: "" },
                { label: "Carousel", route: "/ui-elements/carousel", icon: "" },
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
}
