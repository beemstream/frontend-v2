import { Pipe, PipeTransform } from '@angular/core';

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
