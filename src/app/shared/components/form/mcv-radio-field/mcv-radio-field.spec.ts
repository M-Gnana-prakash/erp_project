import { ComponentFixture, TestBed } from '@angular/core/testing';

import { McvRadioField } from './mcv-radio-field';

describe('McvRadioField', () => {
    let component: McvRadioField;
    let fixture: ComponentFixture<McvRadioField>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [McvRadioField]
        })
            .compileComponents();

        fixture = TestBed.createComponent(McvRadioField);
        component = fixture.componentInstance;
        await fixture.whenStable();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
