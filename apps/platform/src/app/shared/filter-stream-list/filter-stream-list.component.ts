import {
  ChangeDetectionStrategy,
  EventEmitter,
  OnChanges,
  OnInit,
} from '@angular/core';
import { Component, Input, Output } from '@angular/core';
import {
  FilterEventPayload,
  FilterEvents,
  Layout,
} from './filters/filters.component';
import { StreamInfo } from '../../stream-info';
import { ProgrammingLanguage } from '../../utils';
import { LanguageCode } from './filters/language-code';
import { FilterKey, FilterService } from '../../services/filter.service';
import { FilterQueryParamsService } from '../../services/filter-query-params.service';

@Component({
  selector: 'nbp-filter-stream-list',
  templateUrl: './filter-stream-list.component.html',
  styleUrls: ['./filter-stream-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [FilterService, FilterQueryParamsService],
})
export class FilterStreamListComponent implements OnInit, OnChanges {
  @Input() streamCategoryList: StreamInfo[] | null = [];

  @Input() availableLanguages?: LanguageCode[] | null = [];

  @Input() availableProgrammingLanguages: ProgrammingLanguage[] | null = [];

  @Output() refreshStream = new EventEmitter<string>();

  @Output() changeLanguage = new EventEmitter<string>();

  layout = Layout;

  layoutSetting = Layout.Default;

  filteredStreams = this.filterService.getFilteredStreams();

  selectedStates = this.filterQueryParamsService.getSelectedStates();

  filterKey = FilterKey;

  constructor(
    private filterService: FilterService,
    private filterQueryParamsService: FilterQueryParamsService
  ) {
    this.filterQueryParamsService.subscribe();
  }

  ngOnInit() {
    this.filterService.updateSourceValue(
      FilterKey.ProgrammingLanguage,
      this.availableProgrammingLanguages
    );
    this.filterService.updateSourceValue(
      FilterKey.Language,
      this.availableLanguages
    );
  }

  ngOnChanges(): void {
    this.filterService.updateSourceValue(
      FilterKey.Streams,
      this.streamCategoryList
    );
  }

  filterStreams(event: FilterEventPayload) {
    if (event.type === FilterEvents.Search) {
      this.filterService.updateSourceValue(FilterKey.SearchTerm, event.value);
    } else {
      this.filterService.updateSourceValue(
        FilterKey.CategoryFilter,
        event.type
      );
    }
  }

  handleChangedFilter(
    filterKey: FilterKey,
    value: LanguageCode[] | ProgrammingLanguage[]
  ) {
    console.log(value);
    this.filterService.updateSourceValue(filterKey, value);
  }

  changeLayout(layout: Layout) {
    this.layoutSetting = layout;
  }

  trackStream(_index: number, item: StreamInfo) {
    return `${item.id}-${item.viewer_count}`;
  }
}
