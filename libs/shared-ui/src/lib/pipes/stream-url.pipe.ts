import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'streamUrl',
})
export class StreamUrlPipe implements PipeTransform {
  transform(value?: string): string {
    if (!value) return '';
    return `/stream/t/${value}`;
  }
}
