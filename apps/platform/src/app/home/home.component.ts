import { Component } from '@angular/core';
import { StreamCollectionService } from '../stream-collection.service';
import {
  debounceTime,
  distinctUntilChanged,
  switchMap,
} from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';

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

  forceRefresh() {
    this.templateStreams = this.streamColllectionService.poll();
  }
}
