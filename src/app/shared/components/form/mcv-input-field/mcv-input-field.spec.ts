import { ComponentFixture, TestBed } from '@angular/core/testing';

import { McvInputField } from './mcv-input-field';

describe('McvInputField', () => {
  let component: McvInputField;
  let fixture: ComponentFixture<McvInputField>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [McvInputField]
    })
    .compileComponents();

    fixture = TestBed.createComponent(McvInputField);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
