import { ComponentFixture, TestBed } from '@angular/core/testing';
import { McvProgressBars } from './mcv-progress-bars';

describe('McvProgressBars', () => {
    let component: McvProgressBars;
    let fixture: ComponentFixture<McvProgressBars>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [McvProgressBars]
        })
            .compileComponents();

        fixture = TestBed.createComponent(McvProgressBars);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
