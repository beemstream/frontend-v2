import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  ButtonModule,
  SharedUiModule,
  StreamCardModule,
} from '@frontend-v2/shared-ui';
import { FiltersModule } from '../filters/filters.module';
import { StreamFilterService } from '../stream-filter.service';
import { StreamQueryFilters } from './attribute-filters';
import { FilterStreamListComponent } from './filter-stream-list.component';

@NgModule({
  declarations: [FilterStreamListComponent],
  imports: [
    CommonModule,
    RouterModule,
    SharedUiModule,
    StreamCardModule,
    FiltersModule,
    ButtonModule,
  ],
  providers: [StreamFilterService, StreamQueryFilters],
  exports: [FilterStreamListComponent],
})
export class FilterStreamListModule {}
