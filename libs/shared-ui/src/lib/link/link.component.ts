import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'ui-link',
  templateUrl: './link.component.html',
  styleUrls: ['./link.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LinkComponent {
  @Input() routerLink?: string;
  @Input() linkName?: string;
}
