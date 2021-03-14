import {
  ChangeDetectionStrategy,
  EventEmitter,
  Inject,
  OnChanges,
  OnInit,
} from '@angular/core';
import { Component, Input, Output } from '@angular/core';
import { BehaviorSubject, Observable, of, ReplaySubject } from 'rxjs';
import {
  FilterEventPayload,
  FilterEvents,
  Layout,
} from '../filters/filters.component';
import { StreamInfo } from '../stream-info';
import {
  StreamListProvider,
  StreamLanguageProvider,
  StreamFilteredLanguageProvider,
  STREAM_FILTERED_LANGUAGE,
  STREAM_LANGUAGE,
  STREAM_LIST,
  SEARCH_TERM,
  SearchTermProvider,
} from './stream-filter.provider';
import {
  MarathonRunnersProvider,
  MARATHON_RUNNERS,
  MostPopularProvider,
  MOST_POPULAR,
  NeedsLoveProvider,
  NEEDS_LOVE,
  SlowStartersProvider,
  SLOW_STARTERS,
} from './attribute-filters';

@Component({
  selector: 'nbp-filter-stream-list',
  templateUrl: './filter-stream-list.component.html',
  styleUrls: ['./filter-stream-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    StreamLanguageProvider,
    StreamListProvider,
    StreamFilteredLanguageProvider,
    MostPopularProvider,
    NeedsLoveProvider,
    MarathonRunnersProvider,
    SlowStartersProvider,
    SearchTermProvider,
  ],
})
export class FilterStreamListComponent implements OnInit, OnChanges {
  @Input() streamCategoryList: Observable<StreamInfo[]> = of([]);

  @Input() availableLanguages?: Observable<string[]> = of([]);

  @Output() refreshStream = new EventEmitter<string>();

  @Output() changeLanguage = new EventEmitter<string>();

  templateStreams: Observable<StreamInfo[]> = of([]);

  layout = Layout;

  layoutSetting = Layout.Default;

  filterAttributeStreams = {
    [FilterEvents.MostPopular]: this.mostPopular,
    [FilterEvents.NeedsLove]: this.needsLove,
    [FilterEvents.MarathonRunners]: this.marathonRunners,
    [FilterEvents.Starters]: this.slowStarters,
    [FilterEvents.Search]: this.sourceStreams,
  };

  constructor(
    @Inject(STREAM_LANGUAGE) private language: BehaviorSubject<string>,
    @Inject(STREAM_LIST)
    private streams: ReplaySubject<Observable<StreamInfo[]>>,
    @Inject(SEARCH_TERM)
    private searchTerm: BehaviorSubject<string | undefined>,
    @Inject(STREAM_FILTERED_LANGUAGE)
    readonly sourceStreams: Observable<StreamInfo[]>,
    @Inject(MOST_POPULAR) readonly mostPopular: Observable<StreamInfo[]>,
    @Inject(NEEDS_LOVE) readonly needsLove: Observable<StreamInfo[]>,
    @Inject(MARATHON_RUNNERS)
    readonly marathonRunners: Observable<StreamInfo[]>,
    @Inject(SLOW_STARTERS) readonly slowStarters: Observable<StreamInfo[]>
  ) {}

  ngOnInit(): void {
    this.reassignStreams();
  }

  ngOnChanges(): void {
    this.reassignStreams();
  }

  reassignStreams() {
    this.streams.next(this.streamCategoryList);
    this.templateStreams = this.sourceStreams;
  }

  filterStreams(event: FilterEventPayload) {
    this.templateStreams = this.filterAttributeStreams[event.type];

    if (event.type === FilterEvents.Search) {
      this.searchTerm.next(event.value);
    }
  }

  filterLanguage(language: string) {
    this.language.next(language);
  }

  changeLayout(layout: Layout) {
    this.layoutSetting = layout;
  }

  forceRefresh() {
    this.refreshStream.emit();
  }

  trackStream(_index: number, item: StreamInfo) {
    return `${item.id}-${item.viewer_count}`;
  }
}
