import { ComponentFixture, TestBed } from '@angular/core/testing';
import { McvVideos } from './mcv-videos';

describe('McvVideos', () => {
    let component: McvVideos;
    let fixture: ComponentFixture<McvVideos>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [McvVideos]
        })
            .compileComponents();

        fixture = TestBed.createComponent(McvVideos);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
