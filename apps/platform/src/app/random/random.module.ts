import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RandomRoutingModule } from './random-routing.module';
import { RandomComponent } from './random.component';


@NgModule({
  declarations: [RandomComponent],
  imports: [
    CommonModule,
    RandomRoutingModule
  ]
})
export class RandomModule { }
