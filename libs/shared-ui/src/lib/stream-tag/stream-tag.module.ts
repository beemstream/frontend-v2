import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StreamTagComponent } from './stream-tag.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [StreamTagComponent],
  imports: [CommonModule, RouterModule],
  exports: [StreamTagComponent],
})
export class StreamTagModule {}
