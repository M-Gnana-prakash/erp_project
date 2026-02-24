import { ComponentFixture, TestBed } from '@angular/core/testing';
import { McvAvatar } from './mcv-avatar';

describe('McvAvatar', () => {
    let component: McvAvatar;
    let fixture: ComponentFixture<McvAvatar>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [McvAvatar]
        })
            .compileComponents();

        fixture = TestBed.createComponent(McvAvatar);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
