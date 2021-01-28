import { Component, OnInit } from '@angular/core';
import { StreamCollectionService } from '../stream-collection.service';
import { debounceTime, distinctUntilChanged, filter, flatMap, map, reduce, switchMap } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'nbp-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  searchValue = new BehaviorSubject<string>('');

  streams = this.streamColllectionService.getStreams();

  templateStreams = this.streams.pipe(
      map(s => s)
  );

  needsLoveStreams = this.streams.pipe(
      map(stream => stream.sort((a, b) => a.viewer_count - b.viewer_count )),
  );

  mostPopularStreams = this.streams.pipe(
      map(stream => stream.sort((a, b) => b.viewer_count - a.viewer_count )),
  );

  filteredStreams = this.searchValue.pipe(
    debounceTime(200),
    distinctUntilChanged(),
    switchMap(searchTerm => {
      return this.streamColllectionService.searchByTitle(searchTerm);
    })
  );

  constructor(private readonly streamColllectionService: StreamCollectionService) { }

  ngOnInit(): void {
  }

  filterStreams(event: KeyboardEvent): void {
      const inputValue = (event.target as HTMLInputElement).value.toLowerCase().trim();
      this.searchValue.next(inputValue);
      this.templateStreams = this.filteredStreams;
  }

  getMostPopularStreams(): void {
    this.templateStreams = this.mostPopularStreams;
  }

  getNeedsLoveStreams(): void {
    this.templateStreams = this.needsLoveStreams;
  }

}
