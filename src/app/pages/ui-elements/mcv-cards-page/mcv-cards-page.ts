import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { McvCard } from '../../../shared/components/ui/mcv-card/mcv-card';

@Component({
    selector: 'app-mcv-cards-page',
    standalone: true,
    imports: [CommonModule, McvCard],
    templateUrl: './mcv-cards-page.html',
    styleUrl: './mcv-cards-page.css'
})
export class McvCardsPage {
    onCardAction() {
        console.log('Action dynamic!');
    }
}
