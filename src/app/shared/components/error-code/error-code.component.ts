import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'error-code',
  templateUrl: './error-code.component.html',
  styleUrls: ['./error-code.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ErrorCodeComponent implements OnInit {
  @Input() code = '';
  @Input() title = '';
  @Input() message = '';

  constructor() {
  }

  ngOnInit() {
  }
}
