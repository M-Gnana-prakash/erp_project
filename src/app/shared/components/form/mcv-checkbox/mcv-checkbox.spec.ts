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

  it('should toggle checked state', () => {
    component.onToggle(true);
    expect(component.checked).toBe(true);
    component.onToggle(false);
    expect(component.checked).toBe(false);
  });

  it('should validate required state', () => {
    component.required = true;
    component.checked = false;
    (component as any).validateAndEmit();
    expect(component.valid).toBe(false);

    component.checked = true;
    (component as any).validateAndEmit();
    expect(component.valid).toBe(true);
  });

  it('should emit statusChange on toggle', () => {
    let emittedData: any;
    component.statusChange.subscribe(data => emittedData = data);
    component.onToggle(true);
    expect(emittedData.checked).toBe(true);
    expect(emittedData.valid).toBe(true);
  });
});
