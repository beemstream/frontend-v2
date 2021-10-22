import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { FilterEvents } from '../../../shared/filter-stream-list/filters/filters.component';
import { StreamInfo } from '../../../stream-info';
import { TwitchService } from '../../../services/twitch.service';

const categoryFilterMap: Record<
  string,
  (
    stream: StreamInfo[],
    options: Record<string, unknown>
  ) => Observable<StreamInfo[]>
> = {
  [FilterEvents.MostPopular]: (stream: StreamInfo[]) =>
    of(stream.sort((a, b) => b.viewer_count - a.viewer_count)),
  [FilterEvents.NeedsLove]: (stream: StreamInfo[]) =>
    of(stream.sort((a, b) => a.viewer_count - b.viewer_count)),
  [FilterEvents.Starters]: (stream: StreamInfo[]) =>
    of(
      stream.sort(
        (a, b) =>
          new Date(b.started_at).getTime() - new Date(a.started_at).getTime()
      )
    ),
  [FilterEvents.MarathonRunners]: (stream: StreamInfo[]) =>
    of(
      stream.sort(
        (a, b) =>
          new Date(a.started_at).getTime() - new Date(b.started_at).getTime()
      )
    ),
  [FilterEvents.Follows]: (stream: StreamInfo[], { service }) =>
    (service as TwitchService).getUserFollows().pipe(
      map((userFollows) => {
        return stream.filter((s) =>
          userFollows.find((u) => s.user_id === u.to_id)
        );
      })
    ),
  [FilterEvents.Search]: (stream: StreamInfo[]) => of(stream),
};

export const filterByCategory =
  (twitchService: TwitchService) =>
  (streams: StreamInfo[], filter: FilterEvents) => {
    return categoryFilterMap[filter](streams, { service: twitchService });
  };
