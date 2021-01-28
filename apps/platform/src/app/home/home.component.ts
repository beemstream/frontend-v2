import { Component, OnInit } from '@angular/core';
import { StreamCollectionService } from '../stream-collection.service';
import { filter, flatMap, map, reduce, share } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { StreamInfo } from '../stream-info';

@Component({
  selector: 'nbp-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  streams = this.streamColllectionService.getStreams().pipe(
    share()
  );

  templateStreams = this.streams;

  needsLoveStreams = this.streams.pipe(
      map(stream => stream.sort((a, b) => a.viewer_count - b.viewer_count )),
  );

  mostPopularStreams = this.streams.pipe(
      map(stream => stream.sort((a, b) => b.viewer_count - a.viewer_count )),
  );

  filteredStreams: Observable<StreamInfo[]> = of([])

  constructor(private readonly streamColllectionService: StreamCollectionService) { }

  ngOnInit(): void {
  }

  filterStreams(event: KeyboardEvent): void {
      const inputValue = (event.target as HTMLInputElement).value.toLowerCase().trim();
      if (!!inputValue) {
          this.templateStreams = this.streams.pipe(
              flatMap(stream => stream),
              filter(stream => stream.title.toLowerCase().includes(inputValue)),
              reduce((acc, val) => {
                  acc.push(val);
                  return acc;
              }, [])
          );
      } else {
          this.templateStreams = this.streams;
      }
  }

  getMostPopularStreams(): void {
    this.templateStreams = this.mostPopularStreams;
  }

  getNeedsLoveStreams(): void {
    this.templateStreams = this.needsLoveStreams;
  }

}
