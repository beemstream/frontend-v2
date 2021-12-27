import { of } from 'rxjs';
import { StreamInfo } from '../../../stream-info';

export const filterByLanguage = (
  filteredStreams: StreamInfo[],
  language: string[] | null
) => {
  return !language
    ? of([])
    : of(
        filteredStreams.filter((s) => {
          return language.some((l) => s.language === l);
        })
      );
};
