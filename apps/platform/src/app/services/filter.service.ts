import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, OperatorFunction } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { combineLatest } from 'rxjs';
import { StreamInfo } from '../stream-info';
import { ProgrammingLanguage } from '../utils';

export type FilterFn = (
  streams: StreamInfo[],
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  filter: any
) => Observable<StreamInfo[]>;

export interface FilterOptions {
  obs?: (obs: BehaviorSubject<unknown>) => Observable<unknown>;
  filter?: FilterFn;
}

export interface Filter<T = unknown> {
  subject: BehaviorSubject<T>;
  obs: (obs: BehaviorSubject<T>) => Observable<T>;
  filter?: FilterFn;
}

export interface Filters {
  searchTerm?: string | null;
  categoryFilter?: string;
  language?: string[];
  programmingLanguages?: ProgrammingLanguage[];
}

export interface FiltersQueryParams {
  searchTerm?: string;
  categoryFilter?: string;
  language?: string;
  programmingLanguages?: string;
}

@Injectable({
  providedIn: 'root',
})
export class FilterService {
  private filters: BehaviorSubject<Filters> = new BehaviorSubject({});

  getFilters(): Observable<Filters> {
    return this.filters.asObservable();
  }

  toQueryParams(filterState: Filters) {
    const { categoryFilter, language, programmingLanguages, searchTerm } =
      filterState;

    return {
      ...(categoryFilter && { categoryFilter }),
      ...(language && { language: language.toString() }),
      ...(programmingLanguages && {
        programmingLanguages: programmingLanguages.toString(),
      }),
      searchTerm,
    };
  }

  fromQueryParams(filterState: FiltersQueryParams): Filters {
    const { categoryFilter, language, programmingLanguages, searchTerm } =
      filterState;
    return {
      ...(categoryFilter && { categoryFilter }),
      ...(language && { language: language.split(',') }),
      ...(programmingLanguages && {
        programmingLanguages: programmingLanguages.split(
          ','
        ) as ProgrammingLanguage[],
      }),
      searchTerm,
    };
  }

  createFilter<T>(subject: T, { obs, filter }: FilterOptions = {}) {
    return {
      subject: new BehaviorSubject<T>(subject),
      obs: obs ? obs : (obs: BehaviorSubject<T>) => obs.asObservable(),
      ...(filter && { filter }),
    };
  }

  createFilters(filters: Record<string, Filter<unknown>>) {
    const allFilters = Object.keys(filters).reduce((acc, key) => {
      acc[key] = filters[key].obs(filters[key].subject);
      return acc;
    }, {} as Record<string, Observable<unknown>>);

    return combineLatest(allFilters).pipe(
      tap(({ streams: _streams, ...filterState }) =>
        this.filters.next(filterState)
      ),
      switchMap(({ streams, ...filterState }) => {
        const operators = Object.keys(filterState).map((k) => {
          return switchMap((s) =>
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            filters[k].filter!(s as StreamInfo[], filterState[k])
          );
        });

        return of(streams ?? []).pipe(
          ...(operators as [OperatorFunction<unknown, StreamInfo[]>])
        );
      })
    );
  }
}
