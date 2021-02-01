import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StreamDetailRoutingModule } from './stream-detail-routing.module';
import { StreamDetailComponent } from './stream-detail.component';
import { StreamViewComponent } from './stream-view/stream-view.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [StreamDetailComponent, StreamViewComponent],
  imports: [CommonModule, StreamDetailRoutingModule, FontAwesomeModule],
})
export class StreamDetailModule {}
