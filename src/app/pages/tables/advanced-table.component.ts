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
          [pageSize]="10"
          [searchEnabled]="true"
          [exportEnabled]="true">
        </app-mcv-advanced-table>
      </div>
    </div>
  `
})
export class AdvancedTableComponent {
  columns: AdvancedTableColumn[] = [
    { header: 'Date', field: 'date', sortable: true, type: 'date' },
    { header: 'Order ID', field: 'orderId', sortable: true },
    { header: 'Customer', field: 'customer', sortable: true },
    { header: 'Category', field: 'category', sortable: true },
    { header: 'Product', field: 'product', sortable: true },
    { header: 'Quantity', field: 'quantity', sortable: true, type: 'number' },
    { header: 'Price', field: 'price', sortable: true, type: 'currency' },
    { header: 'Discount', field: 'discount', sortable: true, type: 'number' },
    { header: 'Total', field: 'total', sortable: true, type: 'currency' },
    { header: 'Status', field: 'status', sortable: true }
  ];

  // Generate 1000 records for performance testing
  data = Array.from({ length: 1000 }, (_, i) => {
    const statuses = ['Delivered', 'Pending', 'Shipped', 'Cancelled'];
    const products = ['Wireless Mouse', 'Gaming Keyboard', 'Monitor 27"', 'USB-C Hub', 'Laptop Stand', 'Bluetooth Speaker', 'Webcam HD', 'External SSD 1TB', 'Mechanical Pencil', 'Office Chair'];
    const categories = ['Electronics', 'Accessories', 'Office Supplies', 'Furniture'];
    const names = ['Emma Watson', 'John Doe', 'Alice Smith', 'Robert Brown', 'Sarah Miller', 'Michael Chen', 'Olivia Taylor', 'David Wilson', 'Sophia Garcia', 'James Anderson'];

    const quantity = Math.floor(Math.random() * 10) + 1;
    const price = Math.floor(Math.random() * 500) + 10;
    const discount = Math.floor(Math.random() * 15);
    const total = (price * quantity) - discount;

    // Generate a random date within the last year
    const start = new Date(new Date().setFullYear(new Date().getFullYear() - 1));
    const end = new Date();
    const date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())).toISOString().split('T')[0];

    return {
      orderId: `#ORD-${7000 + i}`,
      customer: `${names[i % names.length]} ${Math.floor(i / names.length) + 1}`,
      product: products[i % products.length],
      category: categories[i % categories.length],
      quantity: quantity,
      price: price,
      discount: discount,
      total: total > 0 ? total : 0,
      date: date,
      status: statuses[i % statuses.length]
    };
  });
}
