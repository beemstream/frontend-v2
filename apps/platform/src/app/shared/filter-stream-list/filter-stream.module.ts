import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  ButtonModule,
  ImgSizePipeModule,
  StreamCardModule,
} from '@frontend-v2/shared-ui';
import { FiltersModule } from './filters/filters.module';
import { FilterStreamListComponent } from './filter-stream-list.component';

@NgModule({
  declarations: [FilterStreamListComponent],
  imports: [
    CommonModule,
    RouterModule,
    StreamCardModule,
    FiltersModule,
    ButtonModule,
    ImgSizePipeModule,
  ],
  exports: [FilterStreamListComponent],
})
export class FilterStreamListModule {}
