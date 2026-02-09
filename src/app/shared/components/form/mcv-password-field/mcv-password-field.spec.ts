import { ComponentFixture, TestBed } from '@angular/core/testing';

import { McvPasswordField } from './mcv-password-field';

describe('McvPasswordField', () => {
  let component: McvPasswordField;
  let fixture: ComponentFixture<McvPasswordField>;

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
});
