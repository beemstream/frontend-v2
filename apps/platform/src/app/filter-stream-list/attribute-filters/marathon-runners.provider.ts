import { InjectionToken, Provider } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { StreamInfo } from '../../stream-info';
import { STREAM_FILTERED_LANGUAGE } from '../stream-filter.provider';

export const MARATHON_RUNNERS = new InjectionToken<Observable<StreamInfo[]>>(
  'MARATHON_RUNNERS'
);

export const marathonRunnersFactory = (streams: Observable<StreamInfo[]>) => {
  return streams.pipe(
    map((stream) =>
      stream.sort(
        (a, b) =>
          new Date(a.started_at).getTime() - new Date(b.started_at).getTime()
      )
    )
  );
};

export const MarathonRunnersProvider: Provider = {
  provide: MARATHON_RUNNERS,
  useFactory: marathonRunnersFactory,
  deps: [STREAM_FILTERED_LANGUAGE],
};
