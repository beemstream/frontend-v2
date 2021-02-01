import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { StreamDetail } from './stream-detail';

@Injectable()
export class StreamDetailService {
  constructor(private httpClient: HttpClient) {}

  getStreamDetails(userId: number): Observable<StreamDetail> {
    return this.httpClient.get<StreamDetail>(`${environment.streamCollectionUrl}/stream/${userId}`);
  }
}
