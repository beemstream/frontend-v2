import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'ui-link',
  templateUrl: './link.component.html',
  styleUrls: ['./link.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LinkComponent {
  @Input() routerLink?: string;
  @Input() linkType: 'href' | 'routerLink' = 'routerLink';
  @Input() linkName?: string;
  @Input() title?: string;
  @Input() target?: string;
}
