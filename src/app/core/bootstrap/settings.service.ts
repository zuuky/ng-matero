import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {AppSettings, defaults} from '../settings';
import {LocalStorageService} from '@shared/services/storage.service';
import {ModelConsService} from '@shared/services/modelcons.service';

export interface User {
  id?: number;
  name: string;
  avatar?: string;
}

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  private _options = defaults;
  private _notify$ = new BehaviorSubject<any>({});

  constructor() {
  }

  get notify(): Observable<any> {
    return this._notify$.asObservable();
  }

  static setUser(value: User) {
    LocalStorageService.set(ModelConsService.USER_KEY, value);
  }

  static removeUser() {
    LocalStorageService.remove(ModelConsService.USER_KEY);
  }

  setLayout(options?: AppSettings): AppSettings {
    this._options = Object.assign(defaults, options);
    return this._options;
  }

  setNavState(type: string, value: boolean) {
    this._notify$.next({type, value} as any);
  }

  getOptions(): AppSettings {
    return this._options;
  }

  setLanguage(lang: string) {
    this._options.language = lang;
    this._notify$.next({lang});
  }
}
