import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, OperatorFunction } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { combineLatest } from 'rxjs';
import { StreamInfo } from '../stream-info';
import { filterStreamBySearchTerm, ProgrammingLanguage } from '../utils';
import { FilterEvents } from '../shared/filter-stream-list/filters/filters.component';
import {
  filterByCategory,
  filterByLanguage,
  filterByProgrammingLanguages,
} from '../shared/filter-stream-list/attribute-filters';
import { TwitchService } from './twitch.service';

export type FilterFn<T> = (
  streams: StreamInfo[],
  filter: T
) => Observable<StreamInfo[]>;

export interface FilterOptions<T> {
  obs?: (obs: BehaviorSubject<T>) => Observable<T>;
  filter?: FilterFn<T>;
}

export interface Filter<T = unknown> {
  subject: BehaviorSubject<T>;
  obs: (obs: BehaviorSubject<T>) => Observable<T>;
  filter: FilterFn<T>;
}

export interface Filters {
  searchTerm?: string | null;
  categoryFilter?: FilterEvents;
  streams?: StreamInfo[];
  language?: string[];
  programmingLanguages?: ProgrammingLanguage[];
}

export interface FiltersQueryParams {
  searchTerm?: string | null;
  categoryFilter?: FilterEvents;
  language?: string;
  programmingLanguages?: string;
}

export enum FilterKey {
  SearchTerm = 'searchTerm',
  CategoryFilter = 'categoryFilter',
  Streams = 'streams',
  Language = 'language',
  ProgrammingLanguage = 'programmingLanguages',
}

export interface StreamFilters {
  searchTerm: Filter<string | undefined>;
  categoryFilter: Filter<FilterEvents>;
  streams: Filter<StreamInfo[]>;
  language: Filter<string[] | null>;
  programmingLanguages: Filter<ProgrammingLanguage[] | null>;
}

type UnionToIntersection<U> = (
  U extends unknown ? (k: U) => void : never
) extends (k: infer I) => void
  ? I
  : never;

type GetInnerFilter<S> = S extends Filter<infer T> ? T : never;

type AllStreamFilter = StreamFilters[keyof StreamFilters];

type StreamSubject = UnionToIntersection<AllStreamFilter['subject']>;

type GetInnerObs<S> = S extends Observable<infer T> ? T : never;

type FilterObs = {
  [key in keyof StreamFilters]: ReturnType<StreamFilters[key]['obs']>;
};

export type FilterObsValues = {
  [key in keyof StreamFilters]: GetInnerObs<
    ReturnType<StreamFilters[key]['obs']>
  >;
};

type StreamFilter = Exclude<
  Filters[keyof Filters],
  undefined | null | string | string[] | StreamInfo[]
>;

type FilterValues = GetInnerFilter<AllStreamFilter>;

@Injectable()
export class FilterService {
  private filters: Observable<FilterObsValues> = of();

  filterSubjects: StreamFilters = {
    searchTerm: this.createFilter<string | undefined>(undefined, {
      obs: (obs) =>
        obs.asObservable().pipe(debounceTime(200), distinctUntilChanged()),
      filter: filterStreamBySearchTerm,
    }),
    categoryFilter: this.createFilter<FilterEvents>(FilterEvents.MostPopular, {
      filter: filterByCategory(this.twitchService),
    }),
    streams: this.createFilter<StreamInfo[]>([]),
    language: this.createFilter<string[] | null>(null, {
      filter: filterByLanguage,
    }),
    programmingLanguages: this.createFilter<ProgrammingLanguage[] | null>(
      null,
      { filter: filterByProgrammingLanguages }
    ),
  };

  constructor(private twitchService: TwitchService) {}

  getFilteredStreams(): Observable<StreamInfo[]> {
    return this.createFilters(this.filterSubjects);
  }

  updateSourceValue(key: FilterKey, value: FilterValues) {
    this.filterSubjects[key].subject.next(
      value as FilterValues & null & undefined
    );
  }

  updateSourceValues(
    values: { [key in Exclude<FilterKey, 'streams'>]: FilterValues }
  ) {
    (Object.keys(values) as FilterKey[]).forEach((k) => {
      this.filterSubjects[k].subject.next(
        values[k as FilterValues & null & undefined]
      );
    });
  }

  getFilters(): Observable<FilterObsValues> {
    return this.filters;
  }

  createFilter<T>(
    subject: T,
    { obs, filter }: FilterOptions<T> = {}
  ): Filter<T> {
    return {
      subject: new BehaviorSubject<T>(subject),
      obs: obs ? obs : (obs: BehaviorSubject<T>) => obs.asObservable(),
      filter: filter ? filter : (s: StreamInfo[]) => of(s),
    };
  }

  createFilters(filters: StreamFilters) {
    const allFilters = (Object.keys(filters) as (keyof StreamFilters)[]).reduce(
      (acc, key) => {
        (acc[key] as ReturnType<AllStreamFilter['obs']>) = filters[key].obs(
          filters[key].subject as StreamSubject
        );
        return acc;
      },
      {} as FilterObs
    );

    this.filters = combineLatest(allFilters);

    return this.filters.pipe(
      switchMap(({ streams, ...filterState }) => {
        const operators = (Object.keys(filterState) as (keyof FilterObs)[]).map(
          (k: keyof FilterObs) => {
            return switchMap((s) =>
              filters[k].filter(
                s as StreamInfo[],
                filterState[
                  k as keyof Omit<StreamFilters, 'streams'>
                ] as StreamFilter
              )
            );
          }
        );

        return of(streams ?? []).pipe(
          ...(operators as [OperatorFunction<unknown, StreamInfo[]>])
        );
      })
    );
  }
}
