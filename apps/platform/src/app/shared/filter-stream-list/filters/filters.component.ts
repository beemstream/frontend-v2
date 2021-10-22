import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import {
  faHeart,
  faFire,
  faSync,
  faRunning,
  faMale,
  faStar,
  IconDefinition,
} from '@fortawesome/free-solid-svg-icons';
import { Observable, of } from 'rxjs';
import { LanguageCode } from './language-code';
import { ProgrammingLanguage } from '../../../utils';
import { TwitchOauthService } from '../../../services/twitch-oauth.service';
import { map } from 'rxjs/operators';

export enum FilterEvents {
  MostPopular = 'mostPopular',
  NeedsLove = 'needsLove',
  Search = 'search',
  MarathonRunners = 'marathonRunners',
  Starters = 'starters',
  Follows = 'follows',
}

export enum Layout {
  Default,
  TextOnly,
}

export interface FilterEventPayload {
  type: FilterEvents;
  value?: string;
}

export interface CategoryFilter {
  event: FilterEvents;
  icon: IconDefinition;
  value: string;
}

@Component({
  selector: 'nbp-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FiltersComponent {
  @Input() languages?: Observable<LanguageCode[]> = of([]);

  @Input() programmingLanguages: Observable<ProgrammingLanguage[]> = of([]);

  @Output() filterChanged = new EventEmitter<FilterEventPayload>();

  @Output() languageChanged = new EventEmitter<LanguageCode[]>();

  @Output()
  programmingLanguagesChanged = new EventEmitter<ProgrammingLanguage[]>();

  @Output() refreshStream = new EventEmitter();

  @Output() layoutChanged = new EventEmitter<Layout>();

  filtersStatus: Record<FilterEvents, boolean> = {
    ...this.initFilters(),
    [FilterEvents.MostPopular]: true,
  };

  events = FilterEvents;

  layout = Layout;

  faSync = faSync;

  active = {
    event: this.events.MostPopular,
    icon: faFire,
    value: 'Most Popular',
  };

  categoryFiltersDefaults: CategoryFilter[] = [
    {
      event: this.events.MostPopular,
      icon: faFire,
      value: 'Most Popular',
    },
    {
      event: this.events.NeedsLove,
      icon: faHeart,
      value: 'Needs Love',
    },
    {
      event: this.events.MarathonRunners,
      icon: faRunning,
      value: 'Marathon Runners',
    },
    {
      event: this.events.Starters,
      icon: faMale,
      value: 'Slow Starters',
    },
  ];

  categoryFilters = this.twitchOauthService.getAccessToken().pipe(
    map((t) => {
      return t
        ? [
            ...this.categoryFiltersDefaults,
            {
              event: this.events.Follows,
              icon: faStar,
              value: 'Followed',
            },
          ]
        : this.categoryFiltersDefaults;
    })
  );

  handleFilter(filter: CategoryFilter) {
    this.active = filter;
    this.emitFilter(filter.event);
  }
  constructor(private twitchOauthService: TwitchOauthService) {}

  emitFilter(event: FilterEvents, elemEvent?: Event) {
    this.resetFilters();
    this.selectFilter(event);
    const elem = elemEvent?.target as HTMLInputElement;
    this.filterChanged.emit({
      type: event,
      ...(elemEvent && { value: elem.value }),
    });
  }

  emitRefresh() {
    this.refreshStream.emit();
    this.resetFilters();
    this.selectFilter(FilterEvents.MostPopular);
  }

  selectFilter(event: FilterEvents) {
    this.filtersStatus = { ...this.filtersStatus, [event]: true };
  }

  resetFilters() {
    this.filtersStatus = this.initFilters();
  }

  initFilters() {
    return Object.values(FilterEvents).reduce((acc, curr) => {
      acc[curr] = false;
      return acc;
    }, {} as Record<FilterEvents, boolean>);
  }

  trackCategoryFilters(index: number) {
    return index;
  }
}
