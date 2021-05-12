import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ButtonModule,
  LinkModule,
  SharedUiModule,
  StreamCardModule,
  IconModule,
} from '@frontend-v2/shared-ui';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FiltersModule } from '../filters/filters.module';
import { FilterStreamListModule } from '../filter-stream-list/filter-stream.module';
import { SeoService } from '../seo.service';

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    StreamCardModule,
    LinkModule,
    ButtonModule,
    FontAwesomeModule,
    SharedUiModule,
    FiltersModule,
    FilterStreamListModule,
    IconModule,
  ],
  providers: [SeoService],
})
export class HomeModule {}
