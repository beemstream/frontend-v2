import {
  Component,
  EventEmitter,
  Input,
  Output,
  TemplateRef,
} from '@angular/core';

@Component({
  selector: 'nbp-dropdown',
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
  @Output()
  optionClicked = new EventEmitter();
}
