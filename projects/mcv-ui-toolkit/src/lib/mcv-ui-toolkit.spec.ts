import { ComponentFixture, TestBed } from '@angular/core/testing';

import { McvUiToolkit } from './mcv-ui-toolkit';

describe('McvUiToolkit', () => {
  let component: McvUiToolkit;
  let fixture: ComponentFixture<McvUiToolkit>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [McvUiToolkit]
    })
    .compileComponents();

    fixture = TestBed.createComponent(McvUiToolkit);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
