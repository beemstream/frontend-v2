import { Injectable } from '@angular/core';
import { Observable, of, OperatorFunction } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { combineLatest } from 'rxjs';
import { StreamInfo } from './stream-info';

export type FilterFn = (
  streams: StreamInfo[],
  filter: any
) => Observable<StreamInfo[]>;

export interface StreamFilter {
  name: string;
  attribute: Observable<any>;
  filterSwitchMap?: FilterFn;
}

@Injectable({
  providedIn: 'root',
})
export class FilterService {
  filters = [];

  createFilters(filters: StreamFilter[]) {
    const allFilters = filters.reduce((acc, curr) => {
      acc[curr.name] = curr.attribute;
      return acc;
    }, {} as Record<string, Observable<unknown>>);

    const filterFns = filters.reduce((acc, curr) => {
      if (curr.filterSwitchMap) acc[curr.name] = curr.filterSwitchMap;
      return acc;
    }, {} as Record<string, FilterFn>);

    return combineLatest(allFilters).pipe(
      switchMap(({ streams, ...rest }) => {
        const operators = Object.keys(rest).map((k) => {
          return switchMap((s) => filterFns[k](s as StreamInfo[], rest[k]));
        });

        return of(streams ?? []).pipe(
          ...(operators as [OperatorFunction<any, any>])
        );
      })
    );
  }
}
