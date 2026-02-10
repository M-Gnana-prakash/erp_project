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
});
