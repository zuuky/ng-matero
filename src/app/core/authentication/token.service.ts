import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { share } from 'rxjs/operators';

import { LocalStorageService } from '@shared/services/storage.service';
import { AuthReferrer, TokenModel } from './interface';
import { ModelConsService } from '@shared/services/modelcons.service';

@Injectable({
  providedIn: 'root',
})
export class TokenService {

  private _change$ = new BehaviorSubject(null);

  constructor() {
  }

  private _referrer: AuthReferrer = {};

  /**
   * The referrer of current page
   */
  get referrer() {
    return this._referrer;
  }

  static get<T extends TokenModel>(type?: new () => T): T {
    const data = LocalStorageService.get(ModelConsService.TOKEN_KEY);
    return type ? (Object.assign(new type(), data) as T) : (data as T);
  }

  static clear() {
    LocalStorageService.remove(ModelConsService.TOKEN_KEY);
  }

  set(data: TokenModel): boolean {
    this._change$.next(data);
    return LocalStorageService.set(ModelConsService.TOKEN_KEY, data);
  }

  change(): Observable<TokenModel | null> {
    return this._change$.pipe(share());
  }
}
