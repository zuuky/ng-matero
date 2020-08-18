import {
  AfterViewChecked,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  TemplateRef,
} from '@angular/core';
import { MtxDialog, MtxGridColumn, MtxGridColumnButton } from '@ng-matero/extensions';
import { EditFormComponent } from '../edit-form/edit-form.component';
import { FormModel } from '@core';

@Component({
  selector: 'app-mtx-grid',
  templateUrl: './mtx-grid.component.html',
  styleUrls: ['./mtx-grid.component.scss'],
})
export class MtxGridComponent implements OnInit, AfterViewChecked {

  /* mtx-grid begin*/
  @Input()
  cellTemplateMappings: { [key: string]: any };
  @Input()
  summaryCellTemplateMappings: { [key: string]: any };
  @Input()
  expansionTemplate: TemplateRef<any>;
  @Input()
  toolbarTemplate: TemplateRef<any>;
  @Input()
  columns: FormModel[];
  @Input()
  buttons: MtxGridColumnButton[];
  @Input()
  showPaginator = true;
  @Input()
  datas = [];
  @Input()
  total = 0;
  @Input()
  isLoading = true;
  @Input()
  pageSizeOptions = [10, 20, 50, 100];
  @Output()
  readonly expansionEvent: EventEmitter<any> = new EventEmitter<any>();
  @Output()
  readonly cellSelectionEvent: EventEmitter<any> = new EventEmitter<any>();
  @Output()
  readonly delEvent: EventEmitter<any> = new EventEmitter<any>();
  @Output()
  readonly editOrCopyAddEvent: EventEmitter<any> = new EventEmitter<any>();
  @Output()
  readonly pageEvent: EventEmitter<any> = new EventEmitter<any>();

  defaultButtonColumns: MtxGridColumn = {
    header: 'Operation',
    field: 'operation',
    width: '160px',
    pinned: 'right',
    right: '0px',
    type: 'button',
    buttons: [
      {
        type: 'icon',
        text: 'copy',
        icon: 'file_copy',
        tooltip: 'copy',
        click: (data: any) => {
          this.editOrCopyAdd(data);
        },
      },
      {
        type: 'icon',
        text: 'edit',
        icon: 'edit',
        tooltip: 'Edit',
        click: (data: any) => {
          this.editOrCopyAdd(data);
        },
      },
      {
        type: 'icon',
        text: 'delete',
        icon: 'delete',
        tooltip: 'Delete',
        color: 'warn',
        pop: true,
        popTitle: 'Confirm delete?',
        click: (data: any) => {
          this.delEvent.emit(data);
        },
      },
    ],
  };

  constructor(private mtxDialog: MtxDialog, private changeDetectorRef: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    if (this.buttons) {
      this.defaultButtonColumns.buttons.concat(this.buttons);
    }
    this.columns = [...this.columns, this.defaultButtonColumns];
    this.columns[0].pinned = 'left';
    if (this.expansionTemplate) {
      this.columns[0].showExpand = true;
    }
  }

  editOrCopyAdd($event: any) {
    $event.formModel = this.columns;
    const dialogRef = this.mtxDialog.originalOpen(EditFormComponent, {
      data: $event,
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.editOrCopyAddEvent.emit(result);
      }
    });
  }

  trackByIdMtxGrid(index) {
    return index;
  }

  ngAfterViewChecked(): void {
    this.changeDetectorRef.detectChanges();
  }

}
