import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule, LinkModule, StreamCardModule } from '@frontend-v2/shared-ui';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';


@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    StreamCardModule,
    LinkModule,
    ButtonModule,

  ]
})
export class HomeModule { }
