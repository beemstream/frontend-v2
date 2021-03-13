import { Injectable, OnDestroy } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { StreamInfo } from './stream-info';
import { StreamListService } from './streams-list-service';
import { Observable, of, Subject, timer } from 'rxjs';
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
import { filterStreamBySearchTerm } from './utils/filterStreamBySearchTerm';

@Injectable()
export class StreamCollectionService implements OnDestroy, StreamListService {
  streams: Observable<StreamInfo[]>;

  stopPolling = new Subject();

  refreshTime = 30000;

  languages = of([]);

  constructor(private httpClient: HttpClient) {
    const poll = timer(0, this.refreshTime).pipe(
      switchMap(() => this.getNewStreams()),
      takeUntil(this.stopPolling),
      retry(),
      shareReplay(1)
    );

    this.streams = poll;
  }

  ngOnDestroy(): void {
    this.stopPolling.next();
    this.stopPolling.complete();
  }

  getStreams(): Observable<StreamInfo[]> {
    return this.streams;
  }

  searchStreams(searchTerm: string): Observable<StreamInfo[]> {
    return this.getStreams().pipe(
      map((stream) => filterStreamBySearchTerm(stream, searchTerm))
    );
  }

  poll() {
    this.ngOnDestroy();
    this.stopPolling = new Subject();
    return timer(0, this.refreshTime).pipe(
      switchMap(() => this.getNewStreams()),
      takeUntil(this.stopPolling),
      retry(),
      shareReplay(1)
    );
  }

  getNewStreams(): Observable<StreamInfo[]> {
    const headers = new HttpHeaders().set(
      'Cache-Control',
      'max-age=0, no-cache, must-revalidate, proxy-revalidate'
    );

    return this.httpClient
      .get<StreamInfo[]>(`${environment.streamCollectionUrl}/streams`, {
        headers,
      })
      .pipe(shareReplay(1));
  }

  getAvailableLanguages(): Observable<string[]> {
    return this.streams.pipe(
      mergeMap((s) => s),
      scan((arr, curr) => {
        arr.push(curr.language);
        return arr;
      }, [] as string[]),
      map((s) => [...new Set(s)]),
      shareReplay(1)
    );
  }
}
