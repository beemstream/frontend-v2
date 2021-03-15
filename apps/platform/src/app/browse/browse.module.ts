import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BrowseRoutingModule } from './browse-routing.module';
import { BrowseComponent } from './browse.component';
import {
  ButtonModule,
  LinkModule,
  SharedUiModule,
  StreamCardModule,
} from '@frontend-v2/shared-ui';
import { StreamCategoryListComponent } from '../stream-category-list/stream-category-list.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CategoryHeaderComponent } from '../category-header/category-header.component';
import { BrowseCategoryDetailComponent } from '../browse-category-detail/browse-category-detail.component';
import { FiltersModule } from '../filters/filters.module';
import { FilterStreamListModule } from '../filter-stream-list/filter-stream.module';
import { StreamCategoryService } from '../stream-category.service';

@NgModule({
  declarations: [
    BrowseComponent,
    StreamCategoryListComponent,
    CategoryHeaderComponent,
    BrowseCategoryDetailComponent,
  ],
  imports: [
    CommonModule,
    BrowseRoutingModule,
    StreamCardModule,
    SharedUiModule,
    FontAwesomeModule,
    ButtonModule,
    LinkModule,
    FiltersModule,
    FilterStreamListModule,
  ],
  providers: [StreamCategoryService],
})
export class BrowseModule {}
