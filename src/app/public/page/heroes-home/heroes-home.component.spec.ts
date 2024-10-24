import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HeroService } from '../../../core/shared/services/hero.service';
import { ToastService } from '../../../core/shared/services/toast.service';
import { CustomLoaderService } from '../../../core/shared/services/custom-loader.service';
import { HeroesHomeComponent } from './heroes-home.component';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

describe('HeroesHomeComponent', () => {
  let component: HeroesHomeComponent;
  let fixture: ComponentFixture<HeroesHomeComponent>;
  let heroService: HeroService;
  let toastService: ToastService;
  let loaderService: CustomLoaderService;
  let httpMock: HttpTestingController;

  const mockToastService = {
    show: jasmine.createSpy('show')
  };

  const mockLoaderService = {
    show: jasmine.createSpy('show'),
    hide: jasmine.createSpy('hide')
  };

  const mockActivatedRoute = {
    snapshot: {
      paramMap: {
        get: jasmine.createSpy('get').and.returnValue('1')
      }
    }
  };

  const mockResponse = {
    fact: "Cats are amazing creatures!"
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        HeroesHomeComponent       
      ],
      providers: [
        HeroService,
        { provide: ToastService, useValue: mockToastService },
        { provide: CustomLoaderService, useValue: mockLoaderService },
        { provide: ActivatedRoute, useValue: mockActivatedRoute }  
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(HeroesHomeComponent);
    component = fixture.componentInstance;
    heroService = TestBed.inject(HeroService);
    toastService = TestBed.inject(ToastService);
    loaderService = TestBed.inject(CustomLoaderService);
    httpMock = TestBed.inject(HttpTestingController);
    fixture.detectChanges();
  });

  afterEach(() => {
    httpMock.verify(); 
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should show loader, make API call and show toast with API response', () => {
    spyOn(heroService, 'callLoader').and.returnValue(of(mockResponse));

    component.testInterceptor();

    expect(loaderService.show).toHaveBeenCalled();

    heroService.callLoader().subscribe(res => {
      expect(loaderService.hide).toHaveBeenCalled();
      expect(mockToastService.show).toHaveBeenCalledWith(mockResponse.fact, 5000);
    });
  });
});
