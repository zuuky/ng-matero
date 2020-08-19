import { Direction, Directionality } from '@angular/cdk/bidi';
import { EventEmitter, Injectable, OnDestroy } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AppDirectionality implements Directionality, OnDestroy {
  readonly change = new EventEmitter<Direction>();

  private _value: Direction = 'ltr';

  get value(): Direction {
    return this._value;
  }

  set value(value: Direction) {
    this._value = value;
    this.change.next(value);
  }

  ngOnDestroy() {
    this.change.complete();
  }
}
