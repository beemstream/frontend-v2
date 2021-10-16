import {
  ChangeDetectionStrategy,
  EventEmitter,
  OnChanges,
} from '@angular/core';
import { Component, Input, Output } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import {
  FilterEventPayload,
  FilterEvents,
  Layout,
} from '../filters/filters.component';
import { StreamInfo } from '../stream-info';
import { filterStreamBySearchTerm, ProgrammingLanguage } from '../utils';
import { LanguageCode } from '../filters/language-code';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { FilterService, StreamFilter } from '../filter.service';
import {
  filterByCategory,
  filterByLanguage,
  filterByProgrammingLanguages,
} from './attribute-filters';
import { TwitchService } from '../twitch.service';

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

  searchTerm = new BehaviorSubject<string | undefined>(undefined);

  categoryFilter = new BehaviorSubject<FilterEvents>(FilterEvents.MostPopular);

  streamsSubject = new BehaviorSubject<StreamInfo[] | null>([]);

  languageSubject = new BehaviorSubject<string[] | null>(null);

  programmingLanguageSubject = new BehaviorSubject<
    ProgrammingLanguage[] | null
  >(null);

  filters: StreamFilter[] = [
    {
      name: 'category',
      attribute: this.categoryFilter.asObservable(),
      filterSwitchMap: filterByCategory(this.twitchService),
    },
    {
      name: 'searchTerm',
      attribute: this.searchTerm
        .asObservable()
        .pipe(debounceTime(200), distinctUntilChanged()),
      filterSwitchMap: (streams: StreamInfo[], searchTerm: string) =>
        of(filterStreamBySearchTerm(streams, searchTerm)),
    },
    {
      name: 'language',
      attribute: this.languageSubject.asObservable(),
      filterSwitchMap: filterByLanguage,
    },
    {
      name: 'programmingLanguages',
      attribute: this.programmingLanguageSubject.asObservable(),
      filterSwitchMap: filterByProgrammingLanguages,
    },
    { name: 'streams', attribute: this.streamsSubject.asObservable() },
  ];

  filteredStreams = this.filterService.createFilters(this.filters);

  constructor(
    private filterService: FilterService,
    private twitchService: TwitchService
  ) {}

  ngOnChanges(): void {
    this.streamsSubject.next(this.streamCategoryList);
  }

  filterStreams(event: FilterEventPayload) {
    if (event.type === FilterEvents.Search) {
      this.searchTerm.next(event.value);
      this.categoryFilter.next(event.type);
    } else {
      this.categoryFilter.next(event.type);
    }
  }

  changeLayout(layout: Layout) {
    this.layoutSetting = layout;
  }

  trackStream(_index: number, item: StreamInfo) {
    return `${item.id}-${item.viewer_count}`;
  }
}
