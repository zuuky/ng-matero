import {
  AfterViewChecked,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Inject,
  OnInit,
  Output,
  ViewChildren,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SelectTreeComponent } from '../select-tree/select-tree.component';
import { FormModel, JwindDateFormat } from '@core';
import { Platform } from '@angular/cdk/platform';
import { MAT_DATETIME_FORMATS } from '@mat-datetimepicker/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormService } from '@shared/services/form.service';

@Component({
  selector: 'app-edit-form',
  templateUrl: './edit-form.component.html',
  styleUrls: ['./edit-form.component.scss'],
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
export class EditFormComponent implements OnInit, AfterViewChecked {

  reactiveForm: FormGroup;

  @ViewChildren(SelectTreeComponent)
  trees: SelectTreeComponent[];

  /* editOrCopyadd begin */
  models: FormModel[];

  @Output()
  readonly submitEvent: EventEmitter<any> = new EventEmitter<any>();

  constructor(private formBuilder: FormBuilder, public platform: Platform, private changeDetectorRef: ChangeDetectorRef,
              public dialogRef: MatDialogRef<EditFormComponent>, @Inject(MAT_DIALOG_DATA) public dialogData: any,
              public formService: FormService) {
    this.models = this.dialogData.formModel;
  }

  ngOnInit(): void {
    this.reactiveForm = this.formService.formModelToFormGroup(this.models, this.formBuilder, this.dialogData);
  }

  reset() {
    this.reactiveForm.reset();
    if (this.trees) {
      this.trees.forEach(value => value.checklistSelection.clear());
    }
  }

  ngAfterViewChecked(): void {
    this.changeDetectorRef.detectChanges();
  }

}
