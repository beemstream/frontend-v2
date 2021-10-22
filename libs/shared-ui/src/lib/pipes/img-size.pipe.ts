import { CommonModule } from '@angular/common';
import { NgModule, Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'imgSize',
})
export class ImgSizePipe implements PipeTransform {
  transform(value: string, width: number, height: number): string {
    return value
      .replace('{width}', `${width}`)
      .replace('{height}', `${height}`);
  }
}

@NgModule({
  imports: [CommonModule],
  declarations: [ImgSizePipe],
  exports: [ImgSizePipe],
})
export class ImgSizePipeModule {}
