import { ComponentFixture, TestBed } from '@angular/core/testing';
import { McvButtonDropdown } from './mcv-button-dropdown';

describe('McvButtonDropdown', () => {
    let component: McvButtonDropdown;
    let fixture: ComponentFixture<McvButtonDropdown>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [McvButtonDropdown]
        })
            .compileComponents();

        fixture = TestBed.createComponent(McvButtonDropdown);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
