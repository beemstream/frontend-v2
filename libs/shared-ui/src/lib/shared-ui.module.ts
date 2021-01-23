import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StreamCardComponent } from './stream-card/stream-card.component';
import { StreamTagComponent } from './stream-tag/stream-tag.component';

@NgModule({
  imports: [CommonModule],
  declarations: [StreamCardComponent, StreamTagComponent],
  exports: [StreamCardComponent],
})
export class SharedUiModule {}
