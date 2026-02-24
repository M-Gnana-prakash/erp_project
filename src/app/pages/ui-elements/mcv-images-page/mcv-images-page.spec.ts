import { ComponentFixture, TestBed } from '@angular/core/testing';
import { McvImages } from './mcv-images';

describe('McvImages', () => {
    let component: McvImages;
    let fixture: ComponentFixture<McvImages>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [McvImages]
        })
            .compileComponents();

        fixture = TestBed.createComponent(McvImages);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
