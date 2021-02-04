import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ButtonModule,
  LinkModule,
  SharedUiModule,
  StreamCardModule,
} from '@frontend-v2/shared-ui';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FiltersComponent } from '../filters/filters.component';

@NgModule({
  declarations: [HomeComponent, FiltersComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    StreamCardModule,
    LinkModule,
    ButtonModule,
    FontAwesomeModule,
    SharedUiModule
  ],
})
export class HomeModule {}
