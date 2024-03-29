import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  TemplateRef,
} from '@angular/core';

@Component({
  selector: 'ui-dropdown-filter-select',
  templateUrl: './dropdown-filter-select.component.html',
  styleUrls: ['./dropdown-filter-select.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DropdownFilterSelectComponent implements OnInit, OnChanges {
  @Output()
  optionsSelectedChanged = new EventEmitter();

  @Input()
  titleTemplate!: TemplateRef<unknown>;

  @Input()
  optionTemplate!: TemplateRef<unknown>;

  @Input()
  options: string[] = [];

  optionsSelected!: Record<string, boolean>;

  @Input()
  selectedOptions?: string[];

  ngOnInit() {
    this.optionsSelected = this.options.reduce((acc, key) => {
      if (acc[key] === undefined) {
        if (this.selectedOptions) {
          return { ...acc, [key]: this.selectedOptions.includes(key) };
        }
        return { ...acc, [key]: true };
      }
      return acc;
    }, {} as Record<string, boolean>);
  }

  ngOnChanges() {
    const changedOptions = this.options.includes('')
      ? this.options.slice(1, this.options.length)
      : this.options;

    this.options = [
      '',
      ...new Set([...changedOptions, ...(this.selectedOptions ?? [])]),
    ].sort();
  }

  handleSelection(item: string) {
    this.optionsSelectedChanged.emit(item);
  }

  selectFilter(option: string) {
    this.optionsSelected = {
      ...this.optionsSelected,
      [option]: !this.optionsSelected[option],
    };
    this.emitOptionsSelected();
  }

  selectAll() {
    this.changeAllOptionsSelected(true);
    this.emitOptionsSelected();
  }

  DeselectAll() {
    this.changeAllOptionsSelected(false);
    this.optionsSelectedChanged.emit([]);
  }

  changeAllOptionsSelected(state: boolean) {
    this.optionsSelected = Object.keys(this.optionsSelected).reduce(
      (acc, key) => {
        return { ...acc, [key]: state };
      },
      {} as Record<string, boolean>
    );
  }

  emitOptionsSelected() {
    this.optionsSelectedChanged.emit(
      Object.keys(this.optionsSelected).filter(
        (key) => !!key && this.optionsSelected[key]
      )
    );
  }

  trackByIndex(i: number) {
    return i;
  }
}
