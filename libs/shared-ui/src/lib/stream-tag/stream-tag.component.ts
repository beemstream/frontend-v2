import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

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
