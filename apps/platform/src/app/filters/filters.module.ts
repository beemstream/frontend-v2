import { NgModule } from '@angular/core';
import { FiltersComponent } from './filters.component';
import { RouterModule } from '@angular/router';
import { ButtonModule } from '@frontend-v2/shared-ui';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [FiltersComponent],
  imports: [RouterModule, ButtonModule, FontAwesomeModule],
  exports: [FiltersComponent],
})
export class FiltersModule {}

