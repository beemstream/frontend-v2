import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { Icon } from '../programming-language-icon';

@Component({
  selector: 'ui-toggle-filter',
  templateUrl: './toggle-filter.component.html',
  styleUrls: ['./toggle-filter.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToggleFilterComponent {
  @Input() toggleFilters: Icon[] = [];

  @Input() showValue?: boolean;

  @Input() showIcon?: boolean;

  @Output() filterChanged = new EventEmitter<string | null>();

  filterMap: Record<string, boolean> = {};

  emitFilter(filter: string) {
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

  trackByKey(_index: number, key: string) {
    return key;
  }
}
