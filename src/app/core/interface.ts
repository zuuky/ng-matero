import { AsyncValidatorFn, ValidatorFn } from '@angular/forms';
import { MtxGridColumn } from '@ng-matero/extensions';

export declare type FieldType =
  'input'
  | 'textarea'
  | 'select'
  | 'tree'
  | 'autocomplete'
  | 'datetime'
  | 'date'
  | 'month';

export interface FormModel extends MtxGridColumn {
  fieldType?: FieldType;
  autocomplete?: true | false;
  autocompleteOptions?: string[];
  selectOptions?: SelectOptions[];
  multiple?: true | false;
  required?: true | false;
  disabled?: true | false;
  readonly?: true | false;
  overlayOpen?: true | false;
  validators?: ValidatorFn | ValidatorFn[];
  asyncValidators?: AsyncValidatorFn | AsyncValidatorFn[];
  treeOptions?: { [key: string]: {} };
  treeSelectedOptions?: string[];
  isSearch?: true | false;
  searchInitDatasCallback?: (response) => void;
}

export class AutocompleteFormModel implements FormModel {
  constructor(header: string, field: string) {
    this.header = header;
    this.field = field;
  }

  header: string;
  field: string;
  fieldType: FieldType = 'autocomplete';
  autocomplete = true;
  multiple = false;
  resizable = true;
  readonly = true;
  autocompleteOptions?: string[];
}


export class MonthFormModel implements FormModel {
  constructor(header: string, field: string) {
    this.header = header;
    this.field = field;
  }

  header: string;
  field: string;
  fieldType: FieldType = 'month';
  multiple = false;
  resizable = true;
  readonly = true;
}

export class DateFormModel extends MonthFormModel {
  fieldType: FieldType = 'date';
}

export class DatetimeFormModel extends MonthFormModel {
  fieldType: FieldType = 'datetime';
}

export class TreeFormModel implements FormModel {
  constructor(header: string, field: string) {
    this.header = header;
    this.field = field;
  }

  header: string;
  field: string;
  fieldType: FieldType = 'tree';
  multiple = false;
  resizable = true;
  treeOptions?: { [key: string]: {} };
  treeSelectedOptions?: string[];
  readonly = true;
  overlayOpen = false;
}

export class MultipTreeFormModel extends TreeFormModel {
  multiple = true;
}


export class SelectFormModel implements FormModel {
  constructor(header: string, field: string) {
    this.header = header;
    this.field = field;
  }

  header: string;
  field: string;
  fieldType: FieldType = 'select';
  multiple = false;
  resizable = true;
  selectOptions: SelectOptions[];
  readonly = true;
}

export class MultipleSelectFormModel extends SelectFormModel {
  multiple = true;
}

export class InputFormModel implements FormModel {
  constructor(header: string, field: string) {
    this.header = header;
    this.field = field;
  }

  header: string;
  field: string;
  fieldType: FieldType = 'input';
  multiple = false;
  resizable = true;
}

export class TextareaFormModel extends InputFormModel {
  fieldType: FieldType = 'textarea';
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
