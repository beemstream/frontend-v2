import { Injectable, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  BehaviorSubject,
  combineLatest,
  EMPTY,
  map,
  Subscription,
  switchMap,
  tap,
} from 'rxjs';
import { FilterEvents } from '../shared/filter-stream-list/filters/filters.component';
import { ProgrammingLanguage } from '../utils';
import {
  FilterObsValues,
  Filters,
  FilterService,
  FiltersQueryParams,
} from './filter.service';
import { StreamCategoryService } from './stream-category.service';

@Injectable()
export class FilterQueryParamsService implements OnDestroy {
  subscription?: Subscription;

  constructor(
    private activatedRoute: ActivatedRoute,
    private filterService: FilterService,
    private streamsService: StreamCategoryService,
    private router: Router
  ) {}

  selectedStates = new BehaviorSubject<Filters>({});

  getSelectedStates() {
    return this.selectedStates.asObservable();
  }

  toQueryParams(filterState: FilterObsValues): FiltersQueryParams {
    const { categoryFilter, language, programmingLanguages, searchTerm } =
      filterState;

    return {
      ...(categoryFilter && { categoryFilter }),
      ...(language && {
        language: language.length === 0 ? '[]' : language.toString(),
      }),
      ...(programmingLanguages && {
        programmingLanguages:
          programmingLanguages.length === 0
            ? '[]'
            : programmingLanguages.toString(),
      }),
      ...(searchTerm && { searchTerm }),
    };
  }

  fromQueryParams(filterState: FiltersQueryParams): Filters {
    const { categoryFilter, language, programmingLanguages, searchTerm } =
      filterState;
    if (!categoryFilter && !language && !programmingLanguages && !searchTerm) {
      return {
        categoryFilter: FilterEvents.MostPopular,
      };
    }

    return {
      ...(categoryFilter && { categoryFilter }),
      ...(language && {
        language: language === '[]' ? [] : language.split(','),
      }),
      ...(programmingLanguages && {
        programmingLanguages:
          programmingLanguages === '[]'
            ? []
            : (programmingLanguages.split(',') as ProgrammingLanguage[]),
      }),
      ...(searchTerm && { searchTerm }),
    };
  }

  subscribe() {
    const trackFilters = this.filterService.getFilters().pipe(
      tap((filters) => {
        this.router.navigate([], {
          relativeTo: this.activatedRoute,
          queryParamsHandling: 'merge',
          queryParams: this.toQueryParams(filters),
        });
      })
    );

    const filterByQueryParams = combineLatest({
      queryParams: this.activatedRoute.queryParams,
      allProgrammingLanguages:
        this.streamsService.getAvailableProgrammingLanguages(),
      allLanguages: this.streamsService.getAvailableLanguages(),
    }).pipe(
      map(({ queryParams, allProgrammingLanguages, allLanguages }) => ({
        filterState: this.fromQueryParams(queryParams),
        allProgrammingLanguages,
        allLanguages,
      })),
      tap(({ filterState, allProgrammingLanguages, allLanguages }) => {
        this.filterService.updateSourceValues({
          searchTerm: filterState.searchTerm,
          categoryFilter: filterState.categoryFilter,
          programmingLanguages:
            filterState.programmingLanguages || allProgrammingLanguages,
          language: filterState.language || allLanguages,
        });
        this.selectedStates.next(filterState);
      }),
      switchMap(() => trackFilters)
    );

    this.subscription = this.activatedRoute.queryParams
      .pipe(
        switchMap((queryParams) => {
          if (queryParams.code) return EMPTY;

          return Object.keys(queryParams).length > 0
            ? filterByQueryParams
            : trackFilters;
        })
      )
      .subscribe();
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }
}
