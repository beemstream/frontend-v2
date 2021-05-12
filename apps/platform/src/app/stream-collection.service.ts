import { Injectable, OnDestroy } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { StreamInfo } from './stream-info';
import { StreamListService } from './streams-list-service';
import { Observable, of, Subject, timer } from 'rxjs';
import { map, retry, shareReplay, switchMap, takeUntil } from 'rxjs/operators';
import { environment } from '../environments/environment';
import {
  filterStreamBySearchTerm,
  getStreamListLanguages,
  getAvailableProgrammingLanguages,
  Language,
} from './utils';

@Injectable()
export class StreamCollectionService implements OnDestroy, StreamListService {
  streams: Observable<StreamInfo[]>;

  stopPolling = new Subject();

  refreshTime = 30000;

  languages = of([]);

  constructor(private httpClient: HttpClient) {
    this.streams = this.pollStreams();
  }

  ngOnDestroy(): void {
    this.stopPolling.next();
    this.stopPolling.complete();
  }

  getStreams(): Observable<StreamInfo[]> {
    return this.streams;
  }

  searchStreams(searchTerm: string): Observable<StreamInfo[]> {
    return this.streams.pipe(
      map((stream) => filterStreamBySearchTerm(stream, searchTerm))
    );
  }

  refreshStreams() {
    this.ngOnDestroy();
    this.stopPolling = new Subject();
    this.streams = this.pollStreams();
    return this.streams;
  }

  getAvailableLanguages(): Observable<string[]> {
    return getStreamListLanguages(this.streams);
  }

  getAvailableProgrammingLanguages(): Observable<Language[]> {
    return getAvailableProgrammingLanguages(this.streams);
  }

  private getNewStreams(): Observable<StreamInfo[]> {
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

  private pollStreams(): Observable<StreamInfo[]> {
    return timer(0, this.refreshTime).pipe(
      switchMap(() => this.getNewStreams()),
      takeUntil(this.stopPolling),
      retry(),
      shareReplay(1)
    );
  }
}
