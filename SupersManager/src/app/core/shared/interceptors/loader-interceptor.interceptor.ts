import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, finalize } from 'rxjs';
import { CustomLoaderService } from '../components/custom-loader/custom-loader.service';

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {

  constructor(public loaderService: CustomLoaderService) {}
  // como no tenemos request a interceptar, el método show del loaderService nunca se ejecutará.
  // en un caso donde se utilizase un servicio con endpoints reales, sería completamente funcional.
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.loaderService.show();

    return next.handle(req).pipe(
      finalize(() => this.loaderService.hide())
    );
  }
}
