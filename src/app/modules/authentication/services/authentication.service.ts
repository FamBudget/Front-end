import { Injectable } from '@angular/core';
import { LocalStorageService } from '../../../shared/services';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class AuthenticationService {
  private token: string | null = null;

  constructor(private localStorageService: LocalStorageService, private http: HttpClient) {}

  public signUp() {
    return this.http.post('', {});
  }

  public signIn() {
    return this.http.post('', {});
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

  public logout(): void {
    this.setToken('');
    this.localStorageService.clear();
  }
}
