import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImgSizePipe, MapToPipe } from './pipes';

@NgModule({
  imports: [CommonModule],
  declarations: [ImgSizePipe, MapToPipe],
  exports: [ImgSizePipe, MapToPipe],
})
export class SharedUiModule {}
