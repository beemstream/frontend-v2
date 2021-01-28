import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { StreamInfo } from './stream-info';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StreamCollectionService {

  constructor(private httpClient: HttpClient) { }

  getStreams(): Observable<StreamInfo[]> {
      return this.httpClient.get<StreamInfo[]>('http://localhost/streams');
  }
}
