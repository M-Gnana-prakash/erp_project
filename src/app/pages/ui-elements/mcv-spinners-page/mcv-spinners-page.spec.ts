import { ComponentFixture, TestBed } from '@angular/core/testing';
import { McvSpinners } from './mcv-spinners';

describe('McvSpinners', () => {
    let component: McvSpinners;
    let fixture: ComponentFixture<McvSpinners>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [McvSpinners]
        })
            .compileComponents();

        fixture = TestBed.createComponent(McvSpinners);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
