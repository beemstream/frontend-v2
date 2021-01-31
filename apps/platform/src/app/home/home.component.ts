import { Component, OnInit } from '@angular/core';
import { StreamCollectionService } from '../stream-collection.service';
import { debounceTime, distinctUntilChanged, map, switchMap } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import { faHeart, faFire } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'nbp-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [StreamCollectionService]
})
export class HomeComponent implements OnInit {

  faHeart = faHeart;
  faFire = faFire;

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
      return this.streamColllectionService.search(searchTerm);
    })
  );

  constructor(private readonly streamColllectionService: StreamCollectionService) { }

  ngOnInit(): void {
  }

  filterStreams(event: KeyboardEvent): void {
    const inputValue = (event.target as HTMLInputElement).value.trim();
    if (!!inputValue) {
      this.templateStreams = this.filteredStreams;
      this.searchValue.next(inputValue);
    } else {
      this.templateStreams = this.streams;
    }
    this.resetFilters();
    this.filters.fitler = !this.filters.fitler;
  }

  getMostPopularStreams(): void {
    this.templateStreams = this.mostPopularStreams;
    this.resetFilters();
    this.filters.popular = !this.filters.popular;
  }

  getNeedsLoveStreams(): void {
    this.templateStreams = this.needsLoveStreams;
    this.resetFilters();
    this.filters.needsLove = !this.filters.needsLove;
  }
  
  resetFilters() {
    this.filters = { popular: false, needsLove: false, fitler: false };
  }

  filters = { popular: true, needsLove: false, fitler: false };

}
