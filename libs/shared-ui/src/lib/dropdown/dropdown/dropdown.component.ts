import { DropdownOptionModule } from '../dropdown-option/dropdown-option.component';
import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  NgModule,
  Output,
  TemplateRef,
} from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';

@Component({
  selector: 'ui-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
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

  optionStyle = { opacity: '0', display: 'none' };

  constructor(private deviceService: DeviceDetectorService) {}

  handleDropdownMenuClick(elem: HTMLUListElement) {
    const opacity = getComputedStyle(elem).getPropertyValue('opacity');
    const display = getComputedStyle(elem).getPropertyValue('display');
    const newOpacity = opacity === '0' ? '1' : '0';
    const newDisplay = display === 'block' ? 'none' : 'block';
    this.optionStyle = { opacity: newOpacity, display: newDisplay };
  }

  handleDropdownMouseOver() {
    if (this.deviceService.isDesktop()) {
      this.optionStyle = { opacity: '1', display: 'block' };
    }
  }

  handleOptionClick(option: unknown) {
    this.optionClicked.emit(option);
    if (this.closeOnClick) {
      this.optionStyle = { opacity: '0', display: 'none' };
    }
  }

  trackByItemName(_i: number, item: unknown) {
    return JSON.stringify(item);
  }
}

@NgModule({
  declarations: [DropdownComponent],
  imports: [CommonModule, DropdownOptionModule],
  exports: [DropdownComponent],
})
export class DropdownModule {}
