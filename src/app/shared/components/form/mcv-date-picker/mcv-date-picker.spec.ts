import { ComponentFixture, TestBed } from '@angular/core/testing';

import { McvDatePicker } from './mcv-date-picker';

describe('McvDatePicker', () => {
  let component: McvDatePicker;
  let fixture: ComponentFixture<McvDatePicker>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [McvDatePicker]
    })
    .compileComponents();

    fixture = TestBed.createComponent(McvDatePicker);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
