import {
  Component,
  EventEmitter,
  Input,
  Output,
  TemplateRef,
} from '@angular/core';

@Component({
  selector: 'ui-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.css'],
})
export class DropdownComponent {
  @Input()
  title!: string;
  @Input()
  titleTemplate!: TemplateRef<unknown>;
  @Input()
  options: unknown[] = [];
  @Input()
  topTemplate!: TemplateRef<unknown>;
  @Input()
  middleTemplate!: TemplateRef<unknown>;
  @Input()
  bottomTemplate!: TemplateRef<unknown>;
  @Input()
  closeOnClick = false;
  @Output()
  optionClicked = new EventEmitter();

  optionDisplay = '0';

  handleDropdownMenuClick(elem: HTMLUListElement) {
    const opacity = getComputedStyle(elem).getPropertyValue('opacity');
    this.optionDisplay = opacity === '0' ? '1' : '0';
  }

  handleDropdownMouseOver() {
    this.optionDisplay = '1';
  }

  handleOptionClick(option: unknown) {
    this.optionClicked.emit(option);
    if (this.closeOnClick) {
      this.optionDisplay = '0';
    }
  }
}
