import {
  StreamLanguageProvider,
  StreamListProvider,
  StreamFilteredLanguageProvider,
  SearchTermProvider,
  StreamProgrammingLanguageProvider,
} from '../stream-filter.provider';
import { MarathonRunnersProvider } from './marathon-runners.provider';
import { MostPopularProvider } from './most-popular.provider';
import { NeedsLoveProvider } from './needs-love.provider';
import { SlowStartersProvider } from './slow-starters.provider';

export * from './most-popular.provider';
export * from './needs-love.provider';
export * from './marathon-runners.provider';
export * from './slow-starters.provider';

export const StreamQueryFilters = [
  StreamLanguageProvider,
  StreamProgrammingLanguageProvider,
  StreamListProvider,
  StreamFilteredLanguageProvider,
  MostPopularProvider,
  NeedsLoveProvider,
  MarathonRunnersProvider,
  SlowStartersProvider,
  SearchTermProvider,
];
