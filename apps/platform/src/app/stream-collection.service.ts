import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { StreamInfo } from './stream-info';
import { Observable } from 'rxjs';
import { filter, flatMap, reduce, share } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class StreamCollectionService {

  constructor(private httpClient: HttpClient) { }

  getStreams(): Observable<StreamInfo[]> {
      return this.httpClient.get<StreamInfo[]>('http://localhost/streams').pipe(share());
  }

  searchByTitle(searchTerm: string): Observable<StreamInfo[]> {
    return this.getStreams().pipe(
      flatMap(stream => stream),
      filter(stream => {
        return !!searchTerm ? stream.title.toLowerCase().includes(searchTerm) : true
      }),
      reduce((acc, val) => {
        acc.push(val);
        return acc;
      }, [])
    )
  }
}
