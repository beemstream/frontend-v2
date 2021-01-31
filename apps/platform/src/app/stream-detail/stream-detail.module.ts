import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StreamDetailRoutingModule } from './stream-detail-routing.module';
import { StreamDetailComponent } from './stream-detail.component';

@NgModule({
  declarations: [StreamDetailComponent],
  imports: [CommonModule, StreamDetailRoutingModule],
})
export class StreamDetailModule {}
