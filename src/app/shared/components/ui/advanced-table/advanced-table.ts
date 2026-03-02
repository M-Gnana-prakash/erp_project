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
    templateUrl: './advanced-table.html'
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
            const formatted = new Intl.NumberFormat('en-IN', {
                style: 'currency',
                currency: 'INR',
                minimumFractionDigits: 2
            }).format(Number(val));
            return formatted.replace('₹', '₹ ');
        }

        return String(val);
    }

    // Export
    private escapeCSV(val: any): string {
        if (val === null || val === undefined) return '""';
        const str = String(val).replace(/"/g, '""');
        return `"${str}"`;
    }

    exportCSV() {
        const headers = this.columns.map(c => this.escapeCSV(c.header)).join(',');
        const rows = this.filteredData().map(row =>
            this.columns.map(col => {
                const val = row[col.field];
                // For CSV, we export raw numbers for better Excel/Calc compatibility
                return this.escapeCSV(val);
            }).join(',')
        ).join('\n');

        const csvContent = headers + "\n" + rows;
        const blob = new Blob(["\uFEFF", csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.setAttribute("href", url);
        link.setAttribute("download", "table_export_clean.csv");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    }

    private formatPDFValue(item: any, col: AdvancedTableColumn): string {
        const val = item[col.field];
        if (val === null || val === undefined) return '';

        if (col.type === 'currency') {
            const formatted = new Intl.NumberFormat('en-IN', {
                style: 'currency',
                currency: 'INR',
                minimumFractionDigits: 2
            }).format(Number(val));
            // Standard PDF fonts don't support '₹', so we use 'Rs.' for the PDF export
            return formatted.replace('₹', 'Rs. ');
        }

        return String(val);
    }

    async exportPDF() {
        try {
            const jsPDF = (await import('jspdf')).default;
            const autoTable = (await import('jspdf-autotable')).default;

            // Use landscape orientation ('l') to fit 10 columns nicely
            const doc = new jsPDF('l', 'mm', 'a4');

            const headers = [this.columns.map(c => c.header)];
            const body = this.filteredData().map(row =>
                this.columns.map(col => this.formatPDFValue(row, col))
            );

            autoTable(doc, {
                head: headers,
                body: body,
                theme: 'grid',
                headStyles: {
                    fillColor: [79, 70, 229],
                    fontSize: 8,
                    halign: 'center'
                },
                bodyStyles: {
                    fontSize: 7,
                    valign: 'middle'
                },
                columnStyles: {
                    // Right-align numeric columns in PDF too
                    5: { halign: 'right' }, // Quantity
                    6: { halign: 'right' }, // Price
                    7: { halign: 'right' }, // Discount
                    8: { halign: 'right' }, // Total
                },
                margin: { top: 15, right: 10, bottom: 10, left: 10 },
                didDrawPage: (data) => {
                    doc.setFontSize(10);
                    doc.text('Advanced Data Table - Performance Export', 14, 10);
                }
            });

            doc.save('table_export_pro.pdf');
        } catch (error) {
            console.error('Failed to export PDF:', error);
        }
    }
}
