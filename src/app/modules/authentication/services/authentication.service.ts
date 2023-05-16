import { Injectable } from '@angular/core';
import { LocalStorageService } from '../../../shared/services';
import { HttpClient } from '@angular/common/http';
import { User, UserStatus } from '../models';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { API_URL } from '../../../constants';

@Injectable()
export class AuthenticationService {
  private token: string | null = null;

  constructor(private localStorageService: LocalStorageService, private http: HttpClient) {}

  public signUp(user: User): Observable<User> {
    return this.http.post<User>(`${API_URL}/registration`, user).pipe(
      tap((a) => {
        console.log(a);
      }),
      catchError((err) => {
        return throwError(err);
      }),
    );
  }

  public signIn(user: Pick<User, 'email' | 'password'>): Observable<{ token: string }> {
    return this.http.post<{ token: string }>(`${API_URL}/authentication`, user).pipe(
      tap(({ token }) => {
        if (token) {
          this.localStorageService.setItem('token', token);
          this.setToken(token);
        }

        catchError((err) => {
          return throwError(err);
        });
      }),
    );
  }

  public isAuth(): boolean {
    return !!this.token;
  }

  public logout(): void {
    this.setToken('');
    this.localStorageService.clear();
  }

  public setToken(token: string): void {
    this.token = token;
  }

  public getToken(): string {
    if (this.token) {
      return this.token;
    }

    return '';
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
      tap((value) => {
        console.log(value);
      }),
      catchError((err) => {
        return throwError(err);
      }),
    );
  }
}
