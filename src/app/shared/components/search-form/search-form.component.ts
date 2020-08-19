import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output, ViewChildren } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SelectTreeComponent } from '../select-tree/select-tree.component';
import { FormModel, JwindDateFormat } from '@core';
import { Platform } from '@angular/cdk/platform';
import { FormService } from '@shared/services/form.service';
import { MAT_DATETIME_FORMATS } from '@mat-datetimepicker/core';

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{
    provide: MAT_DATETIME_FORMATS, useValue: {
      parse: {
        dateInput: JwindDateFormat.date,
        monthInput: JwindDateFormat.month,
        datetimeInput: JwindDateFormat.datetime,
      },
      display: {
        dateInput: JwindDateFormat.date,
        monthInput: JwindDateFormat.month,
        datetimeInput: JwindDateFormat.datetime,
        popupHeaderDateLabel: JwindDateFormat.popupHeaderDateLabel,
      },
    },
  },
  ],
})
export class SearchFormComponent implements OnInit {


  reactiveForm: FormGroup;

  @ViewChildren(SelectTreeComponent)
  trees: SelectTreeComponent[];

  /* search begin */
  @Input()
  models: FormModel[];
  @Output()
  readonly searchFilterEvent: EventEmitter<any> = new EventEmitter<any>();
  @Output()
  readonly selectEvent: EventEmitter<any> = new EventEmitter<any>();
  @Output()
  readonly downloadEvent: EventEmitter<any> = new EventEmitter<any>();

  /* search end */

  constructor(private formBuilder: FormBuilder, public platform: Platform,
              public formService: FormService) {
  }

  ngOnInit(): void {
    this.models = this.models.filter(value => value.isSearch);
    this.reactiveForm = this.formService.formModelToFormGroup(this.models, this.formBuilder);
    this.searchFilterEvent.emit(this.reactiveForm.value);
  }

  reset() {
    this.reactiveForm.reset();
    if (this.trees) {
      this.trees.forEach(value => value.checklistSelection.clear());
    }
  }

}
