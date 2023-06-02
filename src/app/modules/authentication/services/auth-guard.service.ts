import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  public isLogin: boolean = this.authService.isAuth();

  constructor(private authService: AuthenticationService, private router: Router) {}

  public canActivate(): /* route: ActivatedRouteSnapshot, */
  /* state: RouterStateSnapshot, */
  boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    if (this.authService.isAuth()) {
      return true;
    }
    this.router.navigate(['']);
    return false;
  }
}
