import { Injectable } from '@angular/core';
import { LocalStorageService } from '../../../shared/services';
import { HttpClient } from '@angular/common/http';
import { RegistrationStatus, User, UserStatus } from '../models';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { API_URL } from '../../../constants';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(private localStorageService: LocalStorageService, private http: HttpClient) {}

  public signUp(user: User): Observable<RegistrationStatus> {
    return this.http.post<RegistrationStatus>(`${API_URL}/registration`, user).pipe(
      tap(() => {}),
      catchError((err) => {
        console.log(err);
        return throwError(err);
      }),
    );
  }

  public signIn(user: Pick<User, 'email' | 'password'>): Observable<{ token: string }> {
    return this.http.post<{ token: string }>(`${API_URL}/authentication`, user).pipe(
      tap(({ token }) => {
        if (token) {
          this.localStorageService.setItem('token', token);
        }
      }),
      catchError((err) => {
        console.log(err);
        return throwError(err);
      }),
    );
  }

  public isAuth(): boolean {
    if (this.localStorageService.getItem('token')) {
      return true;
    } else {
      return false;
    }
  }

  public getToken(): string {
    if (this.localStorageService.getItem('token')) {
      return this.localStorageService.getItem('token') as string;
    }

    return '';
  }

  public logout(): void {
    this.localStorageService.clear();
  }

  public resetPassword(email: string): Observable<{}> {
    return this.http.post<{}>(`${API_URL}/reset-password?email=${email}`, email).pipe(
      catchError((err) => {
        return throwError(err);
      }),
    );
  }

  public changePassword(
    code: string,
    email: string,
    user: Pick<User, 'confirmPassword' | 'password'>,
  ): Observable<UserStatus> {
    return this.http.put<UserStatus>(`${API_URL}/change-password/${code}?email=${email}`, user).pipe(
      catchError((err) => {
        return throwError(err);
      }),
    );
  }

  public verifyCode(code: string, email: string): Observable<UserStatus> {
    return this.http.get<UserStatus>(`${API_URL}/verify-code​/${code}?email=${email}`).pipe(
      catchError((err) => {
        return throwError(err);
      }),
    );
  }
}
