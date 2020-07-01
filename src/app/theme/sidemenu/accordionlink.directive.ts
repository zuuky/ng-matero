import {Directive, HostBinding, Inject, Input, OnDestroy, OnInit} from '@angular/core';

import {AccordionDirective} from './accordion.directive';

@Directive({
  selector: '[navAccordionLink]',
})
export class AccordionLinkDirective implements OnInit, OnDestroy {
  @Input() public group: any;
  protected OPEN = false;
  protected nav: AccordionDirective;

  constructor(@Inject(AccordionDirective) nav: AccordionDirective) {
    this.nav = nav;
  }

  @HostBinding('class.open')
  @Input()
  get open(): boolean {
    return this.OPEN;
  }

  set open(value: boolean) {
    this.OPEN = value;
    if (value) {
      this.nav.closeOtherLinks(this);
    }
  }

  ngOnInit(): any {
    this.nav.addLink(this);
  }

  ngOnDestroy(): any {
    this.nav.removeGroup(this);
  }

  toggle(): any {
    this.open = !this.open;
  }
}
