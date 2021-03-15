import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { Observable, Subject, timer } from 'rxjs';
import {
  map,
  mergeMap,
  retry,
  scan,
  shareReplay,
  switchMap,
  takeUntil,
} from 'rxjs/operators';
import { environment } from '../environments/environment';
import { StreamInfo } from './stream-info';
import { StreamListService } from './streams-list-service';
import { filterStreamBySearchTerm } from './utils/filterStreamBySearchTerm';

export enum StreamCategory {
  WebDevelopment = 'webdevelopment',
  GameDevelopment = 'gamedevelopment',
  MobileDevelopment = 'mobiledevelopment',
  Programming = 'programming',
}

@Injectable({
  providedIn: 'root',
})
export class StreamCategoryService implements OnDestroy, StreamListService {
  streams?: Observable<StreamInfo[]>;

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

  getAvailableLanguages(category: StreamCategory): Observable<string[]> {
    return this.getStreams(category).pipe(
      mergeMap((s) => s),
      scan((arr, curr) => {
        arr.push(curr.language);
        return arr;
      }, [] as string[]),
      map((s) => [...new Set(s)]),
      shareReplay(1)
    );
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
