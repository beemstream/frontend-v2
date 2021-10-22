import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  NgModule,
  Output,
} from '@angular/core';
import { ButtonModule } from '../button/button.component';
import { IconModule } from '../icon/icon.component';
import { Icon } from '../programming-language-icon';

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

  trackByKey(_index: number, key: Icon) {
    return key;
  }
}

@NgModule({
  declarations: [ToggleFilterComponent],
  imports: [CommonModule, ButtonModule, IconModule],
  exports: [ToggleFilterComponent],
})
export class ToggleFilterModule {}
