import { InjectionToken, Provider } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { StreamInfo } from '../../stream-info';
import { STREAM_FILTERED_LANGUAGE } from '../stream-filter.provider';

export const MOST_POPULAR = new InjectionToken<Observable<StreamInfo[]>>(
  'MOST_POPULAR'
);

export const mostPopularFactory = (streams: Observable<StreamInfo[]>) => {
  return streams.pipe(
    map((stream) => stream.sort((a, b) => b.viewer_count - a.viewer_count))
  );
};

export const MostPopularProvider: Provider = {
  provide: MOST_POPULAR,
  useFactory: mostPopularFactory,
  deps: [STREAM_FILTERED_LANGUAGE],
};
