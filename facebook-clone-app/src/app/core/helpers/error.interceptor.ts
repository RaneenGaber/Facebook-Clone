import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor() { }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // Intercept the HTTP request and handle errors here
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        // Handle the error based on your requirements
        console.error('HTTP error:', error);

        // You can also re-throw the error if you want to propagate it further
        return throwError(error);
      })
    );
  }
}



