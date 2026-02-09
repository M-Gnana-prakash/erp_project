import { ComponentFixture, TestBed } from '@angular/core/testing';

import { McvEmailField } from './mcv-email-field';

describe('McvEmailField', () => {
  let component: McvEmailField;
  let fixture: ComponentFixture<McvEmailField>;

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
});
