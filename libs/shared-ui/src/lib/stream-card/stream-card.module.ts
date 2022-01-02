import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StreamCardComponent } from './stream-card.component';
import { RouterModule } from '@angular/router';
import { LinkModule } from '../link/link.module';
import { StreamTagModule } from '../stream-tag/stream-tag.module';
import { MapToPipeModule, StreamUrlPipe } from '../pipes';
import { IconModule } from '../icon/icon.module';

@NgModule({
  declarations: [StreamCardComponent, StreamUrlPipe],
  imports: [
    CommonModule,
    IconModule,
    RouterModule,
    LinkModule,
    StreamTagModule,
    IconModule,
    MapToPipeModule,
  ],
  exports: [StreamCardComponent],
})
export class StreamCardModule {}
