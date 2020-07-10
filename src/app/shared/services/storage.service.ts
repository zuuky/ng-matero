import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  static get(key: string) {
    return JSON.parse(localStorage.getItem(key) || '{}') || {};
  }

  static set(key: string, value: any): boolean {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  }

  static remove(key: string) {
    localStorage.removeItem(key);
  }

  static clear() {
    localStorage.clear();
  }
}
