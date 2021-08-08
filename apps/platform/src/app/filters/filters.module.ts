import { NgModule } from '@angular/core';
import { FiltersComponent } from './filters.component';
import { RouterModule } from '@angular/router';
import {
  ButtonModule,
  IconModule,
  ToggleFilterModule,
} from '@frontend-v2/shared-ui';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CommonModule } from '@angular/common';
import { LayoutDefaultIconComponent } from '../layout-default-icon/layout-default-icon.component';
import { LayoutTextOnlyIconComponent } from '../layout-text-only-icon/layout-text-only-icon.component';
import { DropdownFilterComponent } from '../dropdown-filter/dropdown-filter.component';
import { DropdownFilterSelectComponent } from '../dropdown-filter-select/dropdown-filter-select.component';
import { DropdownOptionComponent } from '../dropdown-option/dropdown-option.component';
import { CodeIconComponent } from '../code-icon/code-icon.component';
import { DropdownComponent } from '../dropdown/dropdown.component';
import { DropdownCodeLangSelectComponent } from '../dropdown-code-lang-select/dropdown-code-lang-select.component';
import { DropdownLangSelectComponent } from '../dropdown-lang-select/dropdown-lang-select.component';

@NgModule({
  declarations: [
    FiltersComponent,
    DropdownComponent,
    DropdownFilterComponent,
    DropdownFilterSelectComponent,
    DropdownOptionComponent,
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
  ],
  exports: [FiltersComponent],
})
export class FiltersModule {}
