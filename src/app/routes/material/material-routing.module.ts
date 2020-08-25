import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CardComponent } from './card/card.component';
import { DividerComponent } from './divider/divider.component';
import { ExpansionPanelComponent } from './expansion-panel/expansion-panel.component';
import { GridListComponent } from './grid-list/grid-list.component';
import { ListComponent } from './list/list.component';
import { StepperComponent } from './stepper/stepper.component';
import { TabComponent } from './tab/tab.component';
import { TABS_DEMO_ROUTES } from './tab/routes';
import { TreeComponent } from './tree/tree.component';
import { MenuComponent } from './menu/menu.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { SidenavBasicComponent } from './sidenav/basic-sidenav';
import { SidenavDualComponent } from './sidenav/dual-sidenav';
import { SidenavMobileComponent } from './sidenav/mobile-sidenav';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { AutocompleteComponent } from './autocomplete/autocomplete.component';
import { CheckboxComponent } from './checkbox/checkbox.component';
import { DatepickerComponent } from './datepicker/datepicker.component';
import { FormFieldComponent } from './form-field/form-field.component';
import { InputComponent } from './input/input.component';
import { RadioButtonComponent } from './radio-button/radio-button.component';
import { SelectComponent } from './select/select.component';
import { SliderComponent } from './slider/slider.component';
import { SlideToggleComponent } from './slide-toggle/slide-toggle.component';
import { ButtonComponent } from './button/button.component';
import { ButtonToggleComponent } from './button-toggle/button-toggle.component';
import { BadgeComponent } from './badge/badge.component';
import { ChipsComponent } from './chips/chips.component';
import { IconComponent } from './icon/icon.component';
import { ProgressSpinnerComponent } from './progress-spinner/progress-spinner.component';
import { ProgressBarComponent } from './progress-bar/progress-bar.component';
import { RippleComponent } from './ripple/ripple.component';
import { BottomSheetComponent } from './bottom-sheet/bottom-sheet.component';
import { DialogComponent } from './dialog/dialog.component';
import { SnackBarComponent } from './snack-bar/snack-bar.component';
import { TooltipComponent } from './tooltip/tooltip.component';
import { PaginatorComponent } from './paginator/paginator.component';
import { SortComponent } from './sort/sort.component';
import { TableComponent } from './table/table.component';

const routes: Routes = [
  { path: 'controls/autocomplete', component: AutocompleteComponent, data: { title: 'Autocomplete' } },
  { path: 'controls/checkbox', component: CheckboxComponent, data: { title: 'Checkbox' } },
  { path: 'controls/datepicker', component: DatepickerComponent, data: { title: 'Datepicker' } },
  { path: 'controls/form-field', component: FormFieldComponent, data: { title: 'Form Field' } },
  { path: 'controls/input', component: InputComponent, data: { title: 'Input' } },
  { path: 'controls/radio', component: RadioButtonComponent, data: { title: 'Radio' } },
  { path: 'controls/select', component: SelectComponent, data: { title: 'Select' } },
  { path: 'controls/slider', component: SliderComponent, data: { title: 'Slider' } },
  { path: 'controls/slide-toggle', component: SlideToggleComponent, data: { title: 'Slide Toggle' } },
  // layout
  { path: 'layout/card', component: CardComponent, data: { title: 'Card' } },
  { path: 'layout/divider', component: DividerComponent, data: { title: 'Divider' } },
  { path: 'layout/expansion', component: ExpansionPanelComponent, data: { title: 'Expansion Panel' } },
  { path: 'layout/grid-list', component: GridListComponent, data: { title: 'Grid' } },
  { path: 'layout/list', component: ListComponent, data: { title: 'List' } },
  { path: 'layout/stepper', component: StepperComponent, data: { title: 'Stepper' } },
  { path: 'layout/tab', component: TabComponent, children: TABS_DEMO_ROUTES, data: { title: 'Tab' } },
  { path: 'layout/tree', component: TreeComponent, data: { title: 'Tree' } },
  // navigation
  { path: 'navigation/menu/level4', component: MenuComponent, data: { title: 'Menu' } },
  { path: 'navigation/sidenav', component: SidenavComponent, data: { title: 'Sidenav' } },
  { path: 'navigation/sidenav/basic', component: SidenavBasicComponent, data: { fullscreen: true } },
  { path: 'navigation/sidenav/dual', component: SidenavDualComponent, data: { fullscreen: true } },
  { path: 'navigation/sidenav/mobile', component: SidenavMobileComponent, data: { fullscreen: true } },
  { path: 'navigation/toolbar', component: ToolbarComponent, data: { title: 'Toolbar' } },
  // buttons
  { path: 'buttons/button', component: ButtonComponent, data: { title: 'Button' } },
  { path: 'buttons/button-toggle', component: ButtonToggleComponent, data: { title: 'Button Toggle' } },
  { path: 'buttons/badge', component: BadgeComponent, data: { title: 'Badge' } },
  { path: 'buttons/chips', component: ChipsComponent, data: { title: 'Chips' } },
  { path: 'buttons/icon', component: IconComponent, data: { title: 'Icon' } },
  {
    path: 'buttons/progress-spinner',
    component: ProgressSpinnerComponent,
    data: { title: 'Progress Spinner' },
  },
  { path: 'buttons/progress-bar', component: ProgressBarComponent, data: { title: 'Progress Bar' } },
  { path: 'buttons/ripple', component: RippleComponent, data: { title: 'Ripple' } },
  // popups
  { path: 'popups/bottom-sheet', component: BottomSheetComponent, data: { title: 'Button Sheet' } },
  { path: 'popups/dialog', component: DialogComponent, data: { title: 'Dialog' } },
  { path: 'popups/snack-bar', component: SnackBarComponent, data: { title: 'Snack Bar' } },
  { path: 'popups/tooltip', component: TooltipComponent, data: { title: 'Tooltip' } },
  // tables
  { path: 'tables/paginator', component: PaginatorComponent, data: { title: 'Paginator' } },
  { path: 'tables/sort', component: SortComponent, data: { title: 'Sort' } },
  { path: 'tables/table', component: TableComponent, data: { title: 'Table' } },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MaterialRoutingModule {
}
