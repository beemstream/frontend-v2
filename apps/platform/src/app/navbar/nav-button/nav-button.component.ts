import { Component, Input } from '@angular/core';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

@Component({
  selector: 'nbp-nav-button',
  templateUrl: './nav-button.component.html',
  styleUrls: ['./nav-button.component.css'],
})
export class NavButtonComponent {
  @Input() routeName?: string;
  @Input() routerLink?: string;
  @Input() icon?: IconProp;
  @Input() navOptions: { exact: boolean } = { exact: false };
}
