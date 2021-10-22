import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, OperatorFunction } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { combineLatest } from 'rxjs';
import { StreamInfo } from '../stream-info';

export type FilterFn = (
  streams: StreamInfo[],
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  filter: any
) => Observable<StreamInfo[]>;

export interface FilterOptions {
  obs?: (obs: BehaviorSubject<unknown>) => Observable<unknown>;
  filter?: FilterFn;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface Filter<T = any> {
  subject: BehaviorSubject<T>;
  obs: (obs: BehaviorSubject<T>) => Observable<T>;
  filter?: FilterFn;
}

@Injectable({
  providedIn: 'root',
})
export class FilterService {
  createFilter<T>(subject: T, { obs, filter }: FilterOptions = {}) {
    return {
      subject: new BehaviorSubject<T>(subject),
      obs: obs ? obs : (obs: BehaviorSubject<T>) => obs.asObservable(),
      ...(filter && { filter }),
    };
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  createFilters(filters: Record<string, Filter<any>>) {
    const allFilters = Object.keys(filters).reduce((acc, key) => {
      acc[key] = filters[key].obs(filters[key].subject);
      return acc;
    }, {} as Record<string, Observable<unknown>>);

    return combineLatest(allFilters).pipe(
      switchMap(({ streams, ...rest }) => {
        const operators = Object.keys(rest).map((k) => {
          return switchMap((s) =>
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            filters[k].filter!(s as StreamInfo[], rest[k])
          );
        });

        return of(streams ?? []).pipe(
          ...(operators as [OperatorFunction<unknown, StreamInfo[]>])
        );
      })
    );
  }
}
