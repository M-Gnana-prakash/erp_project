import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarouselComponent } from '../../shared/components/ui/carousel/carousel';

@Component({
    selector: 'app-carousel-demo',
    standalone: true,
    imports: [CommonModule, CarouselComponent],
    template: `
    <div class="p-6 space-y-8">
      <div class="mb-6">
        <h2 class="text-2xl font-bold text-gray-800 dark:text-white">Carousel Component Demo</h2>
        <p class="text-gray-600 dark:text-gray-400">Custom carousel component with manual and automatic modes.</p>
      </div>

      <!-- Manual Mode -->
      <section>
        <h3 class="text-lg font-semibold mb-4 text-gray-700 dark:text-gray-300">Manual Mode</h3>
        <app-carousel [items]="slides" mode="manual"></app-carousel>
      </section>

      <!-- Auto Mode -->
      <section>
        <h3 class="text-lg font-semibold mb-4 text-gray-700 dark:text-gray-300">Auto Mode (Interval 2s)</h3>
        <app-carousel [items]="slides" mode="auto" [interval]="2000"></app-carousel>
      </section>

      <!-- Disabled Next Button -->
      <section>
        <h3 class="text-lg font-semibold mb-4 text-gray-700 dark:text-gray-300">Disabled Next Button</h3>
        <app-carousel [items]="slides" mode="manual" [disableNext]="true"></app-carousel>
      </section>
    </div>
  `
})
export class CarouselDemoComponent {
    slides = [
        {
            image: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&q=80&w=1200',
            title: 'Modern Workspace',
            description: 'The perfect place for productivity and creativity.'
        },
        {
            image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1200',
            title: 'Data Analytics',
            description: 'Harness the power of data to drive your business forward.'
        },
        {
            image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=1200',
            title: 'Expert Development',
            description: 'Building robust and scalable solutions for the modern web.'
        }
    ];
}
