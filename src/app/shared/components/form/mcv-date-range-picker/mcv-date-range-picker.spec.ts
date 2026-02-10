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
});
