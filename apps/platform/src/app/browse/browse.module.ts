import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BrowseRoutingModule } from './browse-routing.module';
import { BrowseComponent } from './browse.component';
import { SharedUiModule, StreamCardModule } from '@frontend-v2/shared-ui';
import { StreamCategoryListComponent } from '../stream-category-list/stream-category-list.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [BrowseComponent, StreamCategoryListComponent],
  imports: [CommonModule, BrowseRoutingModule, StreamCardModule, SharedUiModule, FontAwesomeModule],
})
export class BrowseModule {}
