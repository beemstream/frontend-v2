import { TestBed } from '@angular/core/testing';

import { TwitchOauthService } from './twitch-oauth.service';

describe('TwitchOauthService', () => {
  let service: TwitchOauthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TwitchOauthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
