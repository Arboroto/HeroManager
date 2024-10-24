import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderComponent } from './header.component';
import { Router } from '@angular/router';
import { CapitalizeWordPipe } from '../../pipes/capitalize-word.pipe';
import { By } from '@angular/platform-browser';
import { Location } from '@angular/common';
import { RouterTestingModule } from '@angular/router/testing';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let router: Router;
  let location: Location;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderComponent, RouterTestingModule],
      providers: [CapitalizeWordPipe] 
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    location = TestBed.inject(Location);
    fixture.detectChanges(); 
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to "public/home" when icon is clicked', async () => {
    spyOn(router, 'navigate');

    const iconElement = fixture.debugElement.query(By.css('.icon'));
    iconElement.triggerEventHandler('click', null);

    expect(router.navigate).toHaveBeenCalledWith(['public/home']);
  });
});

