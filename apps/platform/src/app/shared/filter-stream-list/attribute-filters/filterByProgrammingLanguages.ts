import { of } from 'rxjs';
import { StreamInfo } from '../../../stream-info';
import {
  KeywordMapKey,
  KEYWORD_MAP,
  ProgrammingLanguage,
  searchKeywords,
} from '../../../utils';

export const filterByProgrammingLanguages = (
  languageFilteredStreams: StreamInfo[],
  programmingLanguages: ProgrammingLanguage[] | null
) => {
  return !programmingLanguages
    ? of([])
    : of(
        languageFilteredStreams.filter((s) => {
          return programmingLanguages.some((programmingLanguage) => {
            if (programmingLanguage === ProgrammingLanguage.Uncategorized) {
              return Object.keys(KEYWORD_MAP)
                .filter((k) => k !== ProgrammingLanguage.Uncategorized)
                .every(
                  (k) =>
                    !KEYWORD_MAP[k as KeywordMapKey].some((keyword: string) =>
                      searchKeywords(keyword, s)
                    )
                );
            }
            return KEYWORD_MAP[programmingLanguage].some((k) =>
              searchKeywords(k, s)
            );
          });
        })
      );
};
