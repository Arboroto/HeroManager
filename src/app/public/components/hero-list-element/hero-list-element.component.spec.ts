import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeroListElementComponent } from './hero-list-element.component';
import { HeroService } from '../../../core/shared/services/hero.service';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { Hero } from '../../../core/models/hero.interface';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

describe('HeroListElementComponent', () => {
  let component: HeroListElementComponent;
  let fixture: ComponentFixture<HeroListElementComponent>;
  let heroServiceMock: any;
  let dialogMock: any;
  let routerMock: any;

  const mockHero: Hero = {
    id: 1,
    name: 'Hero Name',
    real_name: 'Real Name',
    race: 'Human',
    gender: 'Male',
    power: 'Flight',
    birth_date: '1990-01-01',
    description: 'A description of the hero',
    imgUrl: 'hero.jpg'
  };

  beforeEach(async () => {
    heroServiceMock = {
      deleteHero: jasmine.createSpy('deleteHero').and.returnValue(of(true))
    };

    dialogMock = {
      open: jasmine.createSpy('open').and.returnValue({
        afterClosed: () => of(true)
      })
    };

    routerMock = {
      navigate: jasmine.createSpy('navigate')
    };

    await TestBed.configureTestingModule({
      imports: [
        HeroListElementComponent,
        MatCardModule,
        MatIconModule,
        MatButtonModule
      ],
      providers: [
        { provide: HeroService, useValue: heroServiceMock },
        { provide: MatDialog, useValue: dialogMock },
        { provide: Router, useValue: routerMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(HeroListElementComponent);
    component = fixture.componentInstance;
    component.hero = mockHero; 
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should open confirmation dialog when openDialog is called', () => {
    component.openDialog();
    expect(dialogMock.open).toHaveBeenCalled();
  });

  it('should call deleteHero after dialog confirmation', () => {
    component.openDialog();
    expect(heroServiceMock.deleteHero).toHaveBeenCalledWith(mockHero.id);
  });

  it('should not call deleteHero if dialog is canceled', () => {
    dialogMock.open.and.returnValue({
      afterClosed: () => of(false)
    });

    component.openDialog();
    expect(heroServiceMock.deleteHero).not.toHaveBeenCalled();
  });

  it('should navigate to edit hero when editHero is called', () => {
    component.editHero(mockHero);
    expect(routerMock.navigate).toHaveBeenCalledWith(['public/form'], { queryParams: { id: mockHero.id } });
  });
});
