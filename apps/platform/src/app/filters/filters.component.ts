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
} from '@fortawesome/free-solid-svg-icons';
import { Observable, of } from 'rxjs';
import { LanguageCode } from './language-code';
import { ProgrammingLanguage } from '../utils';
import { TwitchOauthService } from '../twitch-oauth.service';
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

@Component({
  selector: 'nbp-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FiltersComponent {
  @Input() languages?: Observable<LanguageCode[]> = of([]);

  @Input() programmingLanguages?: Observable<ProgrammingLanguage[]> = of([]);

  @Output() filterChanged = new EventEmitter<FilterEventPayload>();

  @Output() languageChanged = new EventEmitter<LanguageCode>();

  @Output()
  programmingLanguageChanged = new EventEmitter<ProgrammingLanguage | null>();

  @Output() refreshStream = new EventEmitter();

  @Output() layoutChanged = new EventEmitter<Layout>();

  filtersStatus: Record<FilterEvents, boolean> = {
    ...this.initFilters(),
    [FilterEvents.MostPopular]: true,
  };

  events = FilterEvents;

  layout = Layout;

  faSync = faSync;

  categoryFilters = [
    {
      event: this.events.Follows,
      icon: faStar,
      value: 'Followed',
      condition: this.twitchOauthService.getAccessToken().pipe(map((t) => !!t)),
    },
    {
      event: this.events.MostPopular,
      icon: faFire,
      value: 'Most Popular',
      condition: of(true),
    },
    {
      event: this.events.NeedsLove,
      icon: faHeart,
      value: 'Needs Love',
      condition: of(true),
    },
    {
      event: this.events.MarathonRunners,
      icon: faRunning,
      value: 'Marathon Runners',
      condition: of(true),
    },
    {
      event: this.events.Starters,
      icon: faMale,
      value: 'Slow Starters',
      condition: of(true),
    },
  ];

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
