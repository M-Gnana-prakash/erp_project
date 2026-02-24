import { ComponentFixture, TestBed } from '@angular/core/testing';
import { McvToasts } from './mcv-toasts';

describe('McvToasts', () => {
    let component: McvToasts;
    let fixture: ComponentFixture<McvToasts>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [McvToasts]
        })
            .compileComponents();

        fixture = TestBed.createComponent(McvToasts);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
