import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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

  constructor(private httpClient: HttpClient) { }

  getStreamByCategory(category: StreamCategory): Observable<StreamInfo[]> {
    return this.httpClient.get<StreamInfo[]>(`${environment.streamCollectionUrl}/streams?category=${category}`);
  }
}
