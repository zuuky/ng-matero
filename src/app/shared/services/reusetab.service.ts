/* tslint:disable:no-string-literal */
import { Injectable, OnDestroy } from '@angular/core';
import { ActivatedRouteSnapshot, DetachedRouteHandle } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

/**
 * 路由复用类，提供复用所需要一些基本接口
 *
 * **注：** 所有缓存数据来源于路由离开后才会产生
 */
@Injectable({ providedIn: 'root' })
export class ReuseTabService implements OnDestroy {

  get tabChange(): Observable<any> {
    return this.handlersChange.asObservable();
  }

  private handlers: { [key: string]: DetachedRouteHandle } = {};

  private waitDelete: string;

  private handlersChange: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  private static getRouteUrl(route: ActivatedRouteSnapshot): string {
    return route['_routerState'].url;
  }

  private static canReuse(route: ActivatedRouteSnapshot): boolean {
    return !!(route.routeConfig && !route.routeConfig.loadChildren && !route.routeConfig.children);
  }

  static doHooks(hookMethod: string, compent: any) {
    if (compent.instance && typeof compent.instance[hookMethod] === 'function') compent.instance[hookMethod]();
  }

  shouldReuseRoute(future: ActivatedRouteSnapshot, curr: ActivatedRouteSnapshot): boolean {
    return future.routeConfig === curr.routeConfig && JSON.stringify(future.params) === JSON.stringify(curr.params);
  }

  /** 当路由离开时会触发。按path作为key存储路由快照&组件当前实例对象 */
  store(route: ActivatedRouteSnapshot, handle: DetachedRouteHandle): void {
    const url = ReuseTabService.getRouteUrl(route);
    if (this.waitDelete && this.waitDelete === url) {
      // 如果待删除是当前路由则不存储快照
      this.waitDelete = null;
      return;
    }
    this.handlers[url] = handle;
    // 执行 reuseOnDestroy  可自行定义执行条件
    if (handle && handle['componentRef']) {
      ReuseTabService.doHooks('reuseOnDestroy', handle['componentRef']);
    }
  }

  shouldDetach(route: ActivatedRouteSnapshot): boolean {
    return ReuseTabService.canReuse(route);
  }

  /* 若 path 在缓存中有的都认为允许还原路由 */
  shouldAttach(route: ActivatedRouteSnapshot): boolean {
    if (ReuseTabService.canReuse(route)) {
      const hand = this.handlers[ReuseTabService.getRouteUrl(route)];
      // 执行 reuseOnInit  可自行定义执行条件
      if (hand && hand['componentRef']) {
        ReuseTabService.doHooks('reuseOnInit', hand['componentRef']);
      }
      return !!hand;
    }
    return false;
  }

  /* 从缓存中获取快照，若无则返回nul */
  retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle {
    if (ReuseTabService.canReuse(route)) {
      const url = ReuseTabService.getRouteUrl(route);
      this.handlersChange.next({ tabUrl: url });
      return this.handlers[url];
    }
    return null;
  }

  /* 清除路由缓存 */
  public deleteRouteSnapshot(urls: string[]): void {
    urls.forEach(url => {
      if (this.handlers[url]) {
        delete this.handlers[url];
      } else {
        this.waitDelete = url;
      }
    });
  }

  /* 清除路由缓存 */
  public clear(): void {
    this.handlers = {};
  }

  ngOnDestroy(): void {
    this.handlersChange.unsubscribe();
  }
}
