import { ComponentFixture, TestBed } from '@angular/core/testing';
import { McvAccordion } from './mcv-accordion';

describe('McvAccordion', () => {
    let component: McvAccordion;
    let fixture: ComponentFixture<McvAccordion>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [McvAccordion]
        })
            .compileComponents();

        fixture = TestBed.createComponent(McvAccordion);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
