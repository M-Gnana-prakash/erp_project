import { ComponentFixture, TestBed } from '@angular/core/testing';
import { McvPasswordField } from './mcv-password-field';

describe('McvPasswordField', () => {
    let component!: McvPasswordField;
    let fixture!: ComponentFixture<McvPasswordField>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [McvPasswordField]
        })
            .compileComponents();

        fixture = TestBed.createComponent(McvPasswordField);
        component = fixture.componentInstance;
        await fixture.whenStable();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should toggle password visibility', () => {
        expect(component.showPassword).toBe(false);
        component.toggleVisibility();
        expect(component.showPassword).toBe(true);
        component.toggleVisibility();
        expect(component.showPassword).toBe(false);
    });

    it('should validate required constraint', () => {
        component.required = true;
        component.value = '';
        component.validate();
        expect(component.errors).toContain('Password is required');
    });

    it('should validate minimum length', () => {
        component.minLength = 6;
        component.value = '12345';
        component.validate();
        expect(component.errors).toContain('Minimum length is 6');

        component.value = '123456';
        component.validate();
        expect(component.errors).not.toContain('Minimum length is 6');
    });

    it('should validate regex pattern', () => {
        component.regex = /[A-Z]/; // Must have an uppercase letter
        component.value = 'abcdef';
        component.validate();
        expect(component.errors).toContain('Invalid format');

        component.value = 'abcDef';
        component.validate();
        expect(component.errors).not.toContain('Invalid format');
    });

    it('should emit statusChange on validation', () => {
        let emittedData: any;
        component.statusChange.subscribe(data => emittedData = data);

        component.value = 'secret123';
        component.validate();

        expect(emittedData.value).toBe('secret123');
        expect(emittedData.touched).toBe(false);
    });

    it('should handle blur event', () => {
        component.onBlur();
        expect(component.isTouched).toBe(true);
    });

    it('should handle rapid password validations (stress test)', () => {
        const start = performance.now();
        // Default minLength is 8, so we use passwords length >= 8
        for (let i = 0; i < 1000; i++) {
            component.value = `password${i}`;
            component.validate();
        }
        const end = performance.now();
        expect(end - start).toBeLessThan(500);
        expect(component.errors.length).toBe(0);
    });
});
