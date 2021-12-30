import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StreamDetailRoutingModule } from './stream-detail-routing.module';
import { StreamDetailComponent } from './stream-detail.component';
import { StreamViewComponent } from './stream-view/stream-view.component';
import { IconModule, ImgSizePipe } from '@frontend-v2/shared-ui';

@NgModule({
  declarations: [StreamDetailComponent, StreamViewComponent],
  imports: [CommonModule, StreamDetailRoutingModule, IconModule],
  providers: [ImgSizePipe],
})
export class StreamDetailModule {}
