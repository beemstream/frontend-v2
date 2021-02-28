import { InjectionToken, Provider } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { StreamInfo } from '../../stream-info';
import { STREAM_FILTERED_LANGUAGE } from '../stream-filter.provider';

export const SLOW_STARTERS = new InjectionToken<Observable<StreamInfo[]>>(
  'MARATHON_RUNNERS'
);

export const slowStartersFactory = (streams: Observable<StreamInfo[]>) => {
  return streams.pipe(
    map((stream) =>
      stream.sort(
        (a, b) =>
          new Date(b.started_at).getTime() - new Date(a.started_at).getTime()
      )
    )
  );
};

export const SlowStartersProvider: Provider = {
  provide: SLOW_STARTERS,
  useFactory: slowStartersFactory,
  deps: [STREAM_FILTERED_LANGUAGE],
};
