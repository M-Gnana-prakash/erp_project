import { ComponentFixture, TestBed } from '@angular/core/testing';
import { McvBreadcrumbs } from './mcv-breadcrumbs';
import { RouterTestingModule } from '@angular/router/testing';

describe('McvBreadcrumbs', () => {
    let component: McvBreadcrumbs;
    let fixture: ComponentFixture<McvBreadcrumbs>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [McvBreadcrumbs, RouterTestingModule]
        })
            .compileComponents();

        fixture = TestBed.createComponent(McvBreadcrumbs);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
