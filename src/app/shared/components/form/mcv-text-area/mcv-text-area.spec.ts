import { ComponentFixture, TestBed } from '@angular/core/testing';

import { McvTextArea } from './mcv-text-area';

describe('McvTextArea', () => {
  let component: McvTextArea;
  let fixture: ComponentFixture<McvTextArea>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [McvTextArea]
    })
    .compileComponents();

    fixture = TestBed.createComponent(McvTextArea);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
