import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {FormsElementsComponent} from './elements/elements.component';
import {FormsSelectComponent} from './select/select.component';
import {FormsDynamicComponent} from './dynamic/dynamic.component';

const routes: Routes = [
  {path: 'elements', component: FormsElementsComponent, data: {title: 'Form Elements'}},
  {path: 'dynamic', component: FormsDynamicComponent, data: {title: 'Dynamic Form'}},
  {path: 'select', component: FormsSelectComponent, data: {title: 'Select'}},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FormsRoutingModule {
}
