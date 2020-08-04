import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminsRoutingModule } from './admins-routing.module';
import { DemoComponent } from './demo/demo.component';
import { SharedModule } from '@shared/shared.module';
import { SelectTreeComponent } from './select-tree/select-tree.component';


@NgModule({
  declarations: [DemoComponent, SelectTreeComponent],
  imports: [
    CommonModule,
    AdminsRoutingModule,
    SharedModule,
  ],
})
export class AdminsModule {
}
