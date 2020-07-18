import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {catchError} from 'rxjs/operators';

import {MenuService} from './menu.service';
import {AuthGuard} from '@core/authentication/auth.guard';
import {TokenService} from '@core/authentication/token.service';
import {ModelConsService} from '@shared/services/modelcons.service';

@Injectable({
  providedIn: 'root',
})
export class StartupService {
  constructor(private _menu: MenuService, private _http: HttpClient) {
  }

  load(): Promise<any> {

    // const menuUrl = '/sysMenu/selectSidebarMenus';
    const menuUrl = 'assets/data/menu.json?_t=' + Date.now();

    if (AuthGuard.checkJWT(TokenService.get<any>())) {
      return new Promise((resolve, reject) => {
        this._http.get<any>(menuUrl).pipe(
          catchError(res => {
            resolve();
            return res;
          })
        ).subscribe(
          (res: any) => {
            const menu = res.data ? res.data.menu : res.menu;
            this._menu.recursMenuForTranslation(menu, ModelConsService.MENU);
            this._menu.set(menu);
          },
          () => {
            reject();
          },
          () => {
            resolve();
          }
        );
      });
    }
  }
}
