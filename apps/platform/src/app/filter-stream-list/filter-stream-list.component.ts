import { ChangeDetectionStrategy, EventEmitter, OnChanges, OnInit } from '@angular/core';
import { Component, Input, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { FilterEventPayload, FilterEvents } from '../filters/filters.component';
import { StreamInfo } from '../stream-info';

@Component({
  selector: 'nbp-filter-stream-list',
  templateUrl: './filter-stream-list.component.html',
  styleUrls: ['./filter-stream-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FilterStreamListComponent implements OnInit, OnChanges {

  @Input() streamCategoryList?: Observable<StreamInfo[]>;

  @Input() filteredStreams?: Observable<StreamInfo[]>;

  @Output() searchStream = new EventEmitter<string>();

  @Output() refreshStream = new EventEmitter<string>();

  templateStreams?: Observable<StreamInfo[]>;

  needsLoveStreams?: Observable<StreamInfo[]>;

  mostPopularStreams?: Observable<StreamInfo[]>;

  ngOnInit(): void {
    this.reassignStreams();
  }

  ngOnChanges(): void {
    this.reassignStreams();
  }

  reassignStreams() {
    if (this.streamCategoryList) {
      this.templateStreams = this.streamCategoryList;

      this.needsLoveStreams = this.streamCategoryList.pipe(
        map((stream) => stream.sort((a, b) => a.viewer_count - b.viewer_count))
      );

      this.mostPopularStreams = this.streamCategoryList.pipe(
        map((stream) => stream.sort((a, b) => b.viewer_count - a.viewer_count))
      );
    }
  }

  filterStreams(event: FilterEventPayload) {
    switch(event.type) {
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
    }
  }

  forceRefresh() {
    this.refreshStream.emit();
  }

  trackStream(_index: number, item: StreamInfo) {
    return `${item.id}-${item.viewer_count}`;
  }
}
