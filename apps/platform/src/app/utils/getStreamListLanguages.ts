import { Observable } from 'rxjs';
import { mergeMap, scan, map, shareReplay } from 'rxjs/operators';
import { StreamInfo } from '../stream-info';

export function getStreamListLanguages(
  streams: Observable<StreamInfo[]>
): Observable<string[]> {
  return streams.pipe(
    mergeMap((s) => s),
    scan((arr, curr) => {
      arr.push(curr.language);
      return arr;
    }, [] as string[]),
    map((s) => [...new Set(s)]),
    shareReplay(1)
  );
}
