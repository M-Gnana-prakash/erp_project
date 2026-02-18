import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-dropdown',
    standalone: true,
    imports: [CommonModule],
    template: `
    <div [class]="className" [class.hidden]="!isOpen">
      <ng-content></ng-content>
    </div>
    <div *ngIf="isOpen" (click)="close.emit()" class="fixed inset-0 z-40 bg-transparent"></div>
  `,
    styles: []
})
export class DropdownComponent {
    @Input() isOpen = false;
    @Input() className = '';
    @Output() close = new EventEmitter<void>();
}
