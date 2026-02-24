import { ComponentFixture, TestBed } from '@angular/core/testing';
import { McvLists } from './mcv-lists';

describe('McvLists', () => {
    let component: McvLists;
    let fixture: ComponentFixture<McvLists>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [McvLists]
        })
            .compileComponents();

        fixture = TestBed.createComponent(McvLists);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
