import { Component, Input } from '@angular/core';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { Icon } from '@frontend-v2/shared-ui';

@Component({
  selector: 'nbp-nav-button',
  templateUrl: './nav-button.component.html',
  styleUrls: ['./nav-button.component.css'],
})
export class NavButtonComponent {
  @Input() routeName?: string;
  @Input() routerLink?: string;
  @Input() linkType: 'href' | 'routerLink' = 'routerLink';
  @Input() icon?: IconProp | Icon;
  @Input() iconFoo?: IconProp | Icon;
  @Input() iconSource: 'fa' | 'beemstream' = 'fa';
  @Input() navOptions: { exact: boolean } = { exact: false };
}
