import {
  ChangeDetectionStrategy,
  EventEmitter,
  OnChanges,
} from '@angular/core';
import { Component, Input, Output } from '@angular/core';
import { Observable, of } from 'rxjs';
import {
  FilterEventPayload,
  FilterEvents,
  Layout,
} from './filters/filters.component';
import { StreamInfo } from '../../stream-info';
import { filterStreamBySearchTerm, ProgrammingLanguage } from '../../utils';
import { LanguageCode } from './filters/language-code';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Filter, FilterService } from '../../services/filter.service';
import {
  filterByCategory,
  filterByLanguage,
  filterByProgrammingLanguages,
} from './attribute-filters';
import { TwitchService } from '../../services/twitch.service';

@Component({
  selector: 'nbp-filter-stream-list',
  templateUrl: './filter-stream-list.component.html',
  styleUrls: ['./filter-stream-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilterStreamListComponent implements OnChanges {
  @Input() streamCategoryList: StreamInfo[] | null = [];

  @Input() availableLanguages?: Observable<LanguageCode[]> = of([]);

  @Input() availableProgrammingLanguages: Observable<ProgrammingLanguage[]> =
    of([]);

  @Output() refreshStream = new EventEmitter<string>();

  @Output() changeLanguage = new EventEmitter<string>();

  layout = Layout;

  layoutSetting = Layout.Default;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  filterSubjects: Record<string, Filter<any>> = {
    searchTerm: this.filterService.createFilter<string | undefined>(undefined, {
      obs: (obs) =>
        obs.asObservable().pipe(debounceTime(200), distinctUntilChanged()),
      filter: filterStreamBySearchTerm,
    }),
    categoryFilter: this.filterService.createFilter<FilterEvents>(
      FilterEvents.MostPopular,
      { filter: filterByCategory(this.twitchService) }
    ),
    streams: this.filterService.createFilter<StreamInfo[]>([]),
    language: this.filterService.createFilter<string[] | null>(null, {
      filter: filterByLanguage,
    }),
    programmingLanguages: this.filterService.createFilter<
      ProgrammingLanguage[] | null
    >(null, { filter: filterByProgrammingLanguages }),
  };

  filteredStreams = this.filterService.createFilters(this.filterSubjects);

  constructor(
    private filterService: FilterService,
    private twitchService: TwitchService
  ) {}

  ngOnChanges(): void {
    this.filterSubjects.streams.subject.next(this.streamCategoryList);
  }

  filterStreams(event: FilterEventPayload) {
    if (event.type === FilterEvents.Search) {
      this.filterSubjects.searchTerm.subject.next(event.value);
      this.filterSubjects.categoryFilter.subject.next(event.type);
    } else {
      this.filterSubjects.categoryFilter.subject.next(event.type);
    }
  }

  changeLayout(layout: Layout) {
    this.layoutSetting = layout;
  }

  trackStream(_index: number, item: StreamInfo) {
    return `${item.id}-${item.viewer_count}`;
  }
}
