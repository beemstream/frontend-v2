import { NgModule, Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'streamUrl',
})
export class StreamUrlPipe implements PipeTransform {
  transform(value?: string): string | undefined {
    if (!value) return '';
    return `/stream/t/${encodeURIComponent(value)}`;
  }
}

@NgModule({
  declarations: [StreamUrlPipe],
  exports: [StreamUrlPipe],
})
export class StreamUrlPipeModule {}
