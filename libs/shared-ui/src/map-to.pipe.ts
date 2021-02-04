import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'mapTo'
})
export class MapToPipe implements PipeTransform {

  transform(value: string, map: Record<string, string>): string {
    return map[value];
  }

}
