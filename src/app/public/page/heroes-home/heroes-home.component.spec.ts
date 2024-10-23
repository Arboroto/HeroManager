import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroesHomeComponent } from './heroes-home.component';

describe('HeroesHomeComponent', () => {
  let component: HeroesHomeComponent;
  let fixture: ComponentFixture<HeroesHomeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HeroesHomeComponent]
    });
    fixture = TestBed.createComponent(HeroesHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
