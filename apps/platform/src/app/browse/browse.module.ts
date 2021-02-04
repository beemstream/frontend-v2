import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BrowseRoutingModule } from './browse-routing.module';
import { BrowseComponent } from './browse.component';
import { ButtonModule, SharedUiModule, StreamCardModule } from '@frontend-v2/shared-ui';
import { StreamCategoryListComponent } from '../stream-category-list/stream-category-list.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CategoryHeaderComponent } from '../category-header/category-header.component';
import { BrowseCategoryDetailComponent } from '../browse-category-detail/browse-category-detail.component';

@NgModule({
  declarations: [BrowseComponent, StreamCategoryListComponent, CategoryHeaderComponent, BrowseCategoryDetailComponent],
  imports: [CommonModule, BrowseRoutingModule, StreamCardModule, SharedUiModule, FontAwesomeModule, ButtonModule],
})
export class BrowseModule {}
