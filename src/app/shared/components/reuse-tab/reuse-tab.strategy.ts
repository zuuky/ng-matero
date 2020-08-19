import { ActivatedRouteSnapshot, DetachedRouteHandle, RouteReuseStrategy } from '@angular/router';
import { ReuseTabService } from '@shared/services/reusetab.service';

export class ReuseTabStrategy implements RouteReuseStrategy {
  constructor(public srv: ReuseTabService) {
  }

  /** 表示对所有路由允许复用 如果你有路由不想利用可以在这加一些业务逻辑判断 */
  shouldDetach(route: ActivatedRouteSnapshot): boolean {
    return this.srv.shouldDetach(route);
  }

  store(route: ActivatedRouteSnapshot, handle: {}): void {
    this.srv.store(route, handle);
  }

  shouldAttach(route: ActivatedRouteSnapshot): boolean {
    return this.srv.shouldAttach(route);
  }

  retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle {
    return this.srv.retrieve(route);
  }

  /** 进入路由触发，判断是否同一路由 */
  shouldReuseRoute(future: ActivatedRouteSnapshot, curr: ActivatedRouteSnapshot): boolean {
    return this.srv.shouldReuseRoute(future, curr);
  }
}
