import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedUiModule, StreamCardModule } from '@frontend-v2/shared-ui';
import { FiltersModule } from '../filters/filters.module';
import { FilterStreamListComponent } from './filter-stream-list.component';

@NgModule({
  declarations: [FilterStreamListComponent],
  imports: [CommonModule, RouterModule, SharedUiModule, StreamCardModule, FiltersModule],
  exports: [FilterStreamListComponent],
})
export class FilterStreamListModule {}

