import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EMPTY, Observable, ReplaySubject } from 'rxjs';
import { share, switchMap, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { TwitchOauthService } from './twitch-oauth.service';

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

  constructor(
    private httpClient: HttpClient,
    private twitchOauthService: TwitchOauthService
  ) {}

  getUserFollows(): Observable<UserFollow[]> {
    return this.twitchOauthService
      .getAccessToken()
      .pipe(
        switchMap((t) => (t ? this.fetchUserfollows(t.access_token) : EMPTY))
      );
  }

  fetchUserfollows(token: string) {
    const headers = new HttpHeaders().append('token', `Bearer ${token}`);
    return this.httpClient
      .get<UserFollow[]>(`${environment.streamCollectionUrl}/follows`, {
        headers,
        withCredentials: true,
      })
      .pipe(
        tap((f) => this.follows.next(f)),
        share()
      );
  }
}
