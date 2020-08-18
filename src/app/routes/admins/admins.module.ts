import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminsRoutingModule } from './admins-routing.module';
import { DemoComponent } from './demo/demo.component';
import { SharedModule } from '@shared/shared.module';
import { SelectTreeComponent } from './select-tree/select-tree.component';
import { MtxGridComponent } from './mtx-grid/mtx-grid.component';
import { SearchFormComponent } from './search-form/search-form.component';
import { EditFormComponent } from './edit-form/edit-form.component';


@NgModule({
  declarations: [DemoComponent, SelectTreeComponent,
    MtxGridComponent, SearchFormComponent, EditFormComponent],
  imports: [
    CommonModule,
    AdminsRoutingModule,
    SharedModule,
  ],
})
export class AdminsModule {
}
