import { Injectable } from '@angular/core';
import { FormModel, JwindDateFormat, ValidErrorRemark } from '@core';
import * as moment from 'moment';
import { FormBuilder, FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class FormService {
  constructor() {
  }

  getFormErrorMessage(reactiveForm: FormGroup, fieldName: string): string {
    const errors = reactiveForm.get(fieldName).errors;
    for (const key in ValidErrorRemark) {
      if (key in errors) {
        // noinspection JSUnfilteredForInLoop
        return ValidErrorRemark[key];
      }
    }
  }

  buildTreeValue(reactiveForm: FormGroup, item: FormModel, value: any) {
    if (!item.multiple) {
      item.overlayOpen = false;
    }
    reactiveForm.get(item.field).setValue(value);
    // this.cdr.detectChanges();
  }

  dateFormatEvent(type, event) {
    event.toJSON = function() {
      return moment(this).format(JwindDateFormat[type]);
    };
  }

  formModelToFormGroup(formModels: FormModel[], formBuilder: FormBuilder, data?: object): FormGroup {
    const group = {};
    for (const model of formModels) {
      const initValue = !!(data && data[model.field]);
      group[model.field] = model.disabled ? [{
        value: initValue ? data[model.field] : null, disabled: true,
      }, model.validators] : [{ value: initValue ? data[model.field] : null, disabled: false }, model.validators];
    }
    return formBuilder.group(group);
  }
}
