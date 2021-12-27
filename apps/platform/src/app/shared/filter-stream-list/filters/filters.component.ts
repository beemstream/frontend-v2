import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
} from '@angular/core';
import { faSync, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { LanguageCode } from './language-code';
import { ProgrammingLanguage } from '../../../utils';
import { Filters } from '../../../services/filter.service';
import { CategoryFilterService } from '../../../services/category-filter.service';

export enum FilterEvents {
  MostPopular = 'mostPopular',
  NeedsLove = 'needsLove',
  Search = 'search',
  MarathonRunners = 'marathonRunners',
  Starters = 'starters',
  Follows = 'follows',
}

export enum Layout {
  Default,
  TextOnly,
}

export interface FilterEventPayload {
  type: FilterEvents;
  value?: string;
}

export interface CategoryFilter {
  event: FilterEvents;
  icon: IconDefinition;
  value: string;
}

@Component({
  selector: 'nbp-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [CategoryFilterService],
})
export class FiltersComponent implements OnChanges, OnInit {
  @Input() languages?: LanguageCode[] | null = [];

  @Input() programmingLanguages: ProgrammingLanguage[] | null = [];

  @Input()
  selectedStates?: Filters;

  @Output() filterChanged = new EventEmitter<FilterEventPayload>();

  @Output() languageChanged = new EventEmitter<LanguageCode[]>();

  @Output()
  programmingLanguagesChanged = new EventEmitter<ProgrammingLanguage[]>();

  @Output() refreshStream = new EventEmitter();

  @Output() layoutChanged = new EventEmitter<Layout>();

  filtersStatus: Record<FilterEvents, boolean> = {
    ...this.initFilters(),
    [FilterEvents.MostPopular]: true,
  };

  events = FilterEvents;

  layout = Layout;

  faSync = faSync;

  active = this.categoryFilterService.getCurrentFilter();

  categoryFilters = this.categoryFilterService.getCategoryFilters();

  ngOnInit() {
    this.updateCategoryFilter();
  }

  ngOnChanges() {
    this.updateCategoryFilter();
  }

  constructor(private categoryFilterService: CategoryFilterService) {}

  private updateCategoryFilter() {
    const filter = this.categoryFilterService.findCategoryFilterByEvent(
      this.selectedStates?.categoryFilter
    );
    this.categoryFilterService.updateCurrentFilter(filter);
    this.emitFilter(filter.event);
  }

  handleFilter(filter: CategoryFilter) {
    this.categoryFilterService.updateCurrentFilter(filter);
    this.emitFilter(filter.event);
  }

  emitFilter(event: FilterEvents, elemEvent?: Event) {
    this.resetFilters();
    this.selectFilter(event);
    const elem = elemEvent?.target as HTMLInputElement;
    this.filterChanged.emit({
      type: event,
      ...(elemEvent && { value: elem.value }),
    });
  }

  emitRefresh() {
    this.refreshStream.emit();
    this.resetFilters();
    this.selectFilter(FilterEvents.MostPopular);
  }

  selectFilter(event: FilterEvents) {
    this.filtersStatus = { ...this.filtersStatus, [event]: true };
  }

  resetFilters() {
    this.filtersStatus = this.initFilters();
  }

  initFilters() {
    return Object.values(FilterEvents).reduce((acc, curr) => {
      acc[curr] = false;
      return acc;
    }, {} as Record<FilterEvents, boolean>);
  }

  trackCategoryFilters(index: number) {
    return index;
  }
}
