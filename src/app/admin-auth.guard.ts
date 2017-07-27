import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { UserAuthService } from './user-auth.service';

@Injectable()
export class AdminAuthGuard implements CanActivate {

  constructor(private userAuthService: UserAuthService) {
  }

  canActivate(next: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.userAuthService.isUserAuth();
  }
}
