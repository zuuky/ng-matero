import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output,} from '@angular/core';
import * as screenfull from 'screenfull';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements OnInit {
  @Input() showToggle = true;
  @Input() showBranding = false;

  @Output() toggleSidenav = new EventEmitter<void>();
  @Output() toggleSidenavNotice = new EventEmitter<void>();

  constructor() {
  }

  private get screenfull(): screenfull.Screenfull {
    return screenfull as screenfull.Screenfull;
  }

  ngOnInit() {
  }

  // TODO:
  toggleFullscreen() {
    if (this.screenfull.enabled) {
      this.screenfull.toggle();
    }
  }
}
