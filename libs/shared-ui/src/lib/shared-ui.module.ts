import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImgSizePipe } from '../img-size.pipe';
import { MapToPipe } from '../map-to.pipe';

@NgModule({
  imports: [CommonModule],
  declarations: [ImgSizePipe, MapToPipe],
  exports: [ImgSizePipe, MapToPipe],
})
export class SharedUiModule {}
