import { ChangeDetectionStrategy, Component, HostBinding } from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';

@Component({
  selector: 'app-context-menu',
  template: '<ng-content></ng-content>',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContextMenuComponent extends MatMenuTrigger {

  @HostBinding('style.position') public position = 'fixed';

  @HostBinding('style.pointer-events') public events = 'none';

  @HostBinding('style.left') public x: string;

  @HostBinding('style.top') public y: string;

  // Intercepts the global context menu event
  // @HostListener('document:contextmenu', ['$event'])
  public open({ x, y }: MouseEvent, data?: any, allowContextMenu = true) {
    if (!allowContextMenu) return false;
    // Pass along the context data to support lazily-rendered content
    if (data) {
      this.menuData = data;
    }
    // Adjust the menu anchor position
    this.x = `${x}px`;
    this.y = `${y}px`;
    // Opens the menu
    this.openMenu();
    // prevents default
    return false;
  }
}
