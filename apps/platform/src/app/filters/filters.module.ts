import { NgModule } from '@angular/core';
import { FiltersComponent } from './filters.component';
import { RouterModule } from '@angular/router';
import { ButtonModule } from '@frontend-v2/shared-ui';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [FiltersComponent],
  imports: [CommonModule, RouterModule, ButtonModule, FontAwesomeModule],
  exports: [FiltersComponent],
})
export class FiltersModule {}
