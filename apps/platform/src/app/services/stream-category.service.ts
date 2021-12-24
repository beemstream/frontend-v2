import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { Observable, of, Subject, timer } from 'rxjs';
import {
  map,
  retry,
  share,
  shareReplay,
  switchMap,
  takeUntil,
} from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { LanguageCode } from '../shared/filter-stream-list/filters/language-code';
import { StreamInfo } from '../stream-info';
import {
  getAvailableProgrammingLanguages,
  ProgrammingLanguage,
} from '../utils';
import { filterStreamBySearchTerm } from '../utils/filterStreamBySearchTerm';
import { getStreamListLanguages } from '../utils/getStreamListLanguages';

export enum StreamCategory {
  WebDevelopment = 'webdevelopment',
  GameDevelopment = 'gamedevelopment',
  MobileDevelopment = 'mobiledevelopment',
  Programming = 'programming',
  None = '',
}

@Injectable()
export class StreamCategoryService implements OnDestroy {
  streams: Observable<StreamInfo[]> = of([]);

  stopPolling = new Subject();

  refreshTime = 30000;

  constructor(private httpClient: HttpClient) {}

  refreshStreams(category?: StreamCategory) {
    this.ngOnDestroy();
    this.stopPolling = new Subject();
    this.streams = this.pollStreams(category);
    return this.streams;
  }

  ngOnDestroy() {
    this.stopPolling.next(null);
    this.stopPolling.complete();
  }

  getStreams(category?: StreamCategory): Observable<StreamInfo[]> {
    this.streams = this.pollStreams(category);
    return this.streams;
  }

  searchStreams(searchTerm: string, category?: StreamCategory) {
    return this.getStreams(category).pipe(
      map((stream) => filterStreamBySearchTerm(stream, searchTerm)),
      shareReplay(1)
    );
  }

  getAvailableLanguages(): Observable<LanguageCode[]> {
    return getStreamListLanguages(this.streams);
  }

  getAvailableProgrammingLanguages(): Observable<ProgrammingLanguage[]> {
    return getAvailableProgrammingLanguages(this.streams).pipe(share());
  }

  getNewStreams(
    category: StreamCategory = StreamCategory.None
  ): Observable<StreamInfo[]> {
    return this.httpClient
      .get<StreamInfo[]>(
        `${environment.streamCollectionUrl}/streams?category=${category}`
      )
      .pipe(shareReplay(1));
  }

  private pollStreams(category?: StreamCategory): Observable<StreamInfo[]> {
    return timer(0, this.refreshTime).pipe(
      switchMap(() => this.getNewStreams(category)),
      takeUntil(this.stopPolling),
      retry(),
      shareReplay(1)
    );
  }
}
