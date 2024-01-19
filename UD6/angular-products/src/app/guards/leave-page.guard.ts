import { CanDeactivateFn, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

export interface ComponentDeactivate {
  canDeactivate: () => boolean | UrlTree | Promise<boolean | UrlTree> | Observable<boolean | UrlTree>;
}

export const leavePageGuard: CanDeactivateFn<ComponentDeactivate> =
  (component, currentRoute, currentState, nextState) => {
    return component.canDeactivate ? component.canDeactivate() : true;
  };