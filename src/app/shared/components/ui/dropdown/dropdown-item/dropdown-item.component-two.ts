import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-dropdown-item-two',
    standalone: true,
    imports: [CommonModule, RouterLink],
    template: `
    <li class="cursor-pointer">
      <a *ngIf="tag === 'a' && to" [routerLink]="to" (click)="itemClick.emit()" [class]="className">
        <ng-content></ng-content>
      </a>
      <button *ngIf="tag === 'button'" (click)="itemClick.emit()" [class]="className">
        <ng-content></ng-content>
      </button>
    </li>
  `,
})
export class DropdownItemTwoComponent {
    @Input() tag: 'a' | 'button' = 'button';
    @Input() to?: string;
    @Input() className = '';
    @Output() itemClick = new EventEmitter<void>();
}
