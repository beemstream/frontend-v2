import { Component, EventEmitter, Output } from '@angular/core';
import { faHeart, faFire, faSync } from '@fortawesome/free-solid-svg-icons';

export enum FilterEvents {
  MostPopular = 'mostPopular',
  NeedsLove = 'needsLove',
  Search = 'search'
}

export interface FilterEventPayload {
   type: FilterEvents;
   value?: string;
}

@Component({
  selector: 'nbp-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css']
})
export class FiltersComponent {

  @Output() filterChanged = new EventEmitter<FilterEventPayload>();

  @Output() refreshStream = new EventEmitter();

  filters: { [key: string]: boolean } = { ...this.initFilters(), [FilterEvents.MostPopular]: true };

  events = FilterEvents;

  faHeart = faHeart;

  faFire = faFire;

  faSync = faSync;

  emitFilter(event: FilterEvents, elemEvent?: Event) {
    this.resetFilters();
    this.selectFilter(event);
    const elem = elemEvent?.target as HTMLInputElement;
    this.filterChanged.emit({ type: event, ...(elemEvent && { value: elem.value }) });
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
    }, {} as { [key: string]: boolean  })
  }

}
