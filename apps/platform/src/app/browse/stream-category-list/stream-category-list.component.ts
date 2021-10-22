import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { StreamInfo } from '../../stream-info';

@Component({
  selector: 'nbp-stream-category-list',
  templateUrl: './stream-category-list.component.html',
  styleUrls: ['./stream-category-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StreamCategoryListComponent {
  @Input() streamList?: StreamInfo[] | null;

  trackStream(_index: number, item: StreamInfo) {
    return `${item.id}-${item.viewer_count}`;
  }
}
