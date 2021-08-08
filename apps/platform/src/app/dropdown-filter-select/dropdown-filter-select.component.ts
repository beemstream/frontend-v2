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
  selector: 'nbp-dropdown-filter-select',
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

  ngOnInit() {
    this.optionsSelected = this.options.reduce((acc, key) => {
      if (acc[key] === undefined) {
        return { ...acc, [key]: true };
      }
      return acc;
    }, {} as Record<string, boolean>);
  }

  ngOnChanges() {
    this.options = ['', ...this.options];
  }

  handleSelection(item: string) {
    this.optionsSelectedChanged.emit(item);
  }

  selectFilter(option: string) {
    this.optionsSelected = {
      ...this.optionsSelected,
      [option]: !this.optionsSelected[option],
    };
    this.emitLanguageSelectedChanged();
  }

  selectAll() {
    this.changeAllLanguageSelected(true);
    this.emitLanguageSelectedChanged();
  }

  DeselectAll() {
    this.changeAllLanguageSelected(false);
    this.optionsSelectedChanged.emit([]);
  }

  changeAllLanguageSelected(state: boolean) {
    this.optionsSelected = Object.keys(this.optionsSelected).reduce(
      (acc, key) => {
        return { ...acc, [key]: state };
      },
      {} as Record<string, boolean>
    );
  }

  emitLanguageSelectedChanged() {
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
