import { CommonModule } from '@angular/common';
import { Component, Input, NgModule } from '@angular/core';

@Component({
  selector: 'ui-dropdown-option',
  templateUrl: './dropdown-option.component.html',
  styleUrls: ['./dropdown-option.component.css'],
})
export class DropdownOptionComponent {
  @Input()
  type: 'top' | 'middle' | 'bottom' = 'middle';
}

@NgModule({
  declarations: [DropdownOptionComponent],
  imports: [CommonModule],
  exports: [DropdownOptionComponent],
})
export class DropdownOptionModule {}
