import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  NgModule,
} from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'ui-stream-tag',
  templateUrl: './stream-tag.component.html',
  styleUrls: ['./stream-tag.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StreamTagComponent {
  @Input() tag?: string;
  @Input() tagId?: string;
  @Input() link?: string;
}

@NgModule({
  declarations: [StreamTagComponent],
  imports: [CommonModule, RouterModule],
  exports: [StreamTagComponent],
})
export class StreamTagModule {}
