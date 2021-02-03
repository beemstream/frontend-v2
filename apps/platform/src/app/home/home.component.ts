import { Component } from '@angular/core';
import { StreamCollectionService } from '../stream-collection.service';
import {
  debounceTime,
  distinctUntilChanged,
  map,
  switchMap,
} from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import { FilterEventPayload, FilterEvents } from '../filters/filters.component';
import { StreamInfo } from '../stream-info';

@Component({
  selector: 'nbp-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [StreamCollectionService],
})
export class HomeComponent {
  searchValue = new BehaviorSubject<string>('');

  streams = this.streamColllectionService.getStreams();

  templateStreams = this.streams;

  needsLoveStreams = this.streams.pipe(
    map((stream) => stream.sort((a, b) => a.viewer_count - b.viewer_count))
  );

  mostPopularStreams = this.streams.pipe(
    map((stream) => stream.sort((a, b) => b.viewer_count - a.viewer_count))
  );

  filteredStreams = this.searchValue.pipe(
    debounceTime(200),
    distinctUntilChanged(),
    switchMap((searchTerm) => {
      return this.streamColllectionService.search(searchTerm);
    })
  );

  constructor(
    private readonly streamColllectionService: StreamCollectionService
  ) {}

  filterStreams(event: FilterEventPayload): void {
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
          this.searchValue.next(event.value)
        } else {
          this.templateStreams = this.streams;
        }
        break;
    }
  }

  forceRefresh() {
    this.streamColllectionService.ngOnDestroy();
    this.templateStreams = this.streamColllectionService.poll();
  }

  trackStream(_index: number, item: StreamInfo) {
    return `${item.id}-${item.viewer_count}`;
  }
}
