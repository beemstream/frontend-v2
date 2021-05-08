import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { Observable, of, Subject, timer } from 'rxjs';
import { map, retry, shareReplay, switchMap, takeUntil } from 'rxjs/operators';
import { environment } from '../environments/environment';
import { StreamInfo } from './stream-info';
import { StreamListService } from './streams-list-service';
import { filterStreamBySearchTerm } from './utils/filterStreamBySearchTerm';
import { getStreamListLanguages } from './utils/getStreamListLanguages';

export enum StreamCategory {
  WebDevelopment = 'webdevelopment',
  GameDevelopment = 'gamedevelopment',
  MobileDevelopment = 'mobiledevelopment',
  Programming = 'programming',
}

@Injectable()
export class StreamCategoryService implements OnDestroy, StreamListService {
  streams: Observable<StreamInfo[]> = of([]);

  stopPolling = new Subject();

  refreshTime = 30000;

  constructor(private httpClient: HttpClient) {}

  refreshStreams(category: StreamCategory) {
    this.ngOnDestroy();
    this.stopPolling = new Subject();
    this.streams = this.pollStreams(category);
    return this.streams;
  }

  ngOnDestroy() {
    this.stopPolling.next();
    this.stopPolling.complete();
  }

  getStreams(category: StreamCategory): Observable<StreamInfo[]> {
    this.streams = this.pollStreams(category);
    return this.streams;
  }

  searchStreams(searchTerm: string, category: StreamCategory) {
    return this.getStreams(category).pipe(
      map((stream) => filterStreamBySearchTerm(stream, searchTerm)),
      shareReplay(1)
    );
  }

  getAvailableLanguages(): Observable<string[]> {
    return getStreamListLanguages(this.streams);
  }

  private pollStreams(category: StreamCategory): Observable<StreamInfo[]> {
    return timer(0, this.refreshTime).pipe(
      switchMap(() => this.getNewStreams(category)),
      takeUntil(this.stopPolling),
      retry(),
      shareReplay(1)
    );
  }

  private getNewStreams(category: StreamCategory): Observable<StreamInfo[]> {
    return this.httpClient
      .get<StreamInfo[]>(
        `${environment.streamCollectionUrl}/streams?category=${category}`
      )
      .pipe(shareReplay(1));
  }
}
