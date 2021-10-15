import {
  StreamLanguageProvider,
  StreamListProvider,
  StreamFilteredLanguageProvider,
  SearchTermProvider,
  StreamProgrammingLanguageProvider,
} from '../stream-filter.provider';
import { UserFollowsProvider } from './user-follows.provider';
import { MarathonRunnersProvider } from './marathon-runners.provider';
import { MostPopularProvider } from './most-popular.provider';
import { NeedsLoveProvider } from './needs-love.provider';
import { SlowStartersProvider } from './slow-starters.provider';

export * from './most-popular.provider';
export * from './needs-love.provider';
export * from './marathon-runners.provider';
export * from './slow-starters.provider';
export * from './user-follows.provider';

export const StreamQueryFilters = [
  StreamLanguageProvider,
  StreamProgrammingLanguageProvider,
  StreamListProvider,
  SearchTermProvider,
  StreamFilteredLanguageProvider,
  MostPopularProvider,
  NeedsLoveProvider,
  MarathonRunnersProvider,
  SlowStartersProvider,
  UserFollowsProvider,
];

export * from './filterByCategory';
export * from './filterByLanguage';
export * from './filterByProgrammingLanguages';
