import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  faHeart,
  faFire,
  faSync,
  faRunning,
  faMale,
} from '@fortawesome/free-solid-svg-icons';
import { Observable, of } from 'rxjs';
import { LanguageCode } from './language-code';
import { ProgrammingLanguage } from '../utils';

export enum FilterEvents {
  MostPopular = 'mostPopular',
  NeedsLove = 'needsLove',
  Search = 'search',
  MarathonRunners = 'marathonRunners',
  Starters = 'starters',
}

export enum Layout {
  Default,
  TextOnly,
}

export interface FilterEventPayload {
  type: FilterEvents;
  value?: string;
}

@Component({
  selector: 'nbp-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css'],
})
export class FiltersComponent {
  @Input() languages?: Observable<LanguageCode[]> = of([]);

  @Input() programmingLanguages?: Observable<ProgrammingLanguage[]> = of([]);

  @Output() filterChanged = new EventEmitter<FilterEventPayload>();

  @Output() languageChanged = new EventEmitter<string>();

  @Output()
  programmingLanguageChanged = new EventEmitter<ProgrammingLanguage | null>();

  @Output() refreshStream = new EventEmitter();

  @Output() layoutChanged = new EventEmitter<Layout>();

  filters: { [key: string]: boolean } = {
    ...this.initFilters(),
    [FilterEvents.MostPopular]: true,
  };

  languageFilter: Record<LanguageCode, boolean> = {} as Record<
    LanguageCode,
    boolean
  >;

  programmingLanguageFilter: Record<
    ProgrammingLanguage,
    boolean
  > = {} as Record<ProgrammingLanguage, boolean>;

  events = FilterEvents;

  layout = Layout;

  faHeart = faHeart;

  faFire = faFire;

  faSync = faSync;

  faRunning = faRunning;

  faMale = faMale;

  emitFilter(event: FilterEvents, elemEvent?: Event) {
    this.resetFilters();
    this.selectFilter(event);
    const elem = elemEvent?.target as HTMLInputElement;
    this.filterChanged.emit({
      type: event,
      ...(elemEvent && { value: elem.value }),
    });
  }

  emitLanguage(language: LanguageCode) {
    if (this.languageFilter[language]) {
      this.languageFilter = { ...this.languageFilter, [language]: false };
      this.languageChanged.emit('');
    } else {
      this.languageFilter = Object.keys(this.languageFilter).reduce(
        (acc, curr) => {
          acc[curr as LanguageCode] = false;
          return acc;
        },
        {} as Record<LanguageCode, boolean>
      );

      this.languageFilter = { ...this.languageFilter, [language]: true };
      this.languageChanged.emit(language);
    }
  }

  emitProgrammingLanguage(language: ProgrammingLanguage) {
    if (this.programmingLanguageFilter[language]) {
      this.programmingLanguageFilter = {
        ...this.programmingLanguageFilter,
        [language]: false,
      };
      this.programmingLanguageChanged.emit(null);
    } else {
      this.programmingLanguageFilter = Object.keys(
        this.programmingLanguageFilter
      ).reduce((acc, curr) => {
        acc[curr as ProgrammingLanguage] = false;
        return acc;
      }, {} as Record<ProgrammingLanguage, boolean>);

      this.programmingLanguageFilter = {
        ...this.programmingLanguageFilter,
        [language]: true,
      };
      this.programmingLanguageChanged.emit(language);
    }
  }

  emitRefresh() {
    this.refreshStream.emit();
    this.resetFilters();
    this.selectFilter(FilterEvents.MostPopular);
  }

  selectFilter(event: FilterEvents) {
    this.filters = { ...this.filters, [event]: true };
  }

  resetFilters() {
    this.filters = this.initFilters();
  }

  initFilters() {
    return Object.values(FilterEvents).reduce((acc, curr) => {
      acc[curr] = false;
      return acc;
    }, {} as { [key: string]: boolean });
  }
}
