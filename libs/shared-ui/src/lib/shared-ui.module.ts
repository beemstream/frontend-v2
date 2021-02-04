import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImgSizePipe } from '../img-size.pipe';

@NgModule({
  imports: [CommonModule],
  declarations: [ImgSizePipe],
  exports: [ImgSizePipe]
})
export class SharedUiModule {}
