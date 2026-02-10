import { ComponentFixture, TestBed } from '@angular/core/testing';

import { McvTimePicker } from './mcv-time-picker';

describe('McvTimePicker', () => {
  let component: McvTimePicker;
  let fixture: ComponentFixture<McvTimePicker>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [McvTimePicker]
    })
      .compileComponents();

    fixture = TestBed.createComponent(McvTimePicker);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should validate required field', () => {
    component.required = true;
    component.value = '';
    (component as any).validate();
    expect(component.errors).toContain('Time is required');
  });

  it('should validate time format', () => {
    component.value = '25:00';
    (component as any).validate();
    expect(component.errors).toContain('Invalid time format');

    component.value = '12:30';
    (component as any).validate();
    expect(component.valid).toBe(true);
  });

  it('should validate min and max time', () => {
    component.minTime = '09:00';
    component.maxTime = '17:00';

    component.value = '08:00';
    (component as any).validate();
    expect(component.errors).toContain('Time must be after 09:00');

    component.value = '18:00';
    (component as any).validate();
    expect(component.errors).toContain('Time must be before 17:00');

    component.value = '12:00';
    (component as any).validate();
    expect(component.valid).toBe(true);
  });

  it('should emit statusChange on value change', () => {
    let emittedData: any;
    component.statusChange.subscribe(data => emittedData = data);
    component.onStatusChange('10:00');
    expect(emittedData.value).toBe('10:00');
    expect(emittedData.valid).toBe(true);
  });
});
