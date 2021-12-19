import { Injectable } from '@angular/core';
import {
  faFire,
  faHeart,
  faRunning,
  faMale,
  faStar,
} from '@fortawesome/free-solid-svg-icons';
import { map } from 'rxjs';
import {
  CategoryFilter,
  FilterEvents,
} from '../shared/filter-stream-list/filters/filters.component';
import { TwitchOauthService } from './twitch-oauth.service';

@Injectable({
  providedIn: 'root',
})
export class CategoryFilterService {
  events = FilterEvents;

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
    {
      event: this.events.Follows,
      icon: faStar,
      value: 'Followed',
    },
  ];

  constructor(private twitchOauthService: TwitchOauthService) {}

  findCategoryFilterByEvent(event?: FilterEvents): CategoryFilter {
    return (
      this.categoryFiltersDefaults.find((f) => f.event === event) ||
      this.categoryFiltersDefaults[0]
    );
  }

  getCategoryFilters() {
    return this.twitchOauthService.getAccessToken().pipe(
      map((t) => {
        return !t
          ? [
              ...this.categoryFiltersDefaults.slice(
                0,
                this.categoryFiltersDefaults.length - 1
              ),
            ]
          : this.categoryFiltersDefaults;
      })
    );
  }
}
