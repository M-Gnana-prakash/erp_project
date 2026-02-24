import { ComponentFixture, TestBed } from '@angular/core/testing';
import { McvButtons } from './mcv-buttons';

describe('McvButtons', () => {
    let component: McvButtons;
    let fixture: ComponentFixture<McvButtons>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [McvButtons]
        })
            .compileComponents();

        fixture = TestBed.createComponent(McvButtons);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
