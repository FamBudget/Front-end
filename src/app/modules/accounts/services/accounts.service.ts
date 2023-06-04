import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { API_URL } from 'src/app/constants';
import { Account, NewAccount, RequestGetAccounts } from '..';

@Injectable({
  providedIn: 'root',
})
export class AccountsService {
  public url = `${API_URL}/accounts`;

  constructor(private http: HttpClient) {}

  public toHttpParams(request: any): HttpParams {
    let httpParams = new HttpParams();
    Object.keys(request).forEach(function (key) {
      httpParams = httpParams.append(key, request[key]);
    });
    return httpParams;
  }

  public getAccounts(params: RequestGetAccounts): Observable<Array<Account>> {
    return this.http
      .get<Array<Account>>(this.url, {
        params: this.toHttpParams(params),
      })
      .pipe(
        catchError((err) => {
          return throwError(err);
        }),
      );
  }

  public addAccount(email: string, account: NewAccount): Observable<Account> {
    return this.http
      .post<Account>(this.url, account, {
        params: this.toHttpParams({ email }),
      })
      .pipe(
        catchError((err) => {
          return throwError(err);
        }),
      );
  }

  public getAccountById(accountId: number, email: string): Observable<Account> {
    return this.http
      .get<Account>(`${this.url}/${accountId}`, {
        params: this.toHttpParams({ email }),
      })
      .pipe(
        catchError((err) => {
          return throwError(err);
        }),
      );
  }
}
