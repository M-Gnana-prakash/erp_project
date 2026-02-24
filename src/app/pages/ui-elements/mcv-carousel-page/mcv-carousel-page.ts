import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { McvCarousel } from '../../../shared/components/ui/mcv-carousel/mcv-carousel';

@Component({
    selector: 'app-mcv-carousel-page',
    standalone: true,
    imports: [CommonModule, McvCarousel],
    templateUrl: './mcv-carousel-page.html',
    styleUrl: './mcv-carousel-page.css'
})
export class McvCarouselPage {
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
