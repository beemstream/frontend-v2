import { InjectionToken, Provider } from '@angular/core';
import {
  ReplaySubject,
  Observable,
  BehaviorSubject,
  combineLatest,
  of,
} from 'rxjs';
import {
  switchMap,
  map,
  debounceTime,
  distinctUntilChanged,
  shareReplay,
} from 'rxjs/operators';
import { StreamInfo } from '../stream-info';
import { filterByProgrammingLanguages, ProgrammingLanguage } from '../utils';
import { filterStreamBySearchTerm } from '../utils/filterStreamBySearchTerm';

export const STREAM_LIST = new InjectionToken<ReplaySubject<StreamInfo[]>>(
  'STREAM_LIST'
);

export const streamListFactory = () => {
  return new ReplaySubject<Observable<StreamInfo[]>>();
};

export const STREAM_LANGUAGE = new InjectionToken<BehaviorSubject<string[]>>(
  'STREAM_LANGUAGE'
);

export const languageFactory = (): BehaviorSubject<string[] | null> => {
  return new BehaviorSubject<string[] | null>(null);
};

export const STREAM_PROGRAMMING_LANGUAGE = new InjectionToken<
  BehaviorSubject<string>
>('STREAM_LANGUAGE');

export const programmingLanguageFactory =
  (): BehaviorSubject<ProgrammingLanguage | null> => {
    return new BehaviorSubject<ProgrammingLanguage | null>(null);
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
  language: BehaviorSubject<string[]>,
  searchTerm: BehaviorSubject<string>,
  programmingLanguages: BehaviorSubject<ProgrammingLanguage[]>
) => {
  const streamsUnpacked = streams.pipe(switchMap((s) => s));
  const search = searchTerm.pipe(debounceTime(200), distinctUntilChanged());

  return combineLatest([
    streamsUnpacked,
    language,
    search,
    programmingLanguages,
  ]).pipe(
    switchMap(([latestStreams, lang, searchTerm, pLanguage]) => {
      console.log(lang, pLanguage);
      const streamList = pLanguage
        ? filterByProgrammingLanguages(of(latestStreams), pLanguage)
        : of(latestStreams);

      return streamList.pipe(
        map((s) => {
          return !lang
            ? s
            : s.filter((s) => {
                return lang.some((l) => s.language === l);
              });
        }),
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

export const StreamProgrammingLanguageProvider: Provider = {
  provide: STREAM_PROGRAMMING_LANGUAGE,
  useFactory: programmingLanguageFactory,
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
  deps: [
    STREAM_LIST,
    STREAM_LANGUAGE,
    SEARCH_TERM,
    STREAM_PROGRAMMING_LANGUAGE,
  ],
};
