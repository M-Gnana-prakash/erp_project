import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-dropdown-item',
    standalone: true,
    imports: [CommonModule, RouterLink],
    template: `
    <li class="cursor-pointer">
      <a *ngIf="to" [routerLink]="to" (click)="itemClick.emit()" [class]="className">
        <ng-content></ng-content>
      </a>
      <button *ngIf="!to" (click)="itemClick.emit()" [class]="className">
        <ng-content></ng-content>
      </button>
    </li>
  `,
})
export class DropdownItemComponent {
    @Input() className = '';
    @Input() to?: string;
    @Output() itemClick = new EventEmitter<void>();
}
