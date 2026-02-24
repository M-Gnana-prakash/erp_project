import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

export interface McvBreadcrumbItem {
    label: string;
    url?: string;
    icon?: string;
    active?: boolean;
}

@Component({
    selector: 'app-mcv-breadcrumbs',
    standalone: true,
    imports: [CommonModule, RouterModule],
    templateUrl: './mcv-breadcrumbs.html',
    styleUrl: './mcv-breadcrumbs.css'
})
export class McvBreadcrumbs {
    @Input() items: McvBreadcrumbItem[] = [];
    @Input() separator: '/' | '>' | '-' = '/';
    @Input() variant: 'default' | 'background' = 'default';
}
