import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { LanguageCode } from '../shared/filter-stream-list/filters/language-code';
import { StreamInfo } from '../stream-info';

export function getStreamListLanguages(
  streams: Observable<StreamInfo[]>
): Observable<LanguageCode[]> {
  return streams.pipe(
    map((s) => {
      const allLanguages = s.map((s) => s.language);
      return [...new Set(allLanguages)];
    })
  );
}
