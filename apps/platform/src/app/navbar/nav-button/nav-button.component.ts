import { Component, Input } from '@angular/core';

@Component({
  selector: 'nbp-nav-button',
  templateUrl: './nav-button.component.html',
  styleUrls: ['./nav-button.component.css'],
})
export class NavButtonComponent {
  @Input() routeName: string;
  @Input() routerLink: string;
  @Input() icon: string;
  @Input() navOptions?: { exact: boolean } = { exact: false };
}
