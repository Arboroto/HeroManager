import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEditHeroComponent } from './create-edit-hero.component';

describe('CreateEditHeroComponent', () => {
  let component: CreateEditHeroComponent;
  let fixture: ComponentFixture<CreateEditHeroComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateEditHeroComponent]
    });
    fixture = TestBed.createComponent(CreateEditHeroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
