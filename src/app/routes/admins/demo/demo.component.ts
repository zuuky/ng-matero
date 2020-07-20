import {Component, OnInit} from '@angular/core';
import {AsyncValidatorFn, FormBuilder, FormGroup, ValidatorFn} from '@angular/forms';
import {formModelToFormGroup} from '@shared/utils/utils';
import {Platform} from '@angular/cdk/platform';

export interface FormModel {
  name: string;
  cnname: string;
  type?: 'input' | 'textarea' | 'datetime' | 'date';
  required?: true | false;
  validators?: ValidatorFn | ValidatorFn[];
  asyncValidators?: AsyncValidatorFn | AsyncValidatorFn[];
  disabled?: true | false;
  readonly?: true | false;
  selectOptions?: SelectOptions[];
}

export interface SelectOptions {
  key: string;
  value: string;
}

@Component({
  selector: 'admins-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.scss']
})
export class DemoComponent implements OnInit {

  formModels: FormModel[] = [
    {
      name: 'username', cnname: '用户名', type: 'input', required: true, readonly: true
    },
    {
      name: 'email', cnname: '用户名', type: 'textarea'
    },
    {
      name: 'username2', cnname: '用户名', selectOptions: [{key: '1', value: 'aa'}], required: true
    },
    {
      name: 'username1', cnname: '用户名', type: 'datetime', required: true
    }];
  reactiveForm: FormGroup;
  validKeyValues = {
    email: 'validation.email.wrong-format',
    required: 'validation.goal.required',
    duplicate: 'validation.goal.duplicate',
    unduplicate: 'validation.goal.unduplicate',
    minlength: 'validation.goal.minlength',
    maxlength: 'validation.goal.maxlength',
    min: 'validation.goal.minlength',
    max: 'validation.goal.maxlength',
    pattern: 'validation.goal.pattern',
    mobile: 'validation.phone-number.wrong-format',
  };

  constructor(private formBuilder: FormBuilder, private platform: Platform) {
    this.reactiveForm = formModelToFormGroup(this.formModels, this.formBuilder);
  }

  getErrorMessage(fieldName) {
    const errors = this.reactiveForm.get(fieldName).errors;
    for (const key in this.validKeyValues) {
      if (key in errors) {
        return this.validKeyValues[key];
      }
    }
  }

  ngOnInit() {
  }

}
