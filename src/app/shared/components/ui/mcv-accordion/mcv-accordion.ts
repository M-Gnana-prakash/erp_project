import { Component, Input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface McvAccordionItem {
    title: string;
    content: string;
    icon?: string;
    color?: string;
    open?: boolean;
}

@Component({
    selector: 'app-mcv-accordion',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './mcv-accordion.html',
    styleUrl: './mcv-accordion.css'
})
export class McvAccordion {
    @Input() items: McvAccordionItem[] = [];
    @Input() variant: 'default' | 'flush' | 'icon' = 'default';
    @Input() allowMultiple: boolean = false;

    openIndices = signal<number[]>([]);

    ngOnInit() {
        const initialOpen = this.items
            .map((item, index) => item.open ? index : -1)
            .filter(index => index !== -1);

        if (!this.allowMultiple && initialOpen.length > 1) {
            this.openIndices.set([initialOpen[0]]);
        } else {
            this.openIndices.set(initialOpen);
        }
    }

    toggle(index: number) {
        const current = this.openIndices();
        if (this.allowMultiple) {
            if (current.includes(index)) {
                this.openIndices.set(current.filter(i => i !== index));
            } else {
                this.openIndices.set([...current, index]);
            }
        } else {
            this.openIndices.set(current.includes(index) ? [] : [index]);
        }
    }

    isOpen(index: number): boolean {
        return this.openIndices().includes(index);
    }
}
