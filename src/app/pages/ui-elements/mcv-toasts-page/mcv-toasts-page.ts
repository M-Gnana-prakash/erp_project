import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Toast {
    id: number;
    type: 'success' | 'warning' | 'danger' | 'info';
    title: string;
    message: string;
    visible: boolean;
}

import { McvToast } from '../../../shared/components/ui/mcv-toast/mcv-toast';

@Component({
    selector: 'app-mcv-toasts-page',
    standalone: true,
    imports: [CommonModule, McvToast],
    templateUrl: './mcv-toasts-page.html',
    styleUrl: './mcv-toasts-page.css'
})
export class McvToastsPage {
    private nextId = 1;
    private toasts = signal<Toast[]>([]);

    activeToasts = this.toasts;

    showToast(type: Toast['type'], title: string, message: string) {
        const id = this.nextId++;
        this.toasts.update(ts => [...ts, { id, type, title, message, visible: true }]);
        setTimeout(() => this.dismissToast(id), 4000);
    }

    dismissToast(id: number) {
        this.toasts.update(ts => ts.filter(t => t.id !== id));
    }
}
