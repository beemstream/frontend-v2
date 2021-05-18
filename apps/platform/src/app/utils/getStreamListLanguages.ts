import { Observable } from 'rxjs';
import { mergeMap, scan, map, shareReplay } from 'rxjs/operators';
import { LanguageCode } from '../filters/language-code';
import { StreamInfo } from '../stream-info';

export function getStreamListLanguages(
  streams: Observable<StreamInfo[]>
): Observable<LanguageCode[]> {
  return streams.pipe(
    mergeMap((s) => s),
    scan((arr, curr) => {
      arr.push(curr.language);
      return arr;
    }, [] as LanguageCode[]),
    map((s) => [...new Set(s)]),
    shareReplay(1)
  );
}
