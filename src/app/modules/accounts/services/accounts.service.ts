import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { API_URL } from 'src/app/constants';
import { Account, NewAccount, RequestGetAccounts } from '..';

@Injectable({
  providedIn: 'root',
})
export class AccountsService {
  public url = `${API_URL}/accounts`;
  public headers = new HttpHeaders({
    Authorization:
      'Bearer ' +
      'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJtYXJpYWlzY3VzMUBnbWFpbC5jb20iLCJleHAiOjE2ODU2MTQwMDZ9.EAaNQL6Vm_-92Dum78zN-xNAkadHeX1BUK6WaAE-WTQ',
    // 'Bearer ' + this.authServise.getToken(),
  });

  constructor(private http: HttpClient) {}

  public toHttpParams(request: any): HttpParams {
    let httpParams = new HttpParams();
    Object.keys(request).forEach(function (key) {
      httpParams = httpParams.append(key, request[key]);
    });
    return httpParams;
  }

  public getAccounts(params: RequestGetAccounts): Observable<Array<Account>> {
    console.log(this.http.get<Array<Account>>(this.url, { headers: this.headers, params: this.toHttpParams(params) }));
    return this.http.get<Array<Account>>(this.url, { headers: this.headers, params: this.toHttpParams(params) }).pipe(
      catchError((err) => {
        return throwError(err);
      }),
    );
  }

  public addAccount(email: string, account: NewAccount): Observable<Account> {
    return this.http
      .post<Account>(this.url, account, { headers: this.headers, params: this.toHttpParams({ email }) })
      .pipe(
        catchError((err) => {
          return throwError(err);
        }),
      );
  }

  public getAccountById(accountId: number, email: string): Observable<Account> {
    return this.http
      .get<Account>(`${this.url}/${accountId}`, { headers: this.headers, params: this.toHttpParams({ email }) })
      .pipe(
        catchError((err) => {
          return throwError(err);
        }),
      );
  }
}
