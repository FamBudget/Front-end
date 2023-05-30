import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { API_URL } from 'src/app/constants';
import { Account, NewAccount, OperationAccountsQuery, RequestGetAccounts } from '..';
import { OperationAccounts } from '../models/operation-accounts.model';

@Injectable({
  providedIn: 'root',
})
export class MovingService {
  public url = `${API_URL}/operations/moving`;
  public headers = new HttpHeaders({
    Authorization:
      'Bearer ' +
      'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJtYXJpYWlzY3VzMUBnbWFpbC5jb20iLCJleHAiOjE2ODU0NDI1MDl9.Kls5bOd4hnna9TXMZYX6Aucqe4_YPkYFwlk9MCbwYbc',
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

  public getMoves(params: OperationAccountsQuery): Observable<Array<OperationAccounts>> {
    return this.http
      .get<Array<OperationAccounts>>(this.url, { headers: this.headers, params: this.toHttpParams(params) })
      .pipe(
        catchError((err) => {
          return throwError(err);
        }),
      );
  }

  public addOperation(body: any, params: OperationAccountsQuery): Observable<OperationAccounts> {
    return this.http
      .post<OperationAccounts>('http://13.50.233.192:8080/operations/moving', body, {
        headers: this.headers,
        params: this.toHttpParams(params),
      })
      .pipe(
        catchError((err) => {
          console.log(err);
          return throwError(err);
        }),
      );
  }
}
