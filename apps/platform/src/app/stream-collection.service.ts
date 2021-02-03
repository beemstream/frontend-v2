import { Injectable, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { StreamInfo } from './stream-info';
import { Observable, Subject, timer } from 'rxjs';
import { map, retry, shareReplay, switchMap, takeUntil } from 'rxjs/operators';
import { environment } from '../environments/environment';

@Injectable()
export class StreamCollectionService implements OnDestroy {
  streams: Observable<StreamInfo[]>;

  stopPolling = new Subject();

  refreshTime = 30000;

  constructor(private httpClient: HttpClient) {
    const poll = timer(0, this.refreshTime).pipe(
      switchMap(() => this.getNewStreams()),
      retry(),
      shareReplay(1),
      takeUntil(this.stopPolling)
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

  getNewStreams(): Observable<StreamInfo[]> {
    return this.httpClient.get<StreamInfo[]>(`${environment.streamCollectionUrl}/streams`);
  }

  search(searchTerm: string): Observable<StreamInfo[]> {
    return this.getStreams().pipe(
      map((stream) =>
        stream.filter((stream) => {
          const doesContainTitle = this.compareStr(stream.title, searchTerm);
          const doesContainUser = this.compareStr(stream.user_name, searchTerm);
          const doesContainTag = stream.tag_ids.includes(
            searchTerm.toLowerCase()
          );

          return searchTerm
            ? doesContainTitle || doesContainTag || doesContainUser
            : true;
        })
      )
    );
  }

  compareStr(a: string, b: string): boolean {
    const normalizedA = a.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    const normalizedB = b.normalize('NFD').replace(/[\u0300-\u036f]/g, '');

    return normalizedA.toLowerCase().includes(normalizedB.toLowerCase());
  }
}
