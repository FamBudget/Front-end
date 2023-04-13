import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private router: Router) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request);
  }

  private errorHandler(err: HttpErrorResponse): Observable<never> {
    if (err.status === 401) {
      this.router.navigate(['/'], {
        queryParams: {
          sessionFailed: true,
        },
      });
    }

    return throwError(err);
  }
}
