import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-table-kitchen-sink-edit',
  templateUrl: './edit.component.html',
})
export class TablesKitchenSinkEditComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<TablesKitchenSinkEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
  }

  ngOnInit() {
  }

  onClose(): void {
    this.dialogRef.close();
  }
}
