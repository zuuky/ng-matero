import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {MenuService} from '@core/bootstrap/menu.service';
import {Router} from '@angular/router';

@Component({
  selector: 'page-header',
  host: {
    class: 'matero-page-header',
  },
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class PageHeaderComponent implements OnInit {
  @Input() title = '';
  @Input() subtitle = '';
  @Input() nav: string[] = [];
  @Input() showBreadCrumb = true;

  constructor(private _router: Router, private _menu: MenuService) {
  }

  ngOnInit() {
    this.nav = Array.isArray(this.nav) ? this.nav : [];

    if (this.nav.length === 0) {
      this.genBreadcrumb();
    }

    this.title = this.title || this.nav[this.nav.length - 1];
  }

  genBreadcrumb() {
    const states = this._router.url.slice(1).split('/');
    this.nav = this._menu.getMenuLevel(states);
    this.nav.unshift('home');
  }
}
