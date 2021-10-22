import { NgModule } from '@angular/core';
import { FiltersComponent } from './filters.component';
import { RouterModule } from '@angular/router';
import {
  ButtonModule,
  IconModule,
  ToggleFilterModule,
  DropdownModule,
  DropdownFilterSelectModule,
} from '@frontend-v2/shared-ui';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CommonModule } from '@angular/common';
import { LayoutDefaultIconComponent } from './layout-default-icon/layout-default-icon.component';
import { LayoutTextOnlyIconComponent } from './layout-text-only-icon/layout-text-only-icon.component';
import { CodeIconComponent } from './code-icon/code-icon.component';
import { DropdownCodeLangSelectComponent } from './dropdown-code-lang-select/dropdown-code-lang-select.component';
import { DropdownLangSelectComponent } from './dropdown-lang-select/dropdown-lang-select.component';
import { DropdownCategoryFilterComponent } from './dropdown-category-filter/dropdown-category-filter.component';

@NgModule({
  declarations: [
    FiltersComponent,
    DropdownCategoryFilterComponent,
    DropdownCodeLangSelectComponent,
    DropdownLangSelectComponent,
    CodeIconComponent,
    LayoutDefaultIconComponent,
    LayoutTextOnlyIconComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    ButtonModule,
    FontAwesomeModule,
    IconModule,
    ToggleFilterModule,
    DropdownModule,
    DropdownFilterSelectModule,
  ],
  exports: [FiltersComponent],
})
export class FiltersModule {}
