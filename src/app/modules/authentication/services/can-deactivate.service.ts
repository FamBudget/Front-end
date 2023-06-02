import { Injectable } from '@angular/core';
import {
  /* ActivatedRouteSnapshot, */
  CanDeactivate,
  /* RouterStateSnapshot, */
} from '@angular/router';
import { IDeactivateComponent } from '../models';

@Injectable({
  providedIn: 'root',
})
export class CanDeactivateService implements CanDeactivate<IDeactivateComponent> {
  constructor() {}

  canDeactivate(
    component: IDeactivateComponent,
    /* currentRoute: ActivatedRouteSnapshot, */
    /* currentState: RouterStateSnapshot, */
    /* nextState?: RouterStateSnapshot | undefined, */
  ) {
    return component.canExit();
  }
}
