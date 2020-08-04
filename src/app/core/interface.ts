import { AsyncValidatorFn, ValidatorFn } from '@angular/forms';

export interface FormModel {
  name: string;
  cnname: string;
  type?: 'input' | 'textarea' | 'select' | 'tree' | 'autocomplete' | 'datetime' | 'date' | 'month';
  autocomplete?: true | false;
  autocompleteOptions?: string[];
  selectOptions?: SelectOptions[];
  treeOptions?: { [key: string]: {} };
  treeSelectedOptions?: string[];
  multiple?: true | false;
  required?: true | false;
  disabled?: true | false;
  readonly?: true | false;
  overlayOpen?: true | false;
  validators?: ValidatorFn | ValidatorFn[];
  asyncValidators?: AsyncValidatorFn | AsyncValidatorFn[];
}

export interface SelectOptions {
  key: string;
  value: string;
}


export class TodoItemNode {
  children: TodoItemNode[];
  item: string;
}

export class TodoItemFlatNode {
  item: string;
  level: number;
  expandable: boolean;
}

export class JwindDateFormat {
  public static readonly datetime = 'YYYY-MM-DD HH:mm:ss';
  public static readonly date = 'YYYY-MM-DD';
  public static readonly month = 'YYYY-MM';
  public static readonly popupHeaderDateLabel = 'dddd';
}

export class ValidErrorRemark {
  public static readonly email: 'validation.email.wrong-format';
  public static readonly required: 'validation.goal.required';
  public static readonly duplicate: 'validation.goal.duplicate';
  public static readonly unduplicate: 'validation.goal.unduplicate';
  public static readonly minlength: 'validation.goal.minlength';
  public static readonly maxlength: 'validation.goal.maxlength';
  public static readonly min: 'validation.goal.minlength';
  public static readonly max: 'validation.goal.maxlength';
  public static readonly pattern: 'validation.goal.pattern';
  public static readonly mobile: 'validation.phone-number.wrong-format';
}
