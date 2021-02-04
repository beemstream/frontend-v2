import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StreamCardComponent } from './stream-card.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RouterModule } from '@angular/router';
import { LinkModule } from '../link/link.module';
import { StreamTagModule } from '../stream-tag/stream-tag.module';
import { StreamUrlPipe } from '../stream-url.pipe';
import { SharedUiModule } from '../shared-ui.module';

@NgModule({
  declarations: [StreamCardComponent, StreamUrlPipe],
  imports: [
    CommonModule,
    FontAwesomeModule,
    RouterModule,
    LinkModule,
    StreamTagModule,
    SharedUiModule,
  ],
  exports: [StreamCardComponent],
})
export class StreamCardModule {}
