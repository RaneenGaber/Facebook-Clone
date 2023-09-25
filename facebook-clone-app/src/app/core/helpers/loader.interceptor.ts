import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { LoaderService } from '../resources/service/loader.service';

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {
  constructor(private loaderService: LoaderService) { } // Create a LoaderService to control the loader indicator

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // Show the loader indicator
    this.loaderService.showLoader();

    return next.handle(request).pipe(
      finalize(() => {
        // Hide the loader indicator when the request is complete (whether successful or with an error)
        this.loaderService.hideLoader();
      })
    );
  }
}
