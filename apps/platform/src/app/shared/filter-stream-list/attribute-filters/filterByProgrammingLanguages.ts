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
          const allTags = s.tag_ids.join(' ');
          return programmingLanguages.some((programmingLanguage) => {
            if (programmingLanguage === ProgrammingLanguage.Uncategorized) {
              return Object.keys(KEYWORD_MAP)
                .filter((k) => k !== ProgrammingLanguage.Uncategorized)
                .every(
                  (k) =>
                    !KEYWORD_MAP[k as KeywordMapKey].some(
                      (keyword: string) =>
                        searchKeywords(keyword, s.title) ||
                        searchKeywords(keyword, allTags)
                    )
                );
            }
            return KEYWORD_MAP[programmingLanguage].some(
              (k) => searchKeywords(k, s.title) || searchKeywords(k, allTags)
            );
          });
        })
      );
};
