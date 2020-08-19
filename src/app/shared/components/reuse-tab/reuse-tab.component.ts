import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { combineLatest, Subscription } from 'rxjs';
import { ReuseTabService } from '@shared/services/reusetab.service';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { MenuService } from '@core';

@Component({
  selector: 'app-reuse-tab',
  templateUrl: './reuse-tab.component.html',
  styleUrls: ['./reuse-tab.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  preserveWhitespaces: false,
})
export class ReuseTabComponent implements OnInit, OnDestroy {

  constructor(public srv: ReuseTabService, public _menu: MenuService, private cd: ChangeDetectorRef, private router: Router) {
    const route$ = this.router.events.pipe(filter(event => event instanceof NavigationEnd));
    this.urlChangeSub$ = combineLatest([this.srv.tabChange, route$]).subscribe(res => {
      const { tabUrl } = res[0];
      const index = this.matTabs.findIndex(item => item === tabUrl);
      if (!this.matTabs.includes(tabUrl)) {
        this.matTabs.push(tabUrl);
      }
      if (index !== -1 && this.selectedTabIndex !== index) {
        this.selectedTabIndex = index;
      }
      this.cd.detectChanges();
    });
  }

  private urlChangeSub$: Subscription;
  matTabs: string[] = [];
  selectedTabIndex = 0;

  static eventProccess(event?: any) {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
  }

  ngOnInit(): void {
  }

  selectedIndexChange(index: number) {
    this.router.navigateByUrl(this.matTabs[index]).then();
  }

  close(index: number, event?: any) {
    ReuseTabComponent.eventProccess(event);
    this.matTabs.splice(index, 1);
    this.cd.detectChanges();
    return this.srv.deleteRouteSnapshot(new Array(this.matTabs[index]));
  }

  closeLeft(index: number, event?: any) {
    ReuseTabComponent.eventProccess(event);
    const closeMatTabs = this.matTabs.filter((_item, itemIndex) => index <= itemIndex);
    this.matTabs.splice(0, index);
    this.cd.detectChanges();
    return this.srv.deleteRouteSnapshot(closeMatTabs);
  }

  closeRight(index: number, event?: any) {
    ReuseTabComponent.eventProccess(event);
    const closeMatTabs = this.matTabs.filter((_item, itemIndex) => index < itemIndex);
    this.matTabs.splice(index + 1, closeMatTabs.length);
    this.cd.detectChanges();
    return this.srv.deleteRouteSnapshot(closeMatTabs);
  }

  closeOther(index: number, event?: any) {
    ReuseTabComponent.eventProccess(event);
    const closeMatTabs = this.matTabs.filter((_item, itemIndex) => index !== itemIndex);
    this.matTabs = this.matTabs.filter((_item, itemIndex) => index === itemIndex);
    this.cd.detectChanges();
    return this.srv.deleteRouteSnapshot(closeMatTabs);
  }

  closeAll(event?: any) {
    ReuseTabComponent.eventProccess(event);
    this.matTabs = [];
    this.cd.detectChanges();
    return this.srv.clear();
  }

  getTabName(tab: string) {
    const tablevels = this._menu.getMenuLevel(tab.slice(1).split('/'));
    return tablevels[tablevels.length - 1];
  }

  ngOnDestroy(): void {
    this.urlChangeSub$.unsubscribe();
  }

}
