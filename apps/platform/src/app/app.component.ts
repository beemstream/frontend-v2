import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'frontend-v2-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  title = 'platform';
}
