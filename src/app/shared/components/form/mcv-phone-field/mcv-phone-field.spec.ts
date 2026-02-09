import { ComponentFixture, TestBed } from '@angular/core/testing';

import { McvPhoneField } from './mcv-phone-field';

describe('McvPhoneField', () => {
  let component: McvPhoneField;
  let fixture: ComponentFixture<McvPhoneField>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [McvPhoneField]
    })
    .compileComponents();

    fixture = TestBed.createComponent(McvPhoneField);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
