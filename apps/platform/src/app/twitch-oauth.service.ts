import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { concatMap, switchMap, tap } from 'rxjs/operators';
import { environment } from '../environments/environment';

export interface TwitchToken {
  access_token: string;
  expires_in: string;
}

export interface TwitchValidateToken {
  client_id: string;
  login: string;
  scopes: string[];
  user_id: string;
  expires_in: string;
}

@Injectable({
  providedIn: 'root',
})
export class TwitchOauthService {
  private accessToken: ReplaySubject<TwitchToken> = new ReplaySubject();
  private validateUserToken: ReplaySubject<TwitchValidateToken> = new ReplaySubject();

  constructor(private httpClient: HttpClient) {}

  getAccessToken(): Observable<TwitchToken> {
    return this.accessToken.asObservable();
  }

  getValidateUserToken() {
    return this.validateUserToken.asObservable();
  }

  fetchAccessToken(
    code: string | null,
    grantType = 'code'
  ): Observable<TwitchToken> {
    return this.httpClient
      .post<TwitchToken>(environment.twitchOauthUrl, {
        code,
        grant_type: grantType,
      })
      .pipe(
        tap((token) => this.accessToken.next(token)),
        concatMap((token) => this.fetchValidateToken(token.access_token)),
        switchMap(() => this.getAccessToken())
      );
  }

  fetchValidateToken(token: string) {
    const headers = new HttpHeaders().append('Authorization', `OAuth ${token}`);
    return this.httpClient
      .get<TwitchValidateToken>('https://id.twitch.tv/oauth2/validate', {
        headers,
      })
      .pipe(tap((validateToken) => this.validateUserToken.next(validateToken)));
  }
}
