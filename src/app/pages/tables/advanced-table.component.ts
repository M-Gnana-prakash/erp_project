import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdvancedTableComponent as UI_AdvancedTable, AdvancedTableColumn } from '../../shared/components/ui/advanced-table/advanced-table';

@Component({
  selector: 'app-advanced-table-page',
  standalone: true,
  imports: [CommonModule, UI_AdvancedTable],
  template: `
    <div class="p-6 bg-gray-2 dark:bg-boxdark-2 min-h-screen">
      <div class="mb-8">
        <h2 class="text-2xl font-bold text-black dark:text-white mb-2">Advanced Tables</h2>
        <p class="text-body dark:text-bodydark">A feature-rich data table with search, sorting, pagination, and multi-format exports.</p>
      </div>

      <div class="bg-white dark:bg-boxdark p-6 rounded-xl shadow-sm border border-stroke dark:border-strokedark">
        <app-mcv-advanced-table 
          [columns]="columns" 
          [data]="data" 
          [pageSize]="5"
          [searchEnabled]="true"
          [exportEnabled]="true">
        </app-mcv-advanced-table>
      </div>
    </div>
  `
})
export class AdvancedTableComponent {
  columns: AdvancedTableColumn[] = [
    { header: 'Order ID', field: 'orderId', sortable: true },
    { header: 'Customer', field: 'customer', sortable: true },
    { header: 'Product', field: 'product', sortable: true },
    { header: 'Quantity', field: 'quantity', sortable: true, type: 'number' },
    { header: 'Price', field: 'price', sortable: true, type: 'currency' },
    { header: 'Status', field: 'status', sortable: true }
  ];

  data = [
    { orderId: '#ORD-7741', customer: 'Emma Watson', product: 'Wireless Mouse', quantity: 2, price: 50.00, status: 'Delivered' },
    { orderId: '#ORD-8210', customer: 'John Doe', product: 'Gaming Keyboard', quantity: 1, price: 120.00, status: 'Pending' },
    { orderId: '#ORD-9012', customer: 'Alice Smith', product: 'Monitor 27"', quantity: 1, price: 350.00, status: 'Shipped' },
    { orderId: '#ORD-4432', customer: 'Robert Brown', product: 'USB-C Hub', quantity: 3, price: 45.00, status: 'Delivered' },
    { orderId: '#ORD-1120', customer: 'Sarah Miller', product: 'Laptop Stand', quantity: 1, price: 85.00, status: 'Cancelled' },
    { orderId: '#ORD-3390', customer: 'Michael Chen', product: 'Bluetooth Speaker', quantity: 2, price: 90.00, status: 'Delivered' },
    { orderId: '#ORD-5561', customer: 'Olivia Taylor', product: 'Webcam HD', quantity: 1, price: 75.00, status: 'Pending' },
    { orderId: '#ORD-2287', customer: 'David Wilson', product: 'External SSD 1TB', quantity: 1, price: 150.00, status: 'Shipped' },
    { orderId: '#ORD-6612', customer: 'Sophia Garcia', product: 'Mechanical Pencil', quantity: 10, price: 1.50, status: 'Delivered' },
    { orderId: '#ORD-8890', customer: 'James Anderson', product: 'Office Chair', quantity: 1, price: 210.00, status: 'Pending' }
  ];
}
