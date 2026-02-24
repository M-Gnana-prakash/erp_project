import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { McvBreadcrumbs, McvBreadcrumbItem } from '../../../shared/components/ui/mcv-breadcrumbs/mcv-breadcrumbs';

@Component({
    selector: 'app-mcv-breadcrumbs-page',
    standalone: true,
    imports: [CommonModule, RouterModule, McvBreadcrumbs],
    templateUrl: './mcv-breadcrumbs-page.html',
    styleUrl: './mcv-breadcrumbs-page.css'
})
export class McvBreadcrumbsPage {
    defaultBreadcrumbs: McvBreadcrumbItem[] = [
        { label: 'Home', url: '/', icon: '🏠' },
        { label: 'UI Elements', url: '/ui-elements' },
        { label: 'Breadcrumbs', active: true }
    ];

    arrowBreadcrumbs: McvBreadcrumbItem[] = [
        { label: 'Dashboard', url: '/dashboard' },
        { label: 'Projects', url: '/projects' },
        { label: 'MCV UI ToolKit', active: true }
    ];

    bgBreadcrumbs: McvBreadcrumbItem[] = [
        { label: 'Settings', url: '/settings' },
        { label: 'Security', url: '/settings/security' },
        { label: 'Authentication', active: true }
    ];
}
