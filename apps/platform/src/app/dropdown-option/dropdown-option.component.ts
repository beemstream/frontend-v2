import { Component, Input } from '@angular/core';

@Component({
  selector: 'nbp-dropdown-option',
  templateUrl: './dropdown-option.component.html',
  styleUrls: ['./dropdown-option.component.css'],
})
export class DropdownOptionComponent {
  @Input()
  type: 'top' | 'middle' | 'bottom' = 'middle';
  @Input()
  optionClass = '';
}
