import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';

@Component({
  selector: 'ui-toggle-filter',
  templateUrl: './toggle-filter.component.html',
  styleUrls: ['./toggle-filter.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToggleFilterComponent {
  @Input() toggleFilters: any = [];

  @Input() showValue?: boolean = undefined;

  @Input() showIcon?: boolean = undefined;

  @Output() filterChanged = new EventEmitter<any | null>();

  filterMap: Record<string, boolean> = {};

  emitFilter(filter: any) {
    if (this.filterMap[filter]) {
      this.filterMap = {
        ...this.filterMap,
        [filter]: false,
      };
      this.filterChanged.emit(null);
    } else {
      this.filterMap = Object.keys(this.filterMap).reduce((acc, curr) => {
        acc[curr] = false;
        return acc;
      }, {} as Record<string, boolean>);

      this.filterMap = {
        ...this.filterMap,
        [filter as string]: true,
      };
      this.filterChanged.emit(filter);
    }
  }

  trackByKey(index: number) {
    return index;
  }
}
