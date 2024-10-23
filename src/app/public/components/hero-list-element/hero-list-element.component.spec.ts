import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroListElementComponent } from './hero-list-element.component';

describe('HeroListElementComponent', () => {
  let component: HeroListElementComponent;
  let fixture: ComponentFixture<HeroListElementComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HeroListElementComponent]
    });
    fixture = TestBed.createComponent(HeroListElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
