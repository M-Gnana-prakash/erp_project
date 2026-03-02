import { Component, ElementRef, EventEmitter, HostListener, Input, Output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface McvDropdownItem {
    label?: string;
    icon?: string;
    id?: any;
    divider?: boolean;
    section?: string;
    danger?: boolean;
}

@Component({
    selector: 'app-mcv-dropdown',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './mcv-dropdown.html',
    styleUrl: './mcv-dropdown.css'
})
export class McvDropdown {
    @Input() label: string = 'Dropdown';
    @Input() items: McvDropdownItem[] = [];
    @Input() variant: 'primary' | 'outline' | 'ghost' | 'split' = 'primary';
    @Input() align: 'left' | 'right' = 'left';
    @Input() icon: string = '';

    @Output() onItemClick = new EventEmitter<McvDropdownItem>();

    isOpen = signal(false);

    constructor(private el: ElementRef) { }

    toggle() {
        this.isOpen.update(v => !v);
    }

    close() {
        this.isOpen.set(false);
    }

    handleItemClick(item: McvDropdownItem) {
        if (!item.divider && !item.section) {
            this.onItemClick.emit(item);
            this.close();
        }
    }

    @HostListener('document:click', ['$event'])
    onClickOutside(event: Event) {
        if (!this.el.nativeElement.contains(event.target)) {
            this.close();
        }
    }

    getButtonClasses(): string {
        const variants = {
            primary: 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-sm cursor-pointer',
            outline: 'border border-gray-300 bg-white dark:bg-boxdark text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/5 shadow-sm cursor-pointer',
            ghost: 'bg-transparent text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/5 cursor-pointer',
            split: 'bg-indigo-600 text-white rounded-l-lg hover:bg-indigo-700 cursor-pointer'
        };
        return variants[this.variant] || variants.primary;
    }
}
