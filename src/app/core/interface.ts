import { AsyncValidatorFn, ValidatorFn } from '@angular/forms';
import { MtxGridColumn } from '@ng-matero/extensions';

export interface FormModel extends MtxGridColumn {
  fieldType?: 'input' | 'textarea' | 'select' | 'tree' | 'autocomplete' | 'datetime' | 'date' | 'month';
  autocomplete?: true | false;
  autocompleteOptions?: string[];
  selectOptions?: SelectOptions[];
  multiple?: true | false;
  required?: true | false;
  disabled?: true | false;
  readonly?: true | false;
  validators?: ValidatorFn | ValidatorFn[];
  asyncValidators?: AsyncValidatorFn | AsyncValidatorFn[];
  overlayOpen?: true | false;
  treeOptions?: { [key: string]: {} };
  treeSelectedOptions?: string[];
  isSearch?: true | false;
  searchInitDatasCallback?: (response) => void;
}

export interface SelectOptions {
  key: string;
  value: string;
}

export interface ActionOptions {
  selectCallback?: any;
  unSelectCallback?: any;
  delUrl?: string;
  editUrl?: string;
  addUrl?: string;
  selectUrl?: string;
  primaryFieldAlias?: string;
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
