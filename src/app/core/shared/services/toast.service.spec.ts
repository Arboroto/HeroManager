import { TestBed } from '@angular/core/testing';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ToastService } from './toast.service';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('ToastService', () => {
  let service: ToastService;
  let snackBarSpy: jasmine.SpyObj<MatSnackBar>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('MatSnackBar', ['open']);

    TestBed.configureTestingModule({
      imports: [NoopAnimationsModule],
      providers: [
        ToastService,
        { provide: MatSnackBar, useValue: spy }
      ]
    });

    service = TestBed.inject(ToastService);
    snackBarSpy = TestBed.inject(MatSnackBar) as jasmine.SpyObj<MatSnackBar>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call MatSnackBar open() with the correct parameters', () => {
    const message = 'Test message';
    const duration = 3000;

    service.show(message);

    expect(snackBarSpy.open).toHaveBeenCalledWith(
      message,
      'Close',
      {
        duration: duration,
        horizontalPosition: 'center',
        verticalPosition: 'bottom',
      }
    );
  });

  it('should use the provided duration', () => {
    const message = 'Test message';
    const customDuration = 5000;

    service.show(message, customDuration);

    expect(snackBarSpy.open).toHaveBeenCalledWith(
      message,
      'Close',
      {
        duration: customDuration,
        horizontalPosition: 'center',
        verticalPosition: 'bottom',
      }
    );
  });
});
