import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, map, switchMap, tap } from 'rxjs';
import { Filter, Filters, FilterService } from './filter.service';

@Injectable()
export class FilterQueryParamsService {
  constructor(
    private activatedRoute: ActivatedRoute,
    private filterService: FilterService,
    private router: Router
  ) {}

  selectedStates = new BehaviorSubject<Filters>({});

  getSelectedStates() {
    return this.selectedStates.asObservable();
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  subscribe(filterSubjects: Record<string, Filter<any>>) {
    const trackFilters = this.filterService.getFilters().pipe(
      tap((filters) =>
        this.router.navigate([], {
          relativeTo: this.activatedRoute,
          queryParamsHandling: 'merge',
          queryParams: this.filterService.toQueryParams(filters),
        })
      )
    );

    const filterByQueryParams = this.activatedRoute.queryParams.pipe(
      map((queryFilters) => this.filterService.fromQueryParams(queryFilters)),
      tap((filterState) => this.selectedStates.next(filterState)),
      tap((filterState) => {
        filterSubjects.searchTerm.subject.next(filterState.searchTerm);
        filterSubjects.categoryFilter.subject.next(filterState.categoryFilter);
        filterSubjects.programmingLanguages.subject.next(
          filterState.programmingLanguages
        );
        filterSubjects.language.subject.next(filterState.language);
      }),
      switchMap(() => trackFilters)
    );

    this.activatedRoute.queryParams
      .pipe(
        switchMap((queryParams) => {
          return Object.keys(queryParams).length > 0
            ? filterByQueryParams
            : trackFilters;
        })
      )
      .subscribe();
  }
}
