import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, of, ReplaySubject, timer } from 'rxjs';
import { concatMap, switchMap, tap } from 'rxjs/operators';
import { environment } from '../environments/environment';
import { LocalstorageService } from './localstorage.service';
import { getExpiryTime, isDateExpired } from './utils';

export interface StoredTwitchToken extends TwitchToken {
  expiry_time: string;
}

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

  storedToken: StoredTwitchToken | null = this.localStorage.getItem('token');

  storedUserToken: TwitchValidateToken | null = this.localStorage.getItem(
    'userToken'
  );

  refreshTokenAuth = this.fetchAccessTokenWithRefresh(
    this.storedToken?.access_token
  );

  authenticate = this.route.queryParams.pipe(
    switchMap((params) => {
      return params.code ? this.fetchAccessToken(params.code) : of();
    })
  );

  constructor(
    private httpClient: HttpClient,
    private route: ActivatedRoute,
    private localStorage: LocalstorageService
  ) {
    if (this.storedToken) {
      if (!isDateExpired(this.storedToken.expiry_time)) {
        this.accessToken.next(this.storedToken);

        if (this.storedUserToken) {
          this.validateUserToken.next(this.storedUserToken);
        }
      }
    }

    this.authenticate.subscribe();
    this.refreshTokenAuth.subscribe();
  }

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
      .post<TwitchToken>(
        environment.twitchOauthUrl,
        {
          code,
          grant_type: grantType,
        },
        { withCredentials: true }
      )
      .pipe(
        tap((token) => this.accessToken.next(token)),
        tap((token) =>
          this.localStorage.setItem('token', {
            ...token,
            expiry_time: getExpiryTime(+token.expires_in).toUTCString(),
          })
        ),
        concatMap((token) => this.fetchValidateToken(token.access_token)),
        switchMap(() => this.getAccessToken()),
        switchMap((t) =>
          timer(+t.access_token * 1000).pipe(
            switchMap(() => this.fetchAccessTokenWithRefresh(t.access_token))
          )
        )
      );
  }

  fetchAccessTokenWithRefresh(accessToken?: string): Observable<TwitchToken> {
    return this.httpClient
      .post<TwitchToken>(
        environment.twitchOauthUrl,
        {
          access_token: accessToken,
          grant_type: 'refresh_token',
        },
        { withCredentials: true }
      )
      .pipe(
        tap((token) => this.accessToken.next(token)),
        tap((token) => this.localStorage.setItem('token', token)),
        switchMap(() => this.getAccessToken()),
        switchMap((t) =>
          timer(+t.expires_in * 1000).pipe(
            switchMap(() => this.fetchAccessTokenWithRefresh(t.access_token))
          )
        )
      );
  }

  fetchValidateToken(token: string) {
    const headers = new HttpHeaders().append('Authorization', `OAuth ${token}`);
    return this.httpClient
      .get<TwitchValidateToken>('https://id.twitch.tv/oauth2/validate', {
        headers,
      })
      .pipe(
        tap((validateToken) => this.validateUserToken.next(validateToken)),
        tap((validateToken) =>
          this.localStorage.setItem('userToken', validateToken)
        )
      );
  }
}
