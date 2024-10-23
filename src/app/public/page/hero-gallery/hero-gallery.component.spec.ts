import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroGalleryComponent } from './hero-gallery.component';

describe('HeroGalleryComponent', () => {
  let component: HeroGalleryComponent;
  let fixture: ComponentFixture<HeroGalleryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HeroGalleryComponent]
    });
    fixture = TestBed.createComponent(HeroGalleryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
