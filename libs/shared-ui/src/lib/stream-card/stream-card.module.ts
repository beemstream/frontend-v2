import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StreamCardComponent } from './stream-card.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RouterModule } from '@angular/router';
import { LinkModule } from '../link/link.module';
import { StreamTagModule } from '../stream-tag/stream-tag.module';

@NgModule({
  declarations: [StreamCardComponent],
  imports: [
    CommonModule,
    FontAwesomeModule, 
    RouterModule,
    LinkModule,
    StreamTagModule
  ],
  exports: [StreamCardComponent]
})
export class StreamCardModule { }