import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { API_URL } from 'src/app/constants';
import { OperationAccountsQuery } from '..';
import { OperationAccounts } from '../models/operation-accounts.model';

@Injectable({
  providedIn: 'root',
})
export class MovingService {
  public url = `${API_URL}/operations/moving`;
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
      .get<Array<OperationAccounts>>(this.url, {
        params: this.toHttpParams(params),
      })
      .pipe(
        catchError((err) => {
          return throwError(err);
        }),
      );
  }

  public addOperation(body: any, params: OperationAccountsQuery): Observable<OperationAccounts> {
    return this.http
      .post<OperationAccounts>('http://13.50.233.192:8080/operations/moving', body, {
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
