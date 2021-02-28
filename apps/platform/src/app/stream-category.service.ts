import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import {
  map,
  mergeMap,
  scan,
  shareReplay,
  switchMap,
  tap,
} from 'rxjs/operators';
import { environment } from '../environments/environment';
import { StreamInfo } from './stream-info';
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
export class StreamCategoryService {
  streams?: StreamInfo[];

  category?: StreamCategory;

  constructor(private httpClient: HttpClient) {}

  getStreamByCategory(
    category: StreamCategory,
    options?: { force: boolean }
  ): Observable<StreamInfo[]> {
    this.category = category;
    return this.streams && !options?.force
      ? of(this.streams)
      : this.httpClient
          .get<StreamInfo[]>(
            `${environment.streamCollectionUrl}/streams?category=${category}`
          )
          .pipe(
            tap((streams) => (this.streams = streams)),
            shareReplay(1)
          );
  }

  search(category: StreamCategory, searchTerm: string) {
    return this.getStreamByCategory(category).pipe(
      map((stream) => filterStreamBySearchTerm(stream, searchTerm)),
      shareReplay(1)
    );
  }

  getAvailableLanguages(): Observable<string[]> {
    if (this.category && this.streams) {
      return of(this.streams).pipe(
        switchMap(() =>
          this.getStreamByCategory(this.category as StreamCategory)
        ),
        mergeMap((s) => s),
        scan((arr, curr) => {
          arr.push(curr.language);
          return arr;
        }, [] as string[]),
        map((s) => [...new Set(s)]),
        shareReplay(1)
      );
    }
    return of([]);
  }
}
