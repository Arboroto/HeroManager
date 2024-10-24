import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CustomLoaderComponent } from './custom-loader.component';
import { CustomLoaderService } from '../../services/custom-loader.service';
import { BehaviorSubject } from 'rxjs';

describe('CustomLoaderComponent', () => {
  let component: CustomLoaderComponent;
  let fixture: ComponentFixture<CustomLoaderComponent>;
  let loaderServiceSpy: jasmine.SpyObj<CustomLoaderService>;
  let isLoadingSubject: BehaviorSubject<boolean>; 

  beforeEach(async () => {
    isLoadingSubject = new BehaviorSubject<boolean>(false);

    const loaderServiceMock = jasmine.createSpyObj('CustomLoaderService', [], {
      isLoading: isLoadingSubject.asObservable() 
    });

    await TestBed.configureTestingModule({
      imports: [CustomLoaderComponent],
      providers: [{ provide: CustomLoaderService, useValue: loaderServiceMock }]
    }).compileComponents();

    fixture = TestBed.createComponent(CustomLoaderComponent);
    component = fixture.componentInstance;
    loaderServiceSpy = TestBed.inject(CustomLoaderService) as jasmine.SpyObj<CustomLoaderService>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with isLoading as false', () => {
    expect(component.isLoading).toBeFalse(); 
  });

  it('should update isLoading when service emits new value', () => {
    isLoadingSubject.next(true);
    fixture.detectChanges(); 

    expect(component.isLoading).toBeTrue(); 
  });
});
