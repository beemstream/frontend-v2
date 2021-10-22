import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ButtonModule,
  LinkModule,
  StreamCardModule,
  IconModule,
  HeaderModule,
} from '@frontend-v2/shared-ui';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FiltersModule } from '../shared/filter-stream-list/filters/filters.module';
import { SeoService } from '../services/seo.service';
import { FilterStreamListModule } from '../shared/filter-stream-list/filter-stream-list.component';

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    StreamCardModule,
    LinkModule,
    ButtonModule,
    FontAwesomeModule,
    FiltersModule,
    FilterStreamListModule,
    IconModule,
    HeaderModule,
  ],
  providers: [SeoService],
})
export class HomeModule {}
