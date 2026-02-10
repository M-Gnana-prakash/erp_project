import { ComponentFixture, TestBed } from '@angular/core/testing';

import { McvDateRangePicker } from './mcv-date-range-picker';

describe('McvDateRangePicker', () => {
  let component: McvDateRangePicker;
  let fixture: ComponentFixture<McvDateRangePicker>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [McvDateRangePicker]
    })
      .compileComponents();

    fixture = TestBed.createComponent(McvDateRangePicker);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should validate required date range', () => {
    component.required = true;
    component.startDate = null;
    component.endDate = null;
    (component as any).validate();
    expect(component.errors).toContain('Date range is required');
  });

  it('should validate date order (start before end)', () => {
    component.startDate = new Date('2023-12-31');
    component.endDate = new Date('2023-01-01');
    (component as any).validate();
    expect(component.errors).toContain('Start date must be before end date');
  });

  it('should validate min and max dates', () => {
    component.minDate = new Date('2023-01-01');
    component.maxDate = new Date('2023-12-31');

    component.startDate = new Date('2022-12-31');
    (component as any).validate();
    expect(component.errors).toContain('Start date is before minimum allowed');

    component.endDate = new Date('2024-01-01');
    (component as any).validate();
    expect(component.errors).toContain('End date is after maximum allowed');
  });

  it('should emit statusChange on date changes', () => {
    let emittedData: any;
    component.statusChange.subscribe(data => emittedData = data);
    component.onStartDateChange('2023-05-01');
    component.onEndDateChange('2023-05-10');
    expect(emittedData.startDate).toEqual(new Date('2023-05-01'));
    expect(emittedData.endDate).toEqual(new Date('2023-05-10'));
    expect(emittedData.valid).toBe(true);
  });
});
