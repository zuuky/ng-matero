import {Component, OnInit} from '@angular/core';
import {AsyncValidatorFn, FormBuilder, FormGroup, ValidatorFn} from '@angular/forms';
import {formModelToFormGroup} from '@shared/utils/utils';

export interface FormModel {
  name: string;
  type: 'input';
  required?: true | false;
  validators?: ValidatorFn | ValidatorFn[];
  asyncValidators?: AsyncValidatorFn | AsyncValidatorFn[];
  disabled?: true | false;
  readonly?: true | false;
}


@Component({
  selector: 'admins-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.scss']
})
export class DemoComponent implements OnInit {

  formModels: FormModel[] = [{name: 'username', type: 'input', required: true, readonly: true}, {
    name: 'email',
    type: 'input'
  },
    {name: 'username2', type: 'input', required: true}, {name: 'username1', type: 'input', required: true}];
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

  constructor(private formBuilder: FormBuilder) {
    this.reactiveForm = formModelToFormGroup(this.formModels, this.formBuilder);
  }

  getErrorMessage(form: FormGroup, fieldName) {
    const errors = form.get(fieldName).errors;
    for (const key in this.validKeyValues) {
      if (key in errors) {
        return this.validKeyValues[key];
      }
    }
  }

  ngOnInit() {
  }

}
