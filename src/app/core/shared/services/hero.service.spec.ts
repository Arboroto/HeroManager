import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HeroService } from './hero.service';
import { CustomLoaderService } from './custom-loader.service';
import { of } from 'rxjs';
import { Hero } from '../../models/hero.interface';

describe('HeroService', () => {
  let service: HeroService;
  let httpMock: HttpTestingController;
  let loaderServiceMock: jasmine.SpyObj<CustomLoaderService>;

  beforeEach(() => {
    loaderServiceMock = jasmine.createSpyObj('CustomLoaderService', ['show', 'hide']);
    
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], 
      providers: [
        HeroService,
        { provide: CustomLoaderService, useValue: loaderServiceMock }
      ]
    });

    service = TestBed.inject(HeroService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get heroes from local storage', (done) => {
    const heroes: Hero[] = [
      { id: 1, name: 'Hero 1', real_name: 'Real Hero 1', race: 'Human', gender: 'Male', power: 'Strength', birth_date: '1990-01-01', description: 'A hero description', imgUrl: 'hero1.jpg' },
      { id: 2, name: 'Hero 2', real_name: 'Real Hero 2', race: 'Alien', gender: 'Female', power: 'Flight', birth_date: '1992-02-02', description: 'Another hero description', imgUrl: 'hero2.jpg' }
    ];

    localStorage.setItem('heroes', JSON.stringify(heroes));

    service.getHeroes().subscribe((result) => {
      expect(result).toEqual(heroes);
      done();
    });
  });

  it('should add a hero', (done) => {
    const heroes: Hero[] = [
      { id: 1, name: 'Hero 1', real_name: 'Real Hero 1', race: 'Human', gender: 'Male', power: 'Strength', birth_date: '1990-01-01', description: 'A hero description', imgUrl: 'hero1.jpg' }
    ];
    const newHero: Hero = { name: 'Hero 2', real_name: 'Real Hero 2', race: 'Alien', gender: 'Female', power: 'Flight', birth_date: '1992-02-02', description: 'Another hero description', imgUrl: 'hero2.jpg' };

    service.getHeroes = jasmine.createSpy().and.returnValue(of(heroes)); 

    service.addHero(newHero).subscribe((result) => {
      expect(result.length).toBe(2);
      expect(result).toContain(jasmine.objectContaining(newHero));
      expect(loaderServiceMock.show).toHaveBeenCalled();
      done();
    });
  });

  it('should update a hero', (done) => {
    const heroes: Hero[] = [
      { id: 1, name: 'Hero 1', real_name: 'Real Hero 1', race: 'Human', gender: 'Male', power: 'Strength', birth_date: '1990-01-01', description: 'A hero description', imgUrl: 'hero1.jpg' }
    ];
    const updatedHero: Hero = { id: 1, name: 'Updated Hero', real_name: 'Updated Real Name', race: 'Human', gender: 'Male', power: 'Strength', birth_date: '1990-01-01', description: 'Updated description', imgUrl: 'updated_hero1.jpg' };

    service.getHeroes = jasmine.createSpy().and.returnValue(of(heroes));

    service.updateHero(updatedHero).subscribe((result) => {
      expect(result.length).toBe(1);
      expect(result[0]).toEqual(updatedHero);
      expect(loaderServiceMock.show).toHaveBeenCalled();
      done();
    });
  });

  it('should delete a hero', (done) => {
    const heroes: Hero[] = [
      { id: 1, name: 'Hero 1', real_name: 'Real Hero 1', race: 'Human', gender: 'Male', power: 'Strength', birth_date: '1990-01-01', description: 'A hero description', imgUrl: 'hero1.jpg' },
      { id: 2, name: 'Hero 2', real_name: 'Real Hero 2', race: 'Alien', gender: 'Female', power: 'Flight', birth_date: '1992-02-02', description: 'Another hero description', imgUrl: 'hero2.jpg' }
    ];
  
    service.getHeroes = jasmine.createSpy().and.returnValue(of(heroes));
  
    service.deleteHero(1).subscribe((result) => {
      expect(result.length).toBe(1);
      expect(result.find((hero: Hero) => hero.id === 1)).toBeUndefined();
      expect(result.find((hero: Hero) => hero.id === 2)).toBeDefined();
      expect(loaderServiceMock.show).toHaveBeenCalled();
      done();
    });
  });
});

