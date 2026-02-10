import { ComponentFixture, TestBed } from '@angular/core/testing';

import { McvCheckbox } from './mcv-checkbox';

describe('McvCheckbox', () => {
  let component: McvCheckbox;
  let fixture: ComponentFixture<McvCheckbox>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [McvCheckbox]
    })
    .compileComponents();

    fixture = TestBed.createComponent(McvCheckbox);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
