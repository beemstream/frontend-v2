import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'streamUrl',
})
export class StreamUrlPipe implements PipeTransform {
  transform(value?: string): string | undefined {
    if (!value) return undefined;
    return `/stream/t/${encodeURIComponent(value)}`;
  }
}
