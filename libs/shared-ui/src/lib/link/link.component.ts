import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  NgModule,
} from '@angular/core';
import { RouterModule } from '@angular/router';

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

@NgModule({
  declarations: [LinkComponent],
  imports: [RouterModule, CommonModule],
  exports: [LinkComponent],
})
export class LinkModule {}
