import { ComponentFixture, TestBed } from '@angular/core/testing';
import { McvCarouselPage } from './mcv-carousel-page';

describe('McvCarouselPage', () => {
    let component: McvCarouselPage;
    let fixture: ComponentFixture<McvCarouselPage>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [McvCarouselPage]
        })
            .compileComponents();

        fixture = TestBed.createComponent(McvCarouselPage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
