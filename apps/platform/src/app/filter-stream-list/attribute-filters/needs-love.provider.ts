import { InjectionToken, Provider } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { StreamInfo } from '../../stream-info';
import { STREAM_FILTERED_LANGUAGE } from '../stream-filter.provider';

export const NEEDS_LOVE = new InjectionToken<Observable<StreamInfo[]>>(
  'NEEDS_LOVE'
);

export const needsLoveFactory = (streams: Observable<StreamInfo[]>) => {
  return streams.pipe(
    map((stream) => stream.sort((a, b) => a.viewer_count - b.viewer_count))
  );
};

export const NeedsLoveProvider: Provider = {
  provide: NEEDS_LOVE,
  useFactory: needsLoveFactory,
  deps: [STREAM_FILTERED_LANGUAGE],
};
