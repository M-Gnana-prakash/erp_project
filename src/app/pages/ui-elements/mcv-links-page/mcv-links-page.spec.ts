import { ComponentFixture, TestBed } from '@angular/core/testing';
import { McvLinks } from './mcv-links';

describe('McvLinks', () => {
    let component: McvLinks;
    let fixture: ComponentFixture<McvLinks>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [McvLinks]
        })
            .compileComponents();

        fixture = TestBed.createComponent(McvLinks);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
