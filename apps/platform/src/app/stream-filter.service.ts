import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, ReplaySubject } from 'rxjs';
import {
  MOST_POPULAR,
  NEEDS_LOVE,
  MARATHON_RUNNERS,
  SLOW_STARTERS,
  USER_FOLLOWS,
} from './filter-stream-list/attribute-filters';
import {
  SEARCH_TERM,
  STREAM_FILTERED_LANGUAGE,
  STREAM_LANGUAGE,
  STREAM_LIST,
  STREAM_PROGRAMMING_LANGUAGE,
} from './filter-stream-list/stream-filter.provider';
import { FilterEventPayload, FilterEvents } from './filters/filters.component';
import { StreamInfo } from './stream-info';
import { ProgrammingLanguage } from './utils';

export enum StreamCategory {
  WebDevelopment = 'webdevelopment',
  GameDevelopment = 'gamedevelopment',
  MobileDevelopment = 'mobiledevelopment',
  Programming = 'programming',
  None = '',
}

@Injectable()
export class StreamFilterService {
  filterAttributeStreams = {
    [FilterEvents.Follows]: this.userFollows,
    [FilterEvents.MostPopular]: this.mostPopular,
    [FilterEvents.NeedsLove]: this.needsLove,
    [FilterEvents.MarathonRunners]: this.marathonRunners,
    [FilterEvents.Starters]: this.slowStarters,
    [FilterEvents.Search]: this.sourceStreams,
  };

  constructor(
    @Inject(STREAM_LANGUAGE) private language: BehaviorSubject<string[] | null>,
    @Inject(STREAM_PROGRAMMING_LANGUAGE)
    private programmingLanguage: BehaviorSubject<ProgrammingLanguage[] | null>,
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
    @Inject(SLOW_STARTERS) readonly slowStarters: Observable<StreamInfo[]>,
    @Inject(USER_FOLLOWS) readonly userFollows: Observable<StreamInfo[]>
  ) {}

  getSourceStreams() {
    return this.sourceStreams;
  }

  getStreams() {
    return this.streams;
  }

  setStreams(currentStreams: Observable<StreamInfo[]>) {
    this.streams.next(currentStreams);
  }

  setLanguages(language: string[]) {
    this.language.next(language);
  }

  setProgrammingLanguages(programmingLanguages: ProgrammingLanguage[]) {
    this.programmingLanguage.next(programmingLanguages);
  }

  filterStream(event: FilterEventPayload) {
    if (event.type === FilterEvents.Search) {
      this.searchTerm.next(event.value);
    }

    return this.filterAttributeStreams[event.type];
  }

  resetFilters() {
    this.language.next(null);
    this.programmingLanguage.next(null);
  }
}
