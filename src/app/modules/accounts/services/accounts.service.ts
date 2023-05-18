import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AccountsService {
  apiurl = 'http://localhost:4200/accounts';

  constructor(private http:HttpClient) {
 
  }
  public getAccounts() {
    return this.http.get(this.apiurl);
  }
}
