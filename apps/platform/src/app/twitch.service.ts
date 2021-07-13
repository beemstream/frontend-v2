import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from '../environments/environment';

export interface UserFollow {
  from_id: string;
  from_login: string;
  from_name: string;
  to_id: string;
  to_name: string;
  followed_at: string;
}

export interface UserFollows {
  data: UserFollow[];
}

@Injectable({
  providedIn: 'root',
})
export class TwitchService {
  follows: ReplaySubject<UserFollow[]> = new ReplaySubject();

  constructor(private httpClient: HttpClient) {}

  getUserFollows(token: string): Observable<UserFollow[]> {
    const headers = new HttpHeaders().append('token', `Bearer ${token}`);
    return this.httpClient
      .get<UserFollow[]>(`${environment.streamCollectionUrl}/follows`, {
        headers,
        withCredentials: true,
      })
      .pipe(tap((f) => this.follows.next(f)));
  }
}
