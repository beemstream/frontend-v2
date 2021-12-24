import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, combineLatest, map, switchMap, tap } from 'rxjs';
import { FilterKey, Filters, FilterService } from './filter.service';
import { StreamCategoryService } from './stream-category.service';

@Injectable()
export class FilterQueryParamsService {
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

  subscribe() {
    const trackFilters = this.filterService.getFilters().pipe(
      tap((filters) => {
        this.router.navigate([], {
          relativeTo: this.activatedRoute,
          queryParamsHandling: 'merge',
          queryParams: this.filterService.toQueryParams(filters),
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
        filterState: this.filterService.fromQueryParams(queryParams),
        allProgrammingLanguages,
        allLanguages,
      })),
      tap(({ filterState, allProgrammingLanguages, allLanguages }) => {
        this.filterService.updateSourceValue(
          FilterKey.SearchTerm,
          filterState.searchTerm
        );
        this.filterService.updateSourceValue(
          FilterKey.CategoryFilter,
          filterState.categoryFilter
        );
        this.filterService.updateSourceValue(
          FilterKey.ProgrammingLanguage,
          filterState.programmingLanguages || allProgrammingLanguages
        );
        this.filterService.updateSourceValue(
          FilterKey.Language,
          filterState.language || allLanguages
        );
        this.selectedStates.next(filterState);
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
