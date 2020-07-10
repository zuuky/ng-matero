import {Inject, Injectable, Optional} from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  CanLoad,
  Route,
  Router,
  RouterStateSnapshot,
  UrlSegment,
} from '@angular/router';
import {DOCUMENT} from '@angular/common';
import {TokenService} from './token.service';
import {ModelConsService} from '@shared/services/modelcons.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate, CanActivateChild, CanLoad {
  constructor(
    private _router: Router,
    private _token: TokenService,
    @Optional() @Inject(DOCUMENT) private _document: any
  ) {
  }

  static checkJWT(model: any): boolean {
    return !!model?.token;
  }

  // lazy loading
  canLoad(route: Route, segments: UrlSegment[]): boolean {
    return this._process();
  }

  // route
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this._process();
  }

  // all children route
  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this._process();
  }

  private _gotoLogin(url?: string) {
    setTimeout(() => {
      if (/^https?:\/\//g.test(url!)) {
        this._document.location.href = url as string;
      } else {
        this._router.navigateByUrl(url);
      }
    });
  }

  private _process(): boolean {
    const res = AuthGuard.checkJWT(TokenService.get<any>());
    if (!res) {
      this._gotoLogin(ModelConsService.LOGIN_URL);
    }
    return res;
  }
}
