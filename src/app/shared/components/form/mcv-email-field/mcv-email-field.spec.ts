import { ComponentFixture, TestBed } from '@angular/core/testing';
import { McvEmailField } from './mcv-email-field';

describe('McvEmailField', () => {
    let component!: McvEmailField;
    let fixture!: ComponentFixture<McvEmailField>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [McvEmailField]
        })
            .compileComponents();

        fixture = TestBed.createComponent(McvEmailField);
        component = fixture.componentInstance;
        await fixture.whenStable();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should validate email format', () => {
        component.value = 'invalid-email';
        component.validate();
        expect(component.errors).toContain('Invalid email format');

        component.value = 'test@example.com';
        component.validate();
        expect(component.errors.length).toBe(0);
    });

    it('should handle multiple emails when allowMultiple is true', () => {
        component.allowMultiple = true;
        component.value = 'test1@example.com, test2@example.com';
        component.validate();
        expect(component.errors.length).toBe(0);

        component.value = 'test1@example.com, invalid';
        component.validate();
        expect(component.errors).toContain('One or more email addresses are invalid');
    });

    it('should show required error message', () => {
        component.required = true;
        component.value = '';
        component.validate();
        expect(component.errors).toContain('This Field is required');
    });

    it('should set isTouched on blur', () => {
        component.onBlur();
        expect(component.isTouched).toBe(true);
    });

    it('should emit statusChange on validation', () => {
        let emittedData: any;
        component.statusChange.subscribe(data => emittedData = data);
        component.value = 'user@example.com';
        component.validate();
        expect(emittedData.value).toBe('user@example.com');
        expect(emittedData.valid).toBe(true);
    });

    it('should handle large dataset validation (stress test)', () => {
        const start = performance.now();
        for (let i = 0; i < 1000; i++) {
            component.value = `user${i}@domain.com`;
            component.validate();
        }
        const end = performance.now();
        expect(end - start).toBeLessThan(500);
        expect(component.errors.length).toBe(0);
    });
});
