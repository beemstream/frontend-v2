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

@NgModule({
  declarations: [
    FiltersComponent,
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
