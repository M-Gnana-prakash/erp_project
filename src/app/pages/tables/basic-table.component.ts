import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BasicTableComponent as UI_BasicTable } from '../../shared/components/ui/basic-table/basic-table';

@Component({
  selector: 'app-basic-table',
  standalone: true,
  imports: [CommonModule, UI_BasicTable],
  template: `
    <div class="p-6 bg-gray-2 dark:bg-boxdark-2 min-h-screen">
      <div class="mb-8">
        <h2 class="text-2xl font-bold text-black dark:text-white mb-2">Basic Tables</h2>
        <p class="text-body dark:text-bodydark">Simple data presentation tables using Tailwind CSS.</p>
      </div>

      <div class="grid grid-cols-1 gap-8">
        <!-- Default Table -->
        <div class="bg-white dark:bg-boxdark p-6 rounded-xl shadow-sm border border-stroke dark:border-strokedark">
           <h3 class="text-lg font-semibold text-black dark:text-white mb-4">Default Style</h3>
           <app-mcv-basic-table [columns]="columns" [data]="data"></app-mcv-basic-table>
        </div>

        <!-- Striped & Hover Table -->
        <div class="bg-white dark:bg-boxdark p-6 rounded-xl shadow-sm border border-stroke dark:border-strokedark">
           <h3 class="text-lg font-semibold text-black dark:text-white mb-4">Striped & Hover</h3>
           <app-mcv-basic-table 
             [columns]="columns" 
             [data]="data"
             [striped]="true"
             [hover]="true">
           </app-mcv-basic-table>
        </div>

        <!-- Bordered & Compact Table -->
        <div class="bg-white dark:bg-boxdark p-6 rounded-xl shadow-sm border border-stroke dark:border-strokedark">
           <h3 class="text-lg font-semibold text-black dark:text-white mb-4">Bordered & Compact</h3>
           <app-mcv-basic-table 
             [columns]="columns" 
             [data]="data"
             [bordered]="true"
             [compact]="true">
           </app-mcv-basic-table>
        </div>
      </div>
    </div>
  `
})
export class BasicTableComponent {
  columns = [
    { header: 'ID', field: 'id' },
    { header: 'Product Name', field: 'name' },
    { header: 'Category', field: 'category' },
    { header: 'Price', field: 'price' }
  ];

  data = [
    { id: '#SKU-001', name: 'Premium Wireless Headphones', category: 'Electronics', price: '₹299.00' },
    { id: '#SKU-002', name: 'Ergonomic Office Chair', category: 'Furniture', price: '₹450.00' },
    { id: '#SKU-003', name: 'Smart Home Hub', category: 'Electronics', price: '₹129.00' },
    { id: '#SKU-004', name: 'Organic Cotton Tee', category: 'Apparel', price: '₹35.00' },
    { id: '#SKU-005', name: 'Stainless Steel Water Bottle', category: 'Kitchen', price: '₹28.00' }
  ];
}
