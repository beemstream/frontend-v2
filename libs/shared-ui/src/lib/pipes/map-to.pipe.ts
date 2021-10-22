import { CommonModule } from '@angular/common';
import { NgModule, Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'mapTo',
})
export class MapToPipe implements PipeTransform {
  transform(value: string, map: Record<string, string>): string {
    return map[value];
  }
}

@NgModule({
  declarations: [MapToPipe],
  exports: [MapToPipe],
})
export class MapToPipeModule {}
