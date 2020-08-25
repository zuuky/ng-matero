import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Observable } from 'rxjs/internal/Observable';

export interface MenuTag {
  color: string; // Background Color
  value: string;
}

export interface MenuChildrenItem {
  route: string;
  name: string;
  type: 'link' | 'sub' | 'extLink' | 'extTabLink';
  children?: MenuChildrenItem[];
}

export interface Menu {
  route: string;
  name: string;
  type: 'link' | 'sub' | 'extLink' | 'extTabLink';
  icon: string;
  label?: MenuTag;
  badge?: MenuTag;
  children?: MenuChildrenItem[];
}

@Injectable({
  providedIn: 'root',
})
export class MenuService {
  private _menu$: BehaviorSubject<Menu[]> = new BehaviorSubject<Menu[]>([]);

  menuTempArr: Set<string> = new Set<string>();

  getAll(): Observable<Menu[]> {
    return this._menu$.asObservable();
  }

  set(menu: Menu[]): Observable<Menu[]> {
    this._menu$.next(menu);
    return this._menu$.asObservable();
  }

  add(menu: Menu) {
    const tmpMenu = this._menu$.value;
    tmpMenu.push(menu);
    this._menu$.next(tmpMenu);
  }

  reset() {
    this._menu$.next([]);
  }

  getMenuItemName(routeArr: string[]): string {
    return this.getMenuLevel(routeArr)[routeArr.length - 1];
  }

  private getMenuLevelLoop(menus: MenuChildrenItem[], route: string): Set<string> {
    menus.forEach(item => {
      if (item.route === route) {
        this.menuTempArr.add(item.name);
      } else if (item.children && item.children.length) {
        this.getMenuLevelLoop(item.children, route);
      }
    });
    return this.menuTempArr;
  }

  getMenuLevel(routeArr: string[]): string[] {
    this.menuTempArr.clear();
    this._menu$.value.forEach(item => {
      routeArr.forEach(value => {
        if (item.route === value) {
          this.menuTempArr.add(item.name);
        } else if (item.children && item.children.length) {
          this.getMenuLevelLoop(item.children, value);
        }
      });
    });
    return [...this.menuTempArr];
  }

  getMenuLevelBak(routeArr: string[]): string[] {
    const tmpArr = [];
    this._menu$.value.forEach(item => {
      if (item.route === routeArr[0]) {
        tmpArr.push(item.name);
        // Level1
        if (item.children && item.children.length) {
          item.children.forEach(itemlvl1 => {
            if (routeArr[1] && itemlvl1.route === routeArr[1]) {
              tmpArr.push(itemlvl1.name);
              // Level2
              if (itemlvl1.children && itemlvl1.children.length) {
                itemlvl1.children.forEach(itemlvl2 => {
                  if (routeArr[2] && itemlvl2.route === routeArr[2]) {
                    tmpArr.push(itemlvl2.name);
                  }
                });
              }
            } else if (routeArr[1]) {
              // Level2
              if (itemlvl1.children && itemlvl1.children.length) {
                itemlvl1.children.forEach(itemlvl2 => {
                  if (itemlvl2.route === routeArr[1]) {
                    tmpArr.push(itemlvl1.name, itemlvl2.name);
                  }
                });
              }
            }
          });
        }
      }
    });
    console.log(tmpArr);
    return tmpArr;
  }

  recursMenuForTranslation(menu: Menu[] | MenuChildrenItem[], namespace: string) {
    menu.forEach(menuItem => {
      menuItem.name = `${namespace}.${menuItem.name}`;
      if (menuItem.children && menuItem.children.length > 0) {
        this.recursMenuForTranslation(menuItem.children, menuItem.name);
      }
    });
  }
}
