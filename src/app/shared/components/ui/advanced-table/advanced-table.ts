import { Component, Input, OnInit, Signal, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface AdvancedTableColumn {
    header: string;
    field: string;
    sortable?: boolean;
    type?: 'text' | 'number' | 'currency' | 'date';
}

@Component({
    selector: 'app-mcv-advanced-table',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './advanced-table.html',
    styleUrls: ['./advanced-table.css']
})
export class AdvancedTableComponent implements OnInit {
    @Input() columns: AdvancedTableColumn[] = [];
    @Input() data: any[] = [];
    @Input() pageSize: number = 10;
    @Input() searchEnabled: boolean = true;
    @Input() exportEnabled: boolean = true;

    public readonly Math = Math;

    // State
    searchTerm = signal('');
    sortField = signal<string | null>(null);
    sortOrder = signal<'asc' | 'desc'>('asc');
    currentPage = signal(1);

    constructor() { }

    ngOnInit() {
        // Basic validation
        if (this.columns.length > 0 && this.sortField() === null) {
            // Optioanlly set default sort field
            // this.sortField.set(this.columns[0].field);
        }
    }

    // Getters
    filteredData = computed(() => {
        const term = this.searchTerm().toLowerCase();
        if (!term) return this.data;

        return this.data.filter(item =>
            this.columns.some(col =>
                String(item[col.field]).toLowerCase().includes(term)
            )
        );
    });

    sortedData = computed(() => {
        const data = [...this.filteredData()];
        const field = this.sortField();
        const order = this.sortOrder();

        if (!field) return data;

        return data.sort((a, b) => {
            const aVal = a[field];
            const bVal = b[field];

            if (aVal === bVal) return 0;

            const comparison = aVal > bVal ? 1 : -1;
            return order === 'asc' ? comparison : -comparison;
        });
    });

    paginatedData = computed(() => {
        const data = this.sortedData();
        const start = (this.currentPage() - 1) * this.pageSize;
        const end = start + this.pageSize;
        return data.slice(start, end);
    });

    totalPages = computed(() => Math.ceil(this.filteredData().length / this.pageSize));

    // Methods
    toggleSort(field: string) {
        const col = this.columns.find(c => c.field === field);
        if (col?.sortable === false) return;

        if (this.sortField() === field) {
            this.sortOrder.set(this.sortOrder() === 'asc' ? 'desc' : 'asc');
        } else {
            this.sortField.set(field);
            this.sortOrder.set('asc');
        }
        this.currentPage.set(1);
    }

    setPage(page: number) {
        if (page >= 1 && page <= this.totalPages()) {
            this.currentPage.set(page);
        }
    }

    onSearch(event: any) {
        this.searchTerm.set(event.target.value);
        this.currentPage.set(1);
    }

    formatValue(item: any, col: AdvancedTableColumn): string {
        const val = item[col.field];
        if (val === null || val === undefined) return '';

        if (col.type === 'currency') {
            return new Intl.NumberFormat('en-IN', {
                style: 'currency',
                currency: 'INR',
                minimumFractionDigits: 2
            }).format(Number(val));
        }

        return String(val);
    }

    // Export
    exportCSV() {
        const headers = this.columns.map(c => c.header).join(',');
        const rows = this.filteredData().map(row =>
            this.columns.map(col => `"${this.formatValue(row, col)}"`).join(',')
        ).join('\n');

        const csvContent = "data:text/csv;charset=utf-8," + headers + "\n" + rows;
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "table_export.csv");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    async exportPDF() {
        try {
            const jsPDF = (await import('jspdf')).default;
            const autoTable = (await import('jspdf-autotable')).default;

            const doc = new jsPDF();
            const headers = [this.columns.map(c => c.header)];
            const body = this.filteredData().map(row =>
                this.columns.map(col => this.formatValue(row, col))
            );

            autoTable(doc, {
                head: headers,
                body: body,
                theme: 'grid',
                headStyles: { fillColor: [79, 70, 229] } // Indigo-600
            });

            doc.save('table_export.pdf');
        } catch (error) {
            console.error('Failed to export PDF:', error);
        }
    }
}
