import {
  ChangeDetectionStrategy,
  EventEmitter,
  Inject,
  OnChanges,
  OnInit,
} from '@angular/core';
import { Component, Input, Output } from '@angular/core';
import { Observable, of, ReplaySubject } from 'rxjs';
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
import { map, switchMap } from 'rxjs/operators';

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
  ],
})
export class FilterStreamListComponent implements OnInit, OnChanges {
  @Input() streamCategoryList: Observable<StreamInfo[]> = of([]);

  @Input() filteredStreams?: Observable<StreamInfo[]>;

  @Input() availableLanguages?: Observable<string[]>;

  @Output() searchStream = new EventEmitter<string>();

  @Output() refreshStream = new EventEmitter<string>();

  @Output() changeLanguage = new EventEmitter<string>();

  templateStreams?: Observable<StreamInfo[]>;

  layout = Layout;

  layoutSetting = Layout.Default;

  constructor(
    @Inject(STREAM_LANGUAGE) private language: ReplaySubject<string>,
    @Inject(STREAM_LIST)
    private streams: ReplaySubject<Observable<StreamInfo[]>>,
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
    switch (event.type) {
      case FilterEvents.NeedsLove:
        this.templateStreams = this.needsLove;
        break;
      case FilterEvents.MostPopular:
        this.templateStreams = this.mostPopular;
        break;
      case FilterEvents.Search:
        this.templateStreams = this.language.pipe(
          switchMap((l) =>
            (this.filteredStreams ?? of([])).pipe(
              map((streams) =>
                streams.filter((s) => (l ? s.language === l : true))
              )
            )
          )
        );
        this.filteredStreams;
        if (event.value) {
          this.searchStream.emit(event.value);
        } else {
          this.templateStreams = this.sourceStreams;
        }
        break;
      case FilterEvents.MarathonRunners:
        this.templateStreams = this.marathonRunners;
        break;
      case FilterEvents.Starters:
        this.templateStreams = this.slowStarters;
        break;
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
