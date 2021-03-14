import { InjectionToken, Provider } from '@angular/core';
import {
  ReplaySubject,
  Observable,
  BehaviorSubject,
  combineLatest,
} from 'rxjs';
import {
  switchMap,
  map,
  debounceTime,
  distinctUntilChanged,
  shareReplay,
} from 'rxjs/operators';
import { StreamInfo } from '../stream-info';
import { filterStreamBySearchTerm } from '../utils/filterStreamBySearchTerm';

export const STREAM_LIST = new InjectionToken<ReplaySubject<StreamInfo[]>>(
  'STREAM_LIST'
);

export const streamListFactory = () => {
  return new ReplaySubject<Observable<StreamInfo[]>>();
};

export const STREAM_LANGUAGE = new InjectionToken<BehaviorSubject<string>>(
  'STREAM_LANGUAGE'
);

export const languageFactory = (): BehaviorSubject<string> => {
  return new BehaviorSubject<string>('');
};

export const SEARCH_TERM = new InjectionToken<
  BehaviorSubject<string | undefined>
>('STREAM_TERM');

export const searchTermFactory = (): BehaviorSubject<string> => {
  return new BehaviorSubject<string>('');
};

export const STREAM_FILTERED_LANGUAGE = new InjectionToken<
  ReplaySubject<string>
>('STREAM_LANGUAGE');

export const streamFilteredLanguageFactory = (
  streams: ReplaySubject<Observable<StreamInfo[]>>,
  language: BehaviorSubject<string>,
  searchTerm: BehaviorSubject<string>
) => {
  const streamsUnpacked = streams.pipe(switchMap((s) => s));

  const search = searchTerm.pipe(debounceTime(200), distinctUntilChanged());

  return combineLatest([language, search]).pipe(
    switchMap(([lang, searchTerm]) => {
      return streamsUnpacked.pipe(
        map((s) => s.filter((s) => (lang ? s.language === lang : true))),
        map((s) => filterStreamBySearchTerm(s, searchTerm))
      );
    }),
    shareReplay(1)
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

export const SearchTermProvider: Provider = {
  provide: SEARCH_TERM,
  useFactory: searchTermFactory,
};

export const StreamFilteredLanguageProvider: Provider = {
  provide: STREAM_FILTERED_LANGUAGE,
  useFactory: streamFilteredLanguageFactory,
  deps: [STREAM_LIST, STREAM_LANGUAGE, SEARCH_TERM],
};
