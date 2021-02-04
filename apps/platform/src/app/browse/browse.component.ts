import { Component } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';
import { flatMap, map, reduce, take } from 'rxjs/operators';
import { StreamCategoryService, StreamCategory } from '../stream-category.service';
import { StreamInfo } from '../stream-info';

@Component({
  selector: 'nbp-browse',
  templateUrl: './browse.component.html',
  styleUrls: ['./browse.component.css'],
  providers: [StreamCategoryService]
})
export class BrowseComponent {
  limit = 5;
  readonly web = this.limitTo(this.streamService.getStreamByCategory(StreamCategory.WebDevelopment), this.limit);
  readonly mobile = this.limitTo(this.streamService.getStreamByCategory(StreamCategory.MobileDevelopment), this.limit);
  readonly game = this.limitTo(this.streamService.getStreamByCategory(StreamCategory.GameDevelopment), this.limit);
  readonly programming = this.limitTo(this.streamService.getStreamByCategory(StreamCategory.Programming), this.limit);

  allCategories = forkJoin([this.web, this.mobile, this.game, this.programming]);

  constructor(private streamService: StreamCategoryService) {
  }

  limitTo(stream: Observable<StreamInfo[]>, limit: number) {
    return stream.pipe(
      flatMap(s => s),
      take(limit),
      reduce((a, c) => {
        a.push(c);
        return a;
      }, [] as StreamInfo[])
    )
  }
}
