import { InjectionToken, Provider } from '@angular/core';
import { ReplaySubject, Observable } from 'rxjs';
import { switchMap, startWith, map } from 'rxjs/operators';
import { StreamInfo } from '../stream-info';

export const STREAM_LIST = new InjectionToken<ReplaySubject<StreamInfo[]>>(
  'STREAM_LIST'
);

export const streamListFactory = () => {
  return new ReplaySubject<Observable<StreamInfo[]>>();
};

export const STREAM_LANGUAGE = new InjectionToken<ReplaySubject<string>>(
  'STREAM_LANGUAGE'
);

export const languageFactory = () => {
  const language = new ReplaySubject<string>();
  language.next('');
  return language;
};

export const STREAM_FILTERED_LANGUAGE = new InjectionToken<
  ReplaySubject<string>
>('STREAM_LANGUAGE');

export const streamFilteredLanguageFactory = (
  streams: ReplaySubject<Observable<StreamInfo[]>>,
  language: ReplaySubject<string>
) => {
  const streamsUnpacked = streams.pipe(switchMap((s) => s));

  return language.pipe(
    startWith(''),
    switchMap((l) => {
      return streamsUnpacked.pipe(
        map((s) => s.filter((s) => (l ? s.language === l : true)))
      );
    })
  );
};

export const StreamLanguageProvider: Provider = {
  provide: STREAM_LANGUAGE,
  useFactory: languageFactory,
};

export const StreamListProvider: Provider = {
  provide: STREAM_LIST,
  useFactory: streamListFactory,
};

export const StreamFilteredLanguageProvider: Provider = {
  provide: STREAM_FILTERED_LANGUAGE,
  useFactory: streamFilteredLanguageFactory,
  deps: [STREAM_LIST, STREAM_LANGUAGE],
};
