import { inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, GuardResult, MaybeAsync, Router, RouterStateSnapshot } from '@angular/router';
import { LocalstorageService } from './localstorage';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate{
  readonly router = inject(Router);
  readonly localstorageService = inject(LocalstorageService);

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): MaybeAsync<GuardResult> {
    const token = this.localstorageService.getToken();
    if(token) {
      const tokenDecoded = JSON.parse(atob(token.split('.')[1]));
      if(tokenDecoded.isAdmin && !this._tokenExpired(tokenDecoded.exp)) {
        return true;
      }
    }
    this.router.navigate(['/login']);
    return false;

  }
  private _tokenExpired(exp: number) {
    return Math.floor(new Date().getTime() / 1000) >= exp;
  }



}
