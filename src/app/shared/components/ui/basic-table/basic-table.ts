import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface BasicTableColumn {
    header: string;
    field: string;
}

@Component({
    selector: 'app-mcv-basic-table',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './basic-table.html',
    styles: [`
    :host {
      display: block;
      width: 100%;
    }
  `]
})
export class BasicTableComponent {
    @Input() columns: BasicTableColumn[] = [];
    @Input() data: any[] = [];
    @Input() striped: boolean = false;
    @Input() bordered: boolean = false;
    @Input() hover: boolean = false;
    @Input() compact: boolean = false;

    constructor() { }
}
