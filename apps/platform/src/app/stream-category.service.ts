import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, shareReplay, tap } from 'rxjs/operators';
import { environment } from '../environments/environment';
import { StreamInfo } from './stream-info';

export enum StreamCategory {
  WebDevelopment = 'webdevelopment',
  GameDevelopment = 'gamedevelopment',
  MobileDevelopment = 'mobiledevelopment',
  Programming = 'programming',
}

@Injectable({
  providedIn: 'root'
})
export class StreamCategoryService {

  streams?: StreamInfo[];

  constructor(private httpClient: HttpClient) { }

  getStreamByCategory(category: StreamCategory): Observable<StreamInfo[]> {
    return this.streams ? of(this.streams) :
      this.httpClient.get<StreamInfo[]>(`${environment.streamCollectionUrl}/streams?category=${category}`).pipe(
        tap((streams) => this.streams = streams),
        shareReplay(1)
    );
  }

  search(category: StreamCategory, searchTerm: string) {
    return this.getStreamByCategory(category).pipe(
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
