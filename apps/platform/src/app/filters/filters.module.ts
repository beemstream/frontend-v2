import { NgModule } from '@angular/core';
import { FiltersComponent } from './filters.component';
import { RouterModule } from '@angular/router';
import { ButtonModule, IconModule } from '@frontend-v2/shared-ui';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [FiltersComponent],
  imports: [
    CommonModule,
    RouterModule,
    ButtonModule,
    FontAwesomeModule,
    IconModule,
  ],
  exports: [FiltersComponent],
})
export class FiltersModule {}
