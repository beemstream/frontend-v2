import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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
  constructor(private httpClient: HttpClient) {}

  getUserFollows(token: string, userId: string): Observable<UserFollows> {
    const headers = new HttpHeaders()
      .append('Authorization', `Bearer ${token}`)
      .append('Client-Id', environment.clientId);
    return this.httpClient.get<UserFollows>(
      `https://api.twitch.tv/helix/users/follows?from_id=${userId}&first=100`,
      { headers }
    );
  }
}
