import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnInit,
  Renderer2,
  ViewChildren,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { formModelToFormGroup } from '@shared/utils/utils';
import { Platform } from '@angular/cdk/platform';
import { MAT_DATETIME_FORMATS } from '@mat-datetimepicker/core';
import * as moment from 'moment';
import { FormModel, JwindDateFormat, ValidErrorRemark } from '@core/interface';
import { SelectTreeComponent } from '../select-tree/select-tree.component';

/**
 * The Json object for to-do list data.
 */
const TREE_DATA = {
  Groceries: {
    'Almond Meal flour': null,
    'Organic eggs': null,
    'Protein Powder': null,
    Fruits: {
      Apple: null,
      Berries: ['Blueberry', 'Raspberry'],
      Orange: null,
    },
  },
  Reminders: [
    'Cook dinner',
    'Read the Material Design spec',
    'Upgrade Application to Angular',
  ],
};

@Component({
  selector: 'admins-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.scss'],
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

export class DemoComponent implements OnInit, AfterViewInit {

  formModels: FormModel[] = [
    {
      name: 'username', cnname: 'input测试', type: 'input',
    },
    {
      name: 'email', cnname: 'textarea测试', type: 'textarea',
    },
    {
      name: 'selectMultiple',
      type: 'select',
      cnname: '下拉框多选测试', selectOptions: [{ key: 'aa', value: '1' }, { key: 'bb', value: '2' }],
      multiple: true,
    },
    {
      name: 'select',
      type: 'select',
      cnname: '下拉框测试', selectOptions: [{ key: 'aa', value: '1' }, { key: 'bb', value: '2' }],
    },
    {
      name: 'autocomplete',
      type: 'autocomplete',
      cnname: 'autocomplete测试',
      autocompleteOptions: ['aa', 'bb'],
    },
    {
      name: 'datetime', cnname: '日期测试', type: 'datetime', required: true, readonly: true,
    }, {
      name: 'treeMultiple',
      cnname: 'TreeMultiple测试',
      type: 'tree',
      readonly: true,
      required: true,
      multiple: true,
      treeOptions: TREE_DATA,
      treeSelectedOptions: ['Berries', 'Blueberry', 'Raspberry'],
    }, {
      name: 'tree', cnname: 'Tree测试', type: 'tree', required: true, readonly: true, treeOptions: TREE_DATA,
    }];

  reactiveForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private elref: ElementRef, private render: Renderer2,
              private cdr: ChangeDetectorRef, public platform: Platform) {
    this.reactiveForm = formModelToFormGroup(this.formModels, this.formBuilder);
  }

  @ViewChildren(SelectTreeComponent)
  trees: SelectTreeComponent[];

  ngOnInit() {
  }

  getErrorMessage(fieldName) {
    const errors = this.reactiveForm.get(fieldName).errors;
    for (const key in ValidErrorRemark) {
      if (key in errors) {
        // noinspection JSUnfilteredForInLoop
        return ValidErrorRemark[key];
      }
    }
  }

  buildTreeValue(item: FormModel, value: any) {
    if (!item.multiple) {
      item.overlayOpen = false;
    }
    this.reactiveForm.get(item.name).setValue(value);
    this.cdr.detectChanges();
  }

  dateFormatEvent(type, event) {
    event.toJSON = function() {
      return moment(this).format(JwindDateFormat[type]);
    };
  }

  submitSearch() {
    console.log(JSON.stringify(this.reactiveForm.value, (key, value) => {
      return value ? value : undefined;
    }));
  }

  reset() {
    this.reactiveForm.reset();
    this.trees.forEach(value => value.checklistSelection.clear());
  }

  submitDownload() {
    console.log(JSON.stringify(this.reactiveForm.value, (key, value) => {
      return value ? value : undefined;
    }));
  }

  ngAfterViewInit(): void {
    this.cdr.detectChanges();
  }


}
