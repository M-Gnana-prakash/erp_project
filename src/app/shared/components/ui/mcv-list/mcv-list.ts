import { Component, ContentChild, EventEmitter, Input, Output, TemplateRef } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-mcv-list',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './mcv-list.html',
    styleUrl: './mcv-list.css'
})
export class McvList {
    @Input() items: any[] = [];
    @Input() variant: 'simple' | 'rich' | 'interactive' | 'checked' = 'simple';
    @Input() showBorder: boolean = true;
    @Input() hoverEffects: boolean = true;
    @Input() selectedId: any = null;
    @Input() customClass: string = '';

    @Output() onItemClick = new EventEmitter<any>();
    @Output() onCheckToggle = new EventEmitter<any>();

    @ContentChild('itemTemplate') itemTemplate: TemplateRef<any> | null = null;

    handleItemClick(item: any) {
        if (this.variant === 'interactive') {
            this.onItemClick.emit(item);
        }
    }

    toggleCheck(item: any, event: Event) {
        event.stopPropagation();
        this.onCheckToggle.emit(item);
    }
}
