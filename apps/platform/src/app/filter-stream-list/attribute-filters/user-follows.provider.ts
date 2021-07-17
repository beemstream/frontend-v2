import { InjectionToken, Provider } from '@angular/core';
import { Observable } from 'rxjs';
import { combineLatestWith, map } from 'rxjs/operators';
import { StreamInfo } from '../../stream-info';
import { TwitchService } from '../../twitch.service';
import { STREAM_FILTERED_LANGUAGE } from '../stream-filter.provider';

export const USER_FOLLOWS = new InjectionToken<Observable<StreamInfo[]>>(
  'FOLLOWS'
);

export const userFollowsFactory = (
  streams: Observable<StreamInfo[]>,
  twitchService: TwitchService
) => {
  return twitchService.getUserFollows().pipe(
    combineLatestWith(streams),
    map(([userFollows, streams]) => {
      return streams.filter((s) =>
        userFollows.find((u) => s.user_id === u.to_id)
      );
    })
  );
};

export const UserFollowsProvider: Provider = {
  provide: USER_FOLLOWS,
  useFactory: userFollowsFactory,
  deps: [STREAM_FILTERED_LANGUAGE, TwitchService],
};
