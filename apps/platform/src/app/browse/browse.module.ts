import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BrowseRoutingModule } from './browse-routing.module';
import { BrowseComponent } from './browse.component';
import {
  ButtonModule,
  LinkModule,
  StreamCardModule,
  EscapeHtmlPipe,
  ImgSizePipeModule,
  IconModule,
} from '@frontend-v2/shared-ui';
import { StreamCategoryListComponent } from './stream-category-list/stream-category-list.component';
import { CategoryHeaderComponent } from './category-header/category-header.component';
import { BrowseCategoryDetailComponent } from './browse-category-detail/browse-category-detail.component';
import { FiltersModule } from '../shared/filter-stream-list/filters/filters.module';
import { FilterStreamListModule } from '../shared/filter-stream-list/filter-stream.module';
import { StreamCategoryService } from '../services/stream-category.service';

@NgModule({
  declarations: [
    BrowseComponent,
    StreamCategoryListComponent,
    CategoryHeaderComponent,
    BrowseCategoryDetailComponent,
    EscapeHtmlPipe,
  ],
  imports: [
    CommonModule,
    BrowseRoutingModule,
    StreamCardModule,
    IconModule,
    ButtonModule,
    LinkModule,
    FiltersModule,
    FilterStreamListModule,
    ImgSizePipeModule,
  ],
  providers: [StreamCategoryService],
})
export class BrowseModule {}
