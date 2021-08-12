import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EMPTY, Observable, of, ReplaySubject, timer } from 'rxjs';
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
  private accessToken: ReplaySubject<TwitchToken | null> = new ReplaySubject();
  private validateUserToken: ReplaySubject<TwitchValidateToken | null> =
    new ReplaySubject();

  storedToken: StoredTwitchToken | null = this.localStorage.getItem('token');

  storedUserToken: TwitchValidateToken | null =
    this.localStorage.getItem('userToken');

  refreshTokenAuth = this.fetchAccessTokenWithRefresh(
    this.storedToken?.access_token
  );

  validateTokenAuth = this.fetchValidateToken(this.storedToken?.access_token);

  authenticate = this.route.queryParams.pipe(
    switchMap((params) => {
      return params.code ? this.fetchAccessToken(params.code) : EMPTY;
    })
  );

  constructor(
    private httpClient: HttpClient,
    private route: ActivatedRoute,
    private localStorage: LocalstorageService
  ) {
    this.accessToken.next(null);
    this.validateUserToken.next(null);

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
    this.validateTokenAuth.subscribe();
  }

  getAccessToken(): Observable<TwitchToken | null> {
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
          t
            ? timer(+t.access_token * 1000).pipe(
                switchMap(() =>
                  this.fetchAccessTokenWithRefresh(t.access_token)
                )
              )
            : EMPTY
        )
      );
  }

  fetchAccessTokenWithRefresh(accessToken?: string): Observable<TwitchToken> {
    const request = this.httpClient
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
          t
            ? timer(+t.expires_in * 1000).pipe(
                switchMap(() =>
                  this.fetchAccessTokenWithRefresh(t.access_token)
                )
              )
            : EMPTY
        )
      );

    return of(accessToken).pipe(switchMap((t) => (t ? request : EMPTY)));
  }

  fetchValidateToken(token?: string) {
    const headers = token
      ? new HttpHeaders().append('Authorization', `OAuth ${token}`)
      : new HttpHeaders();
    const request = this.httpClient
      .get<TwitchValidateToken>('https://id.twitch.tv/oauth2/validate', {
        headers,
      })
      .pipe(
        tap((validateToken) => this.validateUserToken.next(validateToken)),
        tap((validateToken) =>
          this.localStorage.setItem('userToken', validateToken)
        )
      );

    return of(token).pipe(switchMap((t) => (t ? request : EMPTY)));
  }

  logout() {
    this.localStorage.removeItem('token');
    this.localStorage.removeItem('userToken');
    this.accessToken.next(null);
    this.validateUserToken.next(null);

    return this.httpClient.get<void>(`${environment.twitchOauthUrl}/logout`, {
      withCredentials: true,
    });
  }
}
