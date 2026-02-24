import { ComponentFixture, TestBed } from '@angular/core/testing';
import { McvBadges } from './mcv-badges';

describe('McvBadges', () => {
    let component: McvBadges;
    let fixture: ComponentFixture<McvBadges>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [McvBadges]
        })
            .compileComponents();

        fixture = TestBed.createComponent(McvBadges);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
