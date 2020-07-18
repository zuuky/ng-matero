import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DemoComponent} from './demo/demo.component';


const routes: Routes = [
  {path: 'demo', component: DemoComponent, data: {title: 'Admins Demo'}}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminsRoutingModule {
}
