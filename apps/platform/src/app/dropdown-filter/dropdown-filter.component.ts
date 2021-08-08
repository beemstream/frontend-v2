import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { CategoryFilter } from '../filters/filters.component';

@Component({
  selector: 'nbp-dropdown-filter',
  templateUrl: './dropdown-filter.component.html',
  styleUrls: ['./dropdown-filter.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DropdownFilterComponent {
  @Output()
  activeChanged = new EventEmitter();

  @Input()
  options: CategoryFilter[] = [];

  @Input()
  active!: CategoryFilter;

  @Input()
  toggleSelection = false;

  handleSelection(item: CategoryFilter) {
    this.active = item;
    this.activeChanged.emit(item);
  }

  trackByIndex(i: number) {
    return i;
  }
}
