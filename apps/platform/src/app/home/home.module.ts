import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ButtonModule,
  LinkModule,
  StreamCardModule,
} from '@frontend-v2/shared-ui';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ImgSizePipe } from '../img-size.pipe';
import { FiltersComponent } from '../filters/filters.component';

@NgModule({
  declarations: [HomeComponent, ImgSizePipe, FiltersComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    StreamCardModule,
    LinkModule,
    ButtonModule,
    FontAwesomeModule,
  ],
})
export class HomeModule {}
