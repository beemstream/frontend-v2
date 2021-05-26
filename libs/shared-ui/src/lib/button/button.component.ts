import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';

@Component({
  selector: 'ui-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonComponent {
  @Input() value?: string = '';

  @Input() title?: string = '';

  @Input() active = false;

  @Output() clicked: EventEmitter<void> = new EventEmitter();

  emitClick() {
    this.clicked.emit();
  }
}
