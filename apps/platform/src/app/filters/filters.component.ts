import { Component, EventEmitter, Input, Output } from '@angular/core';
import { faHeart, faFire, faSync, faRunning, faMale } from '@fortawesome/free-solid-svg-icons';
import { of } from 'rxjs';

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

  @Input() languages = of([]);

  @Output() filterChanged = new EventEmitter<FilterEventPayload>();

  @Output() languageChanged = new EventEmitter<string>();

  @Output() refreshStream = new EventEmitter();

  @Output() layoutChanged = new EventEmitter<Layout>();

  filters: { [key: string]: boolean } = { ...this.initFilters(), [FilterEvents.MostPopular]: true };

  languageFilter: { [key: string]: boolean } = {};

  events = FilterEvents;

  layout = Layout;

  faHeart = faHeart;

  faFire = faFire;

  faSync = faSync;

  faRunning = faRunning

  faMale = faMale;

  emitFilter(event: FilterEvents, elemEvent?: Event) {
    this.resetFilters();
    this.selectFilter(event);
    const elem = elemEvent?.target as HTMLInputElement;
    this.filterChanged.emit({ type: event, ...(elemEvent && { value: elem.value }) });
  }

  emitLanguage(language: string) {
    if (this.languageFilter[language]) {
      this.languageFilter = { ...this.languageFilter, [language]: false };
      this.languageChanged.emit('');
    } else {
      this.languageFilter = Object.keys(this.languageFilter).reduce((acc, curr) => {
        acc[curr] = false;
        return acc;
      }, {} as { [key: string]: boolean  })

      this.languageFilter = { ...this.languageFilter, [language]: true };
      this.languageChanged.emit(language);
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
    }, {} as { [key: string]: boolean  })
  }

}
