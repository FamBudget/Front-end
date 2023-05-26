import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/modules/authentication/services';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private authService: AuthenticationService, private router: Router) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
     console.log('Intercepted request:', request);
    if (this.authService.isAuth()) {
      request = request.clone({
        setHeaders: {
          Authorization: this.authService.getToken(),
        },
      });
    }
    return next.handle(request).pipe(catchError((err: HttpErrorResponse) => this.errorHandler(err)));
  }

  private errorHandler(error: HttpErrorResponse) {
    if (error.status === 401) {
      this.router.navigate(['/sign-in'], {
        queryParams: {
          sessionFailed: true,
        },
      });
    }

    return throwError(error);
  }
}
