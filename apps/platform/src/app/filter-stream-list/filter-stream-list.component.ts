import {
  ChangeDetectionStrategy,
  EventEmitter,
  OnChanges,
  OnInit,
} from '@angular/core';
import { Component, Input, Output } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import {
  FilterEventPayload,
  FilterEvents,
  Layout,
} from '../filters/filters.component';
import { StreamInfo } from '../stream-info';

@Component({
  selector: 'nbp-filter-stream-list',
  templateUrl: './filter-stream-list.component.html',
  styleUrls: ['./filter-stream-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilterStreamListComponent implements OnInit, OnChanges {
  @Input() streamCategoryList: Observable<StreamInfo[]> = of([]);

  @Input() filteredStreams?: Observable<StreamInfo[]>;

  @Input() availableLanguages?: Observable<string[]>;

  @Output() searchStream = new EventEmitter<string>();

  @Output() refreshStream = new EventEmitter<string>();

  @Output() changeLanguage = new EventEmitter<string>();

  templateStreams?: Observable<StreamInfo[]>;

  needsLoveStreams?: Observable<StreamInfo[]>;

  mostPopularStreams?: Observable<StreamInfo[]>;

  marathonRunners?: Observable<StreamInfo[]>;

  starters?: Observable<StreamInfo[]>;

  layout = Layout;

  layoutSetting = Layout.Default;

  language = new BehaviorSubject<string>('');

  ngOnInit(): void {
    this.reassignStreams();
  }

  ngOnChanges(): void {
    this.reassignStreams();
  }

  reassignStreams() {
    const searchByLanguage = this.language.pipe(
      switchMap((language) =>
        this.streamCategoryList.pipe(
          map((stream) =>
            stream.filter((s) => (language ? s.language === language : true))
          )
        )
      )
    );

    this.templateStreams = searchByLanguage;

    this.needsLoveStreams = searchByLanguage.pipe(
      map((stream) => stream.sort((a, b) => a.viewer_count - b.viewer_count))
    );

    this.mostPopularStreams = searchByLanguage.pipe(
      map((stream) => stream.sort((a, b) => b.viewer_count - a.viewer_count))
    );

    this.marathonRunners = searchByLanguage.pipe(
      map((stream) =>
        stream.sort(
          (a, b) =>
            new Date(a.started_at).getTime() - new Date(b.started_at).getTime()
        )
      )
    );

    this.starters = searchByLanguage.pipe(
      map((stream) =>
        stream.sort(
          (a, b) =>
            new Date(b.started_at).getTime() - new Date(a.started_at).getTime()
        )
      )
    );
  }

  filterStreams(event: FilterEventPayload) {
    switch (event.type) {
      case FilterEvents.NeedsLove:
        this.templateStreams = this.needsLoveStreams;
        break;
      case FilterEvents.MostPopular:
        this.templateStreams = this.mostPopularStreams;
        break;
      case FilterEvents.Search:
        this.templateStreams = this.filteredStreams;
        if (event.value) {
          this.searchStream.emit(event.value);
        } else {
          this.templateStreams = this.streamCategoryList;
        }
        break;
      case FilterEvents.MarathonRunners:
        this.templateStreams = this.marathonRunners;
        break;
      case FilterEvents.Starters:
        this.templateStreams = this.starters;
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
