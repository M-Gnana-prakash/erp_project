import { ComponentFixture, TestBed } from '@angular/core/testing';
import { McvAlerts } from './mcv-alerts';

describe('McvAlerts', () => {
    let component: McvAlerts;
    let fixture: ComponentFixture<McvAlerts>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [McvAlerts]
        })
            .compileComponents();

        fixture = TestBed.createComponent(McvAlerts);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
