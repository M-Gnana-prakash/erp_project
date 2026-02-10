import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToggleSwitchComponent } from './mcv-toogle-field';

describe('ToggleSwitchComponent', () => {
    let component: ToggleSwitchComponent;
    let fixture: ComponentFixture<ToggleSwitchComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ToggleSwitchComponent]
        })
            .compileComponents();

        fixture = TestBed.createComponent(ToggleSwitchComponent);
        component = fixture.componentInstance;
        await fixture.whenStable();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should toggle on and off', () => {
        component.toggle();
        expect(component.value).toBe(true);
        component.toggle();
        expect(component.value).toBe(false);
    });

    it('should validate required switch (must be on)', () => {
        component.required = true;
        component.value = false;
        expect(component.isValid).toBe(false);

        component.value = true;
        expect(component.isValid).toBe(true);
    });

    it('should emit value and status on toggle', () => {
        let emittedValue: any;
        component.valueChange.subscribe(val => emittedValue = val);

        component.toggle();
        expect(emittedValue.value).toBe(true);
        expect(emittedValue.valid).toBe(true);
    });
});
